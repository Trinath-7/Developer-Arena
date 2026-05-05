import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, OrbitControls, Stars, useTexture } from '@react-three/drei';
import * as THREE from 'three';

const TexturedEarth = () => {
  const meshRef = useRef();
  const cloudsRef = useRef();
  
  // Loading high-quality textures from standard Three.js examples
  const [colorMap, normalMap, cloudsMap] = useTexture([
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png'
  ]);

  useFrame((state, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.05;
    if (cloudsRef.current) {
        cloudsRef.current.rotation.y += delta * 0.06; // Clouds drift slightly faster
    }
  });

  return (
    <group>
        {/* Earth Mesh */}
        <Sphere ref={meshRef} args={[1.5, 64, 64]}>
          <meshPhongMaterial 
            map={colorMap}
            normalMap={normalMap}
            shininess={15}
          />
        </Sphere>
        {/* Clouds Mesh layered slightly above Earth */}
        <Sphere ref={cloudsRef} args={[1.52, 64, 64]}>
          <meshPhongMaterial 
            map={cloudsMap}
            transparent={true}
            opacity={0.6}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </Sphere>
    </group>
  );
};

export default function ThreeGlobe() {
  return (
    <div style={{ width: '350px', height: '350px', margin: '0 auto', marginBottom: '-20px' }}>
      <Canvas camera={{ position: [0, 0, 4] }}>
        <ambientLight intensity={0.2} />
        <directionalLight position={[5, 3, 5]} intensity={1.5} />
        <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
        
        {/* Suspense is required when using useTexture to load images asynchronously */}
        <React.Suspense fallback={null}>
            <TexturedEarth />
        </React.Suspense>
        
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}
