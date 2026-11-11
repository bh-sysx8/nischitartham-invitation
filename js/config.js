/* ============================================================================
   config.js — single source of truth for every event detail.
   Change values here to update the calendar event, maps link, SEO fallbacks
   and the "copy invitation link" button.

   NOTE: the printed wording of the invitation (names, date line, venue line,
   sign-off) lives in js/translations.js, because the supplied Telugu and
   English texts are authoritative and must be reproduced word for word.
   If you change the date, time or venue, update BOTH files.
   ========================================================================== */

const EVENT = {
  // Calendar event (English, as supplied in the brief)
  title: 'Nischitardham – Lakshmi Sowmya & Praneeth Chandra',
  description:
    'Formal Engagement Ceremony of Lakshmi Sowmya Donepudi and Praneeth Chandra Bogineni.',

  // 15 November 2026, 9:30 AM – 11:30 AM, Asia/Kolkata
  date: { year: 2026, month: 11, day: 15 },
  start: { hour: 9, minute: 30 },
  end: { hour: 11, minute: 30 },
  timezone: 'Asia/Kolkata',

  location:
    'SVN Conventions, To, 100 Feet Rd, Tadigadapa, Enikepadu, Poranki, Andhra Pradesh 520007, Vijayawada.',

  mapsUrl: 'https://maps.app.goo.gl/8UAu74C3tKZx4CgZ8',

  // Public URL of the deployed invitation (used by "copy invitation link")
  siteUrl: 'https://bh-sysx8.github.io/nischitartham-invitation/',

  // Reference only — the visible wording is in translations.js
  bride: { name: 'Lakshmi Sowmya Donepudi', parents: ['Sita Donepudi', 'Sridhar Donepudi'] },
  groom: { name: 'Praneeth Chandra Bogineni', parents: ['Madhavi Bogineni', 'Surendra Siva Prasad Bogineni'] },
  hosts: ['Madhavi Bogineni', 'Surendra Siva Prasad Bogineni']
};

const SITE = {
  // Google Calendar "add event" deep link — no .ics, no intermediate page.
  calendarUrl: (function buildCalendarUrl(e) {
    const pad = (n) => String(n).padStart(2, '0');
    const stamp = (d, t) =>
      `${d.year}${pad(d.month)}${pad(d.day)}T${pad(t.hour)}${pad(t.minute)}00`;
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: e.title,
      dates: `${stamp(e.date, e.start)}/${stamp(e.date, e.end)}`,
      ctz: e.timezone,
      location: e.location,
      details: e.description
    });
    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  })(EVENT)
};
