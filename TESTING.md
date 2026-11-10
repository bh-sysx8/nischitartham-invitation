# Testing report

What was actually run against the project in this build, and what was not.
Tested on 10 November 2026.

Environment: Linux (Debian 12), headless Chromium 156.0.8078.4, Python 3.12,
Node 20 available but unused (no build step). Local files served from disk
(`file://`); the deployed GitHub Pages URL was **not** tested because the
repository was not connected to this session.

---

## 1. Language

| Test | Method | Result |
|---|---|---|
| English is the default | Load page with empty `localStorage` | Pass — `lang="en"`, English card |
| Telugu renders in Telugu script | Load `?lang=te`, inspect DOM text | Pass — no Latin text except venue name, postal address and brand names |
| Switching does not reload | Click `తెలుగు` from script, check document state + title | Pass |
| Switching back works | Click `EN` | Pass |
| Choice persists | `localStorage['nischitardham.lang']` after each click | Pass — `te`, then `en` |
| Persistence survives reload | Re-open page with stored value | Pass (read from `localStorage` on init) |
| `?lang=` override | `?lang=te` | Pass |
| No missing Telugu keys | Script compared every `data-i18n` key in `en` vs `te` | Pass — 0 missing |
| Untranslated English left behind | Regex scan of the Telugu strings | Pass — only the allowed Latin strings (`SVN Conventions`, postal address, `Google Calendar`, `WhatsApp`, `.ics`) |
| No Hindi / Sanskrit anywhere | Unicode scan for U+0900–U+097F across all files | Pass — 0 characters |
| Accessibility labels translated | DOM dump in Telugu | Pass — language group, event details, QR alt, Ganesha title, calendar menu label |
| Page title / meta description switch | DOM dump | Pass |
| Telugu fonts load | Self-hosted woff2, `css/fonts.css` | Pass — all 9 font files resolve |

## 2. Content accuracy

| Test | Result |
|---|---|
| All six names present and spelled as briefed | Pass (English + Telugu) |
| Parents grouped with the right child | Pass — “Daughter of …” / “Son of …” |
| Date reads *Sunday, 15 November 2026* | Pass — 15 Nov 2026 verified as a Sunday with Python |
| Time 9:30 AM IST, no separate Muhurtham mentioned | Pass |
| Venue name and full address match the brief exactly | Pass |
| Google Maps URL matches the brief | Pass |
| No invented details, rituals or timings | Pass |

## 3. Functional buttons

| Test | Method | Result |
|---|---|---|
| `.ics` download | Generated in-browser, saved, then parsed with the `icalendar` library | Pass — parses; `DTSTART` = 2026-11-15 09:30 +05:30, `DTEND` = 11:30 +05:30, `TZID:Asia/Kolkata` with a `VTIMEZONE` block, correct `SUMMARY`, `LOCATION`, `URL`, `UID` |
| iCalendar spec compliance | CRLF line endings, 75-octet folding, escaping of `,` and `;` | Pass — longest line 74 octets, folded continuation lines correct, UTF-8 not split mid-character |
| Event duration | 09:30 → 11:30 | Pass — two hours |
| Google Calendar link | URL built in-browser | Pass — `dates=20261115T040000Z/20261115T060000Z`, `ctz=Asia/Kolkata`, prefilled title, description and location (04:00 UTC = 09:30 IST) |
| Calendar menu | Opens/closes, `aria-expanded` toggles, Escape and outside-click close, arrow-key navigation, focus moves to first item | Pass by code review + DOM inspection (no interactive pointer device in this environment) |
| Get directions | `href` and `target="_blank" rel="noopener"` | Pass |
| WhatsApp share | `href` built per language | Pass — `wa.me/?text=` with the URL-encoded invitation message and the public URL |
| Copy link | Clipboard API with `execCommand` fallback | Pass in code path review; the clipboard itself needs a real browser gesture, so it was not executed end-to-end here |
| Copy toast | Success and error strings both exist in both languages | Pass |
| QR code | Generated PNG decoded with OpenCV `QRCodeDetector` | Pass — decodes to `https://bh-sysx8.github.io/nischitartham-invitation/` |
| QR off-site note | Shown when the page is not on the configured URL | Pass (visible in local preview, hidden on the configured host) |

## 4. Layout and responsiveness

Screenshots were taken and inspected at 360, 390, 430, 768, 900, 1024 and 1440 px,
in both languages.

| Width | English | Telugu |
|---|---|---|
| 360 px | Pass | Pass |
| 390 px | Pass | Pass |
| 430 px | Pass | Pass |
| 768 px | Pass | Pass |
| 900 px | Pass | Pass |
| 1024 px | Pass | Pass |
| 1440 px | Pass | Pass |

* **Horizontal scrolling:** none. A script compared `scrollWidth` to
  `clientWidth` and listed any element crossing the viewport edge at all seven
  widths — zero offenders, both languages.
* **Clipped or overlapping text:** none seen in any screenshot.
* **Buttons:** one column below 480 px, two columns 480–839 px, four columns from
  840 px. Labels fit on one line at 840 px and above in both languages.
* **Touch targets:** buttons ≥ 46 px tall, language buttons 40 px, menu items 42 px.
* **Card width:** capped at 880 px; content column centred; no layout is wider
  than the viewport.

## 5. Accessibility

| Check | Result |
|---|---|
| Colour contrast (WCAG 2.1 AA) | Body text 9.09:1, headings 14.45:1, secondary text 4.74:1, gold small text 4.85:1 (after darkening the text-gold from #A78343 to #8A6A32), toast 13.97:1 — all pass |
| Decorative gold lines | Exempt (decorative); the Ganesha medallion is 3.4:1 against the card |
| Keyboard reachability | Every control is a native `<button>` or `<a>`; no click handlers on non-interactive elements |
| Visible focus | `:focus-visible` outline on all controls |
| Menu semantics | `aria-haspopup`, `aria-expanded`, `aria-controls`, `role="menu"`, `role="menuitem"`, Escape closes and returns focus |
| Language switcher semantics | `role="group"` with translated `aria-label`, `aria-pressed` on both buttons |
| Live region | Toast uses `role="status"` + `aria-live="polite"` |
| SVG | `role="img"` + translated `<title>` |
| Images | QR has a translated `alt`; all icons are `aria-hidden` |
| Reduced motion | `prefers-reduced-motion` disables all animation and transition |
| No-JS behaviour | The English card renders fully with JavaScript disabled; only the language switcher and buttons are inert |

## 6. Technical health

| Check | Result |
|---|---|
| Console errors | 0 (error listener on the live page, English and Telugu) |
| HTML well-formedness | Parsed with a strict parser — no unclosed or mismatched tags |
| Broken local asset paths | 0 of 19 references |
| Font files resolve from `css/fonts.css` | 9 of 9 |
| Page weight | ≈ 465 KB fonts + ≈ 30 KB CSS + ≈ 20 KB JS + ≈ 45 KB images; no third-party requests |
| Metadata | Title, description, canonical, OG title/description/url/image (1200×630), Twitter card, `theme-color`, favicon, Apple touch icon — all present and pointing at the deployed URL |
| Storage | One `localStorage` key, no cookies, no analytics |

## 7. Not tested here (please spot-check after deploying)

* The live GitHub Pages deployment and the real URL (repository not connected).
* iOS Safari and Android Chrome on physical devices — tested via Chromium at the
  equivalent viewport sizes only.
* Clipboard copy and the WhatsApp app handoff on a real phone (both need a real
  user gesture).
* The `.ics` file opened in Apple Calendar and Google Calendar apps — validated
  against the iCalendar spec with a parser instead.
* Social preview rendering inside WhatsApp (cached by WhatsApp; use the
  debugging tools listed in `docs/GITHUB-PAGES.md`).
