# Para Karen ✦

Una experiencia de cumpleaños en una sola página estática: portada art déco, preguntas, túnel de recuerdos, archivo de cartas, un espacio para que ella escriba y un final en una nebulosa donde enciende estrellas.

No usa librerías ni archivos de audio: la música ambiental se genera en vivo en el navegador y el fondo es un shader WebGL. Todo junto pesa menos de 100 KB.

## Estructura

```
index.html
favicon.svg
.nojekyll
css/style.css
js/content.js   ← AQUÍ editas textos, preguntas, cartas y configuración
js/app.js       ← la experiencia (flujo, partículas, envío de respuestas)
js/gl.js        ← fondo WebGL (profundidades, túnel, nebulosa)
js/audio.js     ← música ambiental generada
.github/workflows/deploy.yml  ← publica en GitHub Pages
```

