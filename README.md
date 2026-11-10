# Nischitardham — Digital Invitation Card

A single-page, premium digital invitation card for the Nischitardham of
**Lakshmi Sowmya Donepudi** and **Praneeth Chandra Bogineni**, in English and Telugu.

Plain HTML, CSS and vanilla JavaScript. No frameworks, no build step, no backend,
no external services at runtime — it runs straight from GitHub Pages.

Live URL (after deployment): <https://bh-sysx8.github.io/nischitartham-invitation/>

---

## 1. What is in this project

```
nischitartham-invitation/
├── index.html              the whole invitation (one card, nothing else)
├── .nojekyll               tells GitHub Pages to serve files as-is
├── css/
│   ├── fonts.css           local @font-face rules (unicode-range subsets)
│   └── styles.css          all styling
├── js/
│   ├── config.js           ← EVENT DATA LIVES HERE
│   ├── translations.js     ← ALL ENGLISH + TELUGU TEXT LIVES HERE
│   └── app.js              language switching, calendar, sharing, QR note
├── assets/
│   ├── ganesha.svg         original gold line-art medallion (also inlined in index.html)
│   ├── qr.png              QR code pointing at the published URL
│   ├── og-image.png        1200×630 social preview card
│   ├── favicon.svg
│   ├── apple-touch-icon.png
│   └── fonts/              9 self-hosted woff2 files (463 KB total)
├── scripts/
│   └── generate_qr.py      regenerate qr.png after changing the URL
├── docs/
│   └── GITHUB-PAGES.md     deployment walkthrough + troubleshooting
├── TESTING.md              what was tested and what was found
└── README.md               this file
```

Every path is relative, so the site works at
`https://<user>.github.io/<repo>/` (a repository sub-path), not just at a domain root.

## 2. Look at it locally

Unzip the folder and double-click `index.html`.

A local file preview works for everything except two things, both expected:

* **The QR code** points at the *published* URL. While you are viewing the file
  locally, a small italic line under the QR says so
  (“This QR opens the published invitation.”). That line disappears
  automatically once the site is live at the configured URL.
* **Copy link** copies the published URL from `config.js`, not the `file://` path.

For a local server (optional):

```bash
cd nischitartham-invitation
python3 -m http.server 8000
# open http://localhost:8000
```

## 3. Changing event details

### 3.1 The single config file — `js/config.js`

| What you want to change | Field |
|---|---|
| Bride's name (used in calendar files) | `bride.name` |
| Bride's parents | `bride.parents` (array of two) |
| Groom's name | `groom.name` |
| Groom's parents | `groom.parents` |
| Date used by the calendar file | `event.dateISO` (`YYYY-MM-DD`) |
| Start / end time | `event.startTime`, `event.endTime` (`HH:MM`, 24-hour) |
| Timezone | `event.timezone`, `event.tzOffset` |
| Google Calendar UTC stamps | `event.googleStartUTC`, `event.googleEndUTC` |
| Venue name | `venue.name` |
| Full postal address | `venue.address` |
| City line | `venue.city`, `venue.cityTe` |
| Google Maps link | `venue.mapsUrl` |
| Public URL of the invitation | `publicUrl` |
| Downloaded calendar file name | `files.ics` |

### 3.2 If the date changes, update three things

1. `event.dateISO` — drives the `.ics` file.
2. `event.displayDate` in `translations.js` — the date **printed on the card**,
   in both languages (`en` and `te`). The card never formats dates with
   JavaScript, so the wording is exactly what you type.
3. `event.googleStartUTC` / `event.googleEndUTC` — the Google Calendar link.
   The event is in IST (UTC+05:30), so **subtract 5 hours 30 minutes** from the
   local time and write it as `YYYYMMDDTHHMMSSZ`.
   Example: 15 Nov 2026, 9:30 AM IST → `20261115T040000Z`;
   11:30 AM IST → `20261115T060000Z`.

Keep the event length at two hours, or change `event.endTime` as well.

### 3.3 Changing names

Names appear in two places on purpose:

* `js/config.js` → used by the calendar file, the Google Calendar link and the
  WhatsApp text variables.
* `js/translations.js` → `names` inside **both** the `en` and `te` blocks, because
  the Telugu edition prints the names in Telugu script.

Edit both. `daughterOf` / `sonOf` in `translations.js` are templates — the parent
names are inserted from the `names` arrays, so you never retype them twice.

## 4. Changing or extending the text

All display text lives in `js/translations.js`, one object per language:

```js
window.I18N = { en: { ... }, te: { ... } };
```

* Every element in `index.html` carries `data-i18n="key"`; `app.js` writes the
  matching string in when the language changes. Add a key to **both** languages
  or the browser console will warn `[i18n] missing key`.
* `{bride}`, `{groom}`, `{brideParents}`, `{groomParents}` and `{url}` are
  placeholders filled from `config.js`.
* Nothing is machine-translated at runtime. Every Telugu string is written out
  in the file.
* `aria` holds the accessibility labels (language group, event details, QR,
  Ganesha, calendar menu), `toast` the copy-link notifications, `share` the
  WhatsApp message, `calendarEvent` the calendar title and description.

Two strings deliberately stay in Latin script in the Telugu edition:
the venue name **SVN Conventions** and the postal address, so that what a guest
reads matches what Google Maps and the printed card show.

### Telugu wording to double-check before you send it out

The Telugu text was written by hand for this project. Please read these once
with a native speaker — they are correct but personal choices:

* The invitation paragraph in `te.message`.
* `te.daughterOf` / `te.sonOf` use the respectful plural form
  “… గార్ల కుమార్తె / కుమారుడు”. Some families prefer “… గారి కుమార్తె”.
* Name spellings in Telugu script:
  లక్ష్మీ సౌమ్య దొనేపూడి · ప్రణీత్ చంద్ర బోగినేని · సీత దొనేపూడి ·
  శ్రీధర్ దొనేపూడి · మాధవి బోగినేని · సురేంద్ర శివ ప్రసాద్ బోగినేని.
  Surname and given-name spellings vary between families — confirm each one.
* `te.footer` (“ప్రేమతో, దొనేపూడి మరియు బోగినేని కుటుంబాలు”).

## 5. Replacing the Ganesha illustration

The medallion is original artwork drawn for this project (`assets/ganesha.svg`)
and is inlined in `index.html` inside `<div class="ganesha">`.

To swap it:

1. Put your new SVG in `assets/` (for example `ganesha-new.svg`).
2. Make sure it uses `fill="none" stroke="currentColor"` so it picks up the gold
   colour from CSS, and keep a `viewBox`.
3. Copy its contents into `index.html`, replacing everything between
   `<div class="ganesha">` and its closing `</div>`. Keep the
   `<div class="ganesha">` wrapper — that is what sets the size and colour.
4. Keep the `<title>` element (with `data-i18n="aria.ganesha"`) so screen readers
   still announce it in the visitor's language.

If your artwork is a PNG instead, use
`<img src="assets/ganesha.png" alt="Lord Ganesha" width="320" height="336">`
inside the wrapper instead of inline SVG.

## 6. QR code

`assets/qr.png` encodes `publicUrl` from `config.js`
(currently `https://bh-sysx8.github.io/nischitartham-invitation/`).
If you change the URL, regenerate it:

```bash
pip install qrcode[pil]
python3 scripts/generate_qr.py
```

The script reads the URL from `js/config.js`, so it always matches the card.

## 7. Deploying

Short version — full walkthrough, verification steps and troubleshooting in
[docs/GITHUB-PAGES.md](docs/GITHUB-PAGES.md):

1. Upload the contents of this folder to the **root** of
   `bh-sysx8/nischitartham-invitation` on the `main` branch.
2. Repository → **Settings → Pages**.
3. Source: **Deploy from a branch**; Branch: **main**; Folder: **/ (root)**; **Save**.
4. Wait 1–3 minutes, then open
   <https://bh-sysx8.github.io/nischitartham-invitation/>.

## 8. After an edit

Edit → commit to `main` → GitHub Pages rebuilds automatically (1–3 minutes).
No build tools, no npm, no CI configuration needed. If the change does not show
up, hard-refresh (Ctrl/Cmd + Shift + R) — browsers cache CSS aggressively.

## 9. Licences

* **Fonts** — Cormorant Garamond, Jost, Noto Serif Telugu, Noto Sans Telugu are
  all under the SIL Open Font License 1.1 and are self-hosted here, so the site
  makes no third-party requests at runtime.
* **Ganesha medallion** — original vector artwork created for this invitation.
* **QR code** — generated locally with the `qrcode` Python library.
* No stock photography, no icon libraries, no tracking scripts, no cookies.

## 10. Privacy

The page sets one `localStorage` key (`nischitardham.lang`) to remember the
chosen language. Nothing else is stored, sent or measured.
