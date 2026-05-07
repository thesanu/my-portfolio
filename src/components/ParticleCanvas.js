import { useEffect, useRef } from 'react';

export default function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let W, H, animId;
    let mouse = { x:-9999, y:-9999 };
    let frame = 0;

    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    resize();

    const COLORS = ['#7c6aff','#00ffcc','#ff6b6b','#ffd166','#a78bfa'];
    const N = 55;
    const particles = Array.from({ length: N }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random()-0.5)*0.5, vy: (Math.random()-0.5)*0.5,
      r: Math.random()*1.8+0.5,
      color: COLORS[Math.floor(Math.random()*COLORS.length)],
      alpha: Math.random()*0.4+0.1,
    }));

    const CHARS = 'アイウエオカキクケコ01アBCDEF<>{}[]ASHUTOSH.NET#$%';
    const FONT  = 11;
    let cols, drops = [];
    const resetMatrix = () => {
      cols = Math.floor(W / FONT);
      drops = Array.from({ length: cols }, () => Math.random() * -100);
    };
    resetMatrix();

    const onMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onResize = () => { resize(); resetMatrix(); };
    window.addEventListener('mousemove', onMove, { passive:true });
    window.addEventListener('resize', onResize);

    const draw = () => {
      frame++;
      ctx.clearRect(0, 0, W, H);
      const dark = !document.body.style.background?.includes('f0eeff');
      const matC = dark ? 'rgba(0,255,204,' : 'rgba(91,77,224,';

      // Matrix rain every 2 frames
      if (frame % 2 === 0) {
        ctx.font = `${FONT}px 'Space Mono',monospace`;
        for (let i = 0; i < drops.length; i++) {
          const y = drops[i] * FONT;
          ctx.fillStyle = dark ? 'rgba(180,255,240,0.55)' : 'rgba(160,140,255,0.45)';
          ctx.fillText(CHARS[Math.floor(Math.random()*CHARS.length)], i*FONT, y);
          for (let t = 1; t <= 6; t++) {
            const a = (0.18 - t*0.025) * (dark ? 1 : 0.65);
            if (a <= 0) continue;
            ctx.fillStyle = `${matC}${a.toFixed(2)})`;
            ctx.fillText(CHARS[Math.floor(Math.random()*CHARS.length)], i*FONT, y - t*FONT);
          }
          if (y > H && Math.random() > 0.975) drops[i] = 0;
          drops[i] += 0.4;
        }
      }

      // Particle connections
      for (let i = 0; i < N; i++) {
        for (let j = i+1; j < N; j++) {
          const dx = particles[i].x-particles[j].x, dy = particles[i].y-particles[j].y;
          const d = Math.sqrt(dx*dx+dy*dy);
          if (d < 130) {
            ctx.save();
            ctx.globalAlpha = (1-d/130)*0.14*(dark?1:0.55);
            ctx.strokeStyle = dark ? '#7c6aff' : '#5b4de0';
            ctx.lineWidth = 0.5;
            ctx.beginPath(); ctx.moveTo(particles[i].x,particles[i].y); ctx.lineTo(particles[j].x,particles[j].y); ctx.stroke();
            ctx.restore();
          }
        }
        const mx=particles[i].x-mouse.x, my=particles[i].y-mouse.y;
        const md=Math.sqrt(mx*mx+my*my);
        if (md < 200) {
          ctx.save();
          ctx.globalAlpha = (1-md/200)*0.32;
          ctx.strokeStyle = dark ? '#00ffcc' : '#5b4de0';
          ctx.lineWidth = 0.6;
          ctx.setLineDash([3,6]);
          ctx.beginPath(); ctx.moveTo(particles[i].x,particles[i].y); ctx.lineTo(mouse.x,mouse.y); ctx.stroke();
          ctx.setLineDash([]);
          ctx.restore();
        }
      }

      // Draw particles
      particles.forEach(p => {
        ctx.save();
        ctx.globalAlpha = p.alpha*(dark?1:0.55);
        ctx.fillStyle = p.color; ctx.shadowColor = p.color; ctx.shadowBlur = 8;
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill();
        ctx.restore();
        p.x+=p.vx; p.y+=p.vy;
        if(p.x<0)p.x=W; if(p.x>W)p.x=0; if(p.y<0)p.y=H; if(p.y>H)p.y=0;
        const ex=p.x-mouse.x,ey=p.y-mouse.y,ed=Math.sqrt(ex*ex+ey*ey);
        if(ed<110){p.vx+=(ex/ed)*0.1;p.vy+=(ey/ed)*0.1;}
        p.vx*=0.994; p.vy*=0.994;
        if(Math.abs(p.vx)<0.1)p.vx+=(Math.random()-0.5)*0.12;
        if(Math.abs(p.vy)<0.1)p.vy+=(Math.random()-0.5)*0.12;
      });

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position:'fixed', inset:0, zIndex:0, pointerEvents:'none', opacity:0.65 }} />;
}