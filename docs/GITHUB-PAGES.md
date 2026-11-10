# Deploying to GitHub Pages

Repository: <https://github.com/bh-sysx8/nischitartham-invitation>
Target URL: <https://bh-sysx8.github.io/nischitartham-invitation/>

Nothing in this project needs a build step. GitHub Pages serves the files exactly
as they are in the repository.

---

## 1. Upload the files

### Option A — drag and drop in the browser (no git needed)

1. Download and unzip `nischitartham-invitation.zip`.
2. Open <https://github.com/bh-sysx8/nischitartham-invitation>.
3. Click **Add file → Upload files**.
4. Drag **the contents** of the unzipped folder into the drop area — that is
   `index.html`, `.nojekyll`, `README.md`, `TESTING.md`, and the folders `css`,
   `js`, `assets`, `docs`, `scripts`.
   Upload the *contents*, not the enclosing folder, so `index.html` sits at the
   repository root.
5. Scroll down, write a commit message (`Add Nischitardham invitation`),
   keep **Commit directly to the `main` branch** selected, click **Commit changes**.
6. If files already exist in the repository, the upload replaces them; if GitHub
   reports a conflict, upload again with the same names — the last commit wins.

> The leading dot in `.nojekyll` matters. It tells GitHub Pages not to run Jekyll,
> which would otherwise ignore folders starting with an underscore. If your file
> manager hides dotfiles, enable “show hidden files”.

### Option B — git command line

```bash
git clone https://github.com/bh-sysx8/nischitartham-invitation.git
cd nischitartham-invitation
# copy the unzipped files into this folder (index.html at the top level)
git add -A
git commit -m "Add Nischitardham invitation"
git push origin main
```

## 2. Turn on GitHub Pages

1. Open the repository and click **Settings** (top bar, needs admin rights).
2. In the left sidebar click **Pages**.
3. Under **Build and deployment → Source**, choose **Deploy from a branch**.
4. Under **Branch**, select **main** and folder **/ (root)**. Click **Save**.
5. The page reloads with a banner: “GitHub Pages source saved”.

That is the only configuration needed. Custom domains, workflows and `base` paths
are not required — every link in the project is relative.

## 3. Watch the deployment

1. Go to the **Actions** tab.
2. You will see a run named **pages build and deployment** (triggered by the push).
3. Click it to watch the jobs: `build` then `deploy`. Both turn green when done.
4. In **Settings → Pages** the banner changes to
   “Your site is live at https://bh-sysx8.github.io/nischitartham-invitation/”.

Typical timings:

| Step | Usually takes |
|---|---|
| Commit appears on `main` | instant |
| Pages build starts | 10–60 seconds |
| Build + deploy green | 1–3 minutes |
| URL responds | within a minute of deploy turning green |
| First-ever deployment of a repo | up to ~10 minutes (Pages setup) |

## 4. Three different “successes” — do not confuse them

| What you see | What it means |
|---|---|
| **Commit created** (file visible on GitHub, green commit tick) | The files are stored in the repository. The website may not exist yet. |
| **Pages deployment green** (Actions run finished, banner says “live”) | GitHub has published the files. DNS/CDN may still be propagating for a minute. |
| **Website reachable** (URL loads in a private window, on mobile data) | The invitation is genuinely public. This is the only proof that matters. |

Check the third one in a **private/incognito window** — your normal browser may
serve a cached copy of an older version.

## 5. How to tell a real failure from impatience

* **Still “Your site is live” but you see an old version** → caching. Hard-refresh
  (Ctrl/Cmd + Shift + R) or open in a private window.
* **Actions run is red** → open the run, read the failed step. The usual cause is a
  stray file or a `_`-prefixed folder without `.nojekyll`.
* **No run at all in Actions** → Pages was never enabled, or the branch selected in
  Settings is not the branch you pushed to.
* **Deployment green, URL 404** → almost always the wrong folder selected
  (`/docs` instead of `/(root)`), or `index.html` is inside a sub-folder instead of
  the repository root. Check that the repository root lists `index.html`.
* **Page loads but is unstyled** → `css/styles.css` was not uploaded, or the
  `css/` folder was uploaded as `css/nischitartham-invitation/css/`.

## 6. Troubleshooting, by symptom

### 404 — “There isn't a GitHub Pages site here”

* Settings → Pages shows no URL → Pages is not enabled. Repeat step 2.
* URL correct but 404 → confirm the repository name in the URL matches exactly
  (`nischitartham-invitation`, with the double `t`), and that the repository is
  **public** (Pages on private repos needs a paid plan).
* Wait 10 minutes after the very first enable, then retry.

### 404 for everything except the homepage

Sub-pages do not exist in this project — it is one file. If you see 404 on
`/css/styles.css`, the `css` folder is missing from the repository root.

### The page loads but looks plain (no fonts, no gold)

* DevTools → **Network** → reload. Look for red entries.
* `css/styles.css` 404 → upload `css/`.
* Font files 404 → the `assets/fonts/` folder is missing, or the files were
  renamed. `css/fonts.css` references them as `../assets/fonts/<name>.woff2`.
* Paths are case-sensitive on GitHub Pages (unlike Windows). `Assets/Fonts`
  is not `assets/fonts`.

### Images or the QR code do not appear

* Check `assets/qr.png`, `assets/og-image.png`, `assets/favicon.svg` exist at the
  repository root under `assets/`.
* Open the image URL directly:
  `https://bh-sysx8.github.io/nischitartham-invitation/assets/qr.png`
  — a 404 there means the file is missing or misnamed.

### Wrong relative paths after moving files

Every reference is relative and rooted at the repository folder. If you move
`styles.css`, update the `<link>` in `index.html`; if you move a font, update
`css/fonts.css`. Never use a leading `/` (that points at the domain root and
breaks the project sub-path).

### Deployment fails in Actions

Open the failed run → the log names the file. Common causes:

* a file larger than 100 MB (not the case here);
* `.nojekyll` missing while a folder starts with `_`;
* Pages branch set to `gh-pages` while you pushed to `main`.

### The QR code scans to the wrong place

`assets/qr.png` is a fixed image of the URL in `js/config.js`. After changing the
URL, regenerate it:

```bash
pip install qrcode[pil]
python3 scripts/generate_qr.py
```

Then commit the new `assets/qr.png`. Always test by scanning with a phone camera.

### Telugu text looks broken, boxy, or too tight

* The Telugu fonts are self-hosted (`assets/fonts/nst-telugu-normal.woff2`,
  `nsa-telugu-normal.woff2`). If those files are missing, the browser falls back to
  a system Telugu font — readable but not the intended look.
* Do not add `letter-spacing` or `text-transform: uppercase` to Telugu text; the
  stylesheet already removes both for `.lang-te`.
* If Telugu renders as separate glyph pieces, the page is probably being served
  with the wrong charset. `index.html` declares `<meta charset="utf-8">` — keep it
  and save files as UTF-8.

### Language choice does not stick

The choice is stored in `localStorage` under `nischitardham.lang`. Private windows
and “block all cookies” settings discard it between visits — the card then opens
in English, which is the intended default. `?lang=te` on the URL forces Telugu.

## 7. Re-deploying after an edit

1. Edit the file(s) — usually `js/config.js` or `js/translations.js`.
2. Commit to `main` (browser: open the file → pencil icon → commit; or `git push`).
3. Wait for the green Actions run (1–3 minutes).
4. Hard-refresh the site and check both languages.

If you changed the public URL, also update `publicUrl` in `config.js`, regenerate
`assets/qr.png`, and update `og:url` / `og:image` / `canonical` in `index.html`.

## 8. Social preview (WhatsApp, iMessage, X, LinkedIn)

WhatsApp and other apps cache link previews aggressively.

* The preview image is `assets/og-image.png` (1200×630), referenced by absolute URL
  in `index.html`.
* After changing the preview, force a refresh with the
  [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) or
  [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/), or simply
  share the link with `?v=2` appended once to bust the cache.
