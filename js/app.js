/* ============================================================================
   app.js — rendering, language switching and the three actions.
   Vanilla JS, no dependencies, no build step.
   ========================================================================== */

(function () {
  'use strict';

  var STORAGE_KEY = 'nischitardham.lang';
  var DEFAULT_LANG = 'te';
  var SUPPORTED = Object.keys(TRANSLATIONS);

  var inviteEl = document.getElementById('invite');
  var actionsEl = document.getElementById('actions');
  var toastEl = document.getElementById('toast');
  var ganeshaEl = document.getElementById('ganesha');
  var switchEl = document.getElementById('lang-switch');
  var toastTimer = null;
  var currentLang = DEFAULT_LANG;

  /* ------------------------------------------------------------- utilities */

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = text;
    return node;
  }

  function readStoredLang() {
    try {
      var stored = window.localStorage.getItem(STORAGE_KEY);
      return SUPPORTED.indexOf(stored) !== -1 ? stored : null;
    } catch (err) {
      return null;
    }
  }

  function storeLang(lang) {
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch (err) {
      /* private mode or storage disabled — the invitation still works */
    }
  }

  function showToast(message) {
    if (!toastEl) return;
    window.clearTimeout(toastTimer);
    toastEl.textContent = message;
    toastEl.classList.add('is-visible');
    toastTimer = window.setTimeout(function () {
      toastEl.classList.remove('is-visible');
    }, 3000);
  }

  /* -------------------------------------------------------------- renderers */

  function divider() {
    var wrap = el('div', 'divider');
    wrap.setAttribute('aria-hidden', 'true');
    wrap.appendChild(el('span', 'divider__line'));
    wrap.appendChild(el('span', 'divider__gem'));
    wrap.appendChild(el('span', 'divider__line'));
    return wrap;
  }

  function renderDetails(block) {
    var wrap = el('div', 'details details--' + (block.variant || 'stack'));
    block.items.forEach(function (item) {
      var row = el('div', 'detail');
      row.appendChild(el('p', 'detail__label', item.label));
      if (item.href) {
        var link = el('a', 'detail__value detail__value--link', item.value);
        link.href = item.href;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        row.appendChild(link);
      } else {
        row.appendChild(el('p', 'detail__value', item.value));
      }
      wrap.appendChild(row);
    });
    return wrap;
  }

  function renderSignoff(block) {
    var wrap = el('div', 'signoff');
    wrap.appendChild(el('p', 'signoff__label', block.label));
    block.lines.forEach(function (line) {
      wrap.appendChild(el('p', 'signoff__names', line));
    });
    return wrap;
  }

  function renderBlock(block) {
    switch (block.type) {
      case 'title': {
        var h1 = el('h1', 'invite__title', block.text);
        h1.id = 'invite-title';
        return h1;
      }
      case 'lead':
        return el('p', 'invite__lead', block.text);
      case 'name':
        return el('p', 'invite__name', block.text);
      case 'parentage':
        return el('p', 'invite__parentage', block.text);
      case 'connector':
        return el('p', 'invite__connector', block.text);
      case 'para': {
        var p = el('p', 'invite__para' + (block.variant ? ' invite__para--' + block.variant : ''), block.text);
        return p;
      }
      case 'divider':
        return divider();
      case 'details':
        return renderDetails(block);
      case 'signoff':
        return renderSignoff(block);
      default:
        return null;
    }
  }

  function renderInvitation(edition) {
    var frag = document.createDocumentFragment();
    edition.blocks.forEach(function (block) {
      var node = renderBlock(block);
      if (node) frag.appendChild(node);
    });
    inviteEl.textContent = '';
    inviteEl.appendChild(frag);
  }

  /* ---------------------------------------------------------------- actions */

  function renderActions(edition) {
    var ui = edition.ui;
    actionsEl.textContent = '';

    var calendar = el('a', 'btn btn--primary');
    calendar.href = SITE.calendarUrl;
    calendar.target = '_blank';
    calendar.rel = 'noopener noreferrer';
    calendar.setAttribute('aria-label', ui.calendarAria);
    calendar.appendChild(el('span', 'btn__label', ui.calendar));
    actionsEl.appendChild(calendar);

    var maps = el('a', 'btn');
    maps.href = EVENT.mapsUrl;
    maps.target = '_blank';
    maps.rel = 'noopener noreferrer';
    maps.setAttribute('aria-label', ui.mapsAria);
    maps.appendChild(el('span', 'btn__label', ui.maps));
    actionsEl.appendChild(maps);

    var copy = el('button', 'btn');
    copy.type = 'button';
    copy.setAttribute('aria-label', ui.copyAria);
    copy.appendChild(el('span', 'btn__label', ui.copy));
    copy.addEventListener('click', function () {
      copyInvitationLink(ui);
    });
    actionsEl.appendChild(copy);
  }

  function invitationUrl() {
    if (window.location.protocol === 'http:' || window.location.protocol === 'https:') {
      return window.location.origin + window.location.pathname;
    }
    return EVENT.siteUrl;
  }

  function legacyCopy(text) {
    var field = document.createElement('textarea');
    field.value = text;
    field.setAttribute('readonly', '');
    field.style.position = 'fixed';
    field.style.top = '-1000px';
    field.style.opacity = '0';
    document.body.appendChild(field);
    field.select();
    var ok = false;
    try {
      ok = document.execCommand('copy');
    } catch (err) {
      ok = false;
    }
    document.body.removeChild(field);
    return ok;
  }

  function copyInvitationLink(ui) {
    var text = invitationUrl();

    function fallback() {
      if (legacyCopy(text)) {
        showToast(ui.copied);
      } else {
        showToast(ui.copyError);
      }
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        showToast(ui.copied);
      }, fallback);
    } else {
      fallback();
    }
  }

  /* ------------------------------------------------------- document metadata */

  function updateMetadata(edition) {
    var ui = edition.ui;
    document.documentElement.lang = ui.htmlLang;
    document.body.setAttribute('data-lang', edition.lang);
    document.title = ui.pageTitle;

    var metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) metaDescription.setAttribute('content', ui.pageDescription);

    var ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', ui.pageTitle);

    var ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute('content', ui.pageDescription);

    if (ganeshaEl) ganeshaEl.setAttribute('alt', edition.ganeshaAlt);
    if (switchEl) switchEl.setAttribute('aria-label', ui.langGroupLabel);
  }

  function updateSwitch(lang) {
    var buttons = switchEl ? switchEl.querySelectorAll('[data-set-lang]') : [];
    Array.prototype.forEach.call(buttons, function (button) {
      var isActive = button.getAttribute('data-set-lang') === lang;
      button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      button.classList.toggle('is-active', isActive);
    });
  }

  /* ---------------------------------------------------------------- language */

  function applyLanguage(lang, animate) {
    var edition = TRANSLATIONS[lang] || TRANSLATIONS[DEFAULT_LANG];
    currentLang = edition.lang;

    var paint = function () {
      renderInvitation(edition);
      renderActions(edition);
      updateMetadata(edition);
      updateSwitch(edition.lang);
    };

    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!animate || reduceMotion) {
      paint();
      return;
    }

    inviteEl.classList.add('is-swapping');
    window.setTimeout(function () {
      paint();
      inviteEl.classList.remove('is-swapping');
    }, 160);
  }

  function init() {
    applyLanguage(readStoredLang() || DEFAULT_LANG, false);

    if (switchEl) {
      switchEl.addEventListener('click', function (event) {
        var button = event.target.closest('[data-set-lang]');
        if (!button) return;
        var lang = button.getAttribute('data-set-lang');
        if (!TRANSLATIONS[lang] || lang === currentLang) return;
        storeLang(lang);
        applyLanguage(lang, true);
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
