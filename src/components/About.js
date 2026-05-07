import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import CountUp from 'react-countup';
import { useTheme } from '../context/ThemeContext';

const STATS = [
  { n:3,   suffix:'+', label:'Years Experience',  color:'#7c6aff' },
  { n:10,  suffix:'+', label:'Projects Delivered', color:'#00ffcc' },
  { n:15,  suffix:'+', label:'Technologies',       color:'#ff6b6b' },
  { n:100, suffix:'%', label:'Commitment',          color:'#ffd166' },
];
const CHIPS = ['ASP.NET Core','React.js','Azure Cloud','Agile / Scrum','OOPS','Design Patterns','SQL Server','Git / Jira','Entity Framework','LINQ','MVC','Web API'];

export function SectionTag({ children }) {
  const { t } = useTheme();
  return (
    <div style={{
      fontFamily:"'Rajdhani',sans-serif", fontSize:11, fontWeight:700,
      letterSpacing:4, textTransform:'uppercase', color:t.accent2,
      display:'flex', alignItems:'center', justifyContent:'center', gap:14, marginBottom:12,
    }}>
      <span style={{ display:'block', width:32, height:1, background:`${t.accent2}55` }} />
      {children}
      <span style={{ display:'block', width:32, height:1, background:`${t.accent2}55` }} />
    </div>
  );
}

export default function About() {
  const { t } = useTheme();
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:'-80px' });

  const cV = { hidden:{}, visible:{ transition:{ staggerChildren:0.12 } } };
  const iV = { hidden:{ opacity:0, y:32 }, visible:{ opacity:1, y:0, transition:{ duration:0.7, ease:[0.22,1,0.36,1] } } };

  return (
    <section id="about" style={{ padding:'120px 8%', position:'relative', zIndex:1 }}>
      <div style={{ position:'absolute', top:0, left:'8%', right:'8%', height:1, background:t.divider }} />

      <div style={{ maxWidth:1200, margin:'0 auto' }} ref={ref}>
        <motion.div initial={{ opacity:0, y:30 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.7 }}
          style={{ textAlign:'center', marginBottom:80 }}>
          <SectionTag>About Me</SectionTag>
          <h2 style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:'clamp(32px,5vw,56px)', fontWeight:700, color:t.text, marginBottom:16, lineHeight:1.1 }}>
            Who Am I?
          </h2>
          <p style={{ color:t.textSecondary, maxWidth:560, margin:'0 auto', lineHeight:1.85, fontSize:14.5 }}>
            A software developer from Ahmedabad who turns complex problems into elegant solutions using Microsoft's ecosystem and modern frontend tech.
          </p>
        </motion.div>

        <motion.div variants={cV} initial="hidden" animate={inView?'visible':'hidden'}
          style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:80, alignItems:'center' }}>

          {/* Left */}
          <motion.div variants={iV}>
            <p style={{ color:t.textSecondary, lineHeight:2, fontSize:15, marginBottom:20 }}>
              With <span style={{ color:t.text, fontWeight:600 }}>3+ years</span> in the IT industry, I specialize in designing and deploying scalable web applications using{' '}
              <span style={{ color:t.accent1, fontWeight:500 }}>Microsoft's .NET ecosystem</span> on the backend and{' '}
              <span style={{ color:t.accent2, fontWeight:500 }}>React.js</span> on the frontend.
            </p>
            <p style={{ color:t.textSecondary, lineHeight:2, fontSize:15, marginBottom:32 }}>
              Deeply invested in clean architecture — DI, IoC, Repository Pattern, SOLID — believing great software starts with great foundations. I thrive in Agile teams and have worked across Finance, Manufacturing, and Enterprise domains.
            </p>

            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:32 }}>
              {[
                { label:'Location', val:'Ahmedabad, India' },
                { label:'Email',    val:'thesanu5889@gmail.com' },
                { label:'Phone',    val:'+91 9771522840' },
                { label:'Status',   val:'Open to Opportunities' },
              ].map(({ label, val }) => (
                <div key={label} style={{ padding:'12px 16px', background:t.infoBg, borderRadius:8, border:`1px solid ${t.infoBorder}` }}>
                  <div style={{ fontSize:10, color:t.textMuted, textTransform:'uppercase', letterSpacing:1.5, fontFamily:"'Rajdhani',sans-serif", marginBottom:4 }}>{label}</div>
                  <div style={{ fontSize:12, color:t.textSecondary, fontFamily:"'Space Mono',monospace" }}>{val}</div>
                </div>
              ))}
            </div>

            <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
              {CHIPS.map((c, i) => (
                <motion.span key={c}
                  initial={{ opacity:0, scale:0.8 }} animate={inView?{opacity:1,scale:1}:{}}
                  transition={{ delay:0.4+i*0.04, duration:0.4 }}
                  whileHover={{ scale:1.06 }}
                  style={{
                    fontFamily:"'Space Mono',monospace", fontSize:10, color:t.textMuted,
                    background:t.bgSurface, border:`1px solid ${t.border}`,
                    borderRadius:6, padding:'5px 11px', cursor:'none', transition:'all 0.25s',
                  }}
                >{c}</motion.span>
              ))}
            </div>
          </motion.div>

          {/* Right — Stats */}
          <motion.div variants={iV} style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
            {STATS.map(({ n, suffix, label, color }) => (
              <motion.div key={label}
                whileHover={{ y:-4, borderColor:`${color}55` }}
                style={{
                  padding:'28px 20px', textAlign:'center',
                  background:t.statBg, border:`1px solid ${t.statBorder}`,
                  borderRadius:12, position:'relative', overflow:'hidden',
                  transition:'border-color 0.3s, transform 0.3s', cursor:'none',
                  boxShadow: t.cardShadow,
                }}>
                <div style={{ position:'absolute', top:0, left:0, right:0, height:1, background:`linear-gradient(90deg,transparent,${color}66,transparent)` }} />
                <div style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:44, fontWeight:700, color, lineHeight:1 }}>
                  {inView ? <CountUp end={n} duration={2} suffix={suffix} /> : `0${suffix}`}
                </div>
                <div style={{ fontSize:10, color:t.textMuted, textTransform:'uppercase', letterSpacing:1.5, fontFamily:"'Rajdhani',sans-serif", marginTop:8 }}>{label}</div>
              </motion.div>
            ))}

            {/* Education */}
            <div style={{
              gridColumn:'1 / -1', padding:'20px 24px',
              background:t.statBg, border:`1px solid ${t.statBorder}`,
              borderRadius:12, position:'relative', overflow:'hidden',
              boxShadow: t.cardShadow,
            }}>
              <div style={{ position:'absolute', top:0, left:0, right:0, height:1, background:`linear-gradient(90deg,transparent,${t.accent1}55,transparent)` }} />
              <div style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:11, color:t.textMuted, letterSpacing:2, textTransform:'uppercase', marginBottom:12 }}>Education</div>
              <div style={{ display:'flex', alignItems:'center', gap:14 }}>
                <div style={{ width:42, height:42, borderRadius:10, background:`${t.accent1}18`, border:`1px solid ${t.accent1}30`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, flexShrink:0 }}>🎓</div>
                <div>
                  <div style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:16, fontWeight:600, color:t.text }}>B.Tech — CSE</div>
                  <div style={{ fontSize:12, color:t.textSecondary }}>Galgotias University, 2022 · 7.6 CGPA</div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
