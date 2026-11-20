/* =========================================================
   CONTENIDO EDITABLE
   Aquí cambias textos, preguntas, cartas y la configuración
   para recibir las respuestas de Karen. No necesitas tocar
   ningún otro archivo.
   ========================================================= */

window.CONFIG = {
  // 1) Crea un formulario gratis en https://formspree.io (con tu correo),
  //    copia el código que te dan (ej: "xyzabcd") y pégalo aquí.
  //    Así te llegan por correo sus respuestas y su mensaje.
  formspreeId: "",

  // 2) (Opcional) Tu número de WhatsApp con indicativo, sin "+" ni espacios.
  //    Ej: "573001234567". Al final aparecerá un botón para que ella te
  //    mande sus respuestas directamente por WhatsApp.
  whatsapp: "",

  // Cómo firmas tú
  firma: "Tu amigo de siempre",
};

window.CONTENT = {
  nombre: "Karen",
  apellido: "Ramitos",

  /* -------- PREGUNTAS --------
     si / no: respuesta a cada botón.
     etiquetas: texto de los botones (por defecto Sí / No).
     escurridizo: el botón "No" huye del cursor.
     larga: respuesta larga (letra más pequeña).            */
  preguntas: [
    {
      tono: "Calentando motores",
      q: "¿Estás lista para que el dolor de espalda deje de ser una enfermedad y se vuelva un estilo de vida?",
      si: "Así me gusta. A esta edad uno ya no se agacha por cualquier cosa… solo por lo que de verdad vale la pena.",
      no: "Tarde. Tu espalda ya firmó por ti. Desde ahora toca escoger con mucha sabiduría en qué posición pasas las noches.",
    },
    {
      tono: "Vida nocturna",
      q: "¿Ya sientes que una noche salvaje es estar en la cama antes de las 10?",
      si: "Bienvenida al club. La cama a las 10 sigue siendo la mejor rumba… todo depende de con qué la acompañes. (Yo digo un tinto y una serie. ¿Tú en qué estabas pensando?)",
      no: "Respeto. Que conste que el cuerpo todavía aguanta toda la noche… lo que ya no aguanta es el lunes.",
    },
    {
      tono: "Física aplicada",
      q: "¿Ya te pasó que te agachas a recoger algo y aprovechas para ver qué más hay por allá abajo, para no desperdiciar el viaje?",
      si: "Eso se llama madurez: ya no se baja por cualquier cosa, y cuando se baja, se aprovecha.",
      no: "Ya te va a pasar. Llega un punto en la vida en el que bajar es facilísimo… lo difícil es volver a subir.",
    },
    {
      tono: "Economía doméstica",
      q: "¿Ya miras el precio de las cosas y se te escapa un «en mis tiempos…»?",
      si: "Felicitaciones, ya eres oficialmente una señora de bien. Solo te faltan la matica en la ventana y el chisme fresco de la vecina.",
      no: "Dale un año. El arriendo se encarga del resto.",
    },
    {
      tono: "Pregunta seria (no tanto)",
      q: "¿Te siguen gustando grandes, aunque ya no tengas la energía de antes?",
      si: "Hablo de las tortas, Karen. Tranquila. …Aunque esa sonrisita me acaba de confirmar que pensaste en otra cosa.",
      no: "Mentirosa. A nadie le gusta una torta pequeñita en su cumpleaños. Y a ti menos.",
    },
    {
      tono: "Deportes extremos",
      q: "¿Crees que a esta edad todavía se pueden hacer locuras?",
      si: "Claro que sí. Ayer me tomé un café después de las seis de la tarde y aquí sigo, vivo de milagro.",
      no: "Correcto. La última locura fue quedarnos despiertos hablando hasta la una de la mañana, y todavía la estamos pagando.",
    },
    {
      tono: "Algo que no te he contado",
      q: "¿Sabes qué me sucede a mitad de mi jornada laboral, un miércoles a las 3 de la tarde?",
      etiquetas: ["Sí", "No, ¿qué?"],
      si: "Entonces ya lo sabías: sonrío. Porque llegas a saludar en mi cabeza. (Estás más presente de lo que te imaginas.)",
      no: "Sonrío. Porque llegas a saludar en mi cabeza. (Estás más presente de lo que te imaginas.)",
    },
    {
      tono: "Un recuerdo",
      q: "¿Te acuerdas de aquella noche de la pijama azul y la pijama negra?",
      si: "Yo tampoco la olvido. Tú no lo viste, pero esa noche mi habitación se llenó de estrellas.",
      no: "Yo me acuerdo por los dos: tú llevabas mi pijama negra, yo la azul, y esa noche entendí que por fin tenía una mejor amiga.",
    },
    {
      tono: "La importante",
      q: "¿Aún consideras que nuestra amistad puede romper las fronteras de los años?",
      escurridizo: true,
      si: "Yo sí. Y mucho más: los años, las distancias, los silencios y hasta las versiones de nosotros que todavía no conocemos.",
      no: "Ese botón no sirve, ya lo viste. Yo sí lo creo. Y mucho más: los años, las distancias, los silencios y hasta las versiones de nosotros que todavía no conocemos.",
    },
    {
      tono: "De corazón",
      q: "¿Quieres un consejo?",
      larga: true,
      si: "La vida nos exige ir muy rápido y nuestros sueños son muy grandes. Mas no permitas que esta vida ansiosa te haga sentir mal, ni que creas que vas despacio: nos hicieron tan competitivos que ir tan rápido nos enferma sin que nos demos cuenta.\n\nTienes muchos logros y frutos, y vendrán más. Esto es solo una etapa de transición que debe disfrutarse, porque no es para siempre. Cambiará de un momento a otro, seguirás en este juego, y cuando se acabe te darás cuenta de que nada volverá a ser como antes.\n\nSé que quieres ir rápido, aunque eso no te garantizará la felicidad. Puedes tomarte las cosas con calma y aun así llegarás a tener, de un momento a otro, todo lo que tanto anhelas.",
      no: "Te lo voy a dar igual, para eso son los amigos.\n\nLa vida nos exige ir muy rápido y nuestros sueños son muy grandes. Mas no permitas que esta vida ansiosa te haga sentir mal, ni que creas que vas despacio: nos hicieron tan competitivos que ir tan rápido nos enferma sin que nos demos cuenta.\n\nTienes muchos logros y frutos, y vendrán más. Esto es solo una etapa de transición que debe disfrutarse, porque no es para siempre. Cambiará de un momento a otro, seguirás en este juego, y cuando se acabe te darás cuenta de que nada volverá a ser como antes.\n\nSé que quieres ir rápido, aunque eso no te garantizará la felicidad. Puedes tomarte las cosas con calma y aun así llegarás a tener, de un momento a otro, todo lo que tanto anhelas.",
    },
    {
      tono: "Última pregunta",
      q: "¿Estás lista para ver algo que guardé para ti?",
      si: "Entonces respira. Lo que viene está hecho de nosotros.",
      no: "Igual vas a ir. Cierra los ojos un segundo… no, mejor ábrelos, que esto se ve.",
    },
  ],

  /* Palabras que vuelan por el túnel */
  tunel: [
    "pijama negra", "una nebulosa", "latidos rotos", "miércoles, 3 p. m.",
    "mejor amiga", "café y rutinas", "un ancla", "almas conectadas",
    "coincidencia universal", "pedacitos de alma", "5 de abril", "tus hermosos defectos",
    "existir mientras miramos un paisaje", "sueños cumplidos", "abrazos", "gracias por todo",
    "estrellas en la habitación", "semillas", "lo más bonito que he sembrado", "nosotros",
  ],
  tunelFrases: [
    "Respira.",
    "Esto que vas a cruzar está hecho de nosotros.",
    "Años convertidos en recuerdos.",
    "Química convertida en palabras.",
  ],

  /* -------- CARTAS --------
     Párrafos separados por una línea en blanco.
     "mostrar: false" oculta una carta sin borrarla.            */
  cartas: [
    {
      mostrar: true,
      titulo: "El día en que llegó una niña",
      fecha: "Un cumpleaños",
      cita: "Destacas entre colores opacos.",
      texto: `Hola Karen, hoy no es un día como cualquier otro y lo sabes, hoy es el día en que una niña llegó a este mundo sin saber el gran impacto que tendría en otras personas, y si erré al generalizar, puedo decir con certeza que al menos así fue en mi. Feliz cumpleañooos Karen, no sabes cómo me alegra haberte conocido, tu personalidad resaltó mucho en un mundo como el mío, pues eres una personas muy alegre, inteligente, graciosa y agradable. Desde que nos conocimos siento que hay algo que nos hizo conectar y amo que haya sido así pues esas cosas no se ven seguido en esta sociedad tan pasajera; de cierta forma, me he sentido muy identificado contigo, de tus vivencias y tal vez la forma en la que persibes tu vida.

Realmente siempre estuviste ahí, pero por alguna razón un día llegamos a encontrarnos sin imaginar el impacto que esto tendría. Aprovecho el día para resaltar todos tus logros y aquellos anhelos que tienes, pues se que te has esforzado mucho por llegar hasta aquí. En cuanto a tus metas, se que lo lograrás, eres una chica muy enfocada y yo estaré muy contento de verte en la cima.

Gracias por compartir muchos momentos conmigo, pues hoy en día los llevo en mis recuerdos y cuando vuelvo a ellos, es como volver a vivir y sentir lo afortunado que fui por estar allí.

Solo anhelo que esta amistad dure mucho tiempo, pues estoy seguro que personas como tú no se pueden encontrar, destacas entre colores opacos, repente eres única.

Jajajaja, tal vez esto pudo parecer cursi, auque quice aprovechar el día para decírtelo, las personas no suelen decir estás cosas, al menos eso creo. Así que solo me queda terminar dicendote que: feliz cumpleañoooooossss espero hayas disfrutado el día y también hayas podido compartir con aquellas personas que más amas, pues eso también es vivir :3`,
    },
    {
      mostrar: true,
      titulo: "Un ancla",
      fecha: "Para cuando el mundo pesaba",
      cita: "Solo quiero que duermas tranquila y te despiertes un poquito mejor cada día.",
      texto: `Hola Karen, dulce amiga que sufres y callas por razones que tu corazón sabe y te hace sentir con tanta fuerza, he decidido acompañarte durante el tiempo que necesites para estar bien, para intentar darte una mano y una compañía mientras el ansioso destino escribe con sus letras la historia. Karen, se que todo lo que hoy parece ser diferente y las condiciones que te han intentado robar tu tranquilidad se aferran a un futuro donde se que serás feliz, mientras las mareas más fuertes luchen contigo, yo intentaré ser aquel ancla que querrá que siempre estés bien y estable, sin importar lo que suceda.

Por ello he decido acompañarte, quiero que esos dulces ojos iluminados de esperanza y extrovertidas reacciones revivan poco a poco para así evitar que te sientas sola y reviva tu tranquilidad. Quiero escribirte algún mensaje que te haga sonreír para así lograr que el mundo pese un poquito menos, pues sabemos que estos sentimientos no serán para siempre y tendrán una solución que de alguna y otra forma, se que te hará feliz.

Karen, estoy contigo, creo saber qué es estar en tu lugar y tal vez pueda ser un detalle bonito si te ayudo escribiéndote los mejores textos que mi mente, en medio de la expectativa, se da el gusto de escribirte. Por último, no tienes que decir nada, no quiero que te veas en la aventura a buscar palabras de las que tal vez no tengas respuestas, solo quiero que duermas tranquila y te despiertes un poquito mejor cada día, hasta encontrar tu mayor felicidad :)`,
    },
    {
      mostrar: true,
      titulo: "Latidos rotos",
      fecha: "5 de abril de 2024 · 10:55 p. m.",
      cita: "¿Para qué querer mucho cuando con una se tiene todo?",
      texto: `Karen tiene un misterio en corazón, o en algún lugar del cual una consciencia tan única no conoce. Una noche mientras las estrellas parpadean a ritmo de latidos rotos un sentimiento se siente tan fuerte como yo creo que es mi amistad con ella.

Si yo pudiera decirle en medio del divage de palabras que estoy tan agradecido de tener una compañía que llena todos los aspectos de mi vida, si yo pudiera decirle ahora que al fin comprendí la definición de amistad pura sería ella misma.

Tantos misterios que lleva una vida en la que divago respuestas y quiero más compañía, pero, ¿para que querer mucho cuando con una se tiene todo? Suena muy extraño pero la vida no suele dar almas conectadas frecuentemente o no al menos alguien con lo que yo lo perciba así.

Me gustaría que toda la felicidad que algún día tuvimos volviera a nuestros brazos para poder abrazar con más sentimiento y así lograr limpiar nuestra almas del veneno que algo incógnito dejo, me gustaría que la oscuridad de la noche me asegurará de una vez si tendré la oportunidad de ver las respuestas que tanto esperamos para reparar los latidos rotos que al dia escuchamos. Nuestra sangre fluye como la amistad misma y los agradecimientos son tan fuertes como lo mal que nos llegamos a sentir, puede que no tenga las respuestas, pero tengo las seguridades de que aunque yo, escuche que mi corazón está a punto de dar el último latido para quebrantarse, voy a seguir gritando por esta amistad, pues cuando se llega a encontrar lo querido sabes luchar por la infinidad de lo valorado.

Cómo un cuento fantástico digo lo que siento y mis perspectivas hacia ti hacen parte del todo, nada de esto hace parte de una obsesión sino de una amistad sana que por fortuna, por alguna razón y coincidencia, quiso darse sin esfuerzos.

En tanta oscuridad me dan ganas de llorar, llorar lágrimas que llevan semillas con la esperanza de que crezcan tan fuertes que no puedan ser derribadas, lágrimas que acarrean bonitos recuerdos de un pasado amado y algunas otras de deseo a sanar.

Solo hemos vivido entre latidos rotos... Afortunadamente tuvimos nuestras compañias para restaurarlos poco a poco, gracias por todo Karen, creo que puedes dimensionar el aprecio que he desarrollado hacia ti y se me hace la cosa más bonita que pueda vivir en mi vida y también el tener el orgullo de poder contar nuestra historia que aunque no ha sido muy larga, ha logrado ser super especial :*3`,
    },
    {
      // Este es el texto que adjuntaste. Si no quieres que aparezca, pon mostrar: false
      mostrar: true,
      titulo: "La noche de las pijamas",
      fecha: "Un relato",
      cita: "Aquella noche mi mundo se llenó de estrellas.",
      texto: `Eran las 11 de la noche, vestía mi pijama azul como de costumbre. El ambiente era silencioso, la noche latía viva y se desenvolvía en un mar de destellos.

La música sonaba cálida, arrulladora y sintonizada contigo.

Aquella noche llevabas mi pijama negra, la cual se veía envuelta en la pureza que emanaba nuestra compañía y confianza. Nunca a nadie le cedí el poder de conocerme, de mostrarme débil, de lograr conectar mediante letras y abrazos que pueden ser confundidos con la claridad del agua de un manantial que brota en medio de un glaciar.

Tu no lo viste, pero aquella noche mi mundo se llenó de estrellas y orbes que flotaban por toda la habitación, aquellas pequeñas luces solo anunciaban que logré conseguir algo más puro que la naturaleza nunca vista por nadie, aquella noche entendí que ahora te tenía a ti, tenía alguien que me entendía, que realmente me amaba, una amistad que no podía ser fácilmente desbalanceada y una coincidencia universal que difícilmente es igualada por cualquier cosa. Eras sencillamente tu, la chica que hizo que pudiera desmentir muchos mitos que la sociedad planta con sus inseguridades y estigmas.

Ahora eras tu, la que con certeza pude llamar mejor amiga, aún no te conocía del todo, pero solo una compañía me hizo sentir y entender que eras tú, que a pesar de aún tener universos sin descubrir, sabría que encontraría lo más preciado en ellos sin dejar lugares a dudas.

Nuestros ojos se cerraron después de una noche donde nuestras almas flotaban tranquilas y nuestros seres descansaban sin preocupaciones, en ese momento se sello un destino y para mí, se cumplió un sueño que llevaba persiguiendo toda mi vida el cual era tener una amiga como tú.

Los meses pasaron, las historias se multiplicaron, nuestras sonrisas predominaron y todo aquello que pesaba en nuestras espaldas lograba ser escuchado como si habláramos con nosotros mismos, entre más acompañabas mis días, más lograba amarte, proyectándome contigo durante toda mi vida y considerandote como algo más profundo que una hermana.

Todo iba perfecto, cumplíamos nuestros sueños y nos acompañábamos en nuestros logros; una noche, mientras la luna saltaba por los cielos y mi mente volaba en pensamientos, una sensación llegó a golpear mi ventana, mi cuerpo se estremeció. "Boom, boom, boom", las paredes resonaban y mi corazón decidió acompañar el ritmo de las mismas, mis pensamientos empezaron a temblar en conjunto y mis ojos se empezaron a dilatar.

Algo no estaba bien, sentía como todo mi cuerpo se convertía en una nube pesada de sensaciones que me agradaban del todo y que quería pararan rápidamente.

Las luces de mi habitación se empezaron a opacar, todo aquello por lo que vivía se detuvo de golpe, ya no podía pensar en nada más que en lo que me atormentaba en ese momento.

Decidí levantarme de mi silla, en medio de un tifón de sentimientos y confusión me tambalee hacia mi cama, di unos 2 o 3 pasos hasta que mi cuerpo logro desplomarme, caí de forma abrupta sobre las frías cobijas que algún día solían acompañarnos. Tenía miedo, estaba aterrado, las paredes blancas empezaron a moverse como si de olas se tratasen y mis manos empezaban a temblar como nunca antes.

Sentí más cosas de las que nunca había podido imaginar, mi pecho me presionaba, es como si tratara de empujarme hacia algún lugar que desconocía, al fondo de mi habitación lograba oír el crujido de árboles desesperados, doblándose sin parar envolviendo el lugar en auténtica paranoia.

Estaba muy exhausto hasta que mi teléfono tembló, él mismo grito sin reprimirse, anunciaba un mensaje que terminaría todo el caos que allí se encontraba, así fue, Karen había fallecido.

Entre mis manos sostenía lo que para mí era una mentira que muy pronto se convirtió en una estaca directo al corazón, aquella alma gemela que al fin había encontrado se había ido sin siquiera decir adiós, eso me partió en mil pedazos.

Por primera vez en años mis ojos dejaron caer agujas de cristal al suelo, estás caían por todas partes sin que las pudiera controlar, estaba destruido en medio de la soledad de mi mundo incomprendido. Sentía como mi cuerpo perdía energías y como tantas cosas que tanto apreciaba se escapaban de mis manos.

No pude hacer nada, no pude contradecir nada, no pude hablar con nadie, solo de repente ya no estabas y eso hizo que contigo muriera también una parte de mi. No me podía contener, no pude ayudarme, la barrera con la que siempre lograba controlar todo lo que sentía se había caído tras el mensaje.

Esa noche para mí nunca acabó, pues ahora camino congelado en el mismo momento, hubiera dado lo que más amaba solo por darte esos abrazos que solo tú conocías me gustaban, pues sentía en ellos la fortuna de tenerte y liberar todo lo que pesaba en este mundo.

Te extraño como nunca y no puedo hacer nada, siempre te valore muchísimo, pero me dejaste con todos los sentimientos entre las manos y con ellos, te llevaste una parte de mi.

Ahora divago en pensamientos, floto entre lugares que ya no tienen significado y vivo con la esperanza de poder construir dentro de mi a alguien más que pueda continuar sin quienes solíamos ser.

Entre la oscuridad y la lluvia de la noche te deje una carta que quemé con el tiempo, conservo la esperanza de que puedas leerla en cualquier lugar donde anhelo estés feliz, en ella escribí una frase que no nunca me abandonó: "Se que siempre quisiste estar, ahora esto se aferra a la subjetividad, así que te prometo que en lo que me quede de vida, no te dejaré morir una vez más".`,
    },
    {
      mostrar: true,
      titulo: "Una nebulosa en mi universo",
      fecha: "Otro cumpleaños",
      cita: "Para mí hacer hasta lo más sencillo es tenerlo todo.",
      texto: `Y ahora que tengo la oportunidad de escribir en un día tan especial, abro mis palabras para que de alguna forma, comunique y te desee con todo corazón un gran cumpleaños. Por la persona que has ido construyendo a través de los años y las enseñanzas que de alguna u otra forma, te hicieron madurar y ser más fuerte. Por todas esas acciones geniales que haces, que parecen muy normales para ti pero que en realidad impactan positivamente en algunas personas, como yo.

Por todos esos momentos que te han hecho feliz y los sueños que debido al peso que tienen en tu corazón, has logrado celebrar con mucha alegría. Este cumpleaños quiero resaltar y celebrar contigo todo lo buenos que has hecho, pues muchas veces aunque herremos, nuestras mentes suelen resaltar muchas cosas malas pero ¿Donde queda lo bueno?

Por eso, gran amiga y compañera de vida, brindo por todo lo que te hace bien, te hizo bien y también por todos tus hermosos defectos, pues si no los tuvieras, seguramente no serías mi amiga. Hoy quiero plasmar en esta carta un poco de mis pensamientos referentes a ti, para que de cierta forma conozcas mi forma de verte y también pedacitos de mi alma.

Está amistad es lo más bonito que he sembrado en mucho tiempo, por alguna razón, de muchas cosas que he vivido tu amistad es de las pocas que nunca me ha hecho daño, de las pocas que se comunica conmigo y aporta siempre un granito de arena a mi crecimiento, estabilidad y muy importante, felicidad. Los planes de un futuro se ven pintados con tu imagen pues me hace mucha ilusión imaginarme que estás conmigo en nuestro futuro con sueños cumplidos. Suelo cuidar mucho lo que valoro y quiero, por eso mis acciones hacia ti suelen rebasar limites de lo racional, debido a que tú eres de mis excepciones. Confieso que a veces te incluyo en aquellos planes que son tan sencillos y cotidianos que pueden no considerase como planes; existir mientras miramos algún paisaje, ir a algún lugar a tomar café mientras hablamos de nuestras rutinas o la de alguien más, incluso estudiar juntos sin que las cosas que hagamos estén relacionadas, tu impacto ha sido tanto que para mi hacer hasta lo mas sencillo es tenerlo todo. Siempre he sido así contigo porque al ver tantas cosas en mi vida, entendí el mismo sentido de vivir y en las respuestas está disfrutar al máximo de todo con personas como tú.

Tal vez me gustaría hacer mucho más juntos, cuando de compartir y crear momentos se trata no habría quien me parara, sin embargo no se puede tenerlo todo en tan poco tiempo y eso me hace valorar infinitamente el tiempo que compartimos. Es tu cumpleaños y quiero que veas que alrededor tuyo hay personas que te quieren mucho, te valoran y te tienen en un lugar muy especial, pues en mi caso único, tu eres una nebulosa que está presente en mi universo. Feliz cumpleaños Karen, estoy orgulloso de muchos logros tuyos y de ti.`,
    },
  ],

  final: {
    titulo: "Feliz cumpleaños",
    linea: "Eres una nebulosa presente en mi universo.",
    instruccion: "Toca el cielo y enciende una estrella por cada recuerdo.",
    constelacion: "¿Ves? Cada recuerdo es una estrella. Juntos hacen el mapa de nosotros.",
  },
};
