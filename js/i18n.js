(function () {
  const STORAGE_KEY = 'femitopia_lang';
  const DEFAULT_LANG = 'en';
  const SUPPORTED = ['en', 'es', 'fr', 'de', 'pt'];

  let currentTranslations = {};

  function detectBrowserLang() {
    const lang = (navigator.language || navigator.userLanguage || '').slice(0, 2).toLowerCase();
    return SUPPORTED.includes(lang) ? lang : DEFAULT_LANG;
  }

  function getSavedLang() {
    return localStorage.getItem(STORAGE_KEY) || detectBrowserLang();
  }

  function applyTranslations(t) {
    currentTranslations = t;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (t[key] !== undefined) el.textContent = t[key];
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (t[key] !== undefined) el.setAttribute('placeholder', t[key]);
    });

    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.getAttribute('data-i18n-html');
      if (t[key] !== undefined) el.innerHTML = t[key];
    });
  }

  function setActiveLangButton(lang) {
    document.querySelectorAll('.lang-option').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
    const current = document.getElementById('lang-current');
    if (current) {
      const labels = { en: '🇬🇧 EN', es: '🇲🇽 ES', fr: '🇫🇷 FR', de: '🇩🇪 DE', pt: '🇧🇷 PT' };
      current.textContent = labels[lang] || lang.toUpperCase();
    }
    document.documentElement.lang = lang;
  }

  function loadLanguage(lang) {
    if (!SUPPORTED.includes(lang)) lang = DEFAULT_LANG;
    fetch('locales/' + lang + '.json')
      .then(r => r.json())
      .then(t => {
        applyTranslations(t);
        setActiveLangButton(lang);
        localStorage.setItem(STORAGE_KEY, lang);
      })
      .catch(() => {
        if (lang !== DEFAULT_LANG) loadLanguage(DEFAULT_LANG);
      });
  }

  function initSwitcher() {
    document.querySelectorAll('.lang-option').forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        loadLanguage(lang);
        document.getElementById('lang-dropdown').classList.remove('open');
      });
    });

    const toggle = document.getElementById('lang-toggle');
    const dropdown = document.getElementById('lang-dropdown');
    if (toggle && dropdown) {
      toggle.addEventListener('click', e => {
        e.stopPropagation();
        dropdown.classList.toggle('open');
      });
      document.addEventListener('click', () => dropdown.classList.remove('open'));
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    initSwitcher();
    loadLanguage(getSavedLang());
  });
})();
