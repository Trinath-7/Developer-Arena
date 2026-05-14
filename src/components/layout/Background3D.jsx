import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

const AnimatedWave = () => {
  const meshRef = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      // Add smooth wavy undulations to the position attribute
      const positions = meshRef.current.geometry.attributes.position;
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        
        // Create wave pattern based on time, X and Y coordinate
        const z = Math.sin(x * 0.3 + t * 0.5) * 0.4 + Math.cos(y * 0.25 + t * 0.3) * 0.3;
        positions.setZ(i, z);
      }
      positions.needsUpdate = true;
      
      // Slow tilt based on state
      meshRef.current.rotation.z = t * 0.02;
    }
  });

  return (
    <mesh 
      ref={meshRef} 
      rotation={[-Math.PI / 2.5, 0, 0]} 
      position={[0, -2.5, -3]}
    >
      <planeGeometry args={[35, 35, 50, 50]} />
      <meshBasicMaterial 
        color="#7c3aed" 
        wireframe 
        transparent 
        opacity={0.08} 
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
};

const TechElements = () => {
  return (
    <>
      {/* Giant slow rotating Distorted Torus */}
      <Float speed={1.5} rotationIntensity={1} floatIntensity={1.5}>
        <mesh position={[-6, 3, -6]} rotation={[1, 1, 0]}>
          <torusGeometry args={[3, 0.05, 16, 100]} />
          <meshBasicMaterial color="#a78bfa" transparent opacity={0.2} />
        </mesh>
      </Float>
      
      <Float speed={2.5} rotationIntensity={1.5} floatIntensity={1}>
        <mesh position={[7, -3, -5]} rotation={[0.5, 0.8, 0.5]}>
          <torusGeometry args={[2, 0.03, 16, 80]} />
          <meshBasicMaterial color="#818cf8" transparent opacity={0.15} />
        </mesh>
      </Float>
      
      {/* Floating tech particles */}
      <Particles count={80} />
    </>
  );
};

const Particles = ({ count }) => {
  const points = useRef();

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15 - 5;
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (points.current) {
      points.current.rotation.y = t * 0.015;
      points.current.rotation.z = Math.sin(t * 0.1) * 0.05;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#7c3aed"
        sizeAttenuation
        transparent
        opacity={0.3}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const OrganicBlobs = () => {
  return (
    <>
      <Float speed={3.5} rotationIntensity={2} floatIntensity={2}>
        <Sphere args={[1.8, 64, 64]} position={[-3, 2.5, -4]}>
          <MeshDistortMaterial
            color="#c4b5fd"
            emissive="#8b5cf6"
            emissiveIntensity={0.2}
            roughness={0.2}
            metalness={0.8}
            distort={0.4}
            speed={1.5}
            transparent
            opacity={0.1}
          />
        </Sphere>
      </Float>
      
      <Float speed={2.5} rotationIntensity={1.5} floatIntensity={2.5}>
        <Sphere args={[1.4, 64, 64]} position={[4, -2, -3]}>
          <MeshDistortMaterial
            color="#a5f3fc"
            emissive="#06b6d4"
            emissiveIntensity={0.25}
            roughness={0.1}
            metalness={0.9}
            distort={0.3}
            speed={1.8}
            transparent
            opacity={0.08}
          />
        </Sphere>
      </Float>
    </>
  );
};

const Scene = () => {
  const { mouse, viewport } = useThree();
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      // Lagged mouse follow movement for Parallax effect
      const targetX = (mouse.x * viewport.width) / 12;
      const targetY = (mouse.y * viewport.height) / 12;
      groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.03;
      groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.03;
    }
  });

  return (
    <group ref={groupRef}>
      <AnimatedWave />
      <OrganicBlobs />
      <TechElements />
    </group>
  );
};

const Background3D = () => {
  return (
    <div className="fixed inset-0 -z-20 pointer-events-none overflow-hidden select-none">
      {/* High-End Digital Grain Overlay */}
      <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC42NSIgbnVtT2N0YXZlcz0iMyIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNuKSIvPjwvc3ZnPg==')]" />
      
      {/* Ambient Gradient Mesh behind the 3D content */}
      <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-primary-200/20 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDuration: '12s' }} />
      <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[60%] bg-indigo-200/15 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDuration: '15s' }} />
      
      {/* ThreeJS Canvas */}
      <div className="absolute inset-0 w-full h-full scale-110"> {/* Scale up slightly so the edges don't clip on parallax */}
        <Canvas
          camera={{ position: [0, 0, 6], fov: 50 }}
          gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
          dpr={[1, 2]} // Support retina displays but optimize
        >
          <ambientLight intensity={0.7} />
          <directionalLight position={[5, 5, 5]} intensity={1.5} />
          <pointLight position={[-5, 5, -2]} intensity={0.8} color="#a78bfa" />
          <Scene />
        </Canvas>
      </div>
    </div>
  );
};

export default Background3D;
