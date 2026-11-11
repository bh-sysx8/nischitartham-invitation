# Nischitardham — Digital Invitation Card

A single-page, premium digital invitation card for the formal engagement ceremony
of **Chi. Praneeth Chandra Bogineni** and **Chi. Sou. Lakshmi Sowmya Donepudi**,
in Telugu (default) and English.

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
│   ├── translations.js     ← ALL TELUGU + ENGLISH TEXT LIVES HERE
│   └── app.js              language switching, calendar link, copy link, QR note
├── assets/
│   ├── ganesha.svg         original gold line-art medallion (also inlined in index.html)
│   ├── qr.png              QR code pointing at the published URL
│   ├── og-image.png        1200×630 social preview card (Telugu)
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

## 2. What the card does

* Opens in **Telugu**. The switcher (top right, `EN | తెలుగు`) changes language
  instantly, without a reload, and remembers the choice.
* **Add to Google Calendar** — one tap, opens Google Calendar with the event
  prefilled (9:30–11:30 a.m. IST, venue, description, in the visitor's language).
* **Get directions** — opens the Google Maps pin for SVN Conventions.
* **Copy link** — copies the published invitation URL, with a translated toast.
* The **Google Maps URL** on the card is also a tappable link.
* **QR code** at the foot of the card, pointing at the published URL.
* No WhatsApp button, no `.ics` download, no countdown, no gallery, no menu.

## 3. Look at it locally

Unzip the folder and double-click `index.html`.

Two things behave differently in a local preview, both expected:

* **The QR code** points at the *published* URL. While the page is not being served
  from that URL, a small italic line under the QR says so
  (“ఈ QR కోడ్ ప్రచురిత ఆహ్వానానికి దారి తీస్తుంది.”). It disappears automatically
  on the live site.
* **Copy link** copies the published URL from `config.js`, not the `file://` path.

For a local server (optional):

```bash
cd nischitartham-invitation
python3 -m http.server 8000
# open http://localhost:8000
```

## 4. Changing event details

### 4.1 The single config file — `js/config.js`

| What you want to change | Field |
|---|---|
| Groom's name (used in the calendar entry) | `groom.name` |
| Groom's parents | `groom.parents` |
| Bride's name | `bride.name` |
| Bride's parents | `bride.parents` |
| Event date (ISO, for reference) | `event.dateISO` |
| Start / end time | `event.startTime`, `event.endTime` (`HH:MM`, 24-hour) |
| Timezone | `event.timezone` |
| Google Calendar UTC stamps | `event.googleStartUTC`, `event.googleEndUTC` |
| Google Maps link | `venue.mapsUrl` |
| The URL text printed under “Google Maps” | `venue.mapsDisplay` |
| Public URL of the invitation | `publicUrl` |
| Default language on first visit | `options.defaultLang` (`'te'` or `'en'`) |

### 4.2 If the date or time changes, update three things

1. `event.dateISO` — reference value.
2. `when` in **both** language blocks of `translations.js` — this is the string
   printed on the card. It is written out in full, not formatted by JavaScript, so
   exactly what you type is what appears (e.g. `15-11-2026వ తేదీ ఆదివారం …`).
3. `event.googleStartUTC` / `event.googleEndUTC` — the Google Calendar link.
   IST is UTC+05:30, so **subtract 5 hours 30 minutes**.
   Example: 15 Nov 2026, 9:30 a.m. IST → `20261115T040000Z`;
   11:30 a.m. IST → `20261115T060000Z`.

Keep the event two hours long, or change `event.endTime` too.

### 4.3 Changing names

Names appear in two places on purpose:

* `js/config.js` → used by the Google Calendar entry.
* `js/translations.js` → `names` inside **both** the `te` and `en` blocks, because
  the card prints the honorifics (చి॥, చి॥ లా॥ సౌ॥, శ్రీమతి, శ్రీ / Chi., Smt., Sri)
  and the parenthetical “Elder Son of …” lines.

Edit both. The `hosts` line (who is inviting) is in `translations.js` as well.

## 5. Changing or extending the text

All display text lives in `js/translations.js`, one object per language:

```js
window.I18N = { te: { ... }, en: { ... } };
```

| Key | What it prints |
|---|---|
| `heading` | నిశ్చితార్థపు ఆహ్వానము / Formal Engagement Ceremony |
| `intro` | the line above the names (EN: the full invitation sentence, TE: “మా పుత్రుడు”) |
| `names.groom`, `names.bride` | the two names with honorifics |
| `names.groomParents`, `names.brideParents` | the parenthetical parent lines |
| `with` | మరియు / with, between the two names |
| `note` | the sentence under the names (EN: “We request your gracious presence…”, TE: “ల నిశ్చితార్థ వేడుకను …”) |
| `labels.when`, `labels.venue`, `labels.maps` | సమయం: / వేదిక: / గూగుల్ మ్యాప్స్: |
| `when`, `venue` | the date-time line and the address |
| `hostsLabel`, `hosts` | ఆహ్వానించువారు: / Cordially yours… and the hosts' names |
| `actions.*` | the three button labels |
| `aria.*` | screen-reader labels |
| `toast.*` | copy-link notifications |
| `qr.*` | QR caption and the off-site note |
| `calendarEvent.summary` / `.description` | the Google Calendar entry |
| `meta.title` / `.description` | browser tab and search result |

Every element in `index.html` carries `data-i18n="key"`; `app.js` writes the
matching string in when the language changes. Add a key to **both** languages or
the browser console warns `[i18n] missing key`.

Nothing is machine-translated at runtime. The Telugu text in this build was
supplied by the family and is reproduced verbatim, including honorific
abbreviations (చి॥, గం॥, ని॥), the danda marks and the date format `15-11-2026`.

Two deliberate layout decisions, so you know where to look if you want them
changed:

* **Telugu sentence continuity.** The Telugu text after the bride's name begins
  “ల నిశ్చితార్థ వేడుకను …” — the genitive suffix carried over from
  “దొనేపూడి” on the line above, exactly as on a printed card. It is kept as its
  own paragraph immediately under the bride's parent line so it reads as a
  continuation. To make it a fresh sentence instead, change it to
  “ఈ నిశ్చితార్థ వేడుకను …”.
* **English closing sentence position.** “We request your gracious presence on
  this joyous occasion.” sits under the names (not after the venue, as in the
  printed layout) so both editions keep the same structure.

## 6. Replacing the Ganesha illustration

The medallion is original artwork drawn for this project (`assets/ganesha.svg`)
and is inlined in `index.html` inside `<div class="ganesha">`.

To swap it:

1. Put your new SVG in `assets/`.
2. Make sure it uses `fill="none" stroke="currentColor"` so it picks up the gold
   colour from CSS, and keep a `viewBox`.
3. Copy its contents into `index.html`, replacing everything between
   `<div class="ganesha">` and its closing `</div>`. Keep the wrapper — that is
   what sets size and colour.
4. Keep the `<title>` element (with `data-i18n="aria.ganesha"`) so screen readers
   still announce it in the visitor's language.

For a PNG, use `<img src="assets/ganesha.png" alt="Lord Ganesha" width="320" height="336">`
inside the wrapper instead.

## 7. QR code

`assets/qr.png` encodes `publicUrl` from `config.js`
(currently `https://bh-sysx8.github.io/nischitartham-invitation/`).
If the URL changes, regenerate it:

```bash
pip install qrcode[pil]
python3 scripts/generate_qr.py
```

The script reads the URL from `js/config.js`, so the QR always matches the card.
To remove the QR from the card, delete the `<div class="qr">…</div>` block in
`index.html`; nothing else depends on it.

## 8. Deploying

Short version — full walkthrough, verification steps and troubleshooting in
[docs/GITHUB-PAGES.md](docs/GITHUB-PAGES.md):

1. Upload the contents of this folder to the **root** of
   `bh-sysx8/nischitartham-invitation` on the `main` branch.
2. Repository → **Settings → Pages**.
3. Source: **Deploy from a branch**; Branch: **main**; Folder: **/ (root)**; **Save**.
4. Wait 1–3 minutes, then open
   <https://bh-sysx8.github.io/nischitartham-invitation/>.

## 9. After an edit

Edit → commit to `main` → GitHub Pages rebuilds automatically (1–3 minutes).
No build tools, no npm, no CI configuration. If a change does not show up,
hard-refresh (Ctrl/Cmd + Shift + R) — browsers cache CSS aggressively.

If you changed the public URL, also update `publicUrl` in `config.js`, regenerate
`assets/qr.png`, and update `og:url` / `og:image` / `canonical` in `index.html`.

## 10. Licences and privacy

* **Fonts** — Cormorant Garamond, Jost, Noto Serif Telugu and Noto Sans Telugu are
  under the SIL Open Font License 1.1 and are self-hosted, so the page makes no
  third-party requests at runtime.
* **Ganesha medallion** — original vector artwork created for this invitation.
* **QR code** — generated locally with the `qrcode` Python library.
* No stock photography, no icon libraries, no tracking, no cookies.
* One `localStorage` key (`nischitardham.lang`) remembers the chosen language.
  Nothing else is stored or sent.
