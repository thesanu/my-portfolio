import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { SectionTag } from './About';

const PROJECTS = [
  {
    title:'Bank Ticketing Module', tag:'Enterprise · Finance',
    icon:'🏦', accentColor:'#7c6aff',
    gradient:'linear-gradient(135deg,#1a1035 0%,#2d1b69 50%,#1e0b4b 100%)',
    tech:['.NET Core','Entity Framework','SQL Server','MVC','JavaScript','C#','Python','Git'],
    desc:'Web application for a reputed Canadian bank — multi-domain Ticketing Module (Admin, Users, Vendors) using Repository Design Pattern. Includes ticket creation, admin management, and performance dashboards.',
    features:['Multi-domain RBAC','Repository Pattern','Admin Dashboard','Ticket Lifecycle'],
    year:'2024', status:'Production',
  },
  {
    title:'Inventory Management System', tag:'Full-Stack · Manufacturing',
    icon:'📦', accentColor:'#00ffcc',
    gradient:'linear-gradient(135deg,#0a2a22 0%,#0d5540 50%,#083d2e 100%)',
    tech:['.NET Core Web API','React.js','Entity Framework','SQL Server'],
    desc:'Full-stack inventory system with real-time stock updates, role-based access control, and reporting dashboards. Clean REST API with component-based React frontend.',
    features:['Real-time Stock Sync','Role-Based Access','Reporting Dashboard','CRUD Operations'],
    year:'2025', status:'Active',
  },
  {
    title:'Finance Portal + RPA Bots', tag:'Finance · Automation',
    icon:'💹', accentColor:'#ffd166',
    gradient:'linear-gradient(135deg,#1a1200 0%,#4a3400 50%,#2d2000 100%)',
    tech:['ASP.NET Core MVC','Web API','React.js','Pega IDE','SQL Server'],
    desc:'Enterprise finance portal with Pega RPA bot integration. Automated financial workflows, reduced manual processing time significantly, and provided real-time reporting for enterprise clients.',
    features:['RPA Bot Integration','Financial Automation','Real-time Reporting','Workflow Optimization'],
    year:'2024', status:'Production',
  },
  {
    title:'Desktop ERP Solution', tag:'Desktop · Enterprise',
    icon:'🖥️', accentColor:'#ff6b6b',
    gradient:'linear-gradient(135deg,#1a0a0a 0%,#4a1515 50%,#2d0d0d 100%)',
    tech:['VB.NET','Windows Forms','ASP.NET MVC','SQL Server'],
    desc:'Desktop-based ERP built with VB.NET Windows Forms. End-to-end business workflow management for an SME client — inventory, invoicing, and reporting modules.',
    features:['Windows Forms UI','ERP Modules','Invoice Management','Business Reporting'],
    year:'2023', status:'Delivered',
  },
];

export default function Projects() {
  const { t } = useTheme();
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:'-80px' });
  const [hovered, setHovered] = useState(null);

  return (
    <section id="projects" style={{ padding:'120px 8%', position:'relative', zIndex:1 }}>
      <div style={{ position:'absolute', inset:0, background:`linear-gradient(180deg,transparent,${t.accent2}05,transparent)`, pointerEvents:'none' }} />
      <div style={{ position:'absolute', top:0, left:'8%', right:'8%', height:1, background:t.divider }} />

      <div style={{ maxWidth:1200, margin:'0 auto', position:'relative' }} ref={ref}>
        <motion.div initial={{ opacity:0, y:30 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.7 }}
          style={{ textAlign:'center', marginBottom:80 }}>
          <SectionTag>Portfolio</SectionTag>
          <h2 style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:'clamp(32px,5vw,56px)', fontWeight:700, color:t.text, lineHeight:1.1 }}>
            Featured Projects
          </h2>
          <p style={{ color:t.textMuted, marginTop:12, fontSize:14 }}>Enterprise-grade applications built with precision and care</p>
        </motion.div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:24 }}>
          {PROJECTS.map((p, i) => (
            <motion.div key={i}
              initial={{ opacity:0, y:40 }}
              animate={inView?{opacity:1,y:0}:{}}
              transition={{ delay:0.15*i, duration:0.7, ease:[0.22,1,0.36,1] }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: t.bgCard,
                border:`1px solid ${hovered===i?p.accentColor+'55':t.border}`,
                borderRadius:16, overflow:'hidden',
                transition:'border-color 0.35s, transform 0.35s, box-shadow 0.35s',
                transform: hovered===i?'translateY(-8px)':'translateY(0)',
                boxShadow: hovered===i?`0 28px 60px rgba(0,0,0,0.25), 0 0 0 1px ${p.accentColor}22`:t.cardShadow,
                cursor:'none',
              }}>
              {/* Header */}
              <div style={{ height:160, background:p.gradient, position:'relative', overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <div style={{ position:'absolute', inset:0, backgroundImage:'repeating-linear-gradient(0deg,rgba(255,255,255,0.03) 0px,rgba(255,255,255,0.03) 1px,transparent 1px,transparent 28px),repeating-linear-gradient(90deg,rgba(255,255,255,0.03) 0px,rgba(255,255,255,0.03) 1px,transparent 1px,transparent 28px)' }} />
                <motion.div animate={hovered===i?{opacity:1,scale:1.3}:{opacity:0.5,scale:1}} transition={{ duration:0.5 }}
                  style={{ position:'absolute', width:200, height:200, borderRadius:'50%', background:`radial-gradient(circle,${p.accentColor}22 0%,transparent 70%)` }} />
                <motion.span animate={hovered===i?{scale:1.15}:{scale:1}} transition={{ duration:0.4 }}
                  style={{ fontSize:52, position:'relative', zIndex:1 }}>{p.icon}</motion.span>
                <div style={{ position:'absolute', top:12, left:14 }}>
                  <span style={{ background:'rgba(0,0,0,0.5)', border:`1px solid ${p.accentColor}44`, borderRadius:99, padding:'4px 11px', fontSize:10, color:p.accentColor, fontFamily:"'Rajdhani',sans-serif", letterSpacing:2, textTransform:'uppercase', backdropFilter:'blur(8px)' }}>{p.tag}</span>
                </div>
                <div style={{ position:'absolute', top:12, right:14, display:'flex', gap:6 }}>
                  <span style={{ background:'rgba(0,0,0,0.5)', border:'1px solid rgba(255,255,255,0.12)', borderRadius:99, padding:'3px 9px', fontSize:9, color:'#aaa', fontFamily:"'Space Mono',monospace", backdropFilter:'blur(8px)' }}>{p.year}</span>
                  <span style={{ background:`${p.accentColor}22`, border:`1px solid ${p.accentColor}44`, borderRadius:99, padding:'3px 9px', fontSize:9, color:p.accentColor, fontFamily:"'Rajdhani',sans-serif", letterSpacing:1, textTransform:'uppercase', backdropFilter:'blur(8px)' }}>{p.status}</span>
                </div>
              </div>

              {/* Body */}
              <div style={{ padding:'24px 28px' }}>
                <h3 style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:21, fontWeight:700, color:t.text, marginBottom:10 }}>{p.title}</h3>
                <p style={{ fontSize:13, color:t.textSecondary, lineHeight:1.8, marginBottom:18 }}>{p.desc}</p>
                <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginBottom:18 }}>
                  {p.features.map((f) => (
                    <span key={f} style={{ fontSize:10, color:p.accentColor, background:`${p.accentColor}12`, border:`1px solid ${p.accentColor}25`, borderRadius:4, padding:'3px 8px', fontWeight:500 }}>✓ {f}</span>
                  ))}
                </div>
                <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
                  {p.tech.map((tech) => (
                    <span key={tech} style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:t.textMuted, background:t.bgSurface, border:`1px solid ${t.border}`, borderRadius:4, padding:'3px 8px' }}>{tech}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
