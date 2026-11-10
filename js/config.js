/* ==========================================================================
   config.js — the single place to edit event details.
   Everything else (translations, calendar, maps, QR) reads from here.
   ========================================================================== */
window.SITE_CONFIG = {
  /* ---- People -------------------------------------------------------- */
  bride: {
    name: 'Lakshmi Sowmya Donepudi',
    parents: ['Sita Donepudi', 'Sridhar Donepudi']
  },
  groom: {
    name: 'Praneeth Chandra Bogineni',
    parents: ['Madhavi Bogineni', 'Surendra Siva Prasad Bogineni']
  },

  /* ---- Event --------------------------------------------------------- */
  event: {
    /* ISO local date/time in the event timezone. Used for the calendar files. */
    dateISO: '2026-11-15',
    startTime: '09:30',
    endTime: '11:30',
    timezone: 'Asia/Kolkata',
    tzOffset: '+0530',
    /* Shown on the card. Edit these three strings when the date changes. */
    displayDate: { en: 'Sunday, 15 November 2026', te: 'ఆదివారం, 15 నవంబర్ 2026' },
    displayTime: { en: '9:30 AM IST', te: 'ఉదయం 9:30 గంటలకు (IST)' },
    /* UTC stamps used by the Google Calendar link (see README: how to recalculate). */
    googleStartUTC: '20261115T040000Z',
    googleEndUTC: '20261115T060000Z'
  },

  /* ---- Venue --------------------------------------------------------- */
  venue: {
    name: 'SVN Conventions',
    address: 'To, 100 Feet Rd, Tadigadapa, Enikepadu, Poranki, Andhra Pradesh 520007',
    city: 'Vijayawada, Andhra Pradesh, India',
    cityTe: 'విజయవాడ, ఆంధ్రప్రదేశ్, భారతదేశం',
    mapsUrl: 'https://maps.app.goo.gl/8UAu74C3tKZx4CgZ8'
  },

  /* ---- Public URL of the deployed invitation --------------------------
     Used for the WhatsApp message, the "copy link" button and the QR note.
     Must end with a trailing slash.                                    */
  publicUrl: 'https://bh-sysx8.github.io/nischitartham-invitation/',

  /* ---- Files --------------------------------------------------------- */
  files: {
    ics: 'nischitardham-2026-11-15.ics',
    qr: 'assets/qr.png'
  },

  /* ---- Behaviour ----------------------------------------------------- */
  options: {
    defaultLang: 'en',
    storageKey: 'nischitardham.lang',
    /* Hide the "this QR opens the published invitation" note on the live site. */
    showQrNoteOffSite: true
  }
};
