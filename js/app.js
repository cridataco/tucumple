/* =========================================================
   La experiencia: portada → preguntas → túnel → cartas →
   su espacio → nebulosa final.
   ========================================================= */
(function () {
  const C = window.CONTENT, CFG = window.CONFIG, A = window.Ambient, S = window.Scene;
  const $ = (s) => document.querySelector(s);
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- utilidades ---------------- */
  const ease = { io: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2), out: (t) => 1 - Math.pow(1 - t, 3), in: (t) => t * t * t };
  function tween(obj, key, to, ms, fn = ease.io) {
    const from = obj[key], t0 = performance.now();
    return new Promise((res) => {
      (function step(now) {
        const k = Math.min(1, (now - t0) / ms);
        obj[key] = from + (to - from) * fn(k);
        k < 1 ? requestAnimationFrame(step) : res();
      })(t0);
    });
  }
  function splitWords(el, text, base = 0, step = 0.055) {
    el.innerHTML = "";
    let i = 0;
    text.split(/(\s+)/).forEach((w) => {
      if (!w) return;
      if (/^\s+$/.test(w)) { el.appendChild(document.createTextNode(" ")); return; }
      const outer = document.createElement("span"); outer.className = "word";
      const inner = document.createElement("span"); inner.textContent = w;
      inner.style.setProperty("--d", (base + i * step).toFixed(3) + "s");
      outer.appendChild(inner); el.appendChild(outer); i++;
    });
    return i;
  }
  const roman = (n) => ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"][n - 1] || n;

  let current = $("#s-intro");
  async function go(id, { veil = false, dark = false } = {}) {
    const next = $(id);
    const v = $("#veil");
    if (veil) { v.classList.toggle("dark", dark); v.classList.add("on"); await wait(1300); }
    current.classList.remove("active");
    next.classList.add("active");
    current = next;
    if (veil) { await wait(300); v.classList.remove("on"); }
  }

  /* ---------------- partículas (canvas 2D) ---------------- */
  const fx = $("#fx"), ctx = fx.getContext("2d");
  let W = 0, H = 0, DPR = Math.min(devicePixelRatio || 1, 2);
  function fxResize() { W = innerWidth; H = innerHeight; fx.width = W * DPR; fx.height = H * DPR; ctx.setTransform(DPR, 0, 0, DPR, 0, 0); }
  addEventListener("resize", fxResize); fxResize();

  const sprite = (() => {
    const c = document.createElement("canvas"); c.width = c.height = 64;
    const g = c.getContext("2d"), gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    gr.addColorStop(0, "rgba(255,244,222,1)"); gr.addColorStop(0.25, "rgba(255,220,170,.55)"); gr.addColorStop(1, "rgba(255,200,140,0)");
    g.fillStyle = gr; g.fillRect(0, 0, 64, 64); return c;
  })();

  const P = {
    mode: "motes", motesRise: 0.15,
    motes: Array.from({ length: innerWidth < 700 ? 45 : 80 }, () => ({
      x: Math.random(), y: Math.random(), r: 0.5 + Math.random() * 2.2, s: 0.2 + Math.random(), ph: Math.random() * 6.28,
    })),
    warp: Array.from({ length: 220 }, () => newWarp(true)), warpOn: 0,
    stars: [], sparks: [], lanterns: [],
  };
  function newWarp(rand) { return { x: (Math.random() - 0.5) * 2, y: (Math.random() - 0.5) * 2, z: rand ? Math.random() : 1, pz: 1 }; }

  let lastT = performance.now();
  function fxLoop(now) {
    const dt = Math.min(0.05, (now - lastT) / 1000); lastT = now;
    ctx.clearRect(0, 0, W, H);
    ctx.globalCompositeOperation = "lighter";
    const t = now / 1000;

    // motas flotantes
    const mAlpha = 1 - P.warpOn;
    if (mAlpha > 0.01) {
      for (const m of P.motes) {
        m.y -= (0.004 + m.s * 0.006) * P.motesRise * dt * 6;
        m.x += Math.sin(t * 0.3 + m.ph) * 0.00012;
        if (m.y < -0.05) { m.y = 1.05; m.x = Math.random(); }
        const a = (0.25 + 0.35 * Math.sin(t * m.s + m.ph) ** 2) * mAlpha;
        const s = m.r * 6;
        ctx.globalAlpha = a; ctx.drawImage(sprite, m.x * W - s / 2, m.y * H - s / 2, s, s);
      }
    }
    // estelas del túnel
    if (P.warpOn > 0.01) {
      const sp = 0.25 + S.speed * 0.35, cx = W / 2, cy = H / 2, f = Math.max(W, H) * 0.5;
      ctx.lineCap = "round";
      for (const w of P.warp) {
        w.pz = w.z; w.z -= sp * dt;
        if (w.z <= 0.02) { Object.assign(w, newWarp(false)); continue; }
        const x = cx + (w.x / w.z) * f * 0.35, y = cy + (w.y / w.z) * f * 0.35;
        const px = cx + (w.x / w.pz) * f * 0.35, py = cy + (w.y / w.pz) * f * 0.35;
        const a = Math.min(1, (1 - w.z) * 1.4) * P.warpOn;
        ctx.globalAlpha = a * 0.8;
        ctx.strokeStyle = w.x > 0 ? "rgba(255,214,160,1)" : "rgba(170,235,225,1)";
        ctx.lineWidth = (1 - w.z) * 2.2;
        ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(x, y); ctx.stroke();
      }
    }
    // linternas (sus palabras subiendo)
    for (let i = P.lanterns.length - 1; i >= 0; i--) {
      const L = P.lanterns[i];
      L.y += L.vy * dt; L.vy *= 0.995; L.x += Math.sin(t * 1.3 + L.ph) * 0.3;
      if (L.y < L.ty) { L.vy *= 0.9; }
      const s = 60 + Math.sin(t * 3) * 6;
      ctx.globalAlpha = 0.9; ctx.drawImage(sprite, L.x - s / 2, L.y - s / 2, s, s);
      ctx.globalAlpha = 0.5; ctx.drawImage(sprite, L.x - s, L.y - s, s * 2, s * 2);
      if (Math.random() < 0.5) P.sparks.push({ x: L.x, y: L.y, vx: (Math.random() - 0.5) * 20, vy: 20 + Math.random() * 30, life: 1, r: 1 + Math.random() * 2 });
    }
    // constelación
    if (P.stars.length) {
      ctx.globalAlpha = 0.35; ctx.strokeStyle = "rgba(248,226,176,1)"; ctx.lineWidth = 0.8;
      ctx.beginPath();
      for (let i = 1; i < P.stars.length; i++) {
        const a = P.stars[i - 1], b = P.stars[i];
        const k = Math.min(1, (now - b.born) / 1200);
        ctx.moveTo(a.x * W, a.y * H);
        ctx.lineTo((a.x + (b.x - a.x) * k) * W, (a.y + (b.y - a.y) * k) * H);
      }
      ctx.stroke();
      for (const s of P.stars) {
        const age = (now - s.born) / 1000;
        const pop = age < 0.6 ? 1 + (1 - age / 0.6) * 2.5 : 1;
        const tw = 0.75 + 0.25 * Math.sin(t * 2 + s.ph);
        const r = 26 * pop * tw;
        ctx.globalAlpha = 0.95; ctx.drawImage(sprite, s.x * W - r / 2, s.y * H - r / 2, r, r);
        // destello en cruz
        ctx.globalAlpha = 0.5 * tw; ctx.strokeStyle = "rgba(255,240,215,1)"; ctx.lineWidth = 1;
        const L = 14 * pop * tw;
        ctx.beginPath(); ctx.moveTo(s.x * W - L, s.y * H); ctx.lineTo(s.x * W + L, s.y * H);
        ctx.moveTo(s.x * W, s.y * H - L); ctx.lineTo(s.x * W, s.y * H + L); ctx.stroke();
      }
    }
    // chispas
    for (let i = P.sparks.length - 1; i >= 0; i--) {
      const p = P.sparks[i];
      p.x += p.vx * dt; p.y -= p.vy * dt; p.vx *= 0.98; p.vy *= 0.985; p.life -= dt * (p.decay || 0.7);
      if (p.life <= 0) { P.sparks.splice(i, 1); continue; }
      const s = p.r * 6;
      ctx.globalAlpha = p.life; ctx.drawImage(sprite, p.x - s / 2, p.y - s / 2, s, s);
    }
    ctx.globalAlpha = 1; ctx.globalCompositeOperation = "source-over";
    requestAnimationFrame(fxLoop);
  }
  requestAnimationFrame(fxLoop);

  function burst(x, y, n = 24, spread = 120) {
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2, v = Math.random() * spread;
      P.sparks.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, life: 1, r: 0.6 + Math.random() * 1.6, decay: 0.8 + Math.random() * 0.6 });
    }
  }

  /* luz que sigue al cursor */
  const cl = $("#cursorLight");
  addEventListener("pointermove", (e) => { cl.style.transform = `translate(${e.clientX}px,${e.clientY}px)`; }, { passive: true });

  /* ---------------- registro de respuestas ---------------- */
  const record = { inicio: new Date().toISOString(), respuestas: [], mensaje: "", estrellas: 0 };
  const save = () => { try { localStorage.setItem("karen-cumple", JSON.stringify(record)); } catch (e) {} };
  function summary() {
    const lines = record.respuestas.map((r, i) => `${i + 1}. ${r.pregunta}\n   → ${r.respuesta}`);
    let s = `Respuestas de ${C.nombre} ✦\n\n${lines.join("\n\n")}`;
    s += `\n\nSu mensaje:\n${record.mensaje ? record.mensaje : "(prefirió seguir su camino en silencio)"}`;
    return s;
  }
  let sent = false;
  function formData() {
    const fd = new FormData();
    fd.append("_subject", `${C.nombre} respondió tu sorpresa de cumpleaños ✦`);
    record.respuestas.forEach((r, i) => fd.append(`${String(i + 1).padStart(2, "0")}. ${r.pregunta}`, r.respuesta));
    fd.append("Su mensaje", record.mensaje || "(prefirió seguir su camino en silencio)");
    fd.append("Fecha", new Date().toLocaleString("es-CO"));
    return fd;
  }
  async function send() {
    save();
    if (sent || !CFG.formspreeId) return;
    sent = true;
    try { await fetch(`https://formspree.io/f/${CFG.formspreeId}`, { method: "POST", body: formData(), headers: { Accept: "application/json" } }); }
    catch (e) { sent = false; }
  }
  // si cierra la página a mitad de camino, igual te llega lo que alcanzó a responder
  addEventListener("pagehide", () => {
    if (!sent && CFG.formspreeId && record.respuestas.length && navigator.sendBeacon) {
      record.respuestas.push({ pregunta: "(nota)", respuesta: "Cerró la página antes de terminar" });
      navigator.sendBeacon(`https://formspree.io/f/${CFG.formspreeId}`, formData()); sent = true;
    }
  });

  /* ---------------- PORTADA ---------------- */
  (function buildIntro() {
    const svg = $("#sunburst"), NS = "http://www.w3.org/2000/svg";
    const g = document.createElementNS(NS, "g"); g.setAttribute("class", "spin");
    const N = 64;
    for (let i = 0; i < N; i++) {
      const a = (i / N) * Math.PI * 2, r0 = i % 2 ? 190 : 150, r1 = i % 4 === 0 ? 490 : i % 2 ? 360 : 430;
      const l = document.createElementNS(NS, "line");
      l.setAttribute("x1", Math.cos(a) * r0); l.setAttribute("y1", Math.sin(a) * r0);
      l.setAttribute("x2", Math.cos(a) * r1); l.setAttribute("y2", Math.sin(a) * r1);
      l.setAttribute("class", "ray"); l.setAttribute("pathLength", "1");
      l.style.setProperty("--len", 1); l.style.setProperty("--d", (0.2 + (i % 16) * 0.06).toFixed(2) + "s");
      g.appendChild(l);
    }
    [130, 140, 300, 470].forEach((r, i) => {
      const c = document.createElementNS(NS, "circle");
      c.setAttribute("r", r); c.setAttribute("class", "arc"); c.setAttribute("pathLength", "1");
      if (i === 2) c.setAttribute("stroke-dasharray", "0.004 0.012");
      c.style.setProperty("--len", 1); c.style.setProperty("--d", 0.4 + i * 0.3 + "s");
      g.appendChild(c);
    });
    svg.appendChild(g);

    const tn = $("#titleName");
    [...C.nombre].forEach((ch, i) => {
      const s = document.createElement("span"); s.className = "ch"; s.textContent = ch;
      s.style.setProperty("--d", (0.6 + i * 0.13).toFixed(2) + "s"); tn.appendChild(s);
    });
    $("#titleSur").textContent = C.apellido;
  })();

  /* mantener presionado para entrar */
  (function holdToEnter() {
    const btn = $("#enterBtn"), fill = $("#holdFill"), CIRC = 339.3, DUR = 1500;
    let prog = 0, holding = false, done = false, last = 0;
    function frame(now) {
      const dt = now - last; last = now;
      prog += holding ? dt / DUR : -dt / 600;
      prog = Math.max(0, Math.min(1, prog));
      fill.style.strokeDashoffset = CIRC * (1 - prog);
      S.flash = prog * 0.12;
      if (prog >= 1 && !done) { done = true; S.flash = 0; enter(); return; }
      if (prog > 0 || holding) requestAnimationFrame(frame);
    }
    const down = (e) => {
      if (done) return; e.preventDefault(); holding = true; btn.classList.add("holding");
      try { A.init(); } catch (err) {}
      last = performance.now(); requestAnimationFrame(frame);
    };
    const up = () => { holding = false; btn.classList.remove("holding"); if (A.ctx && A.ctx.state !== "running") A.ctx.resume(); };
    btn.addEventListener("pointerdown", down);
    addEventListener("pointerup", up); addEventListener("pointercancel", up);
    btn.addEventListener("keydown", (e) => { if ((e.key === "Enter" || e.key === " ") && !done) { e.preventDefault(); try { A.init(); } catch (err) {} done = true; enter(); } });
  })();

  // iOS: desbloquear el audio en el primer toque
  ["touchend", "click"].forEach((ev) => addEventListener(ev, () => { if (A.ctx && A.ctx.state === "suspended" && !document.hidden) A.ctx.resume(); }, { passive: true }));

  const soundBtn = $("#soundBtn");
  soundBtn.addEventListener("click", () => soundBtn.classList.toggle("muted", A.toggle()));
  document.addEventListener("visibilitychange", () => A.suspend(document.hidden));

  async function enter() {
    soundBtn.hidden = false;
    A.setPhase("quiz");
    burst(innerWidth / 2, innerHeight * 0.62, 50, 260);
    tween(S, "flash", 0.35, 300, ease.out).then(() => tween(S, "flash", 0, 1600));
    await go("#s-quiz");
    buildProgress();
    showQuestion(0);
  }

  /* ---------------- PREGUNTAS ---------------- */
  const Q = C.preguntas;
  let qi = 0, dodges = 0;
  const qText = $("#qText"), qTone = $("#qTone"), qBtns = $("#qButtons"), btnSi = $("#btnSi"), btnNo = $("#btnNo"),
    qAns = $("#qAnswer"), qNext = $("#qNext"), qCount = $("#qCount"), stage = document.querySelector(".quiz-stage");

  function buildProgress() {
    const pr = $("#progress"); pr.innerHTML = "";
    Q.forEach((_, i) => {
      const d = document.createElement("span"); d.className = "dot"; pr.appendChild(d);
      if (i < Q.length - 1) { const s = document.createElement("span"); s.className = "seg"; pr.appendChild(s); }
    });
  }
  function updateProgress() {
    const dots = document.querySelectorAll("#progress .dot"), segs = document.querySelectorAll("#progress .seg");
    dots.forEach((d, i) => { d.classList.toggle("done", i < qi); d.classList.toggle("now", i === qi); });
    segs.forEach((s, i) => s.classList.toggle("done", i < qi));
    qCount.textContent = `${roman(qi + 1)} / ${roman(Q.length)}`;
  }

  async function showQuestion(i) {
    qi = i; dodges = 0;
    const q = Q[i];
    updateProgress();
    stage.classList.toggle("long-mode", !!q.larga);
    qTone.textContent = q.tono || ""; qTone.classList.remove("on");
    qText.classList.remove("hide", "shown"); qText.style.display = "";
    const n = splitWords(qText, q.q, 0.15, 0.06);
    qAns.className = "q-answer"; qAns.innerHTML = "";
    qNext.hidden = true; qNext.classList.remove("on");
    const [l1, l2] = q.etiquetas || ["Sí", "No"];
    btnSi.querySelector("span").textContent = l1; btnNo.querySelector("span").textContent = l2;
    btnNo.style.transform = ""; btnNo.classList.toggle("runaway", !!q.escurridizo);
    qBtns.classList.remove("on", "off");
    await wait(50);
    qTone.classList.add("on");
    qText.classList.add("shown");
    await wait(Math.min(2600, 500 + n * 60));
    qBtns.classList.add("on");
    btnSi.focus({ preventScroll: true });
  }

  let answering = false;
  async function answer(choice) {
    if (answering) return; answering = true;
    const q = Q[qi];
    const label = choice === "si" ? (q.etiquetas || ["Sí"])[0] : (q.etiquetas || ["Sí", "No"])[1];
    let respuesta = label, shown = label;
    if (choice === "no" && q.escurridizo && dodges >= 4) { respuesta = "Intentó decir que no, pero el botón huyó 4 veces ;)"; shown = "Bueno… sí"; }
    record.respuestas.push({ pregunta: q.q, respuesta }); save();
    A.chime(choice === "si");
    const r = (choice === "si" ? btnSi : btnNo).getBoundingClientRect();
    burst(r.left + r.width / 2, r.top + r.height / 2, 30, 160);

    qBtns.classList.remove("on"); qBtns.classList.add("off");
    await wait(450);
    const text = choice === "si" ? q.si : q.no;
    const tag = document.createElement("span"); tag.className = "choice"; tag.textContent = "— " + shown + " —";
    if (q.larga) {
      qAns.classList.add("long");
      qAns.appendChild(tag);
      text.split(/\n\n+/).forEach((para, pi) => {
        const p = document.createElement("p"); splitWords(p, para, 0.2 + pi * 1.1, 0.018); qAns.appendChild(p);
      });
      qText.classList.add("hide");
      setTimeout(() => (qText.style.display = "none"), 650);
    } else {
      qAns.appendChild(tag);
      const body = document.createElement("span"); splitWords(body, text, 0.2, 0.045); qAns.appendChild(body);
    }
    requestAnimationFrame(() => qAns.classList.add("shown"));
    const words = text.split(/\s+/).length;
    await wait(Math.min(q.larga ? 4200 : 3200, 700 + words * (q.larga ? 18 : 45)));
    qNext.hidden = false;
    requestAnimationFrame(() => qNext.classList.add("on"));
    if (qi === Q.length - 1) qNext.firstChild.textContent = "Cruzar ";
    else qNext.firstChild.textContent = "Continuar ";
    answering = false;
  }

  btnSi.addEventListener("click", () => answer("si"));
  btnNo.addEventListener("click", (e) => {
    if (Q[qi].escurridizo && dodges < 4) { e.preventDefault(); dodge(); return; }
    answer("no");
  });
  function dodge() {
    dodges++;
    const sw = stage.clientWidth;
    const x = (Math.random() - 0.5) * Math.min(sw * 0.8, 520), y = (Math.random() - 0.5) * 180 - 40;
    btnNo.style.transform = `translate(${x}px, ${y}px) rotate(${(Math.random() - 0.5) * 16}deg)`;
    if (dodges >= 4) {
      btnNo.querySelector("span").textContent = "Bueno… sí";
      setTimeout(() => (btnNo.style.transform = ""), 500);
    }
    A.chime(false);
  }
  btnNo.addEventListener("pointerenter", (e) => { if (e.pointerType === "mouse" && Q[qi].escurridizo && dodges < 4 && !answering) dodge(); });

  qNext.addEventListener("click", async () => {
    qNext.classList.remove("on");
    qText.classList.add("hide");
    qAns.style.transition = "opacity .7s, filter .7s"; qAns.style.opacity = "0"; qAns.style.filter = "blur(8px)";
    qTone.classList.remove("on");
    await wait(750);
    qAns.style.opacity = ""; qAns.style.filter = ""; qAns.style.transition = "";
    if (qi < Q.length - 1) showQuestion(qi + 1);
    else { qi = Q.length; updateProgress(); tunnel(); }
  });

  /* ---------------- TÚNEL ---------------- */
  async function tunnel() {
    A.setPhase("tunnel");
    await go("#s-tunnel");
    const box = $("#tunnelWords"), phrase = $("#tunnelPhrase");
    S.speed = 0.25;
    tween(S, "tunnel", 1, 3500);
    tween(P, "warpOn", 1, 4000);
    tween(S, "speed", 3.2, 19000, ease.in);

    // palabras que vienen hacia ti
    const words = [];
    let running = true, wi = 0;
    const spawn = setInterval(() => {
      const el = document.createElement("span"); el.className = "tw";
      el.textContent = C.tunel[wi++ % C.tunel.length];
      const ang = Math.random() * Math.PI * 2;
      el.style.fontSize = 18 + Math.random() * 14 + "px";
      box.appendChild(el);
      words.push({ el, ang, z: 1, rad: 0.55 + Math.random() * 0.35 });
    }, 700);
    (function wloop() {
      if (!running) return;
      const sp = 0.12 + S.speed * 0.05;
      for (let i = words.length - 1; i >= 0; i--) {
        const w = words[i]; w.z -= sp / 60;
        if (w.z <= 0.06) { w.el.remove(); words.splice(i, 1); continue; }
        const k = 1 / w.z, R = Math.min(innerWidth, innerHeight) * 0.18 * w.rad * k;
        const x = Math.cos(w.ang) * R, y = Math.sin(w.ang) * R;
        const op = Math.min(1, (1 - w.z) * 2.2) * Math.min(1, (w.z - 0.06) * 6);
        w.el.style.opacity = op;
        w.el.style.transform = `translate(-50%,-50%) translate(${x}px,${y}px) scale(${0.35 + k * 0.25})`;
        w.el.style.filter = w.z < 0.25 ? `blur(${(0.25 - w.z) * 14}px)` : "none";
      }
      requestAnimationFrame(wloop);
    })();

    for (const f of C.tunelFrases) {
      phrase.textContent = f; phrase.classList.add("on");
      await wait(reduce ? 2200 : 3300);
      phrase.classList.remove("on");
      await wait(1100);
    }
    await tween(S, "end", 1, 3500, ease.in);
    clearInterval(spawn);
    const v = $("#veil"); v.classList.remove("dark"); v.classList.add("on");
    await wait(1500);
    running = false; box.innerHTML = "";
    S.tunnel = 0; S.end = 0; S.speed = 0.15; P.warpOn = 0; S.warm = 0.1;
    A.setPhase("letters");
    buildLetters();
    current.classList.remove("active"); $("#s-letters").classList.add("active"); current = $("#s-letters");
    await wait(400);
    v.classList.remove("on");
  }

  /* ---------------- CARTAS ---------------- */
  let lettersBuilt = false;
  function buildLetters() {
    if (lettersBuilt) return; lettersBuilt = true;
    const root = $("#lettersBody"), scroller = $("#s-letters");
    const cartas = C.cartas.filter((c) => c.mostrar !== false);
    cartas.forEach((c, i) => {
      const art = document.createElement("article"); art.className = "letter";
      art.innerHTML = `<div class="letter-num" aria-hidden="true">${roman(i + 1)}</div>
        <div class="letter-meta"><p class="letter-date"></p><h3 class="letter-title"></h3></div>
        <div class="letter-body"></div>
        <div class="divider" aria-hidden="true">✦ ✦ ✦</div>`;
      art.querySelector(".letter-date").textContent = c.fecha || "";
      art.querySelector(".letter-title").textContent = c.titulo || "";
      const body = art.querySelector(".letter-body");
      c.texto.split(/\n\s*\n/).forEach((para) => { const p = document.createElement("p"); p.textContent = para.trim(); body.appendChild(p); });
      root.appendChild(art);
      if (c.cita) {
        const pull = document.createElement("div"); pull.className = "pull";
        const q = document.createElement("q"); q.textContent = c.cita; pull.appendChild(q);
        root.appendChild(pull);
      }
    });

    const io = new IntersectionObserver((ents) => ents.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); if (e.target.classList.contains("pull")) A.chime(true); }
    }), { root: scroller, threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
    root.querySelectorAll(".letter-body p, .pull").forEach((el) => io.observe(el));

    const fill = $("#threadFill"), nums = [...root.querySelectorAll(".letter-num")];
    let lastTop = 0, ticking = false;
    scroller.addEventListener("scroll", () => {
      if (ticking) return; ticking = true;
      requestAnimationFrame(() => {
        const max = scroller.scrollHeight - scroller.clientHeight, k = max > 0 ? scroller.scrollTop / max : 0;
        fill.style.transform = `scaleY(${k})`;
        S.warm = 0.1 + k * 0.75;
        const v = Math.abs(scroller.scrollTop - lastTop); lastTop = scroller.scrollTop;
        P.motesRise = 0.15 + Math.min(v * 0.08, 2.5);
        nums.forEach((n) => { const r = n.parentElement.getBoundingClientRect(); n.style.transform = `translateX(-50%) translateY(${r.top * -0.18}px)`; });
        ticking = false;
      });
    }, { passive: true });
    setInterval(() => { P.motesRise += (0.15 - P.motesRise) * 0.2; }, 100);
  }

  $("#toVoice").addEventListener("click", async () => {
    A.setPhase("voice");
    tween(S, "warm", 0.35, 2500);
    await go("#s-voice", { veil: true, dark: true });
    setTimeout(() => $("#herText").focus({ preventScroll: true }), 1400);
  });

  /* ---------------- SU ESPACIO ---------------- */
  const ta = $("#herText");
  $("#sendText").addEventListener("click", async () => {
    const txt = ta.value.trim();
    if (!txt) {
      ta.placeholder = "Puedes escribir lo que quieras… o simplemente seguir tu camino.";
      ta.animate([{ transform: "translateX(0)" }, { transform: "translateX(-8px)" }, { transform: "translateX(8px)" }, { transform: "translateX(0)" }], { duration: 380 });
      ta.focus(); return;
    }
    record.mensaje = txt; save();
    const r = ta.getBoundingClientRect();
    for (let i = 0; i < 160; i++) {
      P.sparks.push({ x: r.left + Math.random() * r.width, y: r.top + Math.random() * r.height, vx: (Math.random() - 0.5) * 40, vy: 30 + Math.random() * 120, life: 1, r: 0.5 + Math.random() * 1.5, decay: 0.35 + Math.random() * 0.4 });
    }
    ta.classList.add("dissolve");
    A.chime(true);
    P.lanterns.push({ x: innerWidth / 2, y: r.top + r.height / 2, vy: -70, ty: innerHeight * 0.18, ph: Math.random() * 6 });
    send();
    await wait(2200);
    finale(true);
  });
  $("#skipText").addEventListener("click", () => { send(); finale(false); });

  /* ---------------- FINAL ---------------- */
  let finaleOn = false;
  async function finale(withMessage) {
    if (finaleOn) return; finaleOn = true;
    A.setPhase("final");
    tween(S, "nebula", 1, 5000);
    tween(S, "warm", 0, 3000);
    tween(S, "flash", 0.25, 600, ease.out).then(() => tween(S, "flash", 0, 2500));
    await go("#s-final");
    const F = C.final;
    const title = $("#finalTitle");
    [...F.titulo].forEach((ch, i) => {
      const s = document.createElement("span"); s.className = "ch"; s.textContent = ch === " " ? " " : ch;
      s.style.setProperty("--x", (Math.random() - 0.5) * 600 + "px");
      s.style.setProperty("--y", (Math.random() - 0.5) * 400 + "px");
      s.style.setProperty("--d", (0.1 + i * 0.07).toFixed(2) + "s");
      title.appendChild(s);
    });
    $("#finalName").textContent = C.nombre;
    $("#finalLine").textContent = F.linea;
    $("#finalInstr").textContent = F.instruccion;
    $("#signature").textContent = "— " + CFG.firma;
    document.querySelector(".final-k").style.opacity = 1;
    await wait(500); title.classList.add("on");
    await wait(2200); $("#finalName").classList.add("on");
    burst(innerWidth / 2, innerHeight * 0.45, 80, 320);
    await wait(2000); $("#finalLine").classList.add("on");

    // su linterna se vuelve la primera estrella
    if (withMessage && P.lanterns.length) {
      await wait(800);
      const L = P.lanterns.pop();
      addStar(L.x / innerWidth, L.y / innerHeight, true);
    }
    await wait(1800); $("#finalInstr").classList.add("on");
    starsEnabled = true;
    await wait(4500);
    $("#finalActions").style.opacity = 1; $("#signature").style.opacity = 1;
    if (CFG.whatsapp) {
      const wa = $("#waBtn"); wa.hidden = false;
      wa.href = `https://wa.me/${CFG.whatsapp}?text=${encodeURIComponent(summary())}`;
    }
  }

  let starsEnabled = false, constShown = false;
  function addStar(x, y, silent) {
    P.stars.push({ x, y, born: performance.now(), ph: Math.random() * 6 });
    if (P.stars.length > 40) P.stars.shift();
    record.estrellas++; save();
    burst(x * innerWidth, y * innerHeight, 26, 140);
    if (!silent) A.sparkle(x);
    if (!constShown && P.stars.length >= 4) { constShown = true; $("#finalConst").textContent = C.final.constelacion; $("#finalConst").classList.add("on"); }
  }
  $("#s-final").addEventListener("pointerdown", (e) => {
    if (!starsEnabled || e.target.closest("a,button")) return;
    addStar(e.clientX / innerWidth, e.clientY / innerHeight);
  });
  $("#restartBtn").addEventListener("click", () => location.reload());

  /* si WebGL no existe, al menos un fondo bonito */
  if (!S.ok) document.getElementById("gl").style.background = "radial-gradient(ellipse at 50% 0%,#1b4a57 0%,#04121a 70%)";
})();
