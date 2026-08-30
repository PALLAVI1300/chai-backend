import { Canvas, useFrame } from '@react-three/fiber';

import {
  Environment,
  Float,
  MeshTransmissionMaterial,
  Line,
  OrbitControls
} from '@react-three/drei';

import { useMemo, useRef } from 'react';
import * as THREE from 'three';


/* =========================================================
   DNA CONFIGURATION
========================================================= */

const DNA_HEIGHT = 4.8;
const DNA_TURNS = 2.2;
const DNA_POINTS = 26;
const DNA_RADIUS = 0.9;


/* =========================================================
   BOND BETWEEN TWO POINTS
========================================================= */

function Bond({
  start,
  end,
  color = '#38bdf8',
  thickness = 0.025
}) {

  const { position, quaternion, length } = useMemo(() => {

    const startVector = new THREE.Vector3(...start);
    const endVector = new THREE.Vector3(...end);

    const direction = new THREE.Vector3()
      .subVectors(endVector, startVector);

    const length = direction.length();

    const midpoint = new THREE.Vector3()
      .addVectors(startVector, endVector)
      .multiplyScalar(0.5);

    const quaternion = new THREE.Quaternion();

    quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.normalize()
    );

    return {
      position: midpoint,
      quaternion,
      length
    };

  }, [start, end]);


  return (

    <mesh
      position={position}
      quaternion={quaternion}
    >

      <cylinderGeometry
        args={[thickness, thickness, length, 8]}
      />

      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.7}
      />

    </mesh>

  );
}


/* =========================================================
   DNA HELIX
========================================================= */

function DNAHelix() {

  const groupRef = useRef();


  const dna = useMemo(() => {

    const strandA = [];
    const strandB = [];
    const basePairs = [];


    for (let i = 0; i < DNA_POINTS; i++) {

      const t =
        i / (DNA_POINTS - 1);

      const y =
        (t - 0.5) * DNA_HEIGHT;

      const angle =
        t * Math.PI * 2 * DNA_TURNS;


      const x1 =
        Math.cos(angle) * DNA_RADIUS;

      const z1 =
        Math.sin(angle) * DNA_RADIUS;


      const x2 =
        Math.cos(angle + Math.PI) * DNA_RADIUS;

      const z2 =
        Math.sin(angle + Math.PI) * DNA_RADIUS;


      strandA.push([
        x1,
        y,
        z1
      ]);


      strandB.push([
        x2,
        y,
        z2
      ]);


      basePairs.push({
        a: [x1, y, z1],
        b: [x2, y, z2]
      });

    }


    return {
      strandA,
      strandB,
      basePairs
    };

  }, []);


  /* =====================================================
     DNA ANIMATION
  ===================================================== */

  useFrame((state) => {

    if (!groupRef.current) return;

    const t =
      state.clock.getElapsedTime();


    groupRef.current.rotation.y =
      t * 0.18;


    groupRef.current.rotation.x =
      Math.sin(t * 0.35) * 0.08;


    /*
      Slightly lower than center.
      This prevents the upper DNA from
      feeling cramped against the header.
    */

    groupRef.current.position.y =
      -0.08 +
      Math.sin(t * 0.6) * 0.08;

  });


  return (

    <group
      ref={groupRef}
      scale={1.10}
    >


      {/* =================================================
          STRAND A
      ================================================= */}

      {dna.strandA.map((point, index) => (

        <mesh
          key={`a-${index}`}
          position={point}
        >

          <sphereGeometry
            args={[0.11, 24, 24]}
          />

          <meshStandardMaterial
            color="#67e8f9"
            emissive="#06b6d4"
            emissiveIntensity={1.35}
            roughness={0.22}
            metalness={0.35}
          />

        </mesh>

      ))}


      {/* =================================================
          STRAND B
      ================================================= */}

      {dna.strandB.map((point, index) => (

        <mesh
          key={`b-${index}`}
          position={point}
        >

          <sphereGeometry
            args={[0.11, 24, 24]}
          />

          <meshStandardMaterial
            color="#818cf8"
            emissive="#4f46e5"
            emissiveIntensity={1.25}
            roughness={0.22}
            metalness={0.35}
          />

        </mesh>

      ))}


      {/* =================================================
          BASE PAIRS
      ================================================= */}

      {dna.basePairs.map((pair, index) => (

        <Bond
          key={`bond-${index}`}
          start={pair.a}
          end={pair.b}
          color={
            index % 2 === 0
              ? '#67e8f9'
              : '#818cf8'
          }
          thickness={0.035}
        />

      ))}


      {/* =================================================
          STRAND LINES
      ================================================= */}

      <Line
        points={dna.strandA}
        color="#22d3ee"
        transparent
        opacity={0.65}
        lineWidth={1}
      />


      <Line
        points={dna.strandB}
        color="#6366f1"
        transparent
        opacity={0.65}
        lineWidth={1}
      />


      {/* =================================================
          CENTRAL TRANSMISSION GLOW
      ================================================= */}

      <mesh>

        <sphereGeometry
          args={[0.9, 48, 48]}
        />

        <MeshTransmissionMaterial
          transmission={1}
          thickness={0.4}
          roughness={0.05}
          chromaticAberration={0.08}
          distortion={0.2}
          distortionScale={0.3}
          color="#0ea5e9"
          transparent
          opacity={0.055}
        />

      </mesh>

    </group>

  );
}


/* =========================================================
   MOLECULAR PARTICLES
========================================================= */

function MolecularParticles() {

  const pointsRef = useRef();


  const particles = useMemo(() => {

    const count = 220;

    const positions =
      new Float32Array(count * 3);


    for (let i = 0; i < count; i++) {

      const radius =
        2.4 + Math.random() * 2.2;

      const theta =
        Math.random() * Math.PI * 2;

      const phi =
        Math.acos(
          2 * Math.random() - 1
        );


      positions[i * 3] =
        radius *
        Math.sin(phi) *
        Math.cos(theta);


      positions[i * 3 + 1] =
        radius *
        Math.sin(phi) *
        Math.sin(theta);


      positions[i * 3 + 2] =
        radius *
        Math.cos(phi);

    }


    return positions;

  }, []);


  useFrame((state) => {

    if (!pointsRef.current) return;

    const t =
      state.clock.getElapsedTime();


    pointsRef.current.rotation.y =
      t * 0.025;


    pointsRef.current.rotation.x =
      Math.sin(t * 0.15) * 0.05;

  });


  return (

    <points ref={pointsRef}>

      <bufferGeometry>

        <bufferAttribute
          attach="attributes-position"
          array={particles}
          count={particles.length / 3}
          itemSize={3}
        />

      </bufferGeometry>


      <pointsMaterial
        size={0.032}
        color="#38bdf8"
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />

    </points>

  );
}


/* =========================================================
   ORBITAL RINGS
========================================================= */

function OrbitalRings() {

  const groupRef = useRef();


  useFrame((state) => {

    if (!groupRef.current) return;

    const t =
      state.clock.getElapsedTime();


    groupRef.current.rotation.y =
      t * 0.08;


    groupRef.current.rotation.z =
      Math.sin(t * 0.2) * 0.15;

  });


  return (

    <group ref={groupRef}>

      <mesh
        rotation={[
          Math.PI / 2,
          0,
          0
        ]}
      >

        <torusGeometry
          args={[
            2.2,
            0.008,
            8,
            128
          ]}
        />

        <meshBasicMaterial
          color="#22d3ee"
          transparent
          opacity={0.25}
        />

      </mesh>


      <mesh
        rotation={[
          0.7,
          0.3,
          0
        ]}
      >

        <torusGeometry
          args={[
            2.5,
            0.006,
            8,
            128
          ]}
        />

        <meshBasicMaterial
          color="#6366f1"
          transparent
          opacity={0.22}
        />

      </mesh>


      <mesh
        rotation={[
          1.2,
          -0.5,
          0.5
        ]}
      >

        <torusGeometry
          args={[
            2.8,
            0.004,
            8,
            128
          ]}
        />

        <meshBasicMaterial
          color="#06b6d4"
          transparent
          opacity={0.16}
        />

      </mesh>

    </group>

  );
}


/* =========================================================
   MAIN BIOLOGICAL SCENE
========================================================= */

export default function BioScene() {

  return (

    <div
      className="
        relative
        w-full
        h-full
        min-h-[50vh]
        lg:min-h-[70vh]
      "
    >

      <Canvas

        camera={{
          position: [0, 0, 8.0],
          fov: 44
        }}

        dpr={[1, 2]}
      >


        {/* =================================================
            LIGHTING
        ================================================= */}

        <ambientLight
          intensity={0.35}
        />


        <pointLight
          position={[4, 5, 6]}
          intensity={5}
          color="#22d3ee"
        />


        <pointLight
          position={[-5, -2, -4]}
          intensity={3}
          color="#4f46e5"
        />


        <pointLight
          position={[0, 3, 2]}
          intensity={2}
          color="#a855f7"
        />


        {/* =================================================
            DNA
        ================================================= */}

        <Float
          speed={1}
          rotationIntensity={0.12}
          floatIntensity={0.25}
        >

          <DNAHelix />

        </Float>


        {/* =================================================
            ENVIRONMENT
        ================================================= */}

        <MolecularParticles />

        <OrbitalRings />


        <Environment
          preset="night"
        />


        {/* =================================================
            SUBTLE INTERACTION
        ================================================= */}

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          minPolarAngle={Math.PI / 2.4}
          maxPolarAngle={Math.PI / 1.8}
        />

      </Canvas>

    </div>

  );
}