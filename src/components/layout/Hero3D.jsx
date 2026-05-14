import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PresentationControls, MeshDistortMaterial, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

const FuturisticCore = () => {
  const outerMesh = useRef();
  const innerMesh = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (outerMesh.current) {
      outerMesh.current.rotation.y = t * 0.12;
      outerMesh.current.rotation.x = Math.sin(t * 0.2) * 0.1;
    }
    if (innerMesh.current) {
      innerMesh.current.rotation.y = -t * 0.22;
      innerMesh.current.rotation.z = Math.cos(t * 0.3) * 0.15;
      
      // Subtle pulsing dynamic scale
      const pulse = 1 + Math.sin(t * 2.5) * 0.03;
      innerMesh.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={0.4} floatIntensity={0.8}>
      {/* Outer Large Geometric Wireframe Layer */}
      <mesh
        ref={outerMesh}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <icosahedronGeometry args={[1.25, 1]} />
        <meshStandardMaterial
          color="#fafaf9"
          wireframe={true}
          transparent={true}
          opacity={hovered ? 0.9 : 0.6}
          emissive="#fef3c7"
          emissiveIntensity={hovered ? 2 : 1}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>
      
      {/* Middle Complex Matrix Wireframe Core */}
      <mesh ref={innerMesh}>
        <icosahedronGeometry args={[0.85, 2]} />
        <meshStandardMaterial
          color="#ffffff"
          wireframe={true}
          transparent={true}
          opacity={0.8}
          emissive="#ffffff"
          emissiveIntensity={hovered ? 3 : 1.8}
          roughness={0}
          metalness={1}
        />
      </mesh>
      
      {/* Center High-Density Orbital Wireframe Sphere */}
      <mesh>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial
          color="#fef9c3"
          wireframe={true}
          transparent={true}
          opacity={0.7}
          emissive="#fef08a"
          emissiveIntensity={1.5}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>
    </Float>
  );
};

const TechRing = ({ radius, speed, color, rotationAxis, thickness = 0.015 }) => {
  const ringRef = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ringRef.current.rotation[rotationAxis] = t * speed;
    
    // Add subtle wobble
    if (rotationAxis === 'y') {
      ringRef.current.rotation.x = Math.sin(t * 0.5) * 0.1;
    }
  });
  
  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[radius, thickness, 16, 120]} />
      <meshStandardMaterial 
        color={color} 
        emissive={color} 
        emissiveIntensity={2.5} 
        roughness={0}
        metalness={1}
      />
    </mesh>
  );
};

const TechFloater = ({ args, position, rotation, speed }) => {
  const meshRef = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = rotation[0] + t * speed * 0.4;
    meshRef.current.rotation.y = rotation[1] + t * speed * 0.6;
  });

  return (
    <Float speed={3} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        <octahedronGeometry args={args} />
        <meshStandardMaterial
          color="#a78bfa"
          wireframe
          transparent
          opacity={0.4}
          emissive="#7c3aed"
          emissiveIntensity={1}
        />
      </mesh>
    </Float>
  );
};

const ParticleField = () => {
  const count = 400;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Create spherical distribution
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 4 + Math.random() * 3; // distance range 4 to 7
      
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, [count]);

  const pointsRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * 0.04;
      pointsRef.current.rotation.x = Math.sin(t * 0.05) * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.045} 
        color="#c4b5fd" 
        transparent 
        opacity={0.65} 
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const Hero3D = () => {
  return (
    <div className="w-full h-full min-h-[350px] relative z-0">
      <Canvas
        camera={{ position: [0, 0, 6.5], fov: 45 }}
        gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={3} color="#ffffff" />
        <directionalLight position={[-5, 5, -5]} intensity={2.5} color="#fef3c7" />
        <pointLight position={[0, -3, 2]} intensity={1.8} color="#ffffff" />
        
        <PresentationControls
          global={true}
          config={{ mass: 2, tension: 400 }}
          snap={{ mass: 3, tension: 1200 }}
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 4, Math.PI / 4]}
          azimuth={[-Math.PI / 4, Math.PI / 4]}
        >
          {/* Core Centerpiece */}
          <FuturisticCore />
          
          {/* Tech Orbiting Rings */}
          <TechRing radius={1.9} speed={0.35} color="#fbbf24" rotationAxis="y" thickness={0.015} />
          <TechRing radius={2.2} speed={-0.25} color="#fcd34d" rotationAxis="x" thickness={0.012} />
          <TechRing radius={2.5} speed={0.18} color="#e2e8f0" rotationAxis="z" thickness={0.008} />
          
          {/* Background abstract tech elements */}
          <TechFloater args={[0.4, 0]} position={[-3, 2, -2]} rotation={[0.5, 0.2, 0]} speed={0.5} />
          <TechFloater args={[0.3, 0]} position={[3.2, -1.8, -1.5]} rotation={[0.2, 0.8, 0.3]} speed={0.7} />
          
          {/* Particle field */}
          <ParticleField />
        </PresentationControls>
      </Canvas>
    </div>
  );
};

export default Hero3D;
