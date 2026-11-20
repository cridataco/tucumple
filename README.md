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

## Publicarla en GitHub Pages

1. Crea un repositorio nuevo y **público** en GitHub (por ejemplo `para-karen`).
2. En el repo: **Add file → Upload files** y arrastra *todo el contenido* de esta carpeta (no la carpeta en sí: `index.html` tiene que quedar en la raíz). Haz **Commit**.
3. Ve a **Settings → Pages → Build and deployment → Source** y elige **GitHub Actions**.
4. Espera un minuto (pestaña **Actions**). Tu enlace queda en `https://TU-USUARIO.github.io/para-karen/`.

> La carpeta `.github` está oculta en Mac/Windows y a veces no se sube al arrastrar.
> Si no aparece en el repo, créala desde la web: **Add file → Create new file**, escribe
> `.github/workflows/deploy.yml` como nombre y pega el contenido de ese archivo.
> **Alternativa sin Actions:** en Settings → Pages elige *Deploy from a branch* → `main` / `root`. Funciona igual.

## Recibir lo que ella responde

En `js/content.js`, arriba del todo:

- **`formspreeId`**: crea una cuenta gratis en [formspree.io](https://formspree.io), crea un formulario con tu correo y copia el código que aparece en la URL (`https://formspree.io/f/ESTE_CODIGO`). Te llegará un correo con cada respuesta y su mensaje. Si cierra la página a mitad de camino, igual te llega lo que alcanzó a responder.
- **`whatsapp`**: tu número con indicativo (ej. `573001234567`). Al final aparece un botón para que ella te mande un resumen por WhatsApp.
- **`firma`**: cómo firmas al final.

Además, sus respuestas quedan guardadas en el navegador de ella (`localStorage`, clave `karen-cumple`).

## Cosas que puedes cambiar fácil

- Preguntas: `preguntas` en `content.js`. `escurridizo: true` hace que el botón «No» huya; `larga: true` es para respuestas largas.
- Cartas: cada una tiene `mostrar: true/false`, título, fecha y una cita destacada.
- Palabras del túnel: `tunel` y `tunelFrases`.

Para probarla en tu computador antes de subirla: abre una terminal en la carpeta y ejecuta `python3 -m http.server`, luego entra a `http://localhost:8000`.
