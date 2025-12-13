"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Environment } from "@react-three/drei";
import { Group } from "three";

interface BrTextProps {
  fontSize?: number;
  color?: string;
  metalness?: number;
  roughness?: number;
  floatIntensity?: number;
  rotationSpeed?: number;
}

function BrText({
  fontSize = 1.5,
  color = "#e0e0e0",
  metalness = 0.8,
  roughness = 0.2,
  floatIntensity = 0.15,
  rotationSpeed = 0.3,
}: BrTextProps) {
  const groupRef = useRef<Group>(null);
  const initialY = useRef(0);

  useFrame((state) => {
    if (!groupRef.current) return;

    const time = state.clock.getElapsedTime();

    // Subtle floating animation
    groupRef.current.position.y =
      initialY.current + Math.sin(time * 1.5) * floatIntensity;

    // Continuous slow rotation on Y axis
    groupRef.current.rotation.y += rotationSpeed * 0.01;
    
    // Subtle wobble on X axis
    groupRef.current.rotation.x = Math.sin(time * 0.5) * 0.1;
  });

  return (
    <group ref={groupRef}>
      <Text
        font="/fonts/JetBrainsMono-Bold.ttf"
        fontSize={fontSize}
        letterSpacing={0.02}
        textAlign="center"
        anchorX="center"
        anchorY="middle"
        bevelEnabled={true}
        bevelSize={0.05}
        bevelThickness={0.15}
        curveSegments={16}
      >
        {"<br>"}
        <meshStandardMaterial
          color={color}
          metalness={metalness}
          roughness={roughness}
          envMapIntensity={1.5}
          side={2}
        />
      </Text>
    </group>
  );
}

interface BrTag3DProps {
  className?: string;
  fontSize?: number;
  color?: string;
  metalness?: number;
  roughness?: number;
  floatIntensity?: number;
  rotationSpeed?: number;
}

export default function BrTag3D({
  className = "",
  fontSize = 1.5,
  color = "#e0e0e0",
  metalness = 0.8,
  roughness = 0.2,
  floatIntensity = 0.15,
  rotationSpeed = 0.3,
}: BrTag3DProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true }}
        style={{ overflow: 'visible' }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
        <directionalLight position={[-5, -5, -5]} intensity={0.8} />
        <pointLight position={[0, 0, -5]} intensity={0.5} color="#9966ff" />

        {/* Environment for realistic reflections */}
        <Environment preset="city" />

        {/* 3D Text */}
        <BrText
          fontSize={fontSize}
          color={color}
          metalness={metalness}
          roughness={roughness}
          floatIntensity={floatIntensity}
          rotationSpeed={rotationSpeed}
        />
      </Canvas>
    </div>
  );
}
