/* ============================================================
   THEME SWITCHER — Varian719 Portfolio (native <select>)
   ============================================================ */
(function () {
    'use strict';

    var STORAGE_KEY = 'v719-theme';
    var THEMES = ['default', 'classical', 'cyberpunk', 'retro'];

    function getStored() {
        try {
            var t = localStorage.getItem(STORAGE_KEY);
            return THEMES.indexOf(t) !== -1 ? t : null;
        } catch (e) { return null; }
    }

    function applyTheme(theme, persist) {
        if (THEMES.indexOf(theme) === -1) theme = 'default';
        document.documentElement.setAttribute('data-theme', theme);

        if (persist !== false) {
            try { localStorage.setItem(STORAGE_KEY, theme); } catch (e) {}
        }

        // Sync select value
        var sel = document.getElementById('themeSwitcher');
        if (sel && sel.value !== theme) sel.value = theme;

        window.dispatchEvent(new CustomEvent('themechange', {
            detail: { theme: theme }
        }));
    }

    /* Apply sebelum DOM siap — cegah FOUC */
    applyTheme(getStored() || 'default', false);

    /* Wire setelah DOM siap */
    document.addEventListener('DOMContentLoaded', function () {
        var sel = document.getElementById('themeSwitcher');
        if (!sel) return;

        // Pastikan select menampilkan nilai saat ini
        sel.value = document.documentElement.getAttribute('data-theme') || 'default';

        sel.addEventListener('change', function () {
            applyTheme(this.value, true);
        });
    });
})();