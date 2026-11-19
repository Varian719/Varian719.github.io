/* ============================================================
   THEME SWITCHER — Varian719 Portfolio
   Independent of app.js (which is obfuscated)
   ============================================================ */
(function () {
  'use strict';

  var STORAGE_KEY = 'v719-theme';
  var THEMES = ['default', 'classical', 'cyberpunk', 'retro'];
  var LABELS = {
    default:   'Light',
    classical: 'Classical',
    cyberpunk: 'Cyberpunk',
    retro:     'Retro'
  };

  function getStored() {
    try {
      var t = localStorage.getItem(STORAGE_KEY);
      return THEMES.indexOf(t) !== -1 ? t : null;
    } catch (e) { return null; }
  }

  function setTheme(theme) {
    if (THEMES.indexOf(theme) === -1) theme = 'default';
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem(STORAGE_KEY, theme); } catch (e) {}

    document.querySelectorAll('.theme-option').forEach(function (el) {
      el.classList.toggle('active', el.dataset.themeValue === theme);
    });

    var btn = document.querySelector('.theme-btn');
    if (btn) {
      btn.setAttribute('aria-label', 'Theme: ' + LABELS[theme]);
      btn.title = LABELS[theme];
    }

    window.dispatchEvent(new CustomEvent('themechange', { detail: { theme: theme } }));
  }

  /* Apply immediately to prevent FOUC */
  setTheme(getStored() || 'default');

  /* Wire up after DOM ready */
  document.addEventListener('DOMContentLoaded', function () {
    var switcher = document.getElementById('themeSwitcher');
    if (!switcher) return;

    var btn = switcher.querySelector('.theme-btn');

    switcher.querySelectorAll('.theme-option').forEach(function (opt) {
      opt.addEventListener('click', function () {
        setTheme(this.dataset.themeValue);
        switcher.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      });
    });

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = switcher.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
    });

    document.addEventListener('click', function () {
      if (switcher.classList.contains('open')) {
        switcher.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        switcher.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });

    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  });
})();