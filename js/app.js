/* ==========================================================================
   app.js — language switching, calendar files, sharing, QR note.
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

  function fill(template, vars) {
    return String(template).replace(/\{(\w+)\}/g, function (m, k) {
      return (vars && vars[k] !== undefined) ? vars[k] : m;
    });
  }

  function joinNames(list) {
    var L = T[currentLang] || T[CFG.options.defaultLang];
    return list.join(L.parentsJoin);
  }

  function publicUrl() {
    var u = CFG.publicUrl || (location.origin + location.pathname);
    return u;
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

  function vars() {
    var L = T[currentLang];
    return {
      bride: L.names.bride,
      groom: L.names.groom,
      brideParents: joinNames(L.names.brideParents),
      groomParents: joinNames(L.names.groomParents),
      url: publicUrl()
    };
  }

  function applyLang(lang, opts) {
    var L = T[lang];
    if (!L) return;
    currentLang = lang;

    root.setAttribute('lang', L.htmlLang);
    root.classList.remove('lang-en', 'lang-te');
    root.classList.add(L.fontClass);

    var V = vars();

    // Text nodes
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      var value = get(L, key);
      if (value === undefined) {
        if (window.console) console.warn('[i18n] missing key:', lang, key);
        return;
      }
      el.textContent = fill(value, V);
    });

    // aria-labels
    document.querySelectorAll('[data-aria]').forEach(function (el) {
      var key = el.getAttribute('data-aria');
      var value = get(L.aria, key);
      if (value) el.setAttribute('aria-label', value);
    });

    // image alt text
    document.querySelectorAll('[data-aria-alt]').forEach(function (el) {
      var key = el.getAttribute('data-aria-alt');
      var value = get(L.aria, key);
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

    // Rebuild language-dependent links
    buildCalendar();
    buildWhatsApp();

    if (!opts || !opts.silent) storeLang(lang);
  }

  /* -------------------------------------------------------------- calendar */
  function pad(n) { return (n < 10 ? '0' : '') + n; }

  function icsEscape(str) {
    return String(str)
      .replace(/\\/g, '\\\\')
      .replace(/;/g, '\\;')
      .replace(/,/g, '\\,')
      .replace(/\r?\n/g, '\\n');
  }

  // Fold lines to 75 octets per RFC 5545 (continuation lines start with a space)
  function fold(line) {
    var bytes = new TextEncoder().encode(line);
    if (bytes.length <= 75) return line;
    var out = [];
    var current = '';
    var count = 0;
    for (var i = 0; i < line.length; i++) {
      var ch = line[i];
      var size = new TextEncoder().encode(ch).length;
      if (count + size > 74) {
        out.push(current);
        current = ' ' + ch;
        count = 1 + size;
      } else {
        current += ch;
        count += size;
      }
    }
    if (current) out.push(current);
    return out.join('\r\n');
  }

  function icsDate(dateISO, time) {
    return dateISO.replace(/-/g, '') + 'T' + time.replace(':', '') + '00';
  }

  function dtStamp() {
    var d = new Date();
    return d.getUTCFullYear() + pad(d.getUTCMonth() + 1) + pad(d.getUTCDate()) + 'T' +
      pad(d.getUTCHours()) + pad(d.getUTCMinutes()) + pad(d.getUTCSeconds()) + 'Z';
  }

  function buildIcs() {
    var E = CFG.event;
    var L = T[currentLang];
    var ev = L.calendarEvent;
    var lines = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Nischitardham Invitation//' + currentLang.toUpperCase() + '//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VTIMEZONE',
      'TZID:' + E.timezone,
      'BEGIN:STANDARD',
      'DTSTART:19700101T000000',
      'TZOFFSETFROM:' + E.tzOffset,
      'TZOFFSETTO:' + E.tzOffset,
      'TZNAME:IST',
      'END:STANDARD',
      'END:VTIMEZONE',
      'BEGIN:VEVENT',
      'UID:nischitardham-' + E.dateISO + '@bh-sysx8.github.io',
      'DTSTAMP:' + dtStamp(),
      'DTSTART;TZID=' + E.timezone + ':' + icsDate(E.dateISO, E.startTime),
      'DTEND;TZID=' + E.timezone + ':' + icsDate(E.dateISO, E.endTime),
      'SUMMARY:' + icsEscape(ev.summary),
      'LOCATION:' + icsEscape(CFG.venue.name + ', ' + CFG.venue.address),
      'DESCRIPTION:' + icsEscape(ev.description),
      'URL:' + publicUrl(),
      'TRANSP:OPAQUE',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ];
    return lines.map(fold).join('\r\n') + '\r\n';
  }

  function buildGoogleUrl() {
    var E = CFG.event;
    var L = T[currentLang];
    var params = new URLSearchParams({
      action: 'TEMPLATE',
      text: L.calendarEvent.summary,
      dates: E.googleStartUTC + '/' + E.googleEndUTC,
      ctz: E.timezone,
      details: L.calendarEvent.description,
      location: CFG.venue.name + ', ' + CFG.venue.address,
      gprop: 'VCS'
    });
    return 'https://calendar.google.com/calendar/render?' + params.toString();
  }

  function buildWhatsApp() {
    var msg = fill(T[currentLang].share, vars());
    var link = 'https://wa.me/?text=' + encodeURIComponent(msg);
    var el = document.getElementById('waBtn');
    if (el) el.setAttribute('href', link);
  }

  function buildCalendar() {
    var L = T[currentLang];
    var ics = document.getElementById('icsLink');
    var gcal = document.getElementById('gcalLink');
    if (!ics || !gcal) return;

    var blob = new Blob([buildIcs()], { type: 'text/calendar;charset=utf-8' });
    if (ics.dataset.url) URL.revokeObjectURL(ics.dataset.url);
    var url = URL.createObjectURL(blob);
    ics.dataset.url = url;
    ics.setAttribute('href', url);
    ics.setAttribute('download', CFG.files.ics);
    gcal.setAttribute('href', buildGoogleUrl());

    // Keep the visible labels in sync with the active language
    ics.querySelector('span').textContent = L.actions.ics;
    gcal.querySelector('span').textContent = L.actions.google;
  }

  /* ------------------------------------------------------------ menu a11y */
  function setupMenu() {
    var btn = document.getElementById('calBtn');
    var menu = document.getElementById('calMenu');
    if (!btn || !menu) return;
    var items = function () {
      return Array.prototype.slice.call(menu.querySelectorAll('[role="menuitem"]'));
    };

    function open() {
      menu.hidden = false;
      btn.setAttribute('aria-expanded', 'true');
      var first = items()[0];
      if (first) first.focus();
      document.addEventListener('keydown', onKey);
      document.addEventListener('click', onOutside, true);
    }

    function close(refocus) {
      if (menu.hidden) return;
      menu.hidden = true;
      btn.setAttribute('aria-expanded', 'false');
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onOutside, true);
      if (refocus) btn.focus();
    }

    function onKey(e) {
      var list = items();
      var idx = list.indexOf(document.activeElement);
      if (e.key === 'Escape') { e.preventDefault(); close(true); }
      else if (e.key === 'ArrowDown') { e.preventDefault(); (list[idx + 1] || list[0]).focus(); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); (list[idx - 1] || list[list.length - 1]).focus(); }
      else if (e.key === 'Tab') { close(false); }
    }

    function onOutside(e) {
      if (!menu.contains(e.target) && !btn.contains(e.target)) close(false);
    }

    btn.addEventListener('click', function () {
      if (menu.hidden) open(); else close(true);
    });
    btn.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown' && menu.hidden) { e.preventDefault(); open(); }
    });
    menu.addEventListener('click', function (e) {
      if (e.target.closest('[role="menuitem"]')) close(false);
    });
  }

  /* ----------------------------------------------------------------- toast */
  var toastTimer = null;
  function showToast(message) {
    var el = document.getElementById('toast');
    if (!el) return;
    el.textContent = message;
    el.hidden = false;
    // force reflow so the transition runs
    void el.offsetWidth;
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
    setupMenu();
    setupCopy();
    setupQrNote();

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
    buildIcs: buildIcs,
    buildGoogleUrl: buildGoogleUrl,
    lang: function () { return currentLang; }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
