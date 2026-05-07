import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { useTheme } from '../context/ThemeContext';
import Scene3D from './Scene3D';

function useGlitch(text, active) {
  const [display, setDisplay] = useState(text);
  const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@$%&<>/\\|{}[]';
  useEffect(() => {
    if (!active) { setDisplay(text); return; }
    let iter = 0;
    const iv = setInterval(() => {
      setDisplay(text.split('').map((c,i) => {
        if (c===' ') return ' ';
        if (i < iter) return text[i];
        return CHARS[Math.floor(Math.random()*CHARS.length)];
      }).join(''));
      if (iter >= text.length) { clearInterval(iv); setDisplay(text); }
      iter += 0.5;
    }, 30);
    return () => clearInterval(iv);
  }, [active, text]);
  return display;
}

function HackerText({ text, delay=0, style={} }) {
  const [active, setActive] = useState(false);
  const display = useGlitch(text, active);
  useEffect(() => { const t = setTimeout(()=>setActive(true), delay); return ()=>clearTimeout(t); }, [delay]);
  return <div style={style}>{display}</div>;
}

function StatItem({ n, label, delay, t }) {
  const [count,setCount] = useState(0);
  const end = parseInt(n.replace(/[^0-9]/g,''));
  const suffix = n.replace(/[0-9]/g,'');
  useEffect(()=>{
    const timer = setTimeout(()=>{
      let cur=0;
      const step=Math.ceil(end/40);
      const iv=setInterval(()=>{ cur=Math.min(cur+step,end); setCount(cur); if(cur>=end)clearInterval(iv); },40);
      return()=>clearInterval(iv);
    },delay);
    return()=>clearTimeout(timer);
  },[end,delay]);
  return (
    <div style={{textAlign:'center'}}>
      <div style={{fontFamily:"'Space Mono',monospace",fontSize:'clamp(18px,2.5vw,28px)',fontWeight:700,color:t.accent2,textShadow:`0 0 20px ${t.accent2}88`}}>
        {count}{suffix}
      </div>
      <div style={{fontSize:9,color:t.textMuted,letterSpacing:2,textTransform:'uppercase',fontFamily:"'Rajdhani',sans-serif",marginTop:4}}>{label}</div>
    </div>
  );
}

const TECH_BADGES = [
  {label:'C#',    color:'#7c6aff',pos:{top:'8%',   right:'-6%' }},
  {label:'React', color:'#00ffcc',pos:{bottom:'22%',left:'-8%' }},
  {label:'.NET',  color:'#ff6b6b',pos:{bottom:'6%', right:'2%' }},
  {label:'SQL',   color:'#ffd166',pos:{top:'40%',  left:'-10%' }},
  {label:'Azure', color:'#a78bfa',pos:{top:'65%',  right:'-12%'}},
];

const cV={hidden:{},visible:{transition:{staggerChildren:0.12,delayChildren:0.2}}};
const iV={hidden:{opacity:0,y:32},visible:{opacity:1,y:0,transition:{duration:0.7,ease:[0.22,1,0.36,1]}}};

export default function Hero() {
  const {t,isDark}=useTheme();
  const scrollTo=id=>document.getElementById(id)?.scrollIntoView({behavior:'smooth'});
  const mouseX=useMotionValue(0), mouseY=useMotionValue(0);
  const rotX=useSpring(mouseX,{stiffness:80,damping:20});
  const rotY=useSpring(mouseY,{stiffness:80,damping:20});
  const heroRef=useRef(null);
  const handleMouseMove=(e)=>{
    if(!heroRef.current)return;
    const r=heroRef.current.getBoundingClientRect();
    mouseX.set((e.clientY-r.top-r.height/2)/30);
    mouseY.set((e.clientX-r.left-r.width/2)/30);
  };

  return (
    <section id="home" style={{minHeight:'100vh',display:'flex',alignItems:'center',padding:'clamp(80px,10vh,120px) clamp(20px,8%,100px) clamp(40px,6vh,80px)',position:'relative',zIndex:1,overflow:'hidden'}}>
      <Scene3D style={{opacity:isDark?0.75:0.5}}/>
      <div style={{position:'absolute',inset:0,pointerEvents:'none',backgroundImage:`linear-gradient(${t.gridLine} 1px,transparent 1px),linear-gradient(90deg,${t.gridLine} 1px,transparent 1px)`,backgroundSize:'60px 60px'}}/>
      <div style={{position:'absolute',inset:0,pointerEvents:'none',background:isDark?'radial-gradient(ellipse 90% 70% at 50% 50%,transparent 20%,rgba(4,4,15,0.88) 100%)':'radial-gradient(ellipse 90% 70% at 50% 50%,transparent 20%,rgba(240,238,255,0.88) 100%)'}}/>
      <div style={{position:'absolute',inset:0,pointerEvents:'none',zIndex:0,backgroundImage:`repeating-linear-gradient(0deg,transparent,transparent 2px,${isDark?'rgba(0,0,0,0.06)':'rgba(91,77,224,0.03)'} 2px,${isDark?'rgba(0,0,0,0.06)':'rgba(91,77,224,0.03)'} 4px)`}}/>

      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,480px),1fr))',gap:'clamp(32px,5vw,60px)',alignItems:'center',width:'100%',maxWidth:1200,margin:'0 auto',position:'relative',zIndex:2}}>

        <motion.div variants={cV} initial="hidden" animate="visible">
          <motion.div variants={iV}>
            <motion.div animate={{boxShadow:[`0 0 0px ${t.accent2}00`,`0 0 20px ${t.accent2}55`,`0 0 0px ${t.accent2}00`]}} transition={{duration:2.5,repeat:Infinity}}
              style={{display:'inline-flex',alignItems:'center',gap:8,background:`${t.accent2}0e`,border:`1px solid ${t.accent2}40`,borderRadius:4,padding:'6px 14px',fontFamily:"'Space Mono',monospace",fontSize:10,color:t.accent2,letterSpacing:3,textTransform:'uppercase'}}>
              <motion.span animate={{opacity:[1,0,1]}} transition={{duration:1.2,repeat:Infinity}} style={{width:6,height:6,borderRadius:'50%',background:t.accent2,boxShadow:`0 0 8px ${t.accent2}`,display:'block'}}/>
              AVAILABLE_FOR_WORK.exe
            </motion.div>
          </motion.div>

          <motion.div variants={iV} style={{marginTop:20}}>
            <span style={{fontFamily:"'Space Mono',monospace",fontSize:11,color:t.textMuted,letterSpacing:3}}>
              <span style={{color:t.accent1}}>{'> '}</span>HELLO_WORLD.initialize()
            </span>
          </motion.div>

          <motion.div variants={iV} style={{marginTop:8,lineHeight:0.92}}>
            <HackerText text="ASHUTOSH" delay={600} style={{fontFamily:"'Rajdhani',sans-serif",fontSize:'clamp(44px,7vw,82px)',fontWeight:700,display:'block',background:t.heroName1,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',letterSpacing:2}}/>
            <HackerText text="KUMAR" delay={900} style={{fontFamily:"'Rajdhani',sans-serif",fontSize:'clamp(44px,7vw,82px)',fontWeight:700,display:'block',background:t.heroName2,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',letterSpacing:2}}/>
          </motion.div>

          <motion.div variants={iV} style={{marginTop:14,marginBottom:20}}>
            <div style={{fontFamily:"'Space Mono',monospace",fontSize:'clamp(10px,1.3vw,13px)',color:t.textSecondary,display:'flex',alignItems:'center',gap:6,flexWrap:'wrap'}}>
              <span style={{color:t.accent1}}>{'$ role='}</span>
              <span style={{color:t.accent2}}>
                <TypeAnimation sequence={['"Full-Stack .NET Developer"',2200,'"React.js Architect"',1800,'"Enterprise App Builder"',1800,'"Clean Code Advocate"',1800,'"Azure Cloud Engineer"',1800]} wrapper="span" repeat={Infinity}/>
              </span>
              <motion.span animate={{opacity:[1,0,1]}} transition={{duration:0.8,repeat:Infinity}} style={{color:t.accent2}}>█</motion.span>
            </div>
          </motion.div>

          <motion.div variants={iV} style={{fontFamily:"'Space Mono',monospace",fontSize:'clamp(9px,1.1vw,11px)',color:t.textSecondary,lineHeight:1.9,maxWidth:500,marginBottom:32,padding:'16px 20px',background:isDark?'rgba(0,255,204,0.04)':'rgba(91,77,224,0.04)',border:`1px solid ${t.accent2}20`,borderLeft:`3px solid ${t.accent2}`,borderRadius:'0 8px 8px 0'}}>
            <span style={{color:t.accent1}}>{'// '}</span>
            3+ years crafting enterprise-grade applications using Microsoft's .NET ecosystem and React.js. Based in <span style={{color:t.accent4}}>Ahmedabad, India</span>.
          </motion.div>

          <motion.div variants={iV} style={{display:'flex',gap:14,flexWrap:'wrap'}}>
            <GlowBtn t={t} isDark={isDark} onClick={()=>scrollTo('projects')}><span style={{fontFamily:"'Space Mono',monospace",fontSize:'clamp(9px,1.1vw,12px)'}}>./view_projects.sh →</span></GlowBtn>
            <OutlineBtn t={t} onClick={()=>scrollTo('contact')}><span style={{fontFamily:"'Space Mono',monospace",fontSize:'clamp(9px,1.1vw,12px)'}}>ssh contact@ak.dev</span></OutlineBtn>
          </motion.div>

          <motion.div variants={iV} style={{display:'flex',gap:'clamp(16px,4vw,48px)',marginTop:44,padding:'18px 22px',background:isDark?'rgba(255,255,255,0.02)':'rgba(91,77,224,0.04)',border:`1px solid ${t.border}`,borderRadius:6,flexWrap:'wrap'}}>
            {[['3+','Years Exp',800],['10+','Projects',1000],['3','Companies',1200],['15+','Technologies',1400]].map(([n,label,d])=>(
              <StatItem key={label} n={n} label={label} delay={d} t={t}/>
            ))}
          </motion.div>
        </motion.div>

        <motion.div initial={{opacity:0,scale:0.85}} animate={{opacity:1,scale:1}} transition={{duration:1,ease:[0.22,1,0.36,1],delay:0.4}}
          style={{display:'flex',justifyContent:'center',alignItems:'center'}}
          ref={heroRef} onMouseMove={handleMouseMove} onMouseLeave={()=>{mouseX.set(0);mouseY.set(0);}}>
          <AvatarOrb t={t} isDark={isDark} rotX={rotX} rotY={rotY}/>
        </motion.div>
      </div>

      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:3}}
        style={{position:'absolute',bottom:28,left:'50%',transform:'translateX(-50%)',display:'flex',flexDirection:'column',alignItems:'center',gap:6}}>
        <span style={{fontFamily:"'Space Mono',monospace",fontSize:9,color:t.textMuted,letterSpacing:3}}>SCROLL_DOWN</span>
        <motion.div animate={{y:[0,10,0]}} transition={{duration:1.4,repeat:Infinity}} style={{width:1,height:32,background:`linear-gradient(180deg,${t.accent1},transparent)`}}/>
      </motion.div>
    </section>
  );
}

function AvatarOrb({t,isDark,rotX,rotY}) {
  const [tick,setTick]=useState(0);
  useEffect(()=>{ const iv=setInterval(()=>setTick(c=>c+1),80); return()=>clearInterval(iv); },[]);
  const CODES=['01001010','11000101','NET_CORE','REACT.JS','AZURE_☁️','C#_8.0.0','SQL_2022','EF_CORE6'];
  return (
    <motion.div animate={{y:[0,-12,0]}} transition={{duration:4,repeat:Infinity,ease:'easeInOut'}}
      style={{position:'relative',width:'clamp(260px,30vw,340px)',height:'clamp(260px,30vw,340px)'}}>
      <motion.div animate={{rotate:360}} transition={{duration:14,repeat:Infinity,ease:'linear'}} style={{position:'absolute',inset:-22,borderRadius:'50%',border:`1.5px dashed ${t.accent1}33`}}/>
      <motion.div animate={{rotate:-360}} transition={{duration:18,repeat:Infinity,ease:'linear'}} style={{position:'absolute',inset:-8,borderRadius:'50%',border:'1px solid transparent',background:`linear-gradient(${isDark?'#04040f':'#f0eeff'},${isDark?'#04040f':'#f0eeff'}) padding-box, linear-gradient(45deg,${t.accent1},${t.accent2},${t.accent3},${t.accent1}) border-box`}}/>
      <motion.div animate={{opacity:[0.3,0.8,0.3],scale:[1,1.05,1]}} transition={{duration:3,repeat:Infinity}} style={{position:'absolute',inset:-40,borderRadius:'50%',background:`radial-gradient(circle,${t.accent1}1a 0%,transparent 70%)`,pointerEvents:'none'}}/>
      <motion.div style={{rotateX:rotX,rotateY:rotY,width:'100%',height:'100%',transformStyle:'preserve-3d'}}>
        <div style={{width:'100%',height:'100%',borderRadius:'50%',background:t.avatarBg,border:`2px solid ${t.avatarBorder}`,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',overflow:'hidden',position:'relative',boxShadow:`0 0 60px ${t.accent1}22,inset 0 0 40px ${t.accent1}10`}}>
          <div style={{position:'absolute',inset:0,backgroundImage:`repeating-linear-gradient(0deg,${t.avatarGrid} 0px,${t.avatarGrid} 1px,transparent 1px,transparent 24px),repeating-linear-gradient(90deg,${t.avatarGrid} 0px,${t.avatarGrid} 1px,transparent 1px,transparent 24px)`}}/>
          <motion.div animate={{textShadow:[`0 0 20px ${t.accent1}99`,`0 0 45px ${t.accent2}bb`,`0 0 20px ${t.accent1}99`]}} transition={{duration:2.5,repeat:Infinity}}
            style={{fontFamily:"'Rajdhani',sans-serif",fontSize:'clamp(60px,8vw,86px)',fontWeight:700,lineHeight:1,background:`linear-gradient(135deg,${t.accent1} 0%,${t.accent2} 100%)`,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',position:'relative',zIndex:1}}>AK</motion.div>
          <motion.div key={tick} initial={{opacity:0,y:4}} animate={{opacity:1,y:0}} transition={{duration:0.15}}
            style={{fontFamily:"'Space Mono',monospace",fontSize:9,color:t.accent2,position:'relative',zIndex:1,marginTop:4,letterSpacing:2}}>
            {CODES[tick%CODES.length]}
          </motion.div>
          {[{top:12,left:12,borderTop:`2px solid ${t.accent1}66`,borderLeft:`2px solid ${t.accent1}66`},{top:12,right:12,borderTop:`2px solid ${t.accent1}66`,borderRight:`2px solid ${t.accent1}66`},{bottom:12,left:12,borderBottom:`2px solid ${t.accent2}66`,borderLeft:`2px solid ${t.accent2}66`},{bottom:12,right:12,borderBottom:`2px solid ${t.accent2}66`,borderRight:`2px solid ${t.accent2}66`}].map((s,i)=>(
            <div key={i} style={{position:'absolute',width:16,height:16,...s}}/>
          ))}
        </div>
      </motion.div>
      {TECH_BADGES.map(({label,color,pos},i)=>(
        <motion.div key={label} animate={{y:[0,-8,0]}} transition={{duration:2.5+i*0.4,repeat:Infinity,ease:'easeInOut',delay:i*0.35}}
          style={{position:'absolute',...pos,background:isDark?'rgba(4,4,15,0.9)':'rgba(240,238,255,0.9)',border:`1px solid ${color}66`,borderRadius:4,padding:'5px 12px',zIndex:2,fontFamily:"'Space Mono',monospace",fontSize:11,color,boxShadow:`0 0 16px ${color}44,0 0 4px ${color}66`,backdropFilter:'blur(8px)',whiteSpace:'nowrap'}}>
          <span style={{opacity:0.6,marginRight:4}}>{'>'}</span>{label}
        </motion.div>
      ))}
    </motion.div>
  );
}

export function GlowBtn({children,onClick,t,isDark}) {
  const [hov,setHov]=useState(false);
  return (
    <motion.button whileHover={{scale:1.03}} whileTap={{scale:0.97}}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} onClick={onClick}
      style={{padding:'clamp(10px,1.5vw,14px) clamp(20px,3vw,32px)',background:`linear-gradient(135deg,${t.accent1} 0%,${isDark?'#5e4fd0':'#4a3ab8'} 100%)`,border:'none',borderRadius:4,color:'#fff',fontFamily:"'Space Mono',monospace",fontSize:'clamp(9px,1.1vw,12px)',fontWeight:700,letterSpacing:1,cursor:'none',position:'relative',overflow:'hidden',boxShadow:hov?`0 8px 36px ${t.accent1}66,0 0 0 1px ${t.accent1}`:`0 4px 16px ${t.accent1}33`,transition:'box-shadow 0.3s'}}>
      {hov&&<motion.div initial={{x:'-100%'}} animate={{x:'200%'}} transition={{duration:0.5}} style={{position:'absolute',inset:0,background:'linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent)'}}/>}
      {children}
    </motion.button>
  );
}

export function OutlineBtn({children,onClick,t}) {
  return (
    <motion.button whileHover={{background:`${t.accent2}10`,boxShadow:`0 0 24px ${t.accent2}33`}} whileTap={{scale:0.97}} onClick={onClick}
      style={{padding:'clamp(10px,1.5vw,14px) clamp(20px,3vw,32px)',background:'transparent',border:`1px solid ${t.accent2}66`,borderRadius:4,color:t.accent2,fontFamily:"'Space Mono',monospace",fontSize:'clamp(9px,1.1vw,12px)',fontWeight:700,letterSpacing:1,cursor:'none',transition:'all 0.3s'}}>
      {children}
    </motion.button>
  );
}