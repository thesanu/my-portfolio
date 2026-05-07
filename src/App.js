import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact, { Footer } from './components/Contact';
import ParticleCanvas from './components/ParticleCanvas';

function Loader({ onDone }) {
  const { t, isDark } = useTheme();
  const [progress, setProgress] = useState(0);
  const [line, setLine] = useState(0);
  const BOOT = [
    'Initializing portfolio kernel...',
    'Loading .NET Core modules...',
    'Mounting React components...',
    'Connecting to Azure Cloud...',
    'Compiling hacker animations...',
    'System ready. Welcome.',
  ];
  useEffect(() => {
    const lt = setInterval(() => setLine(l => Math.min(l+1, BOOT.length-1)), 280);
    const pt = setInterval(() => {
      setProgress(p => {
        const next = Math.min(p + Math.random()*10+3, 100);
        if (next >= 100) { clearInterval(pt); clearInterval(lt); setTimeout(onDone, 500); }
        return next;
      });
    }, 80);
    return () => { clearInterval(lt); clearInterval(pt); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onDone]);

  return (
    <motion.div exit={{opacity:0,scale:1.03}} transition={{duration:0.6,ease:[0.22,1,0.36,1]}}
      style={{position:'fixed',inset:0,background:t.loaderBg,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',zIndex:99999,fontFamily:"'Space Mono',monospace"}}>
      <div style={{position:'absolute',inset:0,pointerEvents:'none',backgroundImage:`linear-gradient(${t.gridLine} 1px,transparent 1px),linear-gradient(90deg,${t.gridLine} 1px,transparent 1px)`,backgroundSize:'50px 50px'}}/>
      <motion.div animate={{y:['-100vh','100vh']}} transition={{duration:3,repeat:Infinity,ease:'linear'}}
        style={{position:'absolute',left:0,right:0,height:2,background:`linear-gradient(90deg,transparent,${t.accent2}44,transparent)`,pointerEvents:'none'}}/>
      <motion.div animate={{rotate:360}} transition={{duration:3,repeat:Infinity,ease:'linear'}}
        style={{width:90,height:90,borderRadius:'50%',marginBottom:40,border:'2px solid transparent',background:`linear-gradient(${t.loaderBg},${t.loaderBg}) padding-box,linear-gradient(45deg,${t.accent1},${t.accent2},${t.accent3}) border-box`,display:'flex',alignItems:'center',justifyContent:'center',boxShadow:`0 0 30px ${t.accent1}33`}}>
        <motion.span animate={{textShadow:[`0 0 10px ${t.accent1}`,`0 0 30px ${t.accent2}`,`0 0 10px ${t.accent1}`]}} transition={{duration:1.5,repeat:Infinity}}
          style={{fontFamily:"'Rajdhani',sans-serif",fontSize:24,fontWeight:700,background:`linear-gradient(135deg,${t.accent1},${t.accent2})`,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>AK</motion.span>
      </motion.div>
      <div style={{marginBottom:32,width:'min(360px,85vw)',minHeight:120}}>
        {BOOT.slice(0,line+1).map((l,i)=>(
          <motion.div key={i} initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}}
            style={{fontSize:11,color:i===line?t.accent2:t.textMuted,marginBottom:4,display:'flex',gap:8}}>
            <span style={{color:t.accent1}}>{'>'}</span>{l}
            {i===line&&<motion.span animate={{opacity:[1,0,1]}} transition={{duration:0.6,repeat:Infinity}} style={{color:t.accent2}}>█</motion.span>}
          </motion.div>
        ))}
      </div>
      <div style={{width:'min(300px,80vw)',marginBottom:12}}>
        <div style={{display:'flex',justifyContent:'space-between',marginBottom:6,fontSize:9,color:t.textMuted,letterSpacing:2}}>
          <span>LOADING</span><span style={{color:t.accent2}}>{Math.floor(Math.min(progress,100))}%</span>
        </div>
        <div style={{height:2,background:t.border,borderRadius:99,overflow:'hidden'}}>
          <div style={{height:'100%',borderRadius:99,background:`linear-gradient(90deg,${t.accent1},${t.accent2})`,width:`${Math.min(progress,100)}%`,boxShadow:`0 0 12px ${t.accent2}`,transition:'width 0.1s'}}/>
        </div>
        <div style={{display:'flex',gap:2,marginTop:6}}>
          {Array.from({length:20},(_,i)=>(
            <div key={i} style={{flex:1,height:3,borderRadius:1,background:progress/5>i?(isDark?`${t.accent2}cc`:`${t.accent1}cc`):t.border,transition:'background 0.1s'}}/>
          ))}
        </div>
      </div>
      <div style={{fontSize:9,color:t.textMuted,letterSpacing:3}}>ASHUTOSH_KUMAR.EXE</div>
    </motion.div>
  );
}

function PortfolioApp() {
  const { t, isDark } = useTheme();
  const [loading, setLoading]   = useState(true);
  const [activeNav, setActiveNav] = useState('Home');

  useEffect(() => {
    if (loading) return;
    const ids = ['home','about','skills','experience','projects','contact'];
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) setActiveNav(e.target.id[0].toUpperCase()+e.target.id.slice(1));
      }),
      { threshold:0.4 }
    );
    ids.forEach(id => { const el=document.getElementById(id); if(el)obs.observe(el); });
    return () => obs.disconnect();
  }, [loading]);

  return (
    <>
      <div className="desktop-cursor"><CustomCursor/></div>
      <AnimatePresence>
        {loading && <Loader key="loader" onDone={()=>setLoading(false)}/>}
      </AnimatePresence>
      {!loading && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.5}}>
          <ParticleCanvas/>
          <div style={{position:'fixed',inset:0,zIndex:0,pointerEvents:'none',opacity:isDark?0.025:0.012,backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,backgroundRepeat:'repeat',backgroundSize:'200px'}}/>
          <style>{`
            *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
            html{scroll-behavior:smooth;}
            *{cursor:none!important;}
            body{background:${t.bg};color:${t.text};transition:background 0.5s,color 0.5s;}
            ::-webkit-scrollbar{width:4px;}
            ::-webkit-scrollbar-track{background:transparent;}
            ::-webkit-scrollbar-thumb{background:linear-gradient(${t.accent1},${t.accent2});border-radius:99px;}
            input::placeholder,textarea::placeholder{color:${t.textMuted};}
            .desktop-cursor{display:block;}
            @media(max-width:768px){
              *{cursor:auto!important;}
              .desktop-cursor{display:none!important;}
            }
          `}</style>
          <Navbar active={activeNav} onNav={setActiveNav}/>
          <main style={{position:'relative',zIndex:1}}>
            <Hero/><About/><Skills/><Experience/><Projects/><Contact/>
          </main>
          <Footer/>
        </motion.div>
      )}
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioApp/>
    </ThemeProvider>
  );
}