'use client';

import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, extend, useLoader, useThree } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { TextureLoader } from 'three';

// Shader types
type ShaderType = 'halftone' | 'glitch' | 'scanline' | 'noise' | 'pixelate' | 'hologram' | 'matrix';
const SHADERS: ShaderType[] = ['halftone', 'glitch', 'scanline', 'noise', 'pixelate', 'hologram', 'matrix'];

// Custom shader materials for images
const ImageHalftoneShader = shaderMaterial(
  { time: 0, tex: null, resolution: new THREE.Vector2(1, 1) },
  // Vertex
  `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
  // Fragment - Pixel Halftone
  `
    uniform float time;
    uniform sampler2D tex;
    uniform vec2 resolution;
    varying vec2 vUv;
    
    void main() {
      vec4 texColor = texture2D(tex, vUv);
      float gray = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
      
      float scale = 80.0;
      vec2 grid = floor(vUv * scale) / scale;
      float pattern = length(fract(vUv * scale) - 0.5);
      float threshold = gray * 0.8 + sin(time * 3.0) * 0.05;
      
      vec3 finalColor = pattern < threshold ? texColor.rgb : texColor.rgb * 0.3;
      gl_FragColor = vec4(finalColor, texColor.a);
    }
  `
);

const ImageGlitchShader = shaderMaterial(
  { time: 0, tex: null, resolution: new THREE.Vector2(1, 1) },
  // Vertex
  `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
  // Fragment - RGB Glitch
  `
    uniform float time;
    uniform sampler2D tex;
    varying vec2 vUv;
    
    void main() {
      float glitchStrength = step(0.95, sin(time * 30.0)) * 0.03;
      float offset = sin(vUv.y * 100.0 + time * 20.0) * glitchStrength;
      
      float r = texture2D(tex, vUv + vec2(offset, 0.0)).r;
      float g = texture2D(tex, vUv).g;
      float b = texture2D(tex, vUv - vec2(offset, 0.0)).b;
      float a = texture2D(tex, vUv).a;
      
      vec3 color = vec3(r, g, b);
      
      // Random horizontal lines
      float line = step(0.98, sin(vUv.y * 500.0 + time * 50.0));
      color = mix(color, vec3(1.0), line * glitchStrength * 10.0);
      
      gl_FragColor = vec4(color, a);
    }
  `
);

const ImageScanlineShader = shaderMaterial(
  { time: 0, tex: null, resolution: new THREE.Vector2(1, 1) },
  // Vertex
  `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
  // Fragment - CRT Scanlines
  `
    uniform float time;
    uniform sampler2D tex;
    varying vec2 vUv;
    
    void main() {
      vec4 texColor = texture2D(tex, vUv);
      
      // Moving scanlines
      float scanline = sin((vUv.y + time * 0.5) * 400.0) * 0.5 + 0.5;
      scanline = pow(scanline, 1.5) * 0.15 + 0.85;
      
      // Slight color shift
      vec3 color = texColor.rgb * scanline;
      color += vec3(0.0, 0.02, 0.05) * (1.0 - scanline);
      
      // Vignette
      float vignette = 1.0 - length((vUv - 0.5) * 1.2);
      color *= vignette;
      
      gl_FragColor = vec4(color, texColor.a);
    }
  `
);

const ImageNoiseShader = shaderMaterial(
  { time: 0, tex: null, resolution: new THREE.Vector2(1, 1) },
  // Vertex
  `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
  // Fragment - Film Grain
  `
    uniform float time;
    uniform sampler2D tex;
    varying vec2 vUv;
    
    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }
    
    void main() {
      vec4 texColor = texture2D(tex, vUv);
      
      float noise = random(vUv + fract(time)) * 0.15;
      vec3 color = texColor.rgb + vec3(noise - 0.075);
      
      // Slight sepia/vintage tone
      float gray = dot(color, vec3(0.299, 0.587, 0.114));
      color = mix(color, vec3(gray * 1.1, gray, gray * 0.9), 0.1);
      
      gl_FragColor = vec4(color, texColor.a);
    }
  `
);

const ImagePixelateShader = shaderMaterial(
  { time: 0, tex: null, resolution: new THREE.Vector2(1, 1) },
  // Vertex
  `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
  // Fragment - Pixelate with color quantization
  `
    uniform float time;
    uniform sampler2D tex;
    varying vec2 vUv;
    
    void main() {
      float pixelSize = 100.0 + sin(time * 2.0) * 20.0;
      vec2 pixelUv = floor(vUv * pixelSize) / pixelSize;
      
      vec4 texColor = texture2D(tex, pixelUv);
      
      // Color quantization (retro palette)
      vec3 color = floor(texColor.rgb * 8.0) / 8.0;
      
      gl_FragColor = vec4(color, texColor.a);
    }
  `
);

const ImageHologramShader = shaderMaterial(
  { time: 0, tex: null, resolution: new THREE.Vector2(1, 1) },
  // Vertex
  `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
  // Fragment - Hologram
  `
    uniform float time;
    uniform sampler2D tex;
    varying vec2 vUv;
    
    void main() {
      vec4 texColor = texture2D(tex, vUv);
      
      // Hologram lines
      float lines = sin(vUv.y * 200.0 + time * 5.0) * 0.5 + 0.5;
      
      // Color shift to cyan/blue
      vec3 holoColor = vec3(
        texColor.r * 0.5,
        texColor.g * 0.8 + 0.1,
        texColor.b + 0.3
      );
      
      // Flickering
      float flicker = 0.95 + sin(time * 20.0) * 0.05;
      
      vec3 color = holoColor * (0.7 + lines * 0.3) * flicker;
      
      // Edge glow
      float edge = 1.0 - abs(vUv.x - 0.5) * 2.0;
      color += vec3(0.0, 0.2, 0.3) * edge * 0.2;
      
      gl_FragColor = vec4(color, texColor.a * 0.9);
    }
  `
);

const ImageMatrixShader = shaderMaterial(
  { time: 0, tex: null, resolution: new THREE.Vector2(1, 1) },
  // Vertex
  `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
  // Fragment - Matrix Rain
  `
    uniform float time;
    uniform sampler2D tex;
    varying vec2 vUv;
    
    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }
    
    void main() {
      vec4 texColor = texture2D(tex, vUv);
      
      // Matrix rain columns
      float cols = 40.0;
      float col = floor(vUv.x * cols);
      float speed = random(vec2(col, 0.0)) * 2.0 + 1.0;
      float drop = fract(vUv.y + time * speed * 0.3 + random(vec2(col, 1.0)));
      float trail = smoothstep(0.0, 0.4, drop) * (1.0 - smoothstep(0.4, 1.0, drop));
      
      // Convert to green matrix style
      float gray = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
      vec3 matrixColor = vec3(gray * 0.2, gray * 0.8 + trail * 0.3, gray * 0.2);
      
      gl_FragColor = vec4(matrixColor, texColor.a);
    }
  `
);

// Extend Three.js
extend({
  ImageHalftoneShader,
  ImageGlitchShader,
  ImageScanlineShader,
  ImageNoiseShader,
  ImagePixelateShader,
  ImageHologramShader,
  ImageMatrixShader,
});

// Declare types
declare global {
  namespace JSX {
    interface IntrinsicElements {
      imageHalftoneShader: any;
      imageGlitchShader: any;
      imageScanlineShader: any;
      imageNoiseShader: any;
      imagePixelateShader: any;
      imageHologramShader: any;
      imageMatrixShader: any;
    }
  }
}

interface ShaderPlaneProps {
  imageSrc: string;
  shaderType: ShaderType;
}

function ShaderPlane({ imageSrc, shaderType }: ShaderPlaneProps) {
  const materialRef = useRef<any>(null);
  const texture = useLoader(TextureLoader, imageSrc);
  const { viewport, size } = useThree();

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.time = state.clock.elapsedTime;
    }
  });

  const renderMaterial = () => {
    const props = { ref: materialRef, tex: texture, transparent: true };
    switch (shaderType) {
    //   case 'halftone':
    //     return <imageHalftoneShader {...props} />;
    //   case 'glitch':
    //     return <imageGlitchShader {...props} />;
      case 'scanline':
        return <imageScanlineShader {...props} />;
      case 'noise':
        return <imageNoiseShader {...props} />;
      case 'pixelate':
        return <imagePixelateShader {...props} />;
    //   case 'hologram':
    //     return <imageHologramShader {...props} />;
    //   case 'matrix':
    //     return <imageMatrixShader {...props} />;
      default:
        return <imageGlitchShader {...props} />;
    }
  };

  // Calculate dimensions to cover the viewport while maintaining aspect ratio
  const imageAspect = texture.image ? texture.image.width / texture.image.height : 1;
  const viewportAspect = viewport.width / viewport.height;
  
  let planeWidth, planeHeight;
  if (imageAspect > viewportAspect) {
    // Image is wider - fit to height and overflow width
    planeHeight = viewport.height;
    planeWidth = viewport.height * imageAspect;
  } else {
    // Image is taller - fit to width and overflow height
    planeWidth = viewport.width;
    planeHeight = viewport.width / imageAspect;
  }

  return (
    <mesh position={[0, 0, 0]}>
      <planeGeometry args={[planeWidth, planeHeight]} />
      {renderMaterial()}
    </mesh>
  );
}

interface ShaderImageProps {
  src: string;
  className?: string;
  intervalMs?: number;
}

export default function ShaderImage({ src, className, intervalMs = 200 }: ShaderImageProps) {
  const [currentShaderIndex, setCurrentShaderIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentShaderIndex((prev) => (prev + 1) % SHADERS.length);
    }, intervalMs);

    return () => clearInterval(interval);
  }, [intervalMs]);

  return (
    <div className={className} style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent', width: '100%', height: '100%' }}
        orthographic={false}
      >
        <ShaderPlane imageSrc={src} shaderType={SHADERS[currentShaderIndex]} />
      </Canvas>
    </div>
  );
}
