import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from './ThemeToggle';

const NAV_LINKS = ['Home','About','Skills','Experience','Projects','Contact'];

export default function Navbar({ active, onNav }) {
  const { t, isDark } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Track scroll for navbar background
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMobileOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle navigation click
  const handleNav = (link) => {
    onNav(link);
    setMobileOpen(false);
    document.getElementById(link.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: '0 clamp(16px,5%,60px)',
          background: scrolled ? t.navBg : 'transparent',
          backdropFilter: scrolled ? 'blur(24px) saturate(1.5)' : 'none',
          borderBottom: scrolled ? `1px solid ${t.border}` : 'none',
          transition: 'background 0.5s, border 0.5s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 68,
        }}
      >
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          onClick={() => handleNav('Home')}
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: 3,
            cursor: 'none',
            userSelect: 'none',
          }}
        >
          <span style={{ color: t.text }}>AK</span>
          <span style={{ color: t.accent2 }}>.</span>
          <span
            style={{
              background: `linear-gradient(90deg,${t.accent1},${t.accent2})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: 12,
            }}
          >
            DEV
          </span>
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            style={{ color: t.accent2, fontSize: 16, marginLeft: 2 }}
          >
            _
          </motion.span>
        </motion.div>

        {/* Desktop links */}
        <div className="nav-desktop" style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
          {NAV_LINKS.map((link) => (
            <NavLink key={link} label={link} active={active === link} onClick={() => handleNav(link)} t={t} />
          ))}
        </div>

        {/* Right controls */}
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <ThemeToggle />
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: `0 0 28px ${t.accent1}77` }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleNav('Contact')}
            className="hire-btn"
            style={{
              padding: '9px 20px',
              background: `linear-gradient(135deg,${t.accent1},${isDark ? '#5e4fd0' : '#4a3ab8'})`,
              border: 'none',
              borderRadius: 4,
              color: '#fff',
              fontFamily: "'Space Mono', monospace",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 2,
              textTransform: 'uppercase',
              cursor: 'none',
            }}
          >
            HIRE_ME
          </motion.button>

          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="hamburger"
            style={{
              display: 'none',
              background: 'none',
              border: `1px solid ${t.border}`,
              borderRadius: 4,
              padding: '8px 10px',
              cursor: 'none',
              flexDirection: 'column',
              gap: 4,
              alignItems: 'center',
            }}
          >
            {[0, 1, 2].map((i) => {
              const animation = mobileOpen
                ? { rotate: i === 0 ? 45 : i === 2 ? -45 : 0, y: i === 0 ? 8 : i === 2 ? -8 : 0, opacity: i === 1 ? 0 : 1 }
                : { rotate: 0, y: 0, opacity: 1 };
              return <motion.span key={i} animate={animation} style={{ display: 'block', width: 18, height: 1.5, background: t.accent2, borderRadius: 99 }} />;
            })}
          </button>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed',
              top: 68,
              left: 0,
              right: 0,
              zIndex: 999,
              background: isDark ? 'rgba(4,4,15,0.97)' : 'rgba(240,238,255,0.97)',
              backdropFilter: 'blur(24px)',
              borderBottom: `1px solid ${t.border}`,
              padding: '16px clamp(16px,5%,60px)',
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.button
                key={link}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => handleNav(link)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'none',
                  textAlign: 'left',
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 12,
                  fontWeight: 700,
                  color: active === link ? t.accent2 : t.textSecondary,
                  padding: '14px 0',
                  borderBottom: `1px solid ${t.border}`,
                  letterSpacing: 2,
                }}
              >
                <span style={{ color: t.accent1, marginRight: 10 }}>{'>'}</span>
                {link.toUpperCase()}
                {active === link && <span style={{ color: t.accent2, marginLeft: 8 }}>◀</span>}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Responsive CSS */}
      <style>{`
        @media(max-width:768px){
          .nav-desktop{display:none!important;}
          .hire-btn{display:none!important;}
          .hamburger{display:flex!important;}
        }
        @media(min-width:769px){.hamburger{display:none!important;}}
      `}</style>
    </>
  );
}

function NavLink({ label, active, onClick, t }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'none',
        fontFamily: "'Space Mono', monospace",
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: 2,
        textTransform: 'uppercase',
        color: active ? t.accent2 : hov ? t.text : t.textMuted,
        padding: '8px 0',
        position: 'relative',
        transition: 'color 0.3s',
      }}
    >
      {(active || hov) && <span style={{ color: t.accent1, marginRight: 4 }}>{'>'}</span>}
      {label}
      <motion.div
        animate={{ scaleX: active || hov ? 1 : 0 }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 1,
          background: `linear-gradient(90deg,${t.accent1},${t.accent2})`,
          transformOrigin: 'left',
          boxShadow: `0 0 6px ${t.accent2}`,
        }}
      />
    </button>
  );
}