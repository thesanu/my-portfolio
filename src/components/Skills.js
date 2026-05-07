import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { SectionTag } from './About';

const SKILLS = [
  { name:'C# / .NET Core',    level:92 },
  { name:'ASP.NET MVC',       level:90 },
  { name:'Web API',           level:88 },
  { name:'Entity Framework',  level:85 },
  { name:'LINQ / OOPS',       level:87 },
  { name:'Design Patterns',   level:84 },
  { name:'React.js',          level:82 },
  { name:'JavaScript',        level:85 },
  { name:'HTML5 / CSS3',      level:88 },
  { name:'SQL Server',        level:86 },
  { name:'Azure Cloud',       level:75 },
  { name:'Git / Jira / Agile',level:83 },
];

const TECH_ICONS = [
  { name:'C#',        icon:'⚡', cat:'Backend'  },
  { name:'.NET Core', icon:'🔷', cat:'Backend'  },
  { name:'ASP.NET',   icon:'🌐', cat:'Backend'  },
  { name:'React.js',  icon:'⚛️', cat:'Frontend' },
  { name:'JavaScript',icon:'🟡', cat:'Frontend' },
  { name:'Web API',   icon:'🔌', cat:'Backend'  },
  { name:'EF Core',   icon:'🗄️', cat:'ORM'     },
  { name:'LINQ',      icon:'🔗', cat:'Backend'  },
  { name:'SQL Server',icon:'💾', cat:'DB'       },
  { name:'Azure',     icon:'☁️', cat:'Cloud'   },
  { name:'MVC',       icon:'🏗️', cat:'Pattern' },
  { name:'Git',       icon:'🔀', cat:'Tools'   },
  { name:'Jira',      icon:'📋', cat:'Tools'   },
  { name:'HTML5',     icon:'📄', cat:'Frontend' },
  { name:'CSS3',      icon:'🎨', cat:'Frontend' },
  { name:'Pega',      icon:'🤖', cat:'RPA'      },
  { name:'Java',      icon:'☕', cat:'Lang'     },
  { name:'VB.NET',    icon:'🪟', cat:'Backend'  },
];

const BAR_COLORS = ['#7c6aff','#7c6aff','#7c6aff','#7c6aff','#7c6aff','#7c6aff','#00ffcc','#00ffcc','#00ffcc','#ff6b6b','#ffd166','#a78bfa'];

export default function Skills() {
  const { t } = useTheme();
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:'-80px' });

  return (
    <section id="skills" style={{ padding:'120px 8%', position:'relative', zIndex:1 }}>
      <div style={{ position:'absolute', inset:0, background:`linear-gradient(180deg,transparent,${t.accent1}08,transparent)`, pointerEvents:'none' }} />
      <div style={{ position:'absolute', top:0, left:'8%', right:'8%', height:1, background:t.divider }} />

      <div style={{ maxWidth:1200, margin:'0 auto', position:'relative' }} ref={ref}>
        <motion.div initial={{ opacity:0, y:30 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.7 }}
          style={{ textAlign:'center', marginBottom:80 }}>
          <SectionTag>Technical Arsenal</SectionTag>
          <h2 style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:'clamp(32px,5vw,56px)', fontWeight:700, color:t.text, lineHeight:1.1 }}>
            Skills & Expertise
          </h2>
        </motion.div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0 80px', marginBottom:80 }}>
          {SKILLS.map((s, i) => (
            <SkillBar key={s.name} name={s.name} level={s.level} color={BAR_COLORS[i]} inView={inView} delay={i*70} t={t} />
          ))}
        </div>

        <motion.div initial={{ opacity:0 }} animate={inView?{opacity:1}:{}} transition={{ delay:0.6, duration:0.8 }}>
          <div style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:11, color:t.textMuted, letterSpacing:3, textTransform:'uppercase', textAlign:'center', marginBottom:24 }}>
            Full Technology Stack
          </div>
          <div style={{ display:'flex', flexWrap:'wrap', gap:10, justifyContent:'center' }}>
            {TECH_ICONS.map((tech, i) => (
              <motion.div key={tech.name}
                initial={{ opacity:0, scale:0.7 }}
                animate={inView?{opacity:1,scale:1}:{}}
                transition={{ delay:0.7+i*0.04, duration:0.4, ease:[0.22,1,0.36,1] }}
                whileHover={{ scale:1.1, borderColor:t.accent1, background:`${t.accent1}10` }}
                style={{
                  display:'flex', alignItems:'center', gap:8, padding:'9px 16px',
                  background:t.bgSurface, border:`1px solid ${t.border}`,
                  borderRadius:8, fontFamily:"'Space Mono',monospace",
                  fontSize:11, color:t.textSecondary, cursor:'none',
                  transition:'all 0.25s', boxShadow:t.cardShadow,
                }}>
                <span style={{ fontSize:13 }}>{tech.icon}</span>
                <span>{tech.name}</span>
                <span style={{
                  fontSize:9, color:t.textMuted, background:`${t.accent1}10`,
                  padding:'1px 5px', borderRadius:3,
                  fontFamily:"'Rajdhani',sans-serif", letterSpacing:1, textTransform:'uppercase',
                }}>{tech.cat}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SkillBar({ name, level, color, inView, delay, t }) {
  return (
    <div style={{ marginBottom:22 }}>
      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:7, alignItems:'center' }}>
        <span style={{ color:t.text, fontSize:13, fontFamily:"'DM Sans',sans-serif", fontWeight:500 }}>{name}</span>
        <motion.span
          initial={{ opacity:0 }} animate={inView?{opacity:1}:{}} transition={{ delay:delay/1000+0.8 }}
          style={{ color, fontSize:12, fontFamily:"'Space Mono',monospace", fontWeight:700 }}
        >{level}%</motion.span>
      </div>
      <div style={{ height:3, background:t.skillTrack, borderRadius:99, overflow:'hidden', position:'relative' }}>
        <motion.div
          initial={{ width:0 }}
          animate={inView?{width:`${level}%`}:{width:0}}
          transition={{ duration:1.4, ease:[0.4,0,0.2,1], delay:delay/1000+0.3 }}
          style={{ height:'100%', borderRadius:99, background:`linear-gradient(90deg,${color}88,${color})`, boxShadow:`0 0 10px ${color}66`, position:'relative' }}>
          <motion.div
            animate={{ x:['-100%','200%'] }}
            transition={{ duration:2, repeat:Infinity, ease:'linear', delay:delay/1000+1.4 }}
            style={{ position:'absolute', inset:0, background:'linear-gradient(90deg,transparent,rgba(255,255,255,0.3),transparent)', width:'40%' }}
          />
        </motion.div>
      </div>
    </div>
  );
}
