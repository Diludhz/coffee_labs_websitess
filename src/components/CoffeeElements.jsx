import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';

// Coffee Cup Model
function CoffeeCup() {
  const cupRef = useRef();
  
  useFrame((state) => {
    if (cupRef.current) {
      cupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={cupRef} position={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[1, 0.8, 1.5, 32]} />
        <meshStandardMaterial 
          color="#6F4E37" 
          roughness={0.3}
          metalness={0.2}
        />
        {/* Coffee inside */}
        <mesh position={[0, 0.25, 0]}>
          <cylinderGeometry args={[0.9, 0.7, 0.5, 32]} />
          <meshStandardMaterial color="#4B3621" />
        </mesh>
        {/* Steam */}
        <mesh position={[0, 1.2, 0]}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshStandardMaterial color="white" transparent opacity={0.6} />
        </mesh>
      </mesh>
    </Float>
  );
}

// Coffee Bean
function CoffeeBean({ position }) {
  const ref = useRef();
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.5;
      ref.current.rotation.z = Math.cos(state.clock.getElapsedTime() * 0.3) * 0.5;
    }
  });

  return (
    <group position={position}>
      <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh ref={ref} castShadow>
          <sphereGeometry args={[0.2, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
          <meshStandardMaterial color="#3E2723" roughness={0.3} metalness={0.1} />
        </mesh>
      </Float>
    </group>
  );
}

// Coffee Machine (simplified)
function CoffeeMachine() {
  const ref = useRef();
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
    }
  });

  return (
    <group position={[3, -1, -2]} ref={ref}>
      <Float speed={1} rotationIntensity={0.3} floatIntensity={0.2}>
        <mesh castShadow>
          <boxGeometry args={[2, 1.5, 1]} />
          <meshStandardMaterial 
            color="#E0E0E0" 
            metalness={0.7}
            roughness={0.2}
          />
        </mesh>
        {/* Machine details */}
        <mesh position={[0, 0.5, 0.51]}>
          <planeGeometry args={[1.8, 0.8]} />
          <meshStandardMaterial color="#212121" />
        </mesh>
      </Float>
    </group>
  );
}

// Syrup Bottle
function SyrupBottle({ position, color }) {
  return (
    <group position={position}>
      <Float speed={1} rotationIntensity={0.5} floatIntensity={0.3}>
        <mesh castShadow>
          <cylinderGeometry args={[0.3, 0.4, 1, 16]} />
          <meshStandardMaterial 
            color={color} 
            transparent 
            opacity={0.8}
            metalness={0.1}
            roughness={0.3}
          />
        </mesh>
        <mesh position={[0, 0.6, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.3, 16]} />
          <meshStandardMaterial color="#E0E0E0" />
        </mesh>
      </Float>
    </group>
  );
}

// Main 3D Scene
function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      
      <CoffeeCup />
      <CoffeeMachine />
      <SyrupBottle position={[-2, 0, -1]} color="#E91E63" />
      <SyrupBottle position={[-2.5, 0.5, -0.5]} color="#4CAF50" />
      
      {[...Array(10)].map((_, i) => (
        <CoffeeBean 
          key={i}
          position={[
            Math.sin(i) * 3,
            Math.random() * 2 - 1,
            Math.cos(i) * 3 - 3
          ]}
        />
      ))}
      
      <Environment preset="city" />
    </>
  );
}

// Main Component
export default function CoffeeElements() {
  return (
    <div className="coffee-3d-scene">
      <Canvas
        shadows
        camera={{ position: [0, 2, 5], fov: 50 }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          pointerEvents: 'none'
        }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
