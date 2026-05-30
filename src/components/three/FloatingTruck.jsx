import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Float,
  OrbitControls,
  RoundedBox,
  Cylinder,
} from "@react-three/drei";
import { Suspense, useRef } from "react";

function TruckModel() {
  const truckRef = useRef();

  useFrame((state) => {
    if (!truckRef.current) return;

    truckRef.current.rotation.y =
      state.clock.elapsedTime * 0.25;
  });

  return (
    <group ref={truckRef}>
      {/* Truck Body */}
      <RoundedBox
        args={[3.2, 1.1, 1.4]}
        radius={0.08}
        position={[0, 0, 0]}
      >
        <meshStandardMaterial
          color="#4F46E5"
          metalness={0.7}
          roughness={0.2}
        />
      </RoundedBox>

      {/* Cabin */}
      <RoundedBox
        args={[1.2, 1.1, 1.4]}
        radius={0.08}
        position={[-1.9, 0.25, 0]}
      >
        <meshStandardMaterial
          color="#7C3AED"
          metalness={0.7}
          roughness={0.2}
        />
      </RoundedBox>

      {/* Cargo Section */}
      <RoundedBox
        args={[2.2, 1.3, 1.5]}
        radius={0.05}
        position={[1.0, 0.15, 0]}
      >
        <meshStandardMaterial
          color="#111827"
          metalness={0.8}
          roughness={0.3}
        />
      </RoundedBox>

      {/* Wheel Front Left */}
      <Cylinder
        args={[0.35, 0.35, 0.3, 32]}
        rotation={[Math.PI / 2, 0, 0]}
        position={[-1.8, -0.7, 0.85]}
      >
        <meshStandardMaterial color="#000000" />
      </Cylinder>

      {/* Wheel Front Right */}
      <Cylinder
        args={[0.35, 0.35, 0.3, 32]}
        rotation={[Math.PI / 2, 0, 0]}
        position={[-1.8, -0.7, -0.85]}
      >
        <meshStandardMaterial color="#000000" />
      </Cylinder>

      {/* Wheel Rear Left */}
      <Cylinder
        args={[0.35, 0.35, 0.3, 32]}
        rotation={[Math.PI / 2, 0, 0]}
        position={[1.4, -0.7, 0.85]}
      >
        <meshStandardMaterial color="#000000" />
      </Cylinder>

      {/* Wheel Rear Right */}
      <Cylinder
        args={[0.35, 0.35, 0.3, 32]}
        rotation={[Math.PI / 2, 0, 0]}
        position={[1.4, -0.7, -0.85]}
      >
        <meshStandardMaterial color="#000000" />
      </Cylinder>

      {/* Headlights */}
      <mesh position={[-2.55, 0, 0.45]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial
          emissive="#ffffff"
          emissiveIntensity={2}
          color="#ffffff"
        />
      </mesh>

      <mesh position={[-2.55, 0, -0.45]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial
          emissive="#ffffff"
          emissiveIntensity={2}
          color="#ffffff"
        />
      </mesh>
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={1.5} />

      <directionalLight
        position={[5, 5, 5]}
        intensity={3}
      />

      <directionalLight
        position={[-5, 2, -5]}
        intensity={1}
      />

      <Float
        speed={2}
        rotationIntensity={0.3}
        floatIntensity={1}
      >
        <TruckModel />
      </Float>

      <Environment preset="city" />

      <OrbitControls
        enableZoom={false}
        autoRotate
        autoRotateSpeed={1}
      />
    </>
  );
}

export default function FloatingTruck() {
  return (
    <Canvas
      camera={{
        position: [0, 2, 7],
        fov: 45,
      }}
      dpr={[1, 2]}
      performance={{
        min: 0.5,
      }}
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}