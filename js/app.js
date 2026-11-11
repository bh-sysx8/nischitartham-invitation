/* ==========================================================================
   app.js — language switching, Google Calendar link, copy link, QR note.
   No frameworks, no build step, no network calls.
   ========================================================================== */
(function () {
  'use strict';

  var CFG = window.SITE_CONFIG;
  var T = window.I18N;
  var root = document.documentElement;

  /* ---------------------------------------------------------------- utils */
  function get(obj, path) {
    return path.split('.').reduce(function (o, k) {
      return (o === undefined || o === null) ? undefined : o[k];
    }, obj);
  }

  function publicUrl() {
    return CFG.publicUrl || (location.origin + location.pathname);
  }

  /* ------------------------------------------------------------- language */
  var currentLang = CFG.options.defaultLang;

  function readStoredLang() {
    var fromQuery = null;
    try {
      fromQuery = new URLSearchParams(location.search).get('lang');
    } catch (e) { /* very old browsers */ }
    if (fromQuery && T[fromQuery]) return fromQuery;
    try {
      var saved = localStorage.getItem(CFG.options.storageKey);
      if (saved && T[saved]) return saved;
    } catch (e) { /* private mode / blocked storage */ }
    return CFG.options.defaultLang;
  }

  function storeLang(lang) {
    try { localStorage.setItem(CFG.options.storageKey, lang); } catch (e) { /* ignore */ }
  }

  function applyLang(lang, opts) {
    var L = T[lang];
    if (!L) return;
    currentLang = lang;

    root.setAttribute('lang', L.htmlLang);
    root.classList.remove('lang-en', 'lang-te');
    root.classList.add(L.fontClass);

    // Text nodes
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      var value = get(L, key);
      if (value === undefined) {
        if (window.console) console.warn('[i18n] missing key:', lang, key);
        return;
      }
      el.textContent = value;
    });

    // aria-labels
    document.querySelectorAll('[data-aria]').forEach(function (el) {
      var value = get(L.aria, el.getAttribute('data-aria'));
      if (value) el.setAttribute('aria-label', value);
    });

    // image alt text
    document.querySelectorAll('[data-aria-alt]').forEach(function (el) {
      var value = get(L.aria, el.getAttribute('data-aria-alt'));
      if (value) el.setAttribute('alt', value);
    });

    // Document metadata
    document.title = L.meta.title;
    var desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', L.meta.description);

    // Switcher state
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      var active = btn.getAttribute('data-lang') === lang;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });

    // Language-dependent link
    buildCalendar();

    if (!opts || !opts.silent) storeLang(lang);
  }

  /* -------------------------------------------------------------- calendar */
  function buildGoogleUrl() {
    var E = CFG.event;
    var L = T[currentLang];
    var location = T[currentLang].venue;
    var params = new URLSearchParams({
      action: 'TEMPLATE',
      text: L.calendarEvent.summary,
      dates: E.googleStartUTC + '/' + E.googleEndUTC,
      ctz: E.timezone,
      details: L.calendarEvent.description,
      location: location,
      gprop: 'VCS'
    });
    return 'https://calendar.google.com/calendar/render?' + params.toString();
  }

  function buildCalendar() {
    var btn = document.getElementById('gcalBtn');
    if (btn) btn.setAttribute('href', buildGoogleUrl());
  }

  /* ----------------------------------------------------------------- toast */
  var toastTimer = null;
  function showToast(message) {
    var el = document.getElementById('toast');
    if (!el) return;
    el.textContent = message;
    el.hidden = false;
    void el.offsetWidth; // force reflow so the transition runs
    el.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      el.classList.remove('is-visible');
      setTimeout(function () { el.hidden = true; }, 300);
    }, 3600);
  }

  /* ------------------------------------------------------------ copy link */
  function legacyCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.top = '-1000px';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    document.body.removeChild(ta);
    return ok;
  }

  function setupCopy() {
    var btn = document.getElementById('copyBtn');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var url = publicUrl();
      var L = T[currentLang];
      if (navigator.clipboard && navigator.clipboard.writeText && window.isSecureContext) {
        navigator.clipboard.writeText(url).then(function () {
          showToast(L.toast.copied);
        }).catch(function () {
          showToast(legacyCopy(url) ? L.toast.copied : L.toast.copyError);
        });
      } else {
        showToast(legacyCopy(url) ? L.toast.copied : L.toast.copyError);
      }
    });
  }

  /* -------------------------------------------------------------- QR note */
  function setupQrNote() {
    var note = document.querySelector('.qr__note');
    if (!note) return;
    var configured = (CFG.publicUrl || '').replace(/\/+$/, '');
    var here = (location.origin + location.pathname).replace(/\/+$/, '');
    var offSite = configured !== here || location.protocol === 'file:';
    note.hidden = !(offSite && CFG.options.showQrNoteOffSite);
  }

  /* ------------------------------------------------------------------ init */
  function init() {
    setupCopy();
    setupQrNote();

    // Maps links come from config, so the URL is edited in one place
    document.querySelectorAll('[data-maps-link]').forEach(function (el) {
      el.setAttribute('href', CFG.venue.mapsUrl);
    });
    var mapsText = document.querySelector('[data-maps-text]');
    if (mapsText) mapsText.textContent = CFG.venue.mapsDisplay;

    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var lang = btn.getAttribute('data-lang');
        if (lang && lang !== currentLang) applyLang(lang);
      });
    });

    applyLang(readStoredLang(), { silent: true });
    root.classList.add('is-ready');
  }

  /* Small read-only surface for automated tests and debugging. */
  window.NischitardhamApp = {
    applyLang: applyLang,
    buildGoogleUrl: buildGoogleUrl,
    lang: function () { return currentLang; }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
