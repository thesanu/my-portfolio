import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, Stars, Torus } from '@react-three/drei';
import { useTheme } from '../context/ThemeContext';

function DistortedSphere({ isDark }) {
  const meshRef = useRef();
  const mat     = useRef();
  useFrame(({ clock: { elapsedTime: t } }) => {
    if (meshRef.current) { meshRef.current.rotation.x = t*0.12; meshRef.current.rotation.y = t*0.18; }
    if (mat.current) {
      const tgt = isDark ? [0.486,0.416,1] : [0.357,0.302,0.878];
      mat.current.color.r += (tgt[0]-mat.current.color.r)*0.05;
      mat.current.color.g += (tgt[1]-mat.current.color.g)*0.05;
      mat.current.color.b += (tgt[2]-mat.current.color.b)*0.05;
    }
  });
  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={1.2}>
      <Sphere ref={meshRef} args={[1.2,64,64]}>
        <MeshDistortMaterial ref={mat} color={isDark?'#7c6aff':'#5b4de0'}
          emissive={isDark?'#3a2fff':'#4a3ab8'} emissiveIntensity={0.4}
          distort={0.45} speed={2.5} roughness={0.1} metalness={0.8} transparent opacity={0.88} />
      </Sphere>
    </Float>
  );
}

function OrbitingRings({ isDark }) {
  const r1=useRef(), r2=useRef(), r3=useRef();
  useFrame(({ clock: { elapsedTime: t } }) => {
    if(r1.current){r1.current.rotation.x=t*0.6; r1.current.rotation.y=t*0.3;}
    if(r2.current){r2.current.rotation.x=-t*0.4; r2.current.rotation.z=t*0.5;}
    if(r3.current){r3.current.rotation.y=t*0.7; r3.current.rotation.z=-t*0.2;}
  });
  return (<>
    <Torus ref={r1} args={[2.2,0.012,16,120]}><meshBasicMaterial color={isDark?'#7c6aff':'#5b4de0'} transparent opacity={0.55}/></Torus>
    <Torus ref={r2} args={[2.8,0.008,16,120]}><meshBasicMaterial color={isDark?'#00ffcc':'#00a87a'} transparent opacity={0.4}/></Torus>
    <Torus ref={r3} args={[3.4,0.005,16,120]}><meshBasicMaterial color={isDark?'#ff6b6b':'#d63078'} transparent opacity={0.3}/></Torus>
  </>);
}

function FloatingCubes({ isDark }) {
  const cubes = useMemo(() => Array.from({length:14},(_,i)=>({
    pos:[(Math.random()-0.5)*10,(Math.random()-0.5)*10,(Math.random()-0.5)*8-2],
    rot:[Math.random()*Math.PI,Math.random()*Math.PI,Math.random()*Math.PI],
    scale:Math.random()*0.12+0.04, speed:Math.random()*0.4+0.2,
    phase:Math.random()*Math.PI*2,
    color:['#7c6aff','#00ffcc','#ff6b6b','#ffd166','#a78bfa'][i%5],
  })),[]);
  const refs = useRef(cubes.map(()=>null));
  useFrame(({clock:{elapsedTime:t}})=>{
    refs.current.forEach((m,i)=>{
      if(!m)return;
      m.rotation.x=t*cubes[i].speed*0.5; m.rotation.y=t*cubes[i].speed;
      m.position.y=cubes[i].pos[1]+Math.sin(t*0.5+cubes[i].phase)*0.4;
    });
  });
  return (<>{cubes.map((c,i)=>(
    <mesh key={i} ref={el=>{refs.current[i]=el;}} position={c.pos} rotation={c.rot} scale={c.scale}>
      <boxGeometry args={[1,1,1]}/>
      <meshStandardMaterial color={c.color} emissive={c.color} emissiveIntensity={isDark?0.5:0.25} metalness={0.8} roughness={0.2} transparent opacity={0.75}/>
    </mesh>
  ))}</>);
}

function ParticleField({ isDark }) {
  const pts=useRef();
  const count=800;
  const positions=useMemo(()=>{
    const a=new Float32Array(count*3);
    for(let i=0;i<count;i++){a[i*3]=(Math.random()-0.5)*20;a[i*3+1]=(Math.random()-0.5)*20;a[i*3+2]=(Math.random()-0.5)*12-4;}
    return a;
  },[]);
  useFrame(({clock:{elapsedTime:t}})=>{
    if(pts.current){pts.current.rotation.y=t*0.03;pts.current.rotation.x=Math.sin(t*0.015)*0.1;}
  });
  return (
    <points ref={pts}>
      <bufferGeometry><bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3}/></bufferGeometry>
      <pointsMaterial color={isDark?'#7c6aff':'#5b4de0'} size={0.035} transparent opacity={isDark?0.65:0.45} sizeAttenuation/>
    </points>
  );
}

function SceneLights({ isDark }) {
  const al=useRef();
  useFrame(()=>{ if(al.current){const t=isDark?0.3:0.6; al.current.intensity+=(t-al.current.intensity)*0.05;} });
  return (<>
    <ambientLight ref={al} intensity={isDark?0.3:0.6}/>
    <pointLight position={[4,4,4]} intensity={isDark?1.5:1} color={isDark?'#7c6aff':'#5b4de0'}/>
    <pointLight position={[-4,-2,2]} intensity={isDark?0.8:0.6} color={isDark?'#00ffcc':'#00a87a'}/>
    <pointLight position={[0,-4,-2]} intensity={0.4} color={isDark?'#ff6b6b':'#d63078'}/>
  </>);
}

export default function Scene3D({ style={} }) {
  const { isDark } = useTheme();
  return (
    <div style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none', ...style }}>
      <Canvas camera={{position:[0,0,6],fov:60}} gl={{antialias:true,alpha:true,powerPreference:'high-performance'}} style={{background:'transparent'}}>
        <SceneLights isDark={isDark}/>
        <Stars radius={40} depth={30} count={isDark?1200:600} factor={isDark?3:2} saturation={isDark?1:0.2} fade speed={0.8}/>
        <DistortedSphere isDark={isDark}/>
        <OrbitingRings isDark={isDark}/>
        <FloatingCubes isDark={isDark}/>
        <ParticleField isDark={isDark}/>
      </Canvas>
    </div>
  );
}