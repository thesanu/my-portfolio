import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { SectionTag } from './About';

const EXPERIENCE = [
  {
    role:'Assistant Developer', company:'Maxxis Rubber India', period:'May 2025 – Present',
    color:'#00ffcc', icon:'🏭', type:'Full-Time',
    desc:[
      'Developing web apps using .NET Core Web API + Entity Framework backend with React.js frontend.',
      'Implementing new features and maintaining existing functionality in a full-stack environment.',
      'Ensuring seamless frontend-backend integration through close team collaboration.',
      'Applying modern development tools and best practices for efficient delivery.',
    ],
    tech:['.NET Core','React.js','Entity Framework','SQL Server'],
  },
  {
    role:'Associate Analyst', company:'GlobalLogic Technologies Pvt. Ltd.', period:'Nov 2023 – May 2025',
    color:'#7c6aff', icon:'💹', type:'Full-Time',
    desc:[
      'Finance domain development using ASP.NET Core MVC, Web API and React.js.',
      'Supporting RPA bots for enterprise clients using Pega IDE — streamlining financial workflows.',
      'Working within Visual Studio and VS Code in an Agile/Scrum environment.',
      'Developing new features and maintaining releases across multiple sprints.',
    ],
    tech:['ASP.NET Core','Web API','React.js','Pega IDE','MVC'],
  },
  {
    role:'Software Engineer', company:'Riya Techno Soft Pvt. Ltd.', period:'Oct 2022 – Sept 2023',
    color:'#ff6b6b', icon:'🖥️', type:'Full-Time',
    desc:[
      'Worked on ASP.NET MVC, ASP.NET Core MVC, VB.NET Windows Forms and Razor applications.',
      'Developed and maintained web and desktop applications to meet client requirements.',
      'Used Visual Studio and Eclipse IDE for coding, debugging, and deployment.',
      'Improved application performance and implemented client-facing features.',
    ],
    tech:['ASP.NET MVC','VB.NET','Windows Forms','Visual Studio'],
  },
  {
    role:'Trainee', company:'Cognizant', period:'Jan 2022 – May 2022',
    color:'#ffd166', icon:'🎓', type:'Internship · 5 months',
    desc:[
      'Trained in .NET Core, ASP.NET, MVC, Web API, Entity Framework, LINQ and C#.',
      'Hands-on experience developing and debugging web applications.',
      'Additional training in Advanced Java during final year of college.',
    ],
    tech:['ASP.NET Core','C#','SQL','LINQ','Java'],
  },
];

export default function Experience() {
  const { t, isDark } = useTheme();
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:'-80px' });
  const [active, setActive] = useState(0);

  return (
    <section id="experience" style={{ padding:'120px 8%', position:'relative', zIndex:1 }}>
      <div style={{ position:'absolute', top:0, left:'8%', right:'8%', height:1, background:t.divider }} />
      <div style={{ maxWidth:1100, margin:'0 auto' }} ref={ref}>
        <motion.div initial={{ opacity:0, y:30 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.7 }}
          style={{ textAlign:'center', marginBottom:80 }}>
          <SectionTag>Career Journey</SectionTag>
          <h2 style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:'clamp(32px,5vw,56px)', fontWeight:700, color:t.text, lineHeight:1.1 }}>
            Work Experience
          </h2>
        </motion.div>

        <div style={{ display:'grid', gridTemplateColumns:'200px 1fr', gap:40 }}>
          {/* Sidebar tabs */}
          <div style={{ display:'flex', flexDirection:'column', gap:4, position:'relative' }}>
            <div style={{ position:'absolute', left:0, top:0, bottom:0, width:1, background:`linear-gradient(180deg,transparent,${t.border} 20%,${t.border} 80%,transparent)` }} />
            {EXPERIENCE.map((e, i) => (
              <motion.button key={i}
                initial={{ opacity:0, x:-20 }}
                animate={inView?{opacity:1,x:0}:{}}
                transition={{ delay:0.2+i*0.1, duration:0.6 }}
                onClick={() => setActive(i)}
                style={{
                  background: active===i ? `${e.color}12` : 'transparent',
                  border:'none', borderLeft:`2px solid ${active===i?e.color:'transparent'}`,
                  padding:'16px 20px', textAlign:'left', cursor:'none',
                  transition:'all 0.3s', borderRadius:'0 8px 8px 0',
                }}>
                <div style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:13, fontWeight:700, color:active===i?t.text:t.textMuted, textTransform:'uppercase', letterSpacing:1, transition:'color 0.3s' }}>
                  {e.company.split(' ')[0]}
                </div>
                <div style={{ fontSize:10, color:active===i?e.color:t.textMuted, fontFamily:"'Space Mono',monospace", marginTop:3 }}>
                  {e.period.split('–')[0].trim()}
                </div>
              </motion.button>
            ))}
          </div>

          {/* Content card */}
          <div style={{ position:'relative', minHeight:300 }}>
            <AnimatePresence mode="wait">
              {EXPERIENCE.map((e, i) => active===i && (
                <motion.div key={i}
                  initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-16 }}
                  transition={{ duration:0.45, ease:[0.22,1,0.36,1] }}
                  style={{
                    padding:'36px 40px',
                    background: t.expCardBg,
                    border:`1px solid ${t.expCardBorder}`,
                    borderTop:`2px solid ${e.color}`,
                    borderRadius:'0 12px 12px 12px',
                    position:'relative', overflow:'hidden',
                    boxShadow: isDark?'none':`0 4px 30px ${e.color}12`,
                  }}>
                  <div style={{ position:'absolute', top:0, left:0, right:0, height:60, background:`linear-gradient(180deg,${e.color}0d,transparent)`, pointerEvents:'none' }} />

                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:8, flexWrap:'wrap', gap:12 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:14 }}>
                      <div style={{ width:44, height:44, borderRadius:10, background:`${e.color}18`, border:`1px solid ${e.color}35`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:20 }}>
                        {e.icon}
                      </div>
                      <div>
                        <h3 style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:22, fontWeight:700, color:t.text, marginBottom:2 }}>{e.role}</h3>
                        <div style={{ fontFamily:"'Space Mono',monospace", fontSize:12, color:e.color }}>{e.company}</div>
                      </div>
                    </div>
                    <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                      <span style={{ background:t.bgSurface, border:`1px solid ${t.border}`, borderRadius:6, padding:'4px 12px', fontSize:11, color:t.textMuted, fontFamily:"'Rajdhani',sans-serif", letterSpacing:1 }}>{e.period}</span>
                      <span style={{ background:`${e.color}15`, border:`1px solid ${e.color}35`, borderRadius:6, padding:'4px 12px', fontSize:10, color:e.color, fontFamily:"'Rajdhani',sans-serif", letterSpacing:1, textTransform:'uppercase' }}>{e.type}</span>
                    </div>
                  </div>

                  <div style={{ height:1, background:t.border, margin:'20px 0' }} />

                  <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:10, marginBottom:24 }}>
                    {e.desc.map((d, j) => (
                      <motion.li key={j}
                        initial={{ opacity:0, x:-10 }} animate={{ opacity:1, x:0 }} transition={{ delay:j*0.08, duration:0.4 }}
                        style={{ display:'flex', gap:12, color:t.textSecondary, fontSize:14, lineHeight:1.7 }}>
                        <span style={{ color:e.color, flexShrink:0, marginTop:4, fontSize:8 }}>▸</span>
                        {d}
                      </motion.li>
                    ))}
                  </ul>

                  <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                    {e.tech.map((tech) => (
                      <span key={tech} style={{
                        fontFamily:"'Space Mono',monospace", fontSize:10,
                        color:e.color, background:`${e.color}12`, border:`1px solid ${e.color}28`,
                        borderRadius:4, padding:'3px 9px',
                      }}>{tech}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
