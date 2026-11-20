/* =========================================================
   Fondo WebGL: profundidades (luz bajo el agua),
   túnel art déco y nebulosa final. Un solo shader, sin librerías.
   ========================================================= */
(function () {
  const canvas = document.getElementById("gl");
  const gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "high-performance" });
  const state = {
    tunnel: 0, nebula: 0, warm: 0, flash: 0, end: 0, speed: 0.15, travel: 0,
    mouse: [0, 0], mouseT: [0, 0], ok: !!gl,
  };
  window.Scene = state;
  if (!gl) return;

  const vs = `attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}`;
  const fs = `
precision highp float;
uniform vec2 uRes; uniform float uTime; uniform vec2 uMouse;
uniform float uTunnel, uNebula, uWarm, uFlash, uEnd, uTravel;

float h21(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
  return mix(mix(h21(i),h21(i+vec2(1,0)),f.x),mix(h21(i+vec2(0,1)),h21(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;mat2 m=mat2(1.6,1.2,-1.2,1.6);for(int i=0;i<5;i++){v+=a*noise(p);p=m*p;a*=.5;}return v;}

vec3 depths(vec2 uv, vec2 p){
  float t=uTime;
  vec3 top=mix(vec3(.06,.22,.27),vec3(.32,.22,.17),uWarm);
  vec3 bot=mix(vec3(.008,.03,.05),vec3(.05,.03,.04),uWarm);
  vec3 col=mix(bot,top,pow(uv.y,1.6));
  // rayos de luz desde la superficie
  vec2 o=vec2(uMouse.x*.25,1.15);
  vec2 d=p-o; float ang=atan(d.x,-d.y);
  float r=noise(vec2(ang*9.,t*.12))*.6+noise(vec2(ang*23.,-t*.18))*.4;
  r=pow(smoothstep(.35,1.,r),2.2);
  float fall=smoothstep(1.9,.0,length(d))*smoothstep(-.6,.6,p.y+.2);
  vec3 rayCol=mix(vec3(.55,.85,.8),vec3(1.,.8,.55),uWarm*.8+.15);
  col+=rayCol*r*fall*.32;
  // bruma suave que deriva
  float hz=fbm(p*1.4+vec2(t*.02,-t*.012));
  col+=rayCol*hz*hz*.10*smoothstep(-.4,.7,p.y);
  // brillo cálido abajo (como una lámpara lejana)
  col+=vec3(1.,.62,.32)*exp(-length(p-vec2(0.,-.75))*2.2)*.10*(1.+uWarm);
  return col;
}

vec3 tunnel(vec2 p){
  float r=length(p); float a=atan(p.y,p.x);
  float z=.28/(r+.002)+uTravel;
  a+=sin(z*.3+uTime*.35)*.22;
  float u=a/6.28318*12.;
  vec2 cell=vec2(floor(u),floor(z*1.5));
  float du=abs(fract(u)-.5), dv=abs(fract(z*1.5)-.5);
  float ribs=exp(-(.5-du)*55.);
  float rings=exp(-(.5-dv)*30.);
  // nodos en las intersecciones y una línea fina secundaria (art déco)
  float node=exp(-length(vec2(.5-du,.5-dv))*14.);
  float thin=exp(-abs(dv-.25)*90.)*.5;
  float lit=step(.5,fract((cell.x+cell.y)*.5));
  vec3 teal=vec3(.12,.7,.68), amber=vec3(1.,.6,.22), rose=vec3(1.,.38,.5);
  vec3 base=mix(teal,amber,.5+.5*sin(z*.22));
  base=mix(base,rose,(.5+.5*sin(z*.11+1.7))*.55);
  float fog=smoothstep(.0,.5,r);
  vec3 col=base*(rings*1.3+ribs*.7+thin+node*1.6)*fog;
  col+=base*(.03+lit*.06)*fog;
  float core=exp(-r*(7.-uEnd*5.));
  col+=vec3(1.,.9,.75)*core*(.4+uEnd*2.4);
  col*=1.+uEnd*1.2;
  return col;
}

vec3 stars(vec2 p,float scale,float th){
  vec2 g=p*scale; vec2 id=floor(g); vec2 f=fract(g)-.5;
  float h=h21(id); if(h<th) return vec3(0.);
  vec2 off=(vec2(h21(id+3.1),h21(id+7.7))-.5)*.7;
  float d=length(f-off);
  float tw=.6+.4*sin(uTime*(1.+h*3.)+h*40.);
  float s=smoothstep(.06,0.,d)*tw + smoothstep(.25,0.,d)*.12*tw;
  return mix(vec3(1.,.9,.8),vec3(.8,.85,1.),h21(id+1.3))*s;
}

vec3 nebula(vec2 p){
  float t=uTime*.025;
  vec2 q=p*1.15+uMouse*.04;
  vec2 w=vec2(fbm(q+vec2(0.,t)),fbm(q+vec2(5.2,1.3)-t));
  float n=fbm(q+1.8*w+t);
  vec3 col=vec3(.015,.012,.05);
  col=mix(col,vec3(.08,.38,.46),smoothstep(.25,.68,n)*.75);
  col=mix(col,vec3(.9,.36,.52),smoothstep(.38,.78,w.x)*smoothstep(.28,.72,n)*.75);
  col=mix(col,vec3(.42,.26,.78),smoothstep(.42,.8,w.y)*smoothstep(.2,.6,n)*.6);
  col+=vec3(1.,.75,.48)*pow(n,3.5)*1.1;
  col*=(.75+.5*smoothstep(1.3,.0,length(p)))*1.8;
  col+=stars(p+t*.2,60.,.975)+stars(p*1.0+vec2(3.),120.,.985)*.7+stars(p-t*.1,24.,.96)*1.3;
  return col;
}

void main(){
  vec2 uv=gl_FragCoord.xy/uRes;
  vec2 p=(gl_FragCoord.xy-.5*uRes)/uRes.y;
  vec3 col=depths(uv,p);
  if(uTunnel>.001) col=mix(col,tunnel(p),uTunnel);
  if(uNebula>.001) col=mix(col,nebula(p),uNebula);
  col+=vec3(1.,.97,.9)*uFlash;
  col=1.-exp(-col*1.35);            // tonemap suave
  col=pow(col,vec3(.92));
  col+=(h21(gl_FragCoord.xy+fract(uTime)*100.)-.5)*.025; // dithering
  gl_FragColor=vec4(col,1.);
}`;

  function sh(type, src) {
    const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { console.error(gl.getShaderInfoLog(s)); state.ok = false; }
    return s;
  }
  const prog = gl.createProgram();
  gl.attachShader(prog, sh(gl.VERTEX_SHADER, vs));
  gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, fs));
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { console.error(gl.getProgramInfoLog(prog)); state.ok = false; return; }
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW); // un solo triángulo grande
  const loc = gl.getAttribLocation(prog, "p");
  gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  const U = {};
  ["uRes", "uTime", "uMouse", "uTunnel", "uNebula", "uWarm", "uFlash", "uEnd", "uTravel"].forEach((n) => (U[n] = gl.getUniformLocation(prog, n)));

  // Resolución adaptativa: baja si el equipo sufre
  let scale = Math.min(window.devicePixelRatio || 1, 1.5) * (window.innerWidth < 700 ? 0.55 : 0.65);
  function resize() {
    canvas.width = Math.max(2, Math.floor(innerWidth * scale));
    canvas.height = Math.max(2, Math.floor(innerHeight * scale));
    gl.viewport(0, 0, canvas.width, canvas.height);
  }
  addEventListener("resize", resize); resize();

  addEventListener("pointermove", (e) => {
    state.mouseT[0] = (e.clientX / innerWidth - 0.5) * 2;
    state.mouseT[1] = -(e.clientY / innerHeight - 0.5) * 2;
  }, { passive: true });

  let last = performance.now(), start = last, frames = 0, acc = 0, running = true;
  document.addEventListener("visibilitychange", () => { running = !document.hidden; if (running) { last = performance.now(); requestAnimationFrame(loop); } });

  function loop(now) {
    if (!running) return;
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    // control de rendimiento
    frames++; acc += dt;
    if (acc > 2) { const fps = frames / acc; if (fps < 40 && scale > 0.35) { scale *= 0.8; resize(); } frames = 0; acc = 0; }

    state.mouse[0] += (state.mouseT[0] - state.mouse[0]) * 0.04;
    state.mouse[1] += (state.mouseT[1] - state.mouse[1]) * 0.04;
    state.travel += state.speed * dt;

    gl.uniform2f(U.uRes, canvas.width, canvas.height);
    gl.uniform1f(U.uTime, (now - start) / 1000);
    gl.uniform2f(U.uMouse, state.mouse[0], state.mouse[1]);
    gl.uniform1f(U.uTunnel, state.tunnel);
    gl.uniform1f(U.uNebula, state.nebula);
    gl.uniform1f(U.uWarm, state.warm);
    gl.uniform1f(U.uFlash, state.flash);
    gl.uniform1f(U.uEnd, state.end);
    gl.uniform1f(U.uTravel, state.travel);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
})();
