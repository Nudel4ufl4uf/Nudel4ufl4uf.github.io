/* Philo Klemenz – Profile
   Language toggle (DE/EN), dark mode and accent color, saved in localStorage. */
(function () {
  'use strict';

  var root = document.documentElement;
  var STORE_KEY = 'pk-prefs';

  /* ---------- German texts (English is taken from the HTML itself) ---------- */
  var DE = {
    skip: 'Zum Inhalt springen',
    navHome: 'Profil', navPortfolio: 'Portfolio', zoomLabel: 'Bild vergrößern', menuLabel: 'Menü',
    navExp: 'Werdegang', navSkills: 'Skills', navProjects: 'Projekte', navContact: 'Kontakt',
    langLabel: 'Sprache', darkLabel: 'Dunkelmodus', accentLabel: 'Akzentfarbe',
    accGreen: 'Grün', accTeal: 'Petrol', accBlue: 'Blau', accAmber: 'Bernstein',

    badge: 'IT-Projektmanager @ ITU Consult',
    h1: 'Ich halte komplexe IT-Projekte auf Kurs.',
    intro: 'Hi, ich bin Philo. Ich leite Projektteams im Automotive-Umfeld, aktuell die One.Crypto-Projekte für Volkswagen. B.Sc. Wirtschaftsinformatik, PRINCE2®-zertifiziert und mit Entwickler-Hintergrund.',
    cta1: 'Kontakt aufnehmen',
    certSub: 'Zertifizierter Projektmanager',

    h1v: 'Seit 2024', h1l: 'im IT-Projektmanagement',
    h2l: 'Zulieferer für das SGSEC-Cluster bei VW',
    h3l: 'Wirtschaftsinformatik, CAU Kiel',
    h4v: '3 Jahre', h4l: 'in Washington, D.C. gelebt',

    expH2: 'Beruf und Ausbildung', current: 'Aktuell',
    e1t: 'IT-Projektmanager',
    e1m: 'ITU Consult GmbH · seit 09/2024',
    e1d: 'Leitung der One.Crypto-Projekte für Volkswagen: Gesamtprojektmanagement, Steuerung aller Teams und Verantwortung für die Umsetzung vom Kickoff bis zum Rollout.',
    e2m: 'ITU Consult GmbH · 01/2024 – 09/2024',
    e2d: 'Unterstützung der Projektleitung im SFD-Projekt für Volkswagen bei verschiedenen Themen sowie Leitung des Support-Teams.',
    e3t: 'B.Sc. Wirtschaftsinformatik',
    e3m: 'Christian-Albrechts-Universität zu Kiel · 2019 – 2023',
    e3d: 'Informatik, BWL, VWL, Recht und IT-Sicherheit mit Schwerpunkt IT-Projektmanagement. Bachelorarbeit:',
    thesis: 'Augmented Reality in Logistikprozessen',
    e4m: 'Deutsche Schule Washington, D.C. & Philipp-Melanchthon-Gymnasium Meine · 2019',
    e4d: 'Drei Jahre an der Deutschen Schule Washington, D.C., danach Abitur in Meine mit Schwerpunkt Informatik, Mathematik und Physik.',

    skillsH2: 'Projektmanager, der Entwickler versteht',
    g1: 'Projektmanagement', g2: 'Programmierung', g3: 'Web, Daten & Ops',
    s1: 'Moderation & Präsentation', s2: 'Teamführung', s3: 'Stakeholder-Management',

    projH2: 'Ausgewählte Projekte', portfolio: 'Ganzes Portfolio ansehen →',
    p1tag: 'Bachelorarbeit · 2023',
    p1d: 'Wie AR Prozesse in der Logistik unterstützen und vereinfachen kann.',
    p2t: 'Radar-Playlist-Bot',
    p2d: 'Ein selbst entwickelter Bot, der jede Woche Genre-„Radar“-Playlists erneuert.',
    p3tag: 'Portfolio', p3t: 'Weitere Projekte',
    p3d: 'Apps, Tools und Uni-Projekte – alles im vollständigen Portfolio.',

    contactH2: 'Lass uns in den Austausch kommen und über IT sprechen.',
    contactP: 'Offen für neue Herausforderungen und spannende IT-Themen. Ich antworte meist innerhalb eines Tages.',
    email: 'E-Mail schreiben', linkedin: 'Auf LinkedIn vernetzen',
    offClock: 'Privat:'
  };

  var META = {
    en: { title: 'Philo Klemenz – IT Project Manager' },
    de: { title: 'Philo Klemenz – IT-Projektmanager' }
  };

  /* ---------- Capture English from the markup ---------- */
  var textNodes = document.querySelectorAll('[data-i18n]');
  var ariaNodes = document.querySelectorAll('[data-i18n-aria]');
  var EN = {};
  textNodes.forEach(function (el) { EN[el.dataset.i18n] = el.textContent.trim(); });
  ariaNodes.forEach(function (el) { EN[el.dataset.i18nAria] = el.getAttribute('aria-label'); });
  // Inline translations: data-de holds the German text, the English is the element's own text
  var deNodes = document.querySelectorAll('[data-de]');
  deNodes.forEach(function (el) { el.dataset.en = el.textContent.trim(); });
  var DICT = { en: EN, de: DE };

  /* ---------- Preferences ---------- */
  function load() {
    try { return JSON.parse(localStorage.getItem(STORE_KEY) || '{}'); } catch (e) { return {}; }
  }
  function save(patch) {
    var p = load();
    for (var k in patch) p[k] = patch[k];
    try { localStorage.setItem(STORE_KEY, JSON.stringify(p)); } catch (e) {}
  }

  /* ---------- Language ---------- */
  function setLang(lang, persist) {
    var dict = DICT[lang] || EN;
    root.setAttribute('lang', lang);
    textNodes.forEach(function (el) {
      var v = dict[el.dataset.i18n];
      if (v != null) el.textContent = v;
    });
    deNodes.forEach(function (el) {
      el.textContent = lang === 'de' ? el.dataset.de : el.dataset.en;
    });
    ariaNodes.forEach(function (el) {
      var v = dict[el.dataset.i18nAria];
      if (v != null) el.setAttribute('aria-label', v);
    });
    if (META[lang] && document.body.dataset.page !== 'sub') document.title = META[lang].title;
    document.querySelectorAll('[data-lang]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.lang === lang));
    });
    if (persist) save({ lang: lang });
  }

  /* ---------- Theme ---------- */
  function setDark(dark, persist) {
    root.setAttribute('data-theme', dark ? 'dark' : 'light');
    var btn = document.getElementById('theme-toggle');
    if (btn) btn.setAttribute('aria-pressed', String(dark));
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', dark ? '#0F1210' : '#F6F7F4');
    if (persist) save({ dark: dark });
  }

  /* ---------- Accent ---------- */
  function setAccent(id, persist) {
    root.setAttribute('data-accent', id);
    document.querySelectorAll('[data-accent-pick]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.accentPick === id));
    });
    if (persist) save({ accent: id });
  }

  /* ---------- Wire up ---------- */
  setLang(root.getAttribute('lang') === 'de' ? 'de' : 'en', false);
  setDark(root.getAttribute('data-theme') === 'dark', false);
  setAccent(root.getAttribute('data-accent') || 'green', false);

  document.querySelectorAll('[data-lang]').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.dataset.lang, true); });
  });
  var themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) themeBtn.addEventListener('click', function () {
    setDark(root.getAttribute('data-theme') !== 'dark', true);
  });
  document.querySelectorAll('[data-accent-pick]').forEach(function (b) {
    b.addEventListener('click', function () { setAccent(b.dataset.accentPick, true); });
  });

  // Follow system theme changes until the visitor picks one explicitly
  if (window.matchMedia) {
    var mq = window.matchMedia('(prefers-color-scheme: dark)');
    var onChange = function (e) { if (typeof load().dark !== 'boolean') setDark(e.matches, false); };
    if (mq.addEventListener) mq.addEventListener('change', onChange);
  }

  /* ---------- Footer year ---------- */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  /* ---------- Mobile menu ---------- */
  var menuBtn = document.getElementById('menu-toggle');
  var navEl = menuBtn && menuBtn.closest('.nav');
  if (navEl) {
    var setMenu = function (open) {
      navEl.classList.toggle('is-open', open);
      menuBtn.setAttribute('aria-expanded', String(open));
    };
    menuBtn.addEventListener('click', function () { setMenu(!navEl.classList.contains('is-open')); });
    navEl.querySelectorAll('.nav-links a').forEach(function (a) {
      a.addEventListener('click', function () { setMenu(false); });
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
  }

  /* ---------- Image lightbox (project pages) ---------- */
  var box = document.getElementById('lightbox');
  if (box) {
    var boxImg = box.querySelector('img');
    var closeBox = function () { box.hidden = true; document.body.style.overflow = ''; };
    document.querySelectorAll('[data-zoom]').forEach(function (b) {
      b.addEventListener('click', function () {
        var im = b.querySelector('img');
        boxImg.src = im.currentSrc || im.src;
        boxImg.alt = im.alt;
        box.hidden = false;
        document.body.style.overflow = 'hidden';
      });
    });
    box.addEventListener('click', closeBox);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeBox(); });
  }

  /* ---------- Reveal on scroll ---------- */
  if ('IntersectionObserver' in window) {
    var targets = document.querySelectorAll('.stat, .timeline li, .skill-card, .project-card, .contact, .info-card, .shot');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -10% 0px' });
    targets.forEach(function (el) { el.classList.add('reveal'); io.observe(el); });
  }
})();
