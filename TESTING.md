# Testing report

What was actually run against this build, and what was not.
Rebuilt 11 November 2026 for the new content and structure.

Environment: Linux (Debian 12), headless Chromium 156.0.8078.4, Python 3.12.
Local files served from disk (`file://`); the deployed GitHub Pages URL was
**not** tested because the repository is not connected to this session.

---

## 1. Language

| Test | Method | Result |
|---|---|---|
| Telugu is the default | Load with empty `localStorage` | Pass — `lang="te"`, `class="lang-te"`, Telugu heading and buttons on first paint |
| Telugu renders in Telugu script | DOM dump, `?lang=te` | Pass |
| No English left in the Telugu edition | Regex scan of every Telugu string for 3+ Latin letters | Pass — 0 (the only Latin characters on the Telugu card are the URL and the numerals in `15-11-2026`) |
| Switching does not reload | Click `EN`, then `తెలుగు`, inspect document state | Pass — title, heading and buttons swap in place |
| Choice persists | `localStorage['nischitardham.lang']` after each click | Pass — `en`, then `te` |
| `?lang=` override still works | `?lang=en` | Pass |
| No missing keys either way | Compared all `data-i18n` keys in `te` vs `en` | Pass — 0 missing in either direction |
| Page title and meta description switch | DOM dump | Pass — both languages |
| Accessibility labels translated | language group, event details, QR alt, Ganesha title, Maps link | Pass |
| No Hindi / Sanskrit anywhere | Unicode scan across all files | Pass — 0 Devanagari letters. The only characters in that block are the 45 `॥` double-dandas inside the Telugu honorifics (చి॥, గం॥, ని॥), which are shared punctuation, not Hindi or Sanskrit text |

## 2. Content accuracy

Checked line by line against the copy supplied by the family.

| Test | Result |
|---|---|
| Heading, intro, both names, both parent lines, note, date-time, venue, hosts | Pass — reproduced verbatim in both languages |
| Honorifics and danda marks (చి॥, చి॥ లా॥ సౌ॥, గం॥, ని॥) | Pass |
| Groom named first, “with / మరియు” between the names | Pass |
| Date reads 15 November 2026 (a Sunday) and 9:30 a.m. | Pass — weekday verified with Python |
| Venue and full address as supplied (EN includes Vijayawada; TE in Telugu script) | Pass |
| Google Maps URL matches the brief | Pass |
| “Cordially yours…” / “ఆహ్వానించువారు:” hosts line | Pass |
| No invented details, rituals or timings | Pass |

## 3. Buttons

| Test | Method | Result |
|---|---|---|
| Add to Google Calendar (Telugu) | Read the generated `href` and parse the query | Pass — `dates=20261115T040000Z/20261115T060000Z`, `ctz=Asia/Kolkata`, Telugu title, Telugu description, Telugu venue |
| Add to Google Calendar (English) | Same | Pass — English title, description and venue |
| 04:00–06:00 UTC = 09:30–11:30 IST | Arithmetic check | Pass |
| No calendar dropdown remains | DOM check | Pass — `#calMenu` and `#icsLink` no longer exist |
| No `.ics` generator remains | Code check | Pass — removed from `app.js` |
| Get directions | `href`, `target="_blank"`, `rel="noopener"` | Pass |
| Google Maps text link under “Google Maps” | `href` and visible text from config | Pass — `https://maps.app.goo.gl/8UAu74C3tKZx4CgZ8` |
| No WhatsApp button remains | DOM check | Pass — `#waBtn` no longer exists |
| Copy link | Clipboard API with `execCommand` fallback | Code path verified; the clipboard itself needs a real user gesture, so it was not executed end-to-end here |
| Copy toast | Success and error strings exist in both languages | Pass |
| QR code | Generated PNG decoded with OpenCV `QRCodeDetector` | Pass — decodes to `https://bh-sysx8.github.io/nischitartham-invitation/` |
| QR off-site note | Shown when not on the configured URL | Pass |

## 4. Layout

Screenshots inspected at 360, 390, 430, 768, 900, 1024 and 1440 px in both
languages, plus a script that compares `scrollWidth` to `clientWidth` and lists
any element crossing the viewport edge.

| Width | Telugu | English |
|---|---|---|
| 360 px | Pass | Pass |
| 390 px | Pass | Pass |
| 430 px | Pass | Pass |
| 768 px | Pass | Pass |
| 900 px | Pass | Pass |
| 1024 px | Pass | Pass |
| 1440 px | Pass | Pass |

* **Horizontal scrolling:** none at any width, both languages, zero offenders.
* **Heading:** “Formal Engagement Ceremony” fits on one line from 900 px up and
  breaks to two balanced lines on phones.
* **Names:** one line each from 430 px up; wrap gracefully below that.
* **Buttons:** one column under 480 px, two columns 480–839 px (the third button
  spans the row so nothing is left dangling), three equal columns from 840 px.
* **Touch targets:** buttons ≥ 46 px tall, language buttons 40 px.
* **Telugu time line:** non-breaking spaces keep “గం॥ 9:30 ని॥లకు” together so the
  time never splits across lines.

## 5. Accessibility

| Check | Result |
|---|---|
| Contrast (WCAG 2.1 AA) | Body 9.09:1, headings 14.45:1, secondary 4.74:1, small gold text and the Maps link 4.85:1, toast 13.97:1 — all pass |
| Keyboard reachability | Every control is a native `<button>` or `<a>` |
| Visible focus | `:focus-visible` outline on all controls |
| Language switcher semantics | `role="group"`, translated `aria-label`, `aria-pressed` on both buttons |
| Live region | Toast uses `role="status"` + `aria-live="polite"` |
| SVG | `role="img"` + translated `<title>` |
| Images | QR has a translated `alt`; icons are `aria-hidden` |
| Reduced motion | `prefers-reduced-motion` disables all animation |
| No-JS behaviour | The full Telugu card renders with JavaScript off; only the switcher and buttons are inert |

## 6. Technical health

| Check | Result |
|---|---|
| Console errors | 0 (error listener on the live page, both languages) |
| HTML well-formedness | Strict parser — no unclosed or mismatched tags |
| Broken local asset paths | 0 |
| Font files resolve | 9 of 9 |
| Page weight | ≈ 465 KB fonts + 17 KB CSS + 15 KB JS + 105 KB images; no third-party requests |
| Metadata | Title, description, canonical, OG title/description/url/image (Telugu, 1200×630), Twitter card, `theme-color`, favicon, Apple touch icon |
| Storage | One `localStorage` key, no cookies, no analytics |

## 7. Not tested here (please spot-check after deploying)

* The live GitHub Pages deployment and the real URL (repository not connected).
* iOS Safari and Android Chrome on physical devices — tested at equivalent
  viewport sizes in Chromium only.
* Clipboard copy and the Google Calendar app handoff on a real phone (both need a
  real user gesture).
* Social preview rendering inside WhatsApp (WhatsApp caches previews; use the
  debugging tools listed in `docs/GITHUB-PAGES.md`).
