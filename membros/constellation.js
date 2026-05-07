// constellation.js — animação de fundo compartilhada entre todas as páginas

(function () {
  const canvas = document.getElementById("starfield");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let W, H, nodes = [];
  let mx = 0, my = 0;

  const CONNECT_DIST = 180;
  const MOUSE_ATTRACT = 120;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function initNodes() {
    const count = Math.max(Math.floor((W * H) / 18000), 18);
    nodes = Array.from({ length: count }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.1 + 0.4,
      baseO: Math.random() * 0.5 + 0.15,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.002 + 0.0006,
      anchor: Math.random() < 0.18,
      hue: Math.random() > 0.65 ? "168,127,212" : "220,210,240",
    }));
  }

  const CONSTELLATIONS = [[0, 3, 7], [5, 9, 14, 11], [2, 6, 10], [1, 4, 8, 12]];
  let constellationProgress = 0;
  let startTime = null;
  const REVEAL_DURATION = 3200;

  function draw(ts) {
    if (!startTime) startTime = ts;
    const elapsed = ts - startTime;
    constellationProgress = Math.min(elapsed / REVEAL_DURATION, 1);
    const eased = 1 - Math.pow(1 - constellationProgress, 3);

    ctx.clearRect(0, 0, W, H);

    nodes.forEach((n) => {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;
      n.x = Math.max(0, Math.min(W, n.x));
      n.y = Math.max(0, Math.min(H, n.y));
    });

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECT_DIST) {
          const mda = Math.hypot(a.x - mx, a.y - my);
          const mdb = Math.hypot(b.x - mx, b.y - my);
          const mouseBoost = mda < MOUSE_ATTRACT || mdb < MOUSE_ATTRACT ? 0.5 : 0;
          const o = Math.min((1 - dist / CONNECT_DIST) * 0.05 + mouseBoost * 0.18, 0.22);
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(168,127,212,${o})`;
          ctx.lineWidth = 0.4;
          ctx.stroke();
        }
      }
    }

    CONSTELLATIONS.forEach((group, gi) => {
      const groupDelay = gi / CONSTELLATIONS.length;
      const groupProgress = Math.max(0, Math.min(1, (eased - groupDelay * 0.5) / 0.6));
      for (let k = 0; k < group.length - 1; k++) {
        const a = nodes[group[k] % nodes.length];
        const b = nodes[group[k + 1] % nodes.length];
        const lp = Math.max(0, Math.min(1, (groupProgress - k * 0.15) / 0.6));
        if (lp <= 0) continue;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(a.x + (b.x - a.x) * lp, a.y + (b.y - a.y) * lp);
        ctx.strokeStyle = `rgba(200,170,240,${0.18 * lp})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    });

    nodes.forEach((n) => {
      const t = ts * n.speed + n.phase;
      const o = n.baseO * (0.55 + 0.45 * Math.sin(t));
      const md = Math.hypot(n.x - mx, n.y - my);
      const mouseO = md < MOUSE_ATTRACT ? (1 - md / MOUSE_ATTRACT) * 0.35 : 0;
      const finalO = Math.min(o + mouseO, 0.65);

      if (n.anchor) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${n.hue},${finalO})`;
        ctx.shadowBlur = 7;
        ctx.shadowColor = "rgba(168,127,212,0.3)";
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 0.7, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(240,235,255,${finalO * 0.8})`;
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${n.hue},${finalO * 0.7})`;
        ctx.fill();
      }
    });

    requestAnimationFrame(draw);
  }

  resize();
  initNodes();
  requestAnimationFrame(draw);

  window.addEventListener("resize", () => { resize(); initNodes(); });
  document.addEventListener("mousemove", (e) => { mx = e.clientX; my = e.clientY; });
})();
