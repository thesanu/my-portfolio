import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { isDark, toggle, t } = useTheme();
  return (
    <motion.button onClick={toggle} whileHover={{scale:1.06,boxShadow:`0 0 16px ${t.accent1}55`}} whileTap={{scale:0.94}}
      title={isDark?'Light Mode':'Dark Mode'}
      style={{
        display:'flex', alignItems:'center', gap:8, padding:'8px 12px',
        background:t.toggleBg, border:`1px solid ${t.toggleBorder}`,
        borderRadius:4, cursor:'none', fontFamily:"'Space Mono',monospace",
        fontSize:9, color:t.toggleColor, letterSpacing:2, transition:'all 0.3s',
      }}>
      <div style={{ width:32, height:16, borderRadius:99, background:`${t.accent1}33`, border:`1px solid ${t.accent1}66`, position:'relative', flexShrink:0 }}>
        <motion.div animate={{x:isDark?2:16}} transition={{type:'spring',stiffness:700,damping:35}}
          style={{position:'absolute',top:2,width:10,height:10,borderRadius:'50%',background:t.accent1,boxShadow:`0 0 8px ${t.accent1}`}}/>
      </div>
      <AnimatePresence mode="wait">
        <motion.span key={isDark?'dark':'light'}
          initial={{opacity:0,rotate:-30,scale:0.6}} animate={{opacity:1,rotate:0,scale:1}} exit={{opacity:0,rotate:30,scale:0.6}}
          transition={{duration:0.2}} style={{fontSize:14,lineHeight:1}}>
          {isDark?'🌙':'☀️'}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}