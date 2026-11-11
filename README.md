# నిశ్చితార్థపు ఆహ్వానము — Nischitardham Digital Invitation

A single-page, premium digital recreation of a printed Telugu engagement invitation.
Ivory and gold, fine gold line art, two independent language editions (Telugu by
default, English on request), and three working actions: add to Google Calendar,
open Google Maps, copy the invitation link.

- **Repository:** https://github.com/bh-sysx8/nischitartham-invitation
- **Intended site URL:** https://bh-sysx8.github.io/nischitartham-invitation/
- **Stack:** HTML5 + CSS3 + vanilla JavaScript. No framework, no build step, no
  backend, no database, no third-party scripts, no external font requests.

---

## 1. What is in the box

```
nischitartham-invitation/
├── index.html              the whole invitation (one page, semantic HTML)
├── css/
│   ├── fonts.css           @font-face rules for the locally stored fonts
│   └── styles.css          the entire visual system (tokens → components → responsive)
├── js/
│   ├── config.js           event data + Google Calendar URL builder
│   ├── translations.js     the two hard-coded language editions
│   └── app.js              rendering, language switching, the three actions
├── assets/
│   ├── ganesha.svg         original gold line-art Lord Ganesha (used in both editions)
│   ├── favicon.svg         gold diamond monogram
│   ├── og-image.png        1200 × 630 link-preview card
│   └── fonts/              30 woff2 subsets (Noto Serif/Sans Telugu, Cormorant Garamond, Jost) + OFL.txt
├── .nojekyll               stops GitHub Pages from running Jekyll
└── README.md               this file
```

Every asset is local. Once the page is loaded it makes no external requests.

---

## 2. Preview it locally

The page needs no server, but browsers block `localStorage` on `file://` in some
configurations, so a tiny local server is the safest preview:

```bash
cd nischitartham-invitation
python3 -m http.server 8000
# then open http://localhost:8000/
```

Double-clicking `index.html` also works — the invitation renders, only the
remembered-language feature can be blocked by the browser.

---

## 3. How the two editions work

- **Telugu is the landing edition.** It is painted on first visit, before any
  interaction.
- **English** is available from the switcher in the top-right corner
  (`తెలుగు | EN`). Switching re-renders the page in place — no reload, no second
  URL, no separate page.
- The choice is stored in `localStorage` under `nischitartham.lang` and restored
  on later visits. With no stored choice the visitor always gets Telugu.
- The two editions are **not translations of each other**. Each is a separate
  hard-coded block list in `js/translations.js`, and each has its own composition:
  the Telugu edition centres its event details in a traditional stacked rhythm;
  the English edition sets them as ruled, label-left editorial rows. The palette,
  the Ganesha illustration, the frame, the dividers, the buttons and the type
  pairing stay identical.
- `document.documentElement.lang`, the page title, the meta description, the
  Open Graph tags, the illustration's `alt` text and every button label change
  with the edition.

---

## 4. Editing the invitation

### 4.1 Event details (calendar, maps, link)

Open **`js/config.js`**. One object drives everything functional:

```js
const EVENT = {
  title: 'Nischitardham – Lakshmi Sowmya & Praneeth Chandra',
  description: 'Formal Engagement Ceremony of …',
  date:  { year: 2026, month: 11, day: 15 },
  start: { hour: 9, minute: 30 },
  end:   { hour: 11, minute: 30 },
  timezone: 'Asia/Kolkata',
  location: 'SVN Conventions, To, 100 Feet Rd, …',
  mapsUrl: 'https://maps.app.goo.gl/8UAu74C3tKZx4CgZ8',
  siteUrl: 'https://bh-sysx8.github.io/nischitartham-invitation/'
};
```

`SITE.calendarUrl` is generated from these values — you never hand-encode a
Google Calendar link.

### 4.2 The printed wording

Open **`js/translations.js`**. Each edition is an ordered list of typed blocks:

| block | renders as |
|---|---|
| `title` | the `<h1>` heading |
| `lead` | the small line above the first name (`మా పుత్రుడు`) |
| `name` | a name in display type |
| `parentage` | the bracketed parentage line |
| `connector` | `మరియు` / `with` |
| `para` | a body paragraph (`variant: 'lead' \| 'request'` for the English voice) |
| `divider` | the gold diamond rule |
| `details` | the event rows (`variant: 'stack'` for Telugu, `'grid'` for English) |
| `signoff` | the inviting family |

Reorder, add or remove blocks freely — the layout follows the list. The supplied
wording must stay verbatim; only structure is yours to adjust.

Button labels, toast messages, `alt` text and the page metadata live in each
edition's `ui` object, so no English string can leak into the Telugu edition.

> If you change the date, time or venue, update **both** `config.js` (for the
> calendar link) **and** the matching wording in `translations.js` (for the
> printed lines). They are deliberately separate: one is data, the other is the
> invitation's exact text.

### 4.3 Replace the Ganesha illustration

Drop a new file in as `assets/ganesha.svg` (any square viewBox, gold line art on
a transparent background) and keep the filename. Both editions pick it up. If you
change the file name, update the single `<img class="ganesha">` tag in
`index.html`. The displayed size is set by `.ganesha { width: clamp(92px, 14.5vw, 128px) }`.

### 4.4 Colours

All colours are CSS custom properties at the top of `css/styles.css`:

```css
--ivory: #FAF7F0;   --cream: #F3EDE1;
--champagne: #C6A66A; --gold: #A78343; --gold-deep: #8A6A33;
--ink: #292720;     --muted: #777064;
--hairline / --hairline-soft / --hairline-faint   /* gold border opacities */
```

Change the tokens, not individual rules, and both editions stay in step.

### 4.5 Fonts

`css/fonts.css` maps four families to local woff2 files:

| role | family |
|---|---|
| Telugu headings and names | Noto Serif Telugu |
| Telugu body text | Noto Sans Telugu |
| English headings and names | Cormorant Garamond |
| English body and labels | Jost |

To swap a family: drop the woff2 files into `assets/fonts/`, point the
`@font-face` rules at them, and update the two stacks at the top of
`styles.css` (`--font-display`, `--font-body`) plus the `body[data-lang="te"]`
overrides.

**Important Telugu rule:** never add `letter-spacing` to Telugu text. Tracking
splits Telugu clusters (`లక్ష్మీ` renders as `ల క్ష్మీ`). The stylesheet enforces
`letter-spacing: normal` for every Telugu element — keep it that way.

---

## 5. Deploying to GitHub Pages

The repository already exists: `bh-sysx8/nischitartham-invitation`.
The project must sit at the **repository root**, because the site is served from
a sub-path (`/nischitartham-invitation/`). All asset paths in this project are
relative (`css/…`, `js/…`, `assets/…`) with no leading slash, so they work at the
root and in a sub-path.

### Step by step

1. **Download** `nischitartham-invitation.zip` and keep it somewhere you can find.
2. **Extract** it. You should get a folder containing `index.html` directly —
   not a folder inside a folder.
3. **Open the repository** in a browser: https://github.com/bh-sysx8/nischitartham-invitation
4. **Upload the files to the root.** Click *Add file → Upload files*, drag in
   *the contents* of the extracted folder (`index.html`, `css/`, `js/`,
   `assets/`, `.nojekyll`, `README.md`). Dragging the folder itself creates a
   nested folder — upload the contents instead. If you prefer the command line:

   ```bash
   cd nischitartham-invitation
   git init                       # only the first time
   git remote add origin https://github.com/bh-sysx8/nischitartham-invitation.git
   git add .
   git commit -m "Add Nischitardham digital invitation"
   git branch -M main
   git push -u origin main
   ```

5. **Commit to `main`.** Every file must be on `main`; a page left on another
   branch is not published.
6. **Open Settings** (top navigation of the repository).
7. **Choose Pages** in the left sidebar.
8. **Source: “Deploy from a branch.”**
9. **Branch: `main`, folder: `/ (root)`.** Save.
10. **Wait for the run.** The *Actions* tab shows a `pages build and deployment`
    workflow. It turns green when the site has been published.
11. **Open** https://bh-sysx8.github.io/nischitartham-invitation/ — the Telugu
    invitation should appear immediately.
12. **Verify** on a phone as well (the layout is mobile-first below 620px).

### Three different “successes” — do not confuse them

| Event | What it means |
|---|---|
| **Commit succeeded** | The files are in the repository. Nothing is published yet. |
| **Pages deployment succeeded** | GitHub built the site from `main` and published it to the Pages CDN. The Actions run is green. |
| **Site is publicly reachable** | Opening the URL in a browser (and in a private window) returns the invitation, with CSS, fonts and the Ganesha visible. |

A green commit tells you nothing about the website. Always finish by loading the
URL.

**How long it takes.** Usually 30–90 seconds after the push; a first deployment
can take a few minutes. A run still “in progress” after ~10 minutes is a failure,
not slowness.

**How to spot a real failure.** *Actions* → the run → the failing step shows the
error (a red ✗). A green run followed by a broken page is nearly always a path or
filename problem, not a Pages problem.

---

## 6. Troubleshooting

**404 — “There isn't a GitHub Pages site here.”**
Pages is not configured, or it was configured on a different branch/folder.
Re-check Settings → Pages: `main` and `/ (root)`. If the repository is private,
Pages requires a paid plan; public repositories are free.

**The URL works but shows a directory listing or the README.**
`index.html` is not at the repository root (it is inside a sub-folder). Move it
to the root and commit again.

**Page loads with no styling.**
`css/styles.css` is missing or was uploaded into the wrong folder, or the link
has a leading slash (`/css/styles.css`) which breaks under
`/nischitartham-invitation/`. Keep the relative path `css/styles.css`.

**Ganesha or favicon missing.**
`assets/` did not upload (empty folders are not tracked by git), or the file was
renamed. The reference is `assets/ganesha.svg`.

**Filenames changed case.**
GitHub Pages is case-sensitive; `Ganesha.svg` ≠ `ganesha.svg`.

**Telugu shows as boxes or in a fallback font.**
The woff2 files under `assets/fonts/` did not upload, or `css/fonts.css` was not
committed. Open DevTools → Network and look for 404s on `.woff2`. Also confirm
`css/fonts.css` points at `../assets/fonts/…` (it lives one folder down).

**Telugu letters look spaced out or broken.**
Someone added `letter-spacing` to a Telugu element. Remove it — see §4.5.

**Google Calendar opens an empty event.**
Check `js/config.js`: `dates` are built from `date` + `start`/`end` and the
timezone is `Asia/Kolkata`. Editing the file with a text editor that rewrites
`&` or quotes can corrupt the URL — keep the file as plain UTF-8.

**The copy button says it failed.**
Clipboard access needs a secure context (https, or `localhost`). It works on the
published site; on `file://` the browser may refuse and the toast will say so.
The fallback path (`document.execCommand('copy')`) is used automatically.

**Stale content after an update.**
Hard-refresh (Ctrl/Cmd + Shift + R). GitHub Pages serves cached HTML for a few
minutes.

---

## 7. Updating the site later

1. Edit `js/config.js` and/or `js/translations.js` (or `css/styles.css`,
   `assets/ganesha.svg`).
2. Commit to `main` — GitHub web UI (*edit file → Commit changes*) or `git push`.
3. Pages redeploys automatically in about a minute. No build, no reinstall.
4. Hard-refresh the published URL to confirm.

Nothing in this project needs compiling, so a one-line change is a one-line
commit.

---

## 8. Testing report

Tested with headless Chromium (Chrome for Testing 156) against a local HTTP
server, driving the real page: real clicks, real `localStorage`, real clipboard,
real layout measurements at six viewport widths in both editions.
59 automated checks, **59 passed, 0 failed**, and no console errors, no failed
requests.

### Language
| Check | Result |
|---|---|
| Telugu edition renders on first visit (`<html lang="te">`) | pass |
| Telugu is the `aria-pressed` switcher state | pass |
| Telugu invitation text matches the supplied copy, in order | pass (full-string comparison) |
| English text matches the supplied copy, in order | pass (full-string comparison) |
| Switching to English does not reload the page | pass |
| `<html lang>` flips to `en`; title, meta description and OG tags follow | pass |
| No Telugu characters remain in the English edition | pass |
| No Latin words in the Telugu invitation body | pass |
| No Devanagari (Hindi/Sanskrit) anywhere | pass |
| Selection stored in `localStorage`; survives reload | pass |
| Fresh visitor (storage cleared) lands on Telugu | pass |
| All four font families load from local files | pass |
| Telugu clusters render correctly (`లక్ష్మీ`, `పుత్రుడు` unbroken) | pass |

### Functionality
| Check | Result |
|---|---|
| Calendar URL exact: `dates=20261115T093000/20261115T113000`, `ctz=Asia/Kolkata`, title, location, description | pass |
| Calendar and Maps open in a new tab (`target="_blank"`, `rel="noopener noreferrer"`) | pass |
| Maps URL is the supplied short link | pass |
| Copy button writes the current page URL to the clipboard | pass |
| Success toast appears and is translated in both editions | pass |
| Every action carries a translated `aria-label` | pass |
| No placeholder or inert buttons | pass |

### Responsive
Checked at 360, 390, 430, 768, 1024 and 1440 px, in both editions:

- no horizontal overflow (`scrollWidth ≤ clientWidth`) — pass ×12
- no element extends past the viewport — pass ×12
- every button and the language switcher is at least 32 px tall — pass ×12
- Telugu and English text stay legible; nothing is clipped or truncated

Visual review of full-page renders at 360, 390, 768 and 1440 px in both editions
confirmed the composition: centred card with a double gold frame on desktop,
full-bleed flowing card on phones, medallion scaled per breakpoint, three buttons
in a row on desktop and stacked full-width on phones.

### Accessibility & robustness
Semantic `<h1>`, real `<a>`/`<button>` controls, visible focus rings,
`aria-pressed` on the language switch, `role="status" aria-live="polite"` toast,
`prefers-reduced-motion` honoured (all transitions disabled), print stylesheet
that hides the controls, and `localStorage`/clipboard failures handled without
throwing.

---

## 9. Notes

- The Ganesha artwork in `assets/ganesha.svg` was drawn for this invitation
  (original line art, no third-party image licence).
- Fonts are SIL Open Font License 1.1; the licence text ships in
  `assets/fonts/OFL.txt`.
- The invitation contains no photographs, no QR codes, no social-sharing
  buttons, no `.ics` download and no background music.
