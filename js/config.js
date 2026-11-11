/* ==========================================================================
   config.js — the single place to edit event details.
   Everything else (translations, calendar, maps, QR) reads from here.
   ========================================================================== */
window.SITE_CONFIG = {
  /* ---- People --------------------------------------------------------
     Canonical names, used by the calendar file and the Google Calendar
     link. What is printed on the card lives in js/translations.js.      */
  groom: {
    name: 'Praneeth Chandra Bogineni',
    parents: ['Madhavi Bogineni', 'Surendra Siva Prasad Bogineni']
  },
  bride: {
    name: 'Lakshmi Sowmya Donepudi',
    parents: ['Sita Donepudi', 'Sridhar Donepudi']
  },

  /* ---- Event --------------------------------------------------------- */
  event: {
    /* ISO local date/time in the event timezone. Used for the calendar link. */
    dateISO: '2026-11-15',
    startTime: '09:30',
    endTime: '11:30',
    timezone: 'Asia/Kolkata',
    /* UTC stamps used by the Google Calendar link.
       IST is UTC+05:30, so 9:30 a.m. IST = 04:00 UTC. */
    googleStartUTC: '20261115T040000Z',
    googleEndUTC: '20261115T060000Z'
  },

  /* ---- Venue --------------------------------------------------------- */
  venue: {
    mapsUrl: 'https://maps.app.goo.gl/8UAu74C3tKZx4CgZ8',
    /* Shown as the link text next to "Google Maps" on the card. */
    mapsDisplay: 'maps.app.goo.gl/8UAu74C3tKZx4CgZ8'
  },

  /* ---- Public URL of the deployed invitation --------------------------
     Used for the "copy link" button and the QR note.
     Must end with a trailing slash.                                    */
  publicUrl: 'https://bh-sysx8.github.io/nischitartham-invitation/',

  /* ---- Behaviour ----------------------------------------------------- */
  options: {
    defaultLang: 'te',
    storageKey: 'nischitardham.lang',
    /* Show the "this QR opens the published invitation" note when the page
       is not being served from publicUrl (i.e. a local preview). */
    showQrNoteOffSite: true
  }
};
