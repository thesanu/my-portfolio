import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { SectionTag } from './About';

const API_URL = process.env.REACT_APP_API_URL || 'https://localhost:7001';

const INFO = [
  { icon:'📧', label:'Email',    val:'thesanu5889@gmail.com',         color:'#7c6aff' },
  { icon:'📞', label:'Phone',    val:'+91 9771522840',                 color:'#00ffcc' },
  { icon:'📍', label:'Location', val:'Ahmedabad, Gujarat, India',      color:'#ff6b6b' },
  { icon:'💼', label:'LinkedIn', val:'linkedin.com/in/ashutosh-kumar', color:'#ffd166' },
];
const SOCIALS = [
  { label:'GitHub',   icon:'⚡' },
  { label:'LinkedIn', icon:'💼' },
  { label:'Twitter',  icon:'🐦' },
];

export default function Contact() {
  const { t, isDark } = useTheme();
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:'-80px' });

  const [form, setForm] = useState({ name:'', email:'', subject:'', message:'' });
  const [focused, setFocused] = useState(null);
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [errMsg, setErrMsg] = useState('');

  const validate = () => {
    if (!form.name.trim())     return 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'Please enter a valid email.';
    if (!form.message.trim())  return 'Please enter a message.';
    return null;
  };

  const handleSubmit = async () => {
    const err = validate();
    if (err) { setStatus('error'); setErrMsg(err); return; }
    setStatus('sending'); setErrMsg('');
    try {
      const res = await fetch(`${API_URL}/api/contact/send`, {
        method:'POST',
        headers:{ 'Content-Type':'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          subject: form.subject.trim() || `Portfolio contact from ${form.name.trim()}`,
          message: form.message.trim(),
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || 'Server error. Please try again.');
      }
      setStatus('success');
      setForm({ name:'', email:'', subject:'', message:'' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (e) {
      setStatus('error');
      setErrMsg(e.message || 'Something went wrong.');
    }
  };

  const fieldStyle = (key) => ({
    width:'100%', background:t.bgInput,
    border:`1px solid ${focused===key?t.borderFocus:t.border}`,
    borderRadius:8, padding:'13px 17px',
    color:t.textInput, fontFamily:"'DM Sans',sans-serif", fontSize:14,
    outline:'none', transition:'border-color 0.3s, box-shadow 0.3s',
    boxShadow: focused===key?`0 0 0 3px ${t.accent1}18`:'none',
  });

  return (
    <section id="contact" style={{ padding:'120px 8%', position:'relative', zIndex:1 }}>
      <div style={{ position:'absolute', top:0, left:'8%', right:'8%', height:1, background:t.divider }} />
      <motion.div animate={{ scale:[1,1.08,1], opacity:[0.25,0.45,0.25] }} transition={{ duration:8, repeat:Infinity }}
        style={{ position:'absolute', left:'50%', top:'50%', width:700, height:700, borderRadius:'50%', background:`radial-gradient(circle,${t.accent1}0e 0%,transparent 70%)`, transform:'translate(-50%,-50%)', pointerEvents:'none' }} />

      <div style={{ maxWidth:1100, margin:'0 auto', position:'relative' }} ref={ref}>
        <motion.div initial={{ opacity:0, y:30 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.7 }}
          style={{ textAlign:'center', marginBottom:80 }}>
          <SectionTag>Get In Touch</SectionTag>
          <h2 style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:'clamp(32px,5vw,56px)', fontWeight:700, color:t.text, lineHeight:1.1, marginBottom:16 }}>
            Let's Build Something<br />
            <span style={{ background:`linear-gradient(90deg,${t.accent1},${t.accent2})`, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
              Exceptional Together
            </span>
          </h2>
          <p style={{ color:t.textSecondary, maxWidth:520, margin:'0 auto', lineHeight:1.85, fontSize:14.5 }}>
            Open to full-time roles, freelance projects, and collaborations. Let's connect.
          </p>
        </motion.div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:60, alignItems:'start' }}>
          {/* Left info */}
          <motion.div initial={{ opacity:0, x:-30 }} animate={inView?{opacity:1,x:0}:{}} transition={{ duration:0.7, delay:0.2 }}>
            <div style={{ display:'flex', flexDirection:'column', gap:20, marginBottom:44 }}>
              {INFO.map(({ icon, label, val, color }, i) => (
                <motion.div key={label}
                  initial={{ opacity:0, x:-20 }} animate={inView?{opacity:1,x:0}:{}} transition={{ delay:0.3+i*0.1 }}
                  whileHover={{ x:6 }}
                  style={{ display:'flex', gap:16, alignItems:'center', cursor:'none' }}>
                  <div style={{ width:48, height:48, borderRadius:12, background:`${color}15`, border:`1px solid ${color}35`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, flexShrink:0 }}>
                    {icon}
                  </div>
                  <div>
                    <div style={{ fontSize:10, color:t.textMuted, textTransform:'uppercase', letterSpacing:1.5, fontFamily:"'Rajdhani',sans-serif", marginBottom:3 }}>{label}</div>
                    <div style={{ fontSize:13, color:t.textSecondary, fontFamily:"'Space Mono',monospace" }}>{val}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div style={{ marginBottom:44 }}>
              <div style={{ fontSize:10, color:t.textMuted, textTransform:'uppercase', letterSpacing:2, fontFamily:"'Rajdhani',sans-serif", marginBottom:14 }}>Find me online</div>
              <div style={{ display:'flex', gap:10 }}>
                {SOCIALS.map(({ label, icon }) => (
                  <motion.div key={label}
                    whileHover={{ scale:1.06, borderColor:t.accent1, color:t.accent1 }}
                    style={{ display:'flex', alignItems:'center', gap:7, padding:'9px 16px', background:t.socialBg, border:`1px solid ${t.socialBorder}`, borderRadius:8, fontSize:12, color:t.socialColor, fontFamily:"'Rajdhani',sans-serif", letterSpacing:1, cursor:'none', transition:'all 0.25s' }}>
                    <span>{icon}</span>{label}
                  </motion.div>
                ))}
              </div>
            </div>

            <div style={{ padding:'24px 28px', background:t.quoteBg, border:t.quoteBorder, borderLeft:t.quoteLeft, borderRadius:'0 10px 10px 0' }}>
              <p style={{ color:t.textSecondary, fontSize:14, lineHeight:1.8, fontStyle:'italic' }}>
                "Clean code, clean architecture, clean results. I don't just build apps — I build solutions that scale."
              </p>
              <div style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:12, color:t.accent1, marginTop:10, letterSpacing:1 }}>— Ashutosh Kumar</div>
            </div>
          </motion.div>

          {/* Right form */}
          <motion.div initial={{ opacity:0, x:30 }} animate={inView?{opacity:1,x:0}:{}} transition={{ duration:0.7, delay:0.3 }}
            style={{
              padding:36, background:t.bgCard, border:`1px solid ${t.border}`,
              borderRadius:16, position:'relative', overflow:'hidden',
              boxShadow: isDark?'none':'0 8px 40px rgba(91,77,224,0.08)',
            }}>
            <div style={{ position:'absolute', top:0, left:0, right:0, height:1, background:`linear-gradient(90deg,transparent,${t.accent1}55,transparent)` }} />
            <div style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:18, fontWeight:700, color:t.text, marginBottom:28, letterSpacing:1 }}>Send a Message</div>

            <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
              {[
                { key:'name',    placeholder:'Your Name',          type:'text'  },
                { key:'email',   placeholder:'Your Email',         type:'email' },
                { key:'subject', placeholder:'Subject (optional)', type:'text'  },
              ].map(({ key, placeholder, type }) => (
                <input key={key} type={type} value={form[key]} placeholder={placeholder}
                  onChange={(e) => setForm(f => ({ ...f, [key]:e.target.value }))}
                  onFocus={() => { setFocused(key); setStatus('idle'); }}
                  onBlur={() => setFocused(null)}
                  style={fieldStyle(key)}
                />
              ))}

              <textarea value={form.message} placeholder="Your Message..." rows={5}
                onChange={(e) => setForm(f => ({ ...f, message:e.target.value }))}
                onFocus={() => { setFocused('message'); setStatus('idle'); }}
                onBlur={() => setFocused(null)}
                style={{ ...fieldStyle('message'), resize:'vertical' }}
              />

              <AnimatePresence>
                {status==='error' && (
                  <motion.div key="err" initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
                    style={{ padding:'12px 16px', borderRadius:8, background:`${t.accent3}15`, border:`1px solid ${t.accent3}44`, color:t.accent3, fontSize:13 }}>
                    ⚠ {errMsg}
                  </motion.div>
                )}
                {status==='success' && (
                  <motion.div key="ok" initial={{ opacity:0, scale:0.93 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0 }}
                    style={{ padding:'14px 20px', textAlign:'center', borderRadius:8, background:`${t.accent2}15`, border:`1px solid ${t.accent2}44`, color:t.accent2, fontFamily:"'Rajdhani',sans-serif", fontWeight:700, letterSpacing:1 }}>
                    ✓ Message sent! I'll get back to you soon.
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                whileHover={status!=='sending'?{ scale:1.02, boxShadow:`0 8px 36px ${t.accent1}55` }:{}}
                whileTap={status!=='sending'?{ scale:0.97 }:{}}
                onClick={handleSubmit}
                disabled={status==='sending'}
                style={{
                  width:'100%', padding:15,
                  background: status==='sending' ? `${t.accent1}88` : `linear-gradient(135deg,${t.accent1} 0%,${isDark?'#5e4fd0':'#4a3ab8'} 100%)`,
                  border:'none', borderRadius:8, color:'#fff',
                  fontFamily:"'Rajdhani',sans-serif", fontSize:14, fontWeight:700,
                  letterSpacing:2, textTransform:'uppercase',
                  cursor: status==='sending'?'wait':'none',
                  display:'flex', alignItems:'center', justifyContent:'center', gap:10,
                  transition:'all 0.3s',
                }}>
                {status==='sending' ? (
                  <>
                    <motion.span animate={{ rotate:360 }} transition={{ duration:1, repeat:Infinity, ease:'linear' }}
                      style={{ display:'inline-block', width:16, height:16, border:'2px solid rgba(255,255,255,0.3)', borderTopColor:'#fff', borderRadius:'50%' }} />
                    Sending...
                  </>
                ) : 'Send Message →'}
              </motion.button>

              <p style={{ fontSize:11, color:t.textMuted, textAlign:'center', fontFamily:"'Rajdhani',sans-serif", letterSpacing:0.5 }}>
                Delivered directly to thesanu5889@gmail.com
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const { t } = useTheme();
  return (
    <footer style={{ padding:'28px 8%', borderTop:`1px solid ${t.footerBorder}`, display:'flex', alignItems:'center', justifyContent:'space-between', position:'relative', zIndex:1, flexWrap:'wrap', gap:12 }}>
      <div style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:13, color:t.footerText }}>
        © 2025 <span style={{ color:t.accent1 }}>Ashutosh Kumar</span>. Crafted with precision & passion.
      </div>
      <div style={{ display:'flex', gap:20, alignItems:'center' }}>
        <div style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:t.textMuted }}>{'<Built with React />'}</div>
        <motion.div animate={{ opacity:[0.5,1,0.5] }} transition={{ duration:2, repeat:Infinity }}
          style={{ width:6, height:6, borderRadius:'50%', background:t.accent2, boxShadow:`0 0 8px ${t.accent2}` }} />
      </div>
    </footer>
  );
}
