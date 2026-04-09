const body = document.body;
const quizStage = document.querySelector("[data-quiz-stage]");
const revealItems = document.querySelectorAll(".reveal");
const careerCards = document.querySelectorAll("[data-career-card]");

const WHATSAPP_NUMBER = "";
const analysisMessages = [
  "Detectando tus intereses",
  "Comparando afinidades",
  "Preparando tu resultado",
];

const traitLabels = {
  logic: "Lógica",
  creativity: "Creatividad",
  leadership: "Liderazgo",
  analysis: "Análisis",
  communication: "Comunicación",
  technology: "Tecnología",
  organization: "Organización",
  strategy: "Estrategia",
  visual: "Visión visual",
};

const careers = {
  software: {
    degree: "Ingeniería en Software",
    profile: "Arquitecto Digital 🚀",
    description:
      "Te interesa crear soluciones tecnológicas, programar y resolver problemas con lógica.",
    sales:
      "Aquí podrías convertir ideas en apps, plataformas y productos digitales con impacto real.",
    points: [
      "Te mueve construir y programar.",
      "Disfrutas la lógica aplicada.",
      "Te visualizas creando tecnología.",
    ],
    next: ["Desarrollo web", "Apps móviles", "Producto digital"],
    whatsapp:
      "Hola, hice el test vocacional de DASC y mi resultado fue Ingeniería en Software 🚀. Me gustaría recibir más información.",
  },
  systems: {
    degree: "Sistemas Computacionales",
    profile: "Gestor Tecnológico 💻",
    description:
      "Tienes afinidad con la tecnología aplicada, la administración de sistemas y la implementación digital.",
    sales:
      "Tu valor está en hacer que la tecnología funcione, conecte y sostenga a las organizaciones.",
    points: [
      "Ves la tecnología como sistema completo.",
      "Te interesan herramientas e infraestructura.",
      "Tienes una mirada práctica y estratégica.",
    ],
    next: ["Infraestructura", "Soporte", "Transformación digital"],
    whatsapp:
      "Hola, hice el test vocacional de DASC y mi resultado fue Sistemas Computacionales 💻. Me gustaría recibir más información.",
  },
  industrial: {
    degree: "Ingeniería Industrial y Sistemas",
    profile: "Optimizador Estratégico ⚙️",
    description:
      "Tu mente analítica busca mejorar procesos, optimizar recursos y hacer que todo funcione mejor.",
    sales:
      "Podrías convertirte en la persona que detecta fallas, ordena operaciones y mejora resultados.",
    points: [
      "Piensas en eficiencia y mejora continua.",
      "Analizas antes de actuar.",
      "Te motiva optimizar procesos.",
    ],
    next: ["Procesos", "Operaciones", "Mejora continua"],
    whatsapp:
      "Hola, hice el test vocacional de DASC y mi resultado fue Ingeniería Industrial y Sistemas ⚙️. Me gustaría recibir más información.",
  },
  design: {
    degree: "Diseño Interactivo",
    profile: "Creador Visual 🎨",
    description:
      "Tu talento está en la creatividad digital, el diseño y la creación de experiencias visuales.",
    sales:
      "Aquí podrías transformar ideas en interfaces, experiencias y contenido visual memorable.",
    points: [
      "Tu sensibilidad visual resalta.",
      "Te gusta crear desde cero.",
      "Conectas creatividad con experiencia digital.",
    ],
    next: ["Interfaces", "UX/UI", "Contenido visual"],
    whatsapp:
      "Hola, hice el test vocacional de DASC y mi resultado fue Diseño Interactivo 🎨. Me gustaría recibir más información.",
  },
  marketing: {
    degree: "Mercadotecnia Digital",
    profile: "Impulsor de Marcas 📱",
    description:
      "Te interesa la comunicación, las campañas y hacer crecer marcas con estrategia y creatividad.",
    sales:
      "Tu fortaleza puede estar en conectar ideas con audiencias y convertir atención en crecimiento.",
    points: [
      "Piensas en audiencias y mensajes.",
      "Te atrae el impacto de una campaña.",
      "Sabes combinar creatividad con estrategia.",
    ],
    next: ["Campañas", "Branding", "Contenido"],
    whatsapp:
      "Hola, hice el test vocacional de DASC y mi resultado fue Mercadotecnia Digital 📱. Me gustaría recibir más información.",
  },
  admin: {
    degree: "Administración",
    profile: "Líder Organizador 📊",
    description:
      "Tienes habilidades para dirigir, organizar y tomar decisiones con visión de negocio.",
    sales:
      "Aquí podrías liderar equipos, ordenar operaciones y mover proyectos con claridad.",
    points: [
      "Te sale natural coordinar personas.",
      "Tienes visión de negocio y orden.",
      "Te imaginas liderando proyectos.",
    ],
    next: ["Gestión", "Liderazgo", "Emprendimiento"],
    whatsapp:
      "Hola, hice el test vocacional de DASC y mi resultado fue Administración 📊. Me gustaría recibir más información.",
  },
};

const questions = [
  {
    prompt: "¿Qué tipo de cosas te llaman más la atención?",
    options: [
      ["💻 Crear apps o software", { software: 3, systems: 1 }, { technology: 2, logic: 1 }],
      ["🎨 Diseñar cosas visuales", { design: 3, marketing: 1 }, { creativity: 2, visual: 2 }],
      ["📋 Organizar ideas, personas o proyectos", { admin: 3, industrial: 1, marketing: 1 }, { organization: 2, leadership: 2 }],
      ["⚙️ Mejorar procesos o resolver problemas", { industrial: 3, systems: 1, software: 1 }, { analysis: 2, logic: 1 }],
      ["📱 Crear contenido o campañas digitales", { marketing: 3, design: 1 }, { communication: 2, creativity: 1 }],
    ],
  },
  {
    prompt: "Si te dieran un proyecto, tú serías quien…",
    options: [
      ["🔧 Programa y construye la solución", { software: 3, systems: 1 }, { technology: 2, logic: 2 }],
      ["🎨 Diseña cómo se verá", { design: 3, marketing: 1 }, { creativity: 2, visual: 2 }],
      ["📋 Organiza al equipo", { admin: 3, industrial: 1 }, { leadership: 2, organization: 2 }],
      ["⚙️ Mejora cómo funciona", { industrial: 3, systems: 1 }, { analysis: 2, strategy: 1 }],
      ["📢 Lo promociona", { marketing: 3, admin: 1 }, { communication: 2, strategy: 2 }],
    ],
  },
  {
    prompt: "¿Qué disfrutas más aprender?",
    options: [
      ["👨‍💻 Tecnología y programación", { software: 3, systems: 2 }, { technology: 2, logic: 2 }],
      ["🎨 Diseño digital y creatividad", { design: 3, marketing: 1 }, { creativity: 2, visual: 2 }],
      ["📈 Negocios y emprendimiento", { admin: 3, marketing: 1 }, { leadership: 1, strategy: 2 }],
      ["📊 Optimización y análisis", { industrial: 3, systems: 1, admin: 1 }, { analysis: 2, logic: 1 }],
      ["📱 Publicidad, marcas y redes", { marketing: 3, design: 1 }, { communication: 2, creativity: 1 }],
    ],
  },
  {
    prompt: "¿Qué tipo de reto te emociona más?",
    options: [
      ["🧠 Resolver problemas técnicos", { software: 3, systems: 2 }, { logic: 2, technology: 1 }],
      ["🎨 Crear algo visual desde cero", { design: 3, marketing: 1 }, { creativity: 2, visual: 2 }],
      ["📋 Coordinar tareas y tomar decisiones", { admin: 3, industrial: 1 }, { leadership: 2, organization: 2 }],
      ["⚙️ Hacer más eficiente algo que ya existe", { industrial: 3, systems: 1, software: 1 }, { analysis: 2, strategy: 1 }],
      ["📢 Hacer que una idea conecte con la gente", { marketing: 3, design: 1 }, { communication: 2, strategy: 1 }],
    ],
  },
  {
    prompt: "¿Cómo te imaginas trabajando en el futuro?",
    options: [
      ["💻 Desarrollando software", { software: 3, systems: 1 }, { technology: 2, logic: 1 }],
      ["🎨 Creando experiencias visuales", { design: 3, marketing: 1 }, { creativity: 2, visual: 2 }],
      ["🧠 Liderando proyectos o equipos", { admin: 3, marketing: 1 }, { leadership: 2, organization: 1 }],
      ["⚙️ Mejorando operaciones", { industrial: 3, systems: 1 }, { analysis: 2, strategy: 1 }],
      ["📱 Diseñando estrategias de marketing", { marketing: 3, admin: 1 }, { communication: 2, strategy: 2 }],
    ],
  },
  {
    prompt: "¿Qué habilidad sientes más fuerte en ti?",
    options: [
      ["🧠 Lógica", { software: 2, systems: 2, industrial: 2 }, { logic: 3, analysis: 1 }],
      ["🎨 Creatividad", { design: 3, marketing: 2 }, { creativity: 3, visual: 1 }],
      ["📋 Organización", { admin: 3, industrial: 1 }, { organization: 3, leadership: 1 }],
      ["📊 Análisis", { industrial: 3, systems: 1, software: 1 }, { analysis: 3, logic: 1 }],
      ["📢 Comunicación", { marketing: 3, admin: 1, design: 1 }, { communication: 3, strategy: 1 }],
    ],
  },
  {
    prompt: "¿Qué te gustaría construir?",
    options: [
      ["💻 Una app o plataforma", { software: 3, systems: 1 }, { technology: 2, logic: 1 }],
      ["📱 Una marca o campaña", { marketing: 3, design: 1 }, { communication: 2, creativity: 1 }],
      ["🎨 Una experiencia visual atractiva", { design: 3, marketing: 1 }, { visual: 2, creativity: 2 }],
      ["🧠 Un negocio bien organizado", { admin: 3, industrial: 1 }, { leadership: 2, organization: 2 }],
      ["⚙️ Un sistema o proceso más eficiente", { industrial: 3, systems: 2 }, { analysis: 2, strategy: 1 }],
    ],
  },
  {
    prompt: "Cuando algo no funciona, tú normalmente…",
    options: [
      ["🔧 Buscas el error y lo corriges", { software: 3, systems: 2 }, { logic: 2, technology: 1 }],
      ["🎨 Piensas cómo rediseñarlo", { design: 3, marketing: 1 }, { creativity: 2, visual: 2 }],
      ["📋 Reorganizas el proceso", { admin: 2, industrial: 2 }, { organization: 2, leadership: 1 }],
      ["📊 Analizas qué está fallando", { industrial: 3, systems: 1 }, { analysis: 3, logic: 1 }],
      ["📢 Cambias la forma de comunicarlo", { marketing: 3, admin: 1 }, { communication: 2, strategy: 1 }],
    ],
  },
  {
    prompt: "Dentro del mundo digital, te interesa más…",
    options: [
      ["👨‍💻 Programar y desarrollar", { software: 4, systems: 1 }, { technology: 2, logic: 2 }],
      ["🖥️ Administrar sistemas y tecnología", { systems: 4, industrial: 1, software: 1 }, { technology: 2, strategy: 1 }],
      ["🎨 Diseñar interfaces y contenido visual", { design: 4, marketing: 1 }, { visual: 2, creativity: 2 }],
      ["📊 Analizar audiencias y campañas", { marketing: 4, admin: 1 }, { communication: 1, strategy: 2, analysis: 1 }],
      ["🧠 Gestionar proyectos o empresas", { admin: 4, industrial: 1 }, { leadership: 2, organization: 1 }],
    ],
  },
  {
    prompt: "¿Con cuál frase te identificas más?",
    options: [
      ["🚀 Quiero crear tecnología", { software: 3, systems: 1 }, { technology: 2, logic: 1 }],
      ["🎨 Quiero diseñar ideas que impacten", { design: 3, marketing: 1 }, { creativity: 2, visual: 2 }],
      ["🧠 Quiero liderar y emprender", { admin: 3, marketing: 1 }, { leadership: 2, strategy: 1 }],
      ["⚙️ Quiero mejorar cómo funcionan las cosas", { industrial: 3, systems: 1 }, { analysis: 2, strategy: 1 }],
      ["📱 Quiero ayudar a que marcas crezcan", { marketing: 3, admin: 1 }, { communication: 2, strategy: 2 }],
    ],
  },
];

const leadCache = (() => {
  try {
    return JSON.parse(localStorage.getItem("dasc-vocacional-lead") || "{}");
  } catch {
    return {};
  }
})();

const state = {
  screen: "intro",
  currentQuestion: 0,
  answers: [],
  results: null,
  lead: {
    name: leadCache.name || "",
    whatsapp: leadCache.whatsapp || "",
    email: leadCache.email || "",
    privacy: false,
  },
  analysisIndex: 0,
  analysisTimer: null,
  analysisTimeout: null,
};

const careerMaximums = questions.reduce((totals, question) => {
  Object.keys(careers).forEach((careerKey) => {
    totals[careerKey] += question.options.reduce(
      (max, [, scores]) => Math.max(max, scores[careerKey] || 0),
      0
    );
  });
  return totals;
}, Object.keys(careers).reduce((acc, key) => ({ ...acc, [key]: 0 }), {}));

const escapeHtml = (value = "") =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const getResults = () => {
  const scores = Object.keys(careers).reduce((acc, key) => ({ ...acc, [key]: 0 }), {});
  const traits = Object.keys(traitLabels).reduce((acc, key) => ({ ...acc, [key]: 0 }), {});

  state.answers.forEach((answerIndex, questionIndex) => {
    const [, scoreMap, traitMap] = questions[questionIndex].options[answerIndex] || [];
    if (!scoreMap) {
      return;
    }

    Object.entries(scoreMap).forEach(([careerKey, value]) => {
      scores[careerKey] += value;
    });

    Object.entries(traitMap).forEach(([traitKey, value]) => {
      traits[traitKey] += value;
    });
  });

  const ranking = Object.entries(scores)
    .map(([careerKey, score]) => ({
      careerKey,
      score,
      affinity: Math.round((score / Math.max(careerMaximums[careerKey], 1)) * 100),
      ...careers[careerKey],
    }))
    .sort((a, b) => b.score - a.score);

  const topTraits = Object.entries(traits)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([trait]) => traitLabels[trait]);

  return { ranking, topTraits };
};

const getWhatsAppLink = (message) => {
  const encoded = encodeURIComponent(message);
  return WHATSAPP_NUMBER
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`
    : `https://wa.me/?text=${encoded}`;
};

const setScrolledState = () => {
  body.dataset.scrolled = window.scrollY > 14 ? "true" : "false";
};

const revealVisibleItems = () => {
  if (!("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18, rootMargin: "0px 0px -32px 0px" }
  );

  revealItems.forEach((item) => observer.observe(item));
};

const scrollToQuiz = () => {
  document.getElementById("quiz")?.scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    block: "start",
  });
};

const clearAnalysis = () => {
  if (state.analysisTimer) {
    clearInterval(state.analysisTimer);
    state.analysisTimer = null;
  }
  if (state.analysisTimeout) {
    clearTimeout(state.analysisTimeout);
    state.analysisTimeout = null;
  }
};

const resetHighlights = () => {
  careerCards.forEach((card) => card.classList.remove("is-highlighted"));
};

const highlightCareer = (careerKey) => {
  resetHighlights();
  const card = document.querySelector(`[data-career-card="${careerKey}"]`);
  if (!card) {
    return;
  }
  card.classList.add("is-highlighted");
  card.scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    block: "center",
  });
};

const buildQuestionView = () => {
  const question = questions[state.currentQuestion];
  const progress = Math.round(((state.currentQuestion + 1) / questions.length) * 100);
  const selected = state.answers[state.currentQuestion];
  return `
    <section class="quiz-card">
      <div class="quiz-card__body question-layout">
        <div>
          <div class="question-meta">
            <span>Paso ${state.currentQuestion + 1} de ${questions.length}</span>
            <span class="quiz-meta-copy">Respuesta rápida, sin pensarlo demasiado</span>
          </div>
          <div class="progress" aria-hidden="true"><span style="width:${progress}%"></span></div>
          <h2>${question.prompt}</h2>
        </div>
        <div class="question-option-grid">
          ${question.options
            .map(
              ([label], index) => `
                <button class="question-option ${selected === index ? "is-selected" : ""}" type="button" data-answer-index="${index}">
                  <strong>${label}</strong>
                </button>
              `
            )
            .join("")}
        </div>
        <div class="quiz-card__footer">
          <button class="button button--text ${state.currentQuestion === 0 ? "is-hidden" : ""}" type="button" data-back-question>
            ← Volver
          </button>
          <p class="question-note">Elige lo que más se parezca a ti hoy.</p>
        </div>
      </div>
    </section>
  `;
};

const buildIntroView = () => `
  <section class="quiz-card quiz-card--intro">
    <div class="quiz-card__body">
      <span class="quiz-card__eyebrow">Tu test está listo</span>
      <div>
        <h2>Descubre tu perfil en 10 preguntas rápidas.</h2>
        <p class="quiz-card__copy">
          Vas a obtener tu perfil, la carrera que mejor hace match contigo en DASC
          y dos alternativas cercanas para explorar.
        </p>
      </div>
      <ul class="result-tags">
        <li>Perfil vocacional</li>
        <li>Carrera principal</li>
        <li>2 opciones alternas</li>
      </ul>
    </div>
    <div class="quiz-card__footer">
      <p class="question-note">Ideal para estudiantes que todavía están comparando opciones.</p>
      <button class="button button--primary" type="button" data-launch-quiz>👉 Empezar test</button>
    </div>
  </section>
`;

const buildAnalysisView = () => `
  <section class="quiz-card quiz-card--analysis">
    <div class="quiz-card__body">
      <span class="quiz-card__eyebrow">Analizando tu perfil... ⚡</span>
      <div class="analysis-visual">
        <div class="analysis-ring" aria-hidden="true"></div>
        <div class="analysis-copy">
          <strong data-analysis-message>${analysisMessages[state.analysisIndex]}</strong>
          <span class="analysis-caption">Cruzando afinidades entre tecnología, creatividad y estrategia.</span>
        </div>
      </div>
      <p class="quiz-card__copy">
        Estamos comparando tus respuestas para detectar en qué tipo de entorno podrías destacar más.
      </p>
    </div>
  </section>
`;

const buildCaptureView = () => {
  const [top] = state.results.ranking;
  return `
    <section class="quiz-card quiz-card--capture">
      <div class="quiz-card__body">
        <span class="quiz-card__eyebrow">Tu resultado está listo 👀</span>
        <div>
          <h2>Déjanos tus datos para mostrarte tu resultado.</h2>
          <p class="quiz-card__copy">
            También te permitirá pedir información de la carrera que mejor va contigo.
          </p>
        </div>
        <div class="capture-grid">
          <form class="form-grid" data-lead-form novalidate>
            <div class="field" data-field="name">
              <label for="lead-name">Nombre completo</label>
              <input id="lead-name" name="name" type="text" value="${escapeHtml(state.lead.name)}" placeholder="Ej. Mariana López" />
              <span class="field-error" data-error-for="name"></span>
            </div>
            <div class="field" data-field="whatsapp">
              <label for="lead-whatsapp">WhatsApp</label>
              <input id="lead-whatsapp" name="whatsapp" type="tel" value="${escapeHtml(state.lead.whatsapp)}" placeholder="Ej. 5512345678" />
              <span class="field-error" data-error-for="whatsapp"></span>
            </div>
            <div class="field" data-field="email">
              <label for="lead-email">Correo (opcional)</label>
              <input id="lead-email" name="email" type="email" value="${escapeHtml(state.lead.email)}" placeholder="Ej. nombre@correo.com" />
              <span class="field-error" data-error-for="email"></span>
            </div>
            <label class="checkbox" data-field="privacy">
              <input id="lead-privacy" name="privacy" type="checkbox" />
              <span>Acepto aviso de privacidad</span>
            </label>
            <span class="field-error" data-error-for="privacy"></span>
            <div class="quiz-card__footer">
              <button class="button button--text" type="button" data-edit-answers>← Revisar respuestas</button>
              <button class="button button--primary" type="submit">👉 Ver mi resultado 🚀</button>
            </div>
          </form>
          <aside class="capture-summary">
            <h3>Tu match más fuerte va hacia:</h3>
            <p><strong>${top.degree}</strong></p>
            <p>${top.profile}</p>
            <ul>
              <li>Tu resultado ya fue calculado.</li>
              <li>También desbloquearás 2 rutas alternas.</li>
              <li>Tus afinidades más altas son: ${state.results.topTraits.join(", ")}.</li>
            </ul>
          </aside>
        </div>
      </div>
    </section>
  `;
};

const buildCompatibility = () =>
  state.results.ranking
    .slice(0, 3)
    .map(
      (item) => `
        <li>
          <div class="compatibility-row">
            <strong>${item.degree}</strong>
            <span>${item.affinity}% afinidad detectada</span>
          </div>
          <div class="compatibility-bar" aria-hidden="true"><span style="width:${item.affinity}%"></span></div>
        </li>
      `
    )
    .join("");

const buildResultView = () => {
  const [top, second, third] = state.results.ranking;
  const leadName = state.lead.name.trim();
  const intro = leadName
    ? `${leadName}, tu perfil combina ${state.results.topTraits.slice(0, 2).join(" y ").toLowerCase()}.`
    : `Tu perfil combina ${state.results.topTraits.slice(0, 2).join(" y ").toLowerCase()}.`;
  const tie =
    second && top.score - second.score <= 3
      ? `También hay una afinidad muy cercana con ${second.degree}.`
      : `Tus respuestas dibujan una ruta bastante clara hacia ${top.degree}.`;
  const message = leadName
    ? `Hola, soy ${leadName}. Hice el test vocacional de DASC y mi resultado fue ${top.degree}. Me gustaría recibir más información.`
    : top.whatsapp;

  return `
    <section class="quiz-card quiz-card--result">
      <div class="quiz-card__body">
        <span class="quiz-card__eyebrow">Resultado listo</span>
        <div class="result-grid">
          <div class="result-card">
            <p class="result-overline">Tu perfil es:</p>
            <div class="result-profile">
              <h3>${top.profile}</h3>
              <p><strong>Tu mejor match en DASC es: ${top.degree}</strong></p>
            </div>
            <p>${intro} ${top.description} ${tie}</p>
            <ul class="result-tags">${state.results.topTraits.map((trait) => `<li>${trait}</li>`).join("")}</ul>
            <ul class="feature-list">${top.points.map((point) => `<li>${point}</li>`).join("")}</ul>
            <div class="result-actions">
              <a class="button button--primary" href="${getWhatsAppLink(message)}" target="_blank" rel="noreferrer">👉 Quiero más info por WhatsApp</a>
              <button class="button button--secondary" type="button" data-view-career="${top.careerKey}">👉 Ver esta carrera</button>
              <button class="button button--text" type="button" data-restart-quiz>👉 Hacer de nuevo el test</button>
            </div>
          </div>
          <div class="career-match-card">
            <div class="career-match-card__top">
              <strong>Por qué hace match</strong>
              <span>${top.affinity}% afinidad</span>
            </div>
            <p>${top.sales}</p>
            <ul class="feature-list">${top.next.map((item) => `<li>${item}</li>`).join("")}</ul>
            <ul class="compatibility-list">${buildCompatibility()}</ul>
          </div>
        </div>
        <div>
          <p class="result-overline">También podrías explorar:</p>
          <div class="result-grid">
            ${[second, third]
              .filter(Boolean)
              .map(
                (item) => `
                  <article class="career-match-card">
                    <div class="career-match-card__top">
                      <strong>${item.degree}</strong>
                      <span>${item.affinity}% afinidad</span>
                    </div>
                    <p>${item.profile}</p>
                    <p>${item.description}</p>
                  </article>
                `
              )
              .join("")}
          </div>
        </div>
        <div>
          <p class="result-overline">¿Qué sigue?</p>
          <div class="result-steps">
            <article class="step-card"><strong>Conoce el plan de estudios</strong><p>Descubre qué materias y habilidades desarrollarías.</p></article>
            <article class="step-card"><strong>Explora el campo laboral</strong><p>Visualiza en qué tipo de roles podrías crecer.</p></article>
            <article class="step-card"><strong>Agenda una llamada</strong><p>Resuelve dudas y aterriza opciones con admisiones.</p></article>
            <article class="step-card"><strong>Visita DASC</strong><p>Conecta la carrera con un espacio real.</p></article>
          </div>
        </div>
      </div>
    </section>
  `;
};

const render = () => {
  if (!quizStage) {
    return;
  }

  if (state.screen === "intro") quizStage.innerHTML = buildIntroView();
  if (state.screen === "question") quizStage.innerHTML = buildQuestionView();
  if (state.screen === "analysis") {
    quizStage.innerHTML = buildAnalysisView();
    clearAnalysis();
    state.analysisIndex = 0;
    state.analysisTimer = window.setInterval(() => {
      state.analysisIndex = (state.analysisIndex + 1) % analysisMessages.length;
      const target = document.querySelector("[data-analysis-message]");
      if (target) target.textContent = analysisMessages[state.analysisIndex];
    }, 850);
    state.analysisTimeout = window.setTimeout(() => {
      clearAnalysis();
      state.screen = "capture";
      render();
    }, 2200);
  }
  if (state.screen === "capture") {
    quizStage.innerHTML = buildCaptureView();
    const privacy = quizStage.querySelector("#lead-privacy");
    if (privacy) privacy.checked = state.lead.privacy;
  }
  if (state.screen === "result") quizStage.innerHTML = buildResultView();
};

const showErrors = (errors) => {
  ["name", "whatsapp", "email", "privacy"].forEach((key) => {
    const field = quizStage.querySelector(`[data-field="${key}"]`);
    const target = quizStage.querySelector(`[data-error-for="${key}"]`);
    if (field) field.classList.toggle("is-error", Boolean(errors[key]));
    if (target) target.textContent = errors[key] || "";
  });
};

const validateLead = (formData) => {
  const errors = {};
  const name = formData.get("name").trim();
  const whatsapp = formData.get("whatsapp").trim();
  const email = formData.get("email").trim();
  const privacy = formData.get("privacy") === "on";
  if (name.length < 3) errors.name = "Escribe tu nombre completo para continuar.";
  if (!/^[\d\s()+-]{10,}$/.test(whatsapp)) errors.whatsapp = "Ingresa un WhatsApp válido.";
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Revisa el formato del correo.";
  if (!privacy) errors.privacy = "Necesitas aceptar el aviso de privacidad.";
  return errors;
};

document.addEventListener("click", (event) => {
  const launch = event.target.closest("[data-launch-quiz], [data-start-quiz]");
  const answer = event.target.closest("[data-answer-index]");
  const back = event.target.closest("[data-back-question]");
  const edit = event.target.closest("[data-edit-answers]");
  const restart = event.target.closest("[data-restart-quiz]");
  const viewCareer = event.target.closest("[data-view-career]");

  if (launch) {
    clearAnalysis();
    resetHighlights();
    state.screen = "question";
    state.currentQuestion = 0;
    state.answers = [];
    scrollToQuiz();
    render();
    return;
  }

  if (answer) {
    state.answers[state.currentQuestion] = Number(answer.dataset.answerIndex);
    if (state.currentQuestion === questions.length - 1) {
      state.results = getResults();
      state.screen = "analysis";
      render();
      return;
    }
    window.setTimeout(() => {
      state.currentQuestion += 1;
      render();
    }, 140);
    return;
  }

  if (back) {
    state.currentQuestion = Math.max(0, state.currentQuestion - 1);
    render();
    return;
  }

  if (edit) {
    state.screen = "question";
    state.currentQuestion = Math.max(0, state.answers.length - 1);
    render();
    return;
  }

  if (restart) {
    clearAnalysis();
    resetHighlights();
    state.screen = "intro";
    state.currentQuestion = 0;
    state.answers = [];
    state.results = null;
    render();
    scrollToQuiz();
    return;
  }

  if (viewCareer) {
    highlightCareer(viewCareer.dataset.viewCareer);
  }
});

document.addEventListener("submit", (event) => {
  const form = event.target.closest("[data-lead-form]");
  if (!form) {
    return;
  }

  event.preventDefault();
  const formData = new FormData(form);
  const errors = validateLead(formData);
  showErrors(errors);
  if (Object.keys(errors).length) {
    return;
  }

  state.lead = {
    name: formData.get("name").trim(),
    whatsapp: formData.get("whatsapp").trim(),
    email: formData.get("email").trim(),
    privacy: formData.get("privacy") === "on",
  };

  try {
    localStorage.setItem(
      "dasc-vocacional-lead",
      JSON.stringify({
        name: state.lead.name,
        whatsapp: state.lead.whatsapp,
        email: state.lead.email,
      })
    );
  } catch {}

  state.screen = "result";
  render();
});

setScrolledState();
window.addEventListener("scroll", setScrolledState, { passive: true });
revealVisibleItems();
render();
