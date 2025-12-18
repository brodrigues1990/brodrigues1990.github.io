'use client';

import { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber';
import { Text3D, Center, shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '@/contexts/ThemeContext';

// Modern Gradient Liquid shader
const GradientLiquidShaderMaterial = shaderMaterial(
  {
    time: 0,
    color: new THREE.Color(0.2, 0.0, 0.1),
    color2: new THREE.Color(0.0, 0.5, 1.0),
  },
  // Vertex shader
  `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    uniform float time;
    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vPosition = position;
      vec3 pos = position;
      pos.y += sin(time * 2.0 + position.x * 3.0) * 0.08;
      pos.z += cos(time * 1.5 + position.y * 3.0) * 0.08;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  // Fragment shader - Modern Gradient Liquid
  `
    uniform float time;
    uniform vec3 color;
    uniform vec3 color2;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    
    void main() {
      vec3 light = normalize(vec3(sin(time * 0.5), 1.0, cos(time * 0.5)));
      float diffuse = max(dot(vNormal, light), 0.0);
      
      // Gradient animation
      float gradient = sin(vUv.x * 3.0 + time * 1.5) * 0.5 + 0.5;
      gradient = mix(gradient, cos(vUv.y * 3.0 + time * 1.0) * 0.5 + 0.5, 0.5);
      
      vec3 finalColor = mix(color, color2, gradient);
      finalColor *= (0.7 + diffuse * 0.3);
      finalColor = mix(finalColor, vec3(1.0), diffuse * 0.2);
      
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
);

// Neon Glow shader
const NeonGlowShaderMaterial = shaderMaterial(
  {
    time: 0,
    color: new THREE.Color(0.0, 1.0, 0.5),
  },
  // Vertex shader
  `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    uniform float time;
    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment shader - Neon Glow
  `
    uniform float time;
    uniform vec3 color;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    
    void main() {
      vec3 light = normalize(vec3(1.0, 1.0, 1.0));
      float diffuse = max(dot(vNormal, light), 0.0);
      
      // Fresnel glow effect
      vec3 viewDir = normalize(cameraPosition - vPosition);
      float fresnel = pow(1.0 - abs(dot(viewDir, vNormal)), 1.5);
      
      // Pulsing glow
      float pulse = sin(time * 3.0) * 0.5 + 0.5;
      
      vec3 finalColor = color * (0.4 + diffuse * 0.6);
      finalColor += color * fresnel * (0.5 + pulse * 0.5);
      
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
);

// Iridescent shader
const IridescentShaderMaterial = shaderMaterial(
  {
    time: 0,
    color: new THREE.Color(1.0, 0.5, 1.0),
  },
  // Vertex shader
  `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec3 vViewDir;
    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vPosition = position;
      vViewDir = normalize(-position);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment shader - Iridescent
  `
    uniform float time;
    uniform vec3 color;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec3 vViewDir;
    
    void main() {
      float fresnel = pow(1.0 - abs(dot(vViewDir, vNormal)), 2.0);
      
      // Rainbow shifting based on position and time
      vec3 rainbow = vec3(
        sin(vUv.x * 5.0 + time * 2.0) * 0.5 + 0.5,
        sin(vUv.y * 5.0 + time * 1.5 + 2.0) * 0.5 + 0.5,
        sin((vUv.x + vUv.y) * 5.0 + time * 1.0 + 4.0) * 0.5 + 0.5
      );
      
      vec3 finalColor = mix(color, rainbow, fresnel * 0.8);
      finalColor += rainbow * fresnel * 0.3;
      
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
);

// Fluid Flow shader
const FluidFlowShaderMaterial = shaderMaterial(
  {
    time: 0,
    color: new THREE.Color(0.0, 0.7, 1.0),
  },
  // Vertex shader
  `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    uniform float time;
    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vPosition = position;
      vec3 pos = position;
      pos.x += sin(time * 2.5 + position.y * 4.0) * 0.05;
      pos.z += cos(time * 2.0 + position.x * 4.0) * 0.05;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  // Fragment shader - Fluid Flow
  `
    uniform float time;
    uniform vec3 color;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    
    float noise(vec3 p) {
      return sin(p.x * 10.0) * sin(p.y * 10.0) * sin(p.z * 10.0) * 0.5 + 0.5;
    }
    
    void main() {
      vec3 light = normalize(vec3(cos(time * 0.5), 1.0, sin(time * 0.5)));
      float diffuse = max(dot(vNormal, light), 0.3);
      
      // Flowing patterns
      float flow = sin(vUv.x * 5.0 - time * 3.0) * cos(vUv.y * 5.0 - time * 2.0);
      flow = abs(flow);
      
      vec3 finalColor = color * (0.6 + diffuse * 0.4);
      finalColor += color * flow * 0.3;
      
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
);

// Custom shader materials
const HalftoneShaderMaterial = shaderMaterial(
  {
    time: 0,
    color: new THREE.Color(0.2, 0.0, 0.1),
    resolution: new THREE.Vector2(1, 1),
  },
  // Vertex shader
  `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment shader - Pixel Halftone
  `
    uniform float time;
    uniform vec3 color;
    uniform vec2 resolution;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    
    void main() {
      vec3 light = normalize(vec3(1.0, 1.0, 1.0));
      float diffuse = max(dot(vNormal, light), 0.0);
      
      // Halftone pattern
      float scale = 40.0;
      vec2 grid = floor(vUv * scale) / scale;
      float pattern = length(fract(vUv * scale) - 0.5);
      float threshold = diffuse * 0.8 + sin(time * 2.0) * 0.1;
      
      vec3 finalColor = pattern < threshold ? color : color * 0.2;
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
);

const GlitchShaderMaterial = shaderMaterial(
  {
    time: 0,
    color: new THREE.Color(0.2, 0.0, 0.1),
  },
  // Vertex shader
  `
    varying vec2 vUv;
    varying vec3 vNormal;
    uniform float time;
    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vec3 pos = position;
      pos.x += sin(time * 20.0 + position.y * 10.0) * 0.02;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  // Fragment shader - Glitch RGB Split
  `
    uniform float time;
    uniform vec3 color;
    varying vec2 vUv;
    varying vec3 vNormal;
    
    void main() {
      vec3 light = normalize(vec3(1.0, 1.0, 1.0));
      float diffuse = max(dot(vNormal, light), 0.0);
      
      float glitch = step(0.98, sin(time * 50.0));
      vec3 offset = vec3(
        sin(vUv.y * 50.0 + time * 10.0) * 0.05 * glitch,
        0.0,
        cos(vUv.y * 50.0 + time * 10.0) * 0.05 * glitch
      );
      
      vec3 finalColor = color * diffuse + offset;
      finalColor.r += sin(time * 30.0) * 0.1 * glitch;
      finalColor.b += cos(time * 25.0) * 0.1 * glitch;
      
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
);

const ScanlineShaderMaterial = shaderMaterial(
  {
    time: 0,
    color: new THREE.Color(0.2, 0.0, 0.1),
  },
  // Vertex shader
  `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vWorldPos;
    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment shader - Retro Scanlines
  `
    uniform float time;
    uniform vec3 color;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vWorldPos;
    
    void main() {
      vec3 light = normalize(vec3(1.0, 1.0, 1.0));
      float diffuse = max(dot(vNormal, light), 0.0);
      
      // Moving scanlines
      float scanline = sin((vWorldPos.y + time * 2.0) * 50.0) * 0.5 + 0.5;
      scanline = pow(scanline, 1.5);
      
      vec3 finalColor = color * diffuse * (0.7 + scanline * 0.3);
      finalColor += vec3(0.0, 0.1, 0.2) * scanline * 0.3;
      
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
);

const NoiseShaderMaterial = shaderMaterial(
  {
    time: 0,
    color: new THREE.Color(0.2, 0.0, 0.1),
  },
  // Vertex shader
  `
    varying vec2 vUv;
    varying vec3 vNormal;
    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment shader - Film Grain / Noise
  `
    uniform float time;
    uniform vec3 color;
    varying vec2 vUv;
    varying vec3 vNormal;
    
    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }
    
    void main() {
      vec3 light = normalize(vec3(1.0, 1.0, 1.0));
      float diffuse = max(dot(vNormal, light), 0.0);
      
      float noise = random(vUv + time) * 0.3;
      vec3 finalColor = color * diffuse + noise * 0.2;
      
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
);

const PixelateShaderMaterial = shaderMaterial(
  {
    time: 0,
    color: new THREE.Color(0.2, 0.0, 0.1),
  },
  // Vertex shader
  `
    varying vec2 vUv;
    varying vec3 vNormal;
    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment shader - Pixelate with color quantization
  `
    uniform float time;
    uniform vec3 color;
    varying vec2 vUv;
    varying vec3 vNormal;
    
    void main() {
      vec3 light = normalize(vec3(1.0, 1.0, 1.0));
      float diffuse = max(dot(vNormal, light), 0.0);
      
      // Pixelation
      float pixelSize = 15.0 + sin(time) * 5.0;
      vec2 pixelUv = floor(vUv * pixelSize) / pixelSize;
      
      // Color quantization (retro palette effect)
      vec3 finalColor = color * diffuse;
      finalColor = floor(finalColor * 4.0) / 4.0;
      
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
);

const HologramShaderMaterial = shaderMaterial(
  {
    time: 0,
    color: new THREE.Color(0.2, 0.0, 0.1),
  },
  // Vertex shader
  `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    uniform float time;
    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vPosition = position;
      vec3 pos = position;
      pos.y += sin(time * 3.0 + position.x * 5.0) * 0.01;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  // Fragment shader - Hologram effect
  `
    uniform float time;
    uniform vec3 color;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    
    void main() {
      vec3 light = normalize(vec3(1.0, 1.0, 1.0));
      float diffuse = max(dot(vNormal, light), 0.0);
      
      // Fresnel effect
      vec3 viewDir = normalize(cameraPosition - vPosition);
      float fresnel = pow(1.0 - abs(dot(viewDir, vNormal)), 2.0);
      
      // Hologram lines
      float lines = sin(vPosition.y * 100.0 + time * 5.0) * 0.5 + 0.5;
      
      vec3 holoColor = mix(color, vec3(0.0, 1.0, 1.0), fresnel * 0.5);
      vec3 finalColor = holoColor * (0.5 + diffuse * 0.5) * (0.8 + lines * 0.2);
      finalColor += vec3(0.1, 0.3, 0.5) * fresnel;
      
      gl_FragColor = vec4(finalColor, 0.9);
    }
  `
);

const MatrixShaderMaterial = shaderMaterial(
  {
    time: 0,
    color: new THREE.Color(0.0, 1.0, 0.3),
  },
  // Vertex shader
  `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vWorldPos;
    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment shader - Matrix rain effect
  `
    uniform float time;
    uniform vec3 color;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vWorldPos;
    
    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }
    
    void main() {
      vec3 light = normalize(vec3(1.0, 1.0, 1.0));
      float diffuse = max(dot(vNormal, light), 0.0);
      
      // Matrix rain columns
      float cols = 20.0;
      float col = floor(vUv.x * cols);
      float speed = random(vec2(col, 0.0)) * 2.0 + 1.0;
      float drop = fract(vUv.y + time * speed * 0.5 + random(vec2(col, 1.0)));
      float trail = smoothstep(0.0, 0.3, drop) * (1.0 - smoothstep(0.3, 1.0, drop));
      
      vec3 finalColor = color * diffuse * (0.3 + trail * 0.7);
      finalColor.g += trail * 0.3;
      
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
);

// Extend Three.js with custom materials
extend({ 
  HalftoneShaderMaterial,
  GlitchShaderMaterial,
  ScanlineShaderMaterial,
  NoiseShaderMaterial,
  PixelateShaderMaterial,
  HologramShaderMaterial,
  MatrixShaderMaterial,
  GradientLiquidShaderMaterial,
  NeonGlowShaderMaterial,
  IridescentShaderMaterial,
  FluidFlowShaderMaterial,
});

// Declare types for custom materials
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      halftoneShaderMaterial: any;
      glitchShaderMaterial: any;
      scanlineShaderMaterial: any;
      noiseShaderMaterial: any;
      pixelateShaderMaterial: any;
      hologramShaderMaterial: any;
      matrixShaderMaterial: any;
      gradientLiquidShaderMaterial: any;
      neonGlowShaderMaterial: any;
      iridescentShaderMaterial: any;
      fluidFlowShaderMaterial: any;
    }
  }
}

// Available fonts (you can add more font paths here)
const FONTS = [
  '/fonts/JetBrainsMono-Bold.json',
  '/fonts/arialbd.json',
  '/fonts/cambriab.json',
  '/fonts/impact.json',
  '/fonts/consolab.json',
];

// Shader types
type ShaderType = 'halftone' | 'glitch' | 'scanline' | 'noise' | 'pixelate' | 'hologram' | 'matrix' | 'gradient' | 'neon' | 'iridescent' | 'fluid';
const SHADERS: ShaderType[] = ['gradient', 'neon', 'iridescent', 'fluid', 'hologram', 'glitch', 'matrix'];

interface SpinningTextProps {
  font: string;
  color: string;
  shaderType: ShaderType;
}

function SpinningText({ font, color, shaderType }: SpinningTextProps) {
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<any>(null);
  const tiltAngle = THREE.MathUtils.degToRad(20);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Smooth rotation with mouse-like interaction
      groupRef.current.rotation.y += delta * 0.6;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2 + tiltAngle;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
    }
    if (materialRef.current) {
      materialRef.current.time = state.clock.elapsedTime;
    }
  });

  const threeColor = useMemo(() => new THREE.Color(color), [color]);

  const renderMaterial = () => {
    switch (shaderType) {
      case 'gradient':
        return <gradientLiquidShaderMaterial ref={materialRef} color={threeColor} color2={new THREE.Color(0.1, 0.5, 1.0)} />;
      case 'neon':
        return <neonGlowShaderMaterial ref={materialRef} color={threeColor} />;
      case 'iridescent':
        return <iridescentShaderMaterial ref={materialRef} color={threeColor} />;
      case 'fluid':
        return <fluidFlowShaderMaterial ref={materialRef} color={threeColor} />;
      case 'hologram':
        return <hologramShaderMaterial ref={materialRef} color={threeColor} transparent />;
      case 'glitch':
        return <glitchShaderMaterial ref={materialRef} color={threeColor} />;
      case 'matrix':
        return <matrixShaderMaterial ref={materialRef} color={threeColor} />;
      default:
        return <gradientLiquidShaderMaterial ref={materialRef} color={threeColor} color2={new THREE.Color(0.1, 0.5, 1.0)} />;
    }
  };

  return (
    <group ref={groupRef} rotation={[tiltAngle, 0, 0]}>
      <Center>
        <Text3D
          font={font}
          size={1.2}
          height={0.25}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.03}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
        >
          {'<Br>'}
          {renderMaterial()}
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
  const [currentShaderIndex, setCurrentShaderIndex] = useState(0);
  const [currentFontIndex, setCurrentFontIndex] = useState(0);

  // Cycle through shaders and fonts every 1500ms
  useEffect(() => {
    const interval = setInterval(() => {
      // setCurrentShaderIndex((prev) => (prev + 1) % SHADERS.length);
      // setCurrentFontIndex((prev) => (prev + 1) % FONTS.length);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={className} style={{ width: '100%', height: '100%', minHeight: '200px' }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Advanced Lighting setup */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={0.6} color="#4a90ff" />
        <pointLight position={[0, 5, 0]} intensity={0.8} color="#ff00ff" />
        <pointLight position={[5, 0, 5]} intensity={0.5} color="#00ffff" />

        {/* 3D Text with rotating shaders */}
        <SpinningText 
          font={FONTS[currentFontIndex]} 
          color={colors.secondary} 
          shaderType={SHADERS[currentShaderIndex]}
        />
      </Canvas>
    </div>
  );
}
