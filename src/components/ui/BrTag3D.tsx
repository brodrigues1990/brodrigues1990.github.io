'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text3D, Center, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '@/contexts/ThemeContext';

interface SpinningTextProps {
  font: string;
  color: string;
}

function SpinningText({ font, color }: SpinningTextProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Infinite rotation animation on its own axis
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5; // Spin around Y axis
    }
  });

  return (
    <group ref={groupRef}>
      <Center>
        <Text3D
          font={font}
          size={1}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
        >
          {'<Br>'}
          <meshStandardMaterial
            color={color}
            metalness={0.8}
            roughness={0.2}
          />
        </Text3D>
      </Center>
    </group>
  );
}

interface BrTag3DProps {
  className?: string;
}

export default function BrTag3D({ className }: BrTag3DProps) {
  const { colors } = useTheme();

  return (
    <div className={className} style={{ width: '100%', height: '100%', minHeight: '200px' }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} />
        <pointLight position={[0, 5, 0]} intensity={0.5} />

        {/* 3D Text */}
        <SpinningText font="/fonts/JetBrainsMono-Bold.json" color={colors.secondary} />

        {/* Optional: Interactive controls for development */}
        {/* <OrbitControls enableZoom={false} enablePan={false} /> */}
      </Canvas>
    </div>
  );
}
