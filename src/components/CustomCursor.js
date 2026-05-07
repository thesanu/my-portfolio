import { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function CustomCursor() {
  const { isDark } = useTheme();
  const dotEl    = useRef(null);
  const ringEl   = useRef(null);
  const trailEls = useRef([]);
  const state    = useRef({ x:-200, y:-200, rx:-200, ry:-200, clicking:false, hovering:false });
  const rafId    = useRef(null);

  const DOT_DARK   = '#00ffcc';
  const DOT_LIGHT  = '#5b4de0';
  const RING_DARK  = 'rgba(0,255,204,0.75)';
  const RING_LIGHT = 'rgba(91,77,224,0.75)';
  const HOV_DARK   = '#ff6b6b';
  const HOV_LIGHT  = '#d63078';

  useEffect(() => {
    const TRAIL = 8;
    trailEls.current = Array.from({ length: TRAIL }, (_, i) => {
      const el = document.createElement('div');
      el.style.cssText = `position:fixed;pointer-events:none;z-index:99990;
        width:${5 - i*0.4}px;height:${5 - i*0.4}px;border-radius:50%;
        transform:translate(-50%,-50%);opacity:${0.55 - i*0.06};mix-blend-mode:screen;`;
      document.body.appendChild(el);
      return el;
    });
    const trail = Array.from({ length: TRAIL }, () => ({ x:-200, y:-200 }));

    const onMove = (e) => {
      state.current.x = e.clientX;
      state.current.y = e.clientY;
      const el = document.elementFromPoint(e.clientX, e.clientY);
      state.current.hovering = !!(el && (
        el.tagName==='BUTTON'||el.tagName==='A'||el.closest('button')||el.closest('a')
      ));
    };
    const onDown = () => { state.current.clicking = true; };
    const onUp   = () => { state.current.clicking = false; };

    window.addEventListener('mousemove', onMove, { passive:true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup',   onUp);

    const animate = () => {
      const { x, y, clicking, hovering } = state.current;
      state.current.rx += (x - state.current.rx) * 0.1;
      state.current.ry += (y - state.current.ry) * 0.1;

      const dark = document.body.style.background?.includes('04040f');
      const dotC  = hovering ? (dark ? HOV_DARK  : HOV_LIGHT)  : (dark ? DOT_DARK  : DOT_LIGHT);
      const ringC = hovering ? (dark ? 'rgba(255,107,107,0.85)' : 'rgba(214,48,120,0.85)')
                             : (dark ? RING_DARK : RING_LIGHT);

      if (dotEl.current) {
        dotEl.current.style.left       = `${x}px`;
        dotEl.current.style.top        = `${y}px`;
        dotEl.current.style.background = dotC;
        dotEl.current.style.boxShadow  = `0 0 ${clicking?6:22}px ${dotC}, 0 0 ${clicking?2:8}px ${dotC}`;
        dotEl.current.style.width      = `${clicking ? 5 : hovering ? 13 : 9}px`;
        dotEl.current.style.height     = `${clicking ? 5 : hovering ? 13 : 9}px`;
      }
      if (ringEl.current) {
        ringEl.current.style.left        = `${state.current.rx}px`;
        ringEl.current.style.top         = `${state.current.ry}px`;
        const sz = clicking ? 18 : hovering ? 58 : 36;
        ringEl.current.style.width       = `${sz}px`;
        ringEl.current.style.height      = `${sz}px`;
        ringEl.current.style.borderColor = ringC;
        ringEl.current.style.boxShadow   = `0 0 14px ${ringC}, inset 0 0 8px ${ringC}44`;
        ringEl.current.style.background  = hovering
          ? `radial-gradient(circle,${ringC}18 0%,transparent 70%)` : 'transparent';
      }

      trail.unshift({ x, y });
      trail.length = TRAIL;
      trailEls.current.forEach((el, i) => {
        if (!el || !trail[i]) return;
        el.style.left       = `${trail[i].x}px`;
        el.style.top        = `${trail[i].y}px`;
        el.style.background = dotC;
        el.style.boxShadow  = `0 0 6px ${dotC}`;
      });

      rafId.current = requestAnimationFrame(animate);
    };
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup',   onUp);
      cancelAnimationFrame(rafId.current);
      trailEls.current.forEach(el => el?.remove());
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dotColor  = isDark ? DOT_DARK  : DOT_LIGHT;
  const ringColor = isDark ? RING_DARK : RING_LIGHT;

  return (
    <>
      <div ref={dotEl} style={{
        position:'fixed', zIndex:99999, pointerEvents:'none',
        width:9, height:9, borderRadius:'50%',
        background:dotColor, boxShadow:`0 0 22px ${dotColor}, 0 0 8px ${dotColor}`,
        transform:'translate(-50%,-50%)', mixBlendMode:'screen',
        transition:'width 0.1s, height 0.1s',
      }} />
      <div ref={ringEl} style={{
        position:'fixed', zIndex:99998, pointerEvents:'none',
        width:36, height:36, borderRadius:'50%',
        border:`1.5px solid ${ringColor}`,
        boxShadow:`0 0 14px ${ringColor}, inset 0 0 8px ${ringColor}44`,
        transform:'translate(-50%,-50%)',
        transition:'width 0.15s cubic-bezier(0.22,1,0.36,1), height 0.15s cubic-bezier(0.22,1,0.36,1), border-color 0.2s, box-shadow 0.2s',
      }} />
    </>
  );
}