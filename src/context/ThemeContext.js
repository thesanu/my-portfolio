import { createContext, useContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    try { const s = localStorage.getItem('ak-theme'); return s ? s === 'dark' : true; }
    catch { return true; }
  });

  useEffect(() => {
    try { localStorage.setItem('ak-theme', isDark ? 'dark' : 'light'); } catch {}
    document.body.style.background = isDark ? '#04040f' : '#f0eeff';
    document.body.style.color = isDark ? '#e0e0f0' : '#12112a';
    document.body.style.transition = 'background 0.5s, color 0.5s';
  }, [isDark]);

  const toggle = () => setIsDark(d => !d);
  const t = isDark ? DARK : LIGHT;

  return (
    <ThemeContext.Provider value={{ isDark, toggle, t }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);

const DARK = {
  bg: '#04040f', bgSurface: 'rgba(255,255,255,0.03)', bgCard: 'rgba(255,255,255,0.04)',
  bgInput: 'rgba(255,255,255,0.05)', border: 'rgba(255,255,255,0.07)',
  borderFocus: 'rgba(124,106,255,0.6)', text: '#e0e0f0', textSecondary: '#888',
  textMuted: '#555', textPlaceholder: 'rgba(255,255,255,0.25)', textInput: '#ddd',
  accent1: '#7c6aff', accent2: '#00ffcc', accent3: '#ff6b6b', accent4: '#ffd166',
  navBg: 'rgba(4,4,15,0.88)', gridLine: 'rgba(124,106,255,0.04)',
  divider: 'linear-gradient(90deg,transparent,rgba(124,106,255,0.35),rgba(0,255,204,0.25),transparent)',
  cardShadow: 'none', heroName1: 'linear-gradient(135deg,#fff 0%,#a89fff 60%,#7c6aff 100%)',
  heroName2: 'linear-gradient(135deg,#00ffcc 0%,#7c6aff 100%)',
  avatarBg: 'linear-gradient(135deg,#12122a 0%,#07071a 100%)',
  avatarBorder: 'rgba(124,106,255,0.35)', avatarGrid: 'rgba(124,106,255,0.04)',
  badgeBg: 'rgba(4,4,15,0.92)', skillTrack: 'rgba(255,255,255,0.06)',
  statBg: 'rgba(255,255,255,0.03)', statBorder: 'rgba(255,255,255,0.06)',
  quoteBg: 'rgba(124,106,255,0.06)', quoteBorder: '1px solid rgba(124,106,255,0.18)',
  quoteLeft: '3px solid #7c6aff', footerBorder: 'rgba(255,255,255,0.05)',
  footerText: '#444', socialBg: 'rgba(255,255,255,0.04)',
  socialBorder: 'rgba(255,255,255,0.08)', socialColor: '#666',
  toggleBg: 'rgba(255,255,255,0.06)', toggleBorder: 'rgba(255,255,255,0.12)',
  toggleColor: '#aaa', expCardBg: 'rgba(255,255,255,0.03)',
  expCardBorder: 'rgba(255,255,255,0.07)', loaderBg: '#04040f',
  infoBg: 'rgba(255,255,255,0.03)', infoBorder: 'rgba(255,255,255,0.06)',
};

const LIGHT = {
  bg: '#f0eeff', bgSurface: 'rgba(255,255,255,0.85)', bgCard: 'rgba(255,255,255,0.95)',
  bgInput: 'rgba(255,255,255,0.9)', border: 'rgba(91,77,224,0.12)',
  borderFocus: 'rgba(91,77,224,0.7)', text: '#12112a', textSecondary: '#4a4870',
  textMuted: '#9997c0', textPlaceholder: 'rgba(0,0,30,0.3)', textInput: '#12112a',
  accent1: '#5b4de0', accent2: '#00a87a', accent3: '#d63078', accent4: '#c47d00',
  navBg: 'rgba(240,238,255,0.92)', gridLine: 'rgba(91,77,224,0.05)',
  divider: 'linear-gradient(90deg,transparent,rgba(91,77,224,0.25),rgba(0,168,122,0.2),transparent)',
  cardShadow: '0 4px 30px rgba(91,77,224,0.08)', heroName1: 'linear-gradient(135deg,#12112a 0%,#5b4de0 100%)',
  heroName2: 'linear-gradient(135deg,#5b4de0 0%,#00a87a 100%)',
  avatarBg: 'linear-gradient(135deg,#e8e4ff 0%,#d4ccff 100%)',
  avatarBorder: 'rgba(91,77,224,0.3)', avatarGrid: 'rgba(91,77,224,0.05)',
  badgeBg: 'rgba(240,238,255,0.95)', skillTrack: 'rgba(0,0,0,0.07)',
  statBg: 'rgba(255,255,255,0.8)', statBorder: 'rgba(91,77,224,0.1)',
  quoteBg: 'rgba(91,77,224,0.05)', quoteBorder: '1px solid rgba(91,77,224,0.15)',
  quoteLeft: '3px solid #5b4de0', footerBorder: 'rgba(91,77,224,0.1)',
  footerText: '#9997c0', socialBg: 'rgba(255,255,255,0.8)',
  socialBorder: 'rgba(91,77,224,0.15)', socialColor: '#5b4de0',
  toggleBg: 'rgba(91,77,224,0.08)', toggleBorder: 'rgba(91,77,224,0.2)',
  toggleColor: '#5b4de0', expCardBg: 'rgba(255,255,255,0.85)',
  expCardBorder: 'rgba(91,77,224,0.1)', loaderBg: '#f0eeff',
  infoBg: 'rgba(255,255,255,0.8)', infoBorder: 'rgba(91,77,224,0.1)',
};
