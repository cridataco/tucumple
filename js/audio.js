/* =========================================================
   Música ambiental generada en vivo (Web Audio).
   Pad nostálgico + caja de música + crepitar de vinilo.
   Sin archivos de audio: pesa casi nada.
   ========================================================= */
(function () {
  const mtof = (m) => 440 * Math.pow(2, (m - 69) / 12);

  // Progresiones (MIDI). A: melancólica / B: luminosa para el final
  const PROG = {
    a: [
      [41, 53, 57, 60, 64],   // Fmaj7
      [40, 52, 55, 59, 62],   // Em7
      [38, 50, 53, 57, 64],   // Dm9
      [36, 48, 55, 59, 64],   // Cmaj7
      [34, 50, 53, 57, 60],   // Bbmaj7(#11-ish)
      [33, 49, 52, 57, 64],   // A
    ],
    b: [
      [38, 50, 54, 57, 61, 64], // Dmaj9
      [45, 49, 52, 57, 59, 64], // A(add9)
      [35, 50, 54, 57, 59, 62], // Bm7
      [43, 50, 54, 57, 59, 66], // Gmaj7(9)
    ],
  };

  class Ambient {
    constructor() { this.ready = false; this.muted = false; this.phase = "intro"; }

    init() {
      if (this.ready) return;
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      const ctx = (this.ctx = new AC());
      this.master = ctx.createGain(); this.master.gain.value = 0;
      const comp = ctx.createDynamicsCompressor();
      comp.threshold.value = -18; comp.ratio.value = 3;
      this.master.connect(comp).connect(ctx.destination);

      // Reverb (impulso generado)
      this.reverb = ctx.createConvolver();
      this.reverb.buffer = this._impulse(5.5, 2.4);
      this.wet = ctx.createGain(); this.wet.gain.value = 0.85;
      this.reverb.connect(this.wet).connect(this.master);

      // Bus del pad con filtro que "respira"
      this.padBus = ctx.createGain(); this.padBus.gain.value = 0.55;
      this.padFilter = ctx.createBiquadFilter();
      this.padFilter.type = "lowpass"; this.padFilter.frequency.value = 650; this.padFilter.Q.value = 0.6;
      const lfo = ctx.createOscillator(); lfo.frequency.value = 0.05;
      const lfoAmt = ctx.createGain(); lfoAmt.gain.value = 220;
      lfo.connect(lfoAmt).connect(this.padFilter.frequency); lfo.start();
      this.padBus.connect(this.padFilter);
      this.padFilter.connect(this.master);
      this.padFilter.connect(this.reverb);

      // Caja de música con eco
      this.bellBus = ctx.createGain(); this.bellBus.gain.value = 0.22;
      const delay = ctx.createDelay(2); delay.delayTime.value = 0.42;
      const fb = ctx.createGain(); fb.gain.value = 0.38;
      const dlp = ctx.createBiquadFilter(); dlp.type = "lowpass"; dlp.frequency.value = 2600;
      this.bellBus.connect(this.master); this.bellBus.connect(this.reverb);
      this.bellBus.connect(delay); delay.connect(dlp).connect(fb).connect(delay); dlp.connect(this.reverb);

      // Vinilo
      this.crackle = ctx.createGain(); this.crackle.gain.value = 0.0;
      const vs = ctx.createBufferSource(); vs.buffer = this._vinyl(); vs.loop = true;
      const hp = ctx.createBiquadFilter(); hp.type = "highpass"; hp.frequency.value = 900;
      vs.connect(hp).connect(this.crackle).connect(this.master); vs.start();

      this.prog = PROG.a; this.ci = 0; this.bellRate = 0.35; this.transpose = 0;
      this.ready = true;
      this.master.gain.setTargetAtTime(0.9, ctx.currentTime, 2.5);
      this._chord();
      this.chordTimer = setInterval(() => this._chord(), 9000);
      this._bellLoop();
    }

    _impulse(sec, decay) {
      const ctx = this.ctx, len = ctx.sampleRate * sec, buf = ctx.createBuffer(2, len, ctx.sampleRate);
      for (let c = 0; c < 2; c++) {
        const d = buf.getChannelData(c);
        for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay);
      }
      return buf;
    }
    _vinyl() {
      const ctx = this.ctx, len = ctx.sampleRate * 4, buf = ctx.createBuffer(1, len, ctx.sampleRate), d = buf.getChannelData(0);
      for (let i = 0; i < len; i++) {
        d[i] = (Math.random() * 2 - 1) * 0.012;
        if (Math.random() < 0.0004) { const a = Math.random() * 0.6; for (let k = 0; k < 30 && i + k < len; k++) d[i + k] += a * (Math.random() * 2 - 1) * Math.exp(-k / 6); }
      }
      return buf;
    }

    _chord() {
      if (!this.ready) return;
      const ctx = this.ctx, t = ctx.currentTime, chord = this.prog[this.ci % this.prog.length];
      this.ci++;
      const dur = 12.5;
      chord.forEach((m, idx) => {
        const note = m + this.transpose;
        const g = ctx.createGain(); g.gain.value = 0;
        const level = idx === 0 ? 0.16 : 0.06;
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(level, t + 3.5);
        g.gain.setValueAtTime(level, t + dur - 4.5);
        g.gain.linearRampToValueAtTime(0, t + dur);
        g.connect(this.padBus);
        const types = idx === 0 ? ["sine", "triangle"] : ["sawtooth", "triangle"];
        [-7, 7].forEach((det, j) => {
          const o = ctx.createOscillator();
          o.type = types[j]; o.frequency.value = mtof(note); o.detune.value = det + (Math.random() * 4 - 2);
          o.connect(g); o.start(t); o.stop(t + dur + 0.1);
        });
      });
      this.currentChord = chord;
    }

    _bell(m, when, vel = 1) {
      const ctx = this.ctx, t = when || ctx.currentTime, f = mtof(m);
      const g = ctx.createGain();
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.32 * vel, t + 0.005);
      g.gain.exponentialRampToValueAtTime(0.0008, t + 3.2);
      g.connect(this.bellBus);
      [[1, 1], [2.0, 0.35], [3.01, 0.12], [4.2, 0.05]].forEach(([r, a]) => {
        const o = ctx.createOscillator(); o.type = "sine"; o.frequency.value = f * r;
        const og = ctx.createGain(); og.gain.value = a;
        o.connect(og).connect(g); o.start(t); o.stop(t + 3.3);
      });
    }

    _bellLoop() {
      if (!this.ready) return;
      const wait = 600 + Math.random() * 1400 / Math.max(this.bellRate, 0.05);
      setTimeout(() => {
        if (this.currentChord && Math.random() < this.bellRate) {
          const pool = this.currentChord.slice(1);
          const m = pool[(Math.random() * pool.length) | 0] + 24 + this.transpose;
          this._bell(m, null, 0.5 + Math.random() * 0.5);
          if (Math.random() < 0.3) this._bell(m + (Math.random() < 0.5 ? 5 : 7), this.ctx.currentTime + 0.21, 0.4);
        }
        this._bellLoop();
      }, wait);
    }

    // Un "clic" de caja de música al responder
    chime(up = true) {
      if (!this.ready || !this.currentChord) return;
      const base = this.currentChord[1] + 24 + this.transpose, t = this.ctx.currentTime;
      const seq = up ? [0, 4, 7, 12] : [12, 7, 4, 0];
      seq.forEach((s, i) => this._bell(base + s, t + i * 0.09, 0.55));
    }

    setPhase(p) {
      if (!this.ready) { this.phase = p; return; }
      this.phase = p;
      const t = this.ctx.currentTime, f = this.padFilter.frequency, cr = this.crackle.gain;
      const S = (param, v, k = 2) => { param.cancelScheduledValues(t); param.setTargetAtTime(v, t, k); };
      if (p === "intro") { S(f, 650); this.bellRate = 0.3; S(cr, 0.0); }
      if (p === "quiz") { S(f, 900); this.bellRate = 0.45; S(cr, 0.15); }
      if (p === "tunnel") { S(f, 2600, 6); this.bellRate = 0.95; S(cr, 0.0); this._riser(20); }
      if (p === "letters") { S(f, 750, 3); this.bellRate = 0.25; S(cr, 0.4); }
      if (p === "voice") { S(f, 600, 3); this.bellRate = 0.15; S(cr, 0.25); }
      if (p === "final") {
        this.prog = PROG.b; this.ci = 0; S(f, 1600, 4); this.bellRate = 0.7; S(cr, 0.0);
        clearInterval(this.chordTimer); this._chord(); this.chordTimer = setInterval(() => this._chord(), 9000);
        this._swell();
      }
    }

    _riser(sec) {
      const ctx = this.ctx, t = ctx.currentTime;
      const src = ctx.createBufferSource(); const len = ctx.sampleRate * sec;
      const buf = ctx.createBuffer(1, len, ctx.sampleRate), d = buf.getChannelData(0);
      for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
      src.buffer = buf;
      const bp = ctx.createBiquadFilter(); bp.type = "bandpass"; bp.Q.value = 3;
      bp.frequency.setValueAtTime(180, t); bp.frequency.exponentialRampToValueAtTime(5200, t + sec - 1);
      const g = ctx.createGain(); g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.05, t + sec * 0.4);
      g.gain.linearRampToValueAtTime(0.14, t + sec - 1.2);
      g.gain.linearRampToValueAtTime(0, t + sec);
      src.connect(bp).connect(g); g.connect(this.reverb); g.connect(this.master);
      src.start(t); src.stop(t + sec);
      // grave que respira
      const o = ctx.createOscillator(); o.type = "sine";
      o.frequency.setValueAtTime(41, t); o.frequency.exponentialRampToValueAtTime(55, t + sec);
      const og = ctx.createGain(); og.gain.setValueAtTime(0, t); og.gain.linearRampToValueAtTime(0.18, t + sec * 0.8); og.gain.linearRampToValueAtTime(0, t + sec);
      o.connect(og).connect(this.master); o.start(t); o.stop(t + sec);
    }

    _swell() {
      const t = this.ctx.currentTime;
      [62, 66, 69, 73, 74, 78].forEach((m, i) => this._bell(m + 12, t + 0.6 + i * 0.16, 0.6));
    }

    // Brillos al encender estrellas
    sparkle(x) {
      if (!this.ready || !this.currentChord) return;
      const pool = this.currentChord.slice(1);
      const idx = Math.min(pool.length - 1, Math.floor(x * pool.length));
      this._bell(pool[idx] + 24 + this.transpose, null, 0.7);
    }

    toggle() {
      if (!this.ready) return false;
      this.muted = !this.muted;
      this.master.gain.setTargetAtTime(this.muted ? 0 : 0.9, this.ctx.currentTime, 0.4);
      return this.muted;
    }
    suspend(v) { if (this.ready) v ? this.ctx.suspend() : this.ctx.resume(); }
  }

  window.Ambient = new Ambient();
})();
