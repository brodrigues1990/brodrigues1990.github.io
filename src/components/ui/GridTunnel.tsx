'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

interface GridTunnelProps {
  gridColor?: string
  bgColor?: string
  speed?: number
  gridSpacing?: number
  tunnelWidth?: number
  tunnelHeight?: number
  tunnelDepth?: number
  lineWidth?: number
}

function TunnelMesh({
  gridColor = '#e5e5e5',
  speed = 2,
  gridSpacing = 2,
  tunnelWidth = 20,
  tunnelHeight = 20,
  tunnelDepth = 100,
  lineWidth = 1,
}: GridTunnelProps) {
  const meshRef = useRef<THREE.LineSegments>(null)

  const geometry = useMemo(() => {
    const points: number[] = []
    
    // Calculate boundaries
    const halfW = tunnelWidth / 2
    const halfH = tunnelHeight / 2
    
    // Longitudinal lines (along Z-axis)
    // Floor and Ceiling (varying X)
    for (let x = -halfW; x <= halfW; x += gridSpacing) {
      // Ceiling line
      points.push(x, halfH, 0)
      points.push(x, halfH, -tunnelDepth)
      
      // Floor line
      points.push(x, -halfH, 0)
      points.push(x, -halfH, -tunnelDepth)
    }
    
    // Walls (varying Y)
    for (let y = -halfH; y <= halfH; y += gridSpacing) {
      // Right wall line
      points.push(halfW, y, 0)
      points.push(halfW, y, -tunnelDepth)
      
      // Left wall line
      points.push(-halfW, y, 0)
      points.push(-halfW, y, -tunnelDepth)
    }
    
    // Latitudinal lines (cross-sections along Z)
    for (let z = 0; z >= -tunnelDepth; z -= gridSpacing) {
      // Top edge
      points.push(-halfW, halfH, z)
      points.push(halfW, halfH, z)
      
      // Bottom edge
      points.push(-halfW, -halfH, z)
      points.push(halfW, -halfH, z)
      
      // Left edge
      points.push(-halfW, -halfH, z)
      points.push(-halfW, halfH, z)
      
      // Right edge
      points.push(halfW, -halfH, z)
      points.push(halfW, halfH, z)
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(points, 3))
    return geo
  }, [tunnelWidth, tunnelHeight, tunnelDepth, gridSpacing])

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Move the tunnel towards the camera (positive Z)
      meshRef.current.position.z = (state.clock.elapsedTime * speed) % gridSpacing
    }
  })

  return (
    <lineSegments ref={meshRef} geometry={geometry}>
      <lineBasicMaterial color={gridColor} linewidth={lineWidth} />
    </lineSegments>
  )
}

export default function GridTunnel({
  bgColor = '#ffffff',
  ...props
}: GridTunnelProps) {
  return (
    <div className="absolute inset-0 -z-10 w-full h-full pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 0], fov: 75 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]} // Handle high DPI screens
      >
        <color attach="background" args={[bgColor]} />
        <fog attach="fog" args={[bgColor, 5, props.tunnelDepth || 100]} />
        <TunnelMesh {...props} />
      </Canvas>
    </div>
  )
}
