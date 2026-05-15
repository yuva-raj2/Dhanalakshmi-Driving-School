import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  Environment,
  Float,
  useGLTF,
  OrbitControls
} from '@react-three/drei';
import * as THREE from 'three';

// PREMIUM VEHICLE WITH BETTER CONTRAST COLORS
const PlaceholderVehicle = () => {
  const mesh = useRef();

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y =
        state.clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <group ref={mesh} position={[0, -0.5, 0]} scale={2.2}>

      {/* Truck Body */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[2, 0.8, 1]} />
        <meshStandardMaterial
          color="#F97316" // ORANGE
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>

      {/* Cabin */}
      <mesh position={[-1.2, 0.8, 0]}>
        <boxGeometry args={[0.8, 0.6, 0.9]} />
        <meshStandardMaterial
          color="#E5E7EB" // SILVER
          metalness={1}
          roughness={0.15}
        />
      </mesh>

      {/* Wheels */}
      {[
        [-1.2, 0, 0.6],
        [-1.2, 0, -0.6],
        [1.2, 0, 0.6],
        [1.2, 0, -0.6]
      ].map((pos, i) => (
        <mesh
          key={i}
          position={pos}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
          <meshStandardMaterial
            color="#111827"
            roughness={1}
          />
        </mesh>
      ))}

      {/* Headlights */}
      <mesh position={[1, 0.3, 0.4]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial
          color="#67E8F9"
          emissive="#67E8F9"
          emissiveIntensity={2}
        />
      </mesh>

      <mesh position={[1, 0.3, -0.4]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial
          color="#67E8F9"
          emissive="#67E8F9"
          emissiveIntensity={2}
        />
      </mesh>

    </group>
  );
};

// LOADED MODEL
const VehicleModel = ({ url }) => {
  try {
    const { scene } = useGLTF(url, true);

    scene.traverse((child) => {
      if (child.isMesh && child.material) {

        // BODY COLOR
        child.material.color = new THREE.Color('#F97316');

        // METAL EFFECT
        child.material.metalness = 0.9;
        child.material.roughness = 0.2;

        // REMOVE BLUE EMISSIVE
        child.material.emissive = new THREE.Color('#000000');
        child.material.emissiveIntensity = 0;
      }
    });

    return (
      <primitive
        object={scene}
        scale={2.2}
        position={[0, -0.5, 0]}
      />
    );
  } catch {
    return <PlaceholderVehicle />;
  }
};

export function ThreeVehicle() {

  const lights = useMemo(() => ({
    ambient: 0.7,
    directional: {
      intensity: 2,
      position: [5, 5, 5]
    },
    spot: {
      intensity: 1.3,
      position: [-5, 3, 2]
    },
    fill: {
      intensity: 1,
      position: [0, 2, 5]
    }
  }), []);

  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{
        position: [4, 2, 5],
        fov: 45,
        near: 0.1,
        far: 100
      }}
      gl={{
        antialias: true,
        alpha: true
      }}
    >

      {/* MAIN LIGHT */}
      <ambientLight intensity={lights.ambient} />

      {/* DIRECTIONAL LIGHT */}
      <directionalLight
        position={lights.directional.position}
        intensity={lights.directional.intensity}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      {/* SPOT LIGHT */}
      <spotLight
        position={lights.spot.position}
        intensity={lights.spot.intensity}
        angle={0.3}
        penumbra={0.5}
      />

      {/* FILL LIGHT */}
      <pointLight
        position={lights.fill.position}
        intensity={lights.fill.intensity}
        color="#FFF5E1"
      />

      {/* FLOAT ANIMATION */}
      <Float
        speed={1.5}
        rotationIntensity={0.2}
        floatIntensity={0.3}
        floatingRange={[-0.1, 0.1]}
      >
        <Suspense fallback={null}>
          <VehicleModel url="/models/truck-compressed.glb" />
        </Suspense>
      </Float>

      {/* REFLECTION ENVIRONMENT */}
      <Environment
        preset="city"
        background={false}
      />

      {/* AUTO ROTATE CAMERA */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.4}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 2}
      />

    </Canvas>
  );
}

// PRELOAD MODEL
useGLTF.preload('/models/truck-compressed.glb');