# Working on this repo

Read this file first. It exists so a change can be made by opening **one small
file**, not by reading the whole project. Every source file here is under 130
lines except `index.html`; nothing needs to be read end to end.

Also valid as `CLAUDE.md` — symlink or copy it if your tool looks for that name.

---

## Task → file routing

Find the row, open that file, change it. Do not open anything else.

### Copy

| Task | File |
|---|---|
| Change any visible text | `index.html` — the text is in the markup |
| Gallery captions and filter labels | `js/config.js` (`YL_GALLERY` cap, `GALLERY_LABELS`) |
| Page title / meta description | `<head>` of `index.html` |
| Alt text for a photo | the `alt` attribute on that `<img>` |
| Add a language back | see "History" below — this was multilingual until it was cut to English |

### Look and feel

| Task | File |
|---|---|
| Any colour | `css/base/tokens.css` — the palette is defined once |
| Any font size, spacing, radius, shadow, tap-target size | `css/base/tokens.css` |
| Button appearance | `css/components/buttons.css` |
| Header, nav, language switcher | `css/components/header.css` |
| Mobile menu | `css/components/mobile-menu.css` |
| One section's layout | `css/sections/<section>.css` — named after the section |
| The Pioneer Camp dropdown | `css/components/nav-submenu.css` + `js/components/nav-submenu.js` |
| Anything that only breaks at one screen width | `css/responsive.css` — **all** breakpoints live here |
| Animation timing, or turning an animation off | `css/base/motion.css` |

### Content and behaviour

| Task | File |
|---|---|
| Donation URL | `js/config.js` → `DONATION_URL` |
| Swap in real photographs | `js/config.js` → `YL_IMAGES`, then `USE_LOCAL_IMAGES = true` |
| Add/remove/reorder gallery photos | `js/config.js` → `YL_GALLERY` (+ a `g.N` caption key in each i18n file) |
| Add/remove/reorder a film, or its title and caption | `js/config.js` → `YL_VIDEOS` |
| Move the films to another host (R2, Stream, Drive) | `js/config.js` → `VIDEO_DIR` + the `file`/`drive`/`stream` key on each entry — full steps in `videos/README.md` |
| Gallery filtering | `js/components/gallery.js` |
| Lightbox behaviour | `js/components/lightbox.js` |
| Carousel behaviour | `js/components/testimonials.js` |
| Camp history tabs | `js/components/camp-history.js` |
| When the sticky donate bar appears | `js/components/header.js` → `STICKY_AFTER` |
| Connect the contact form to a backend | `js/components/contact-form.js` → the `submit` handler, nothing else |
| Section order, or adding a section | `index.html` (see the map below) |

### `index.html` section map

Only file over 130 lines. Jump straight to the line — do not read from the top.

| Line | Section |
|---|---|
| 1–75 | `<head>`: meta, SEO, hreflang, stylesheet links |
| 77 | header |
| 112 | mobile menu |
| 149 | hero |
| 172 | our story + trail timeline |
| 239 | 25 years |
| 291 | pioneer camp |
| 338 | camp history |
| ~391 | water games (real photographs, `images/wet-games/`) |
| ~470 | relays & team games (real photographs, `images/games/`) |
| ~248 | scripture band + mission statement (Matthew 9:37) |
| ~460 | photo gallery (grid is built by JS) |
| 414 | lightbox |
| 430 | videos |
| 500 | stories / blog |
| 563 | impact |
| 580 | testimonials |
| 622 | get involved |
| 664 | donation CTA |
| 681 | contact |
| 737 | footer |
| 789 | sticky mobile donate bar |
| 791+ | script tags |

---

## Rules that keep changes cheap

1. **Copy lives in the markup.** The site is English only.
2. **Never hard-code a colour or size in a component.** Use a token from
   `css/base/tokens.css`. If the value doesn't exist there, add it there.
3. **Never add a media query outside `css/responsive.css`.**
4. **A style belongs in `sections/` if it serves one section of one page, and
   in `components/` if it will reappear on the inner pages.**
5. **Write copy straight into the markup.** There is no translation layer.
6. **Modules communicate by event, not by calling each other.** Use
   `YL.dom.emit(...)` / `YL.dom.on(...)`.
7. **Mark anything unknown** with `<span class="ph">`. It renders as a dotted
   gold marker, and `grep -r 'class="ph"'` lists every outstanding gap.
8. **Donation links are deliberately limited to five places:** header, mobile
   menu, the Support card, the donation CTA, and the footer. There is no
   sticky bar and no ask in the hero. Adding more was explicitly rejected as
   feeling spammy — do not reintroduce them without asking.

---

## Cache busting

Every `css/` and `js/` reference in `index.html` carries `?v=N`. **Bump that
number whenever you change a stylesheet or a script** — one find-and-replace
across `index.html`:

```bash
sed -i 's/?v=20/?v=21/g' index.html    # then ./build.sh
```

`python3 -m http.server` sends no cache headers, so a browser that has already
loaded the site on `localhost:8000` will happily reuse old files and show you a
stale, sometimes broken page. The version parameter makes that impossible.
`build.sh` carries the same number onto `dist/styles.css` and `dist/app.js`.
Current version: **22**.

## Two safety nets, do not remove

- `<html class="js">` is set by an inline script in `<head>`, and
  `css/base/motion.css` hides `.reveal` elements **only** under `.js`. Without
  it, a script failure leaves every heading and paragraph at `opacity:0` — a
  page of photographs with no words. This actually happened once.
- Every module in `js/main.js` starts inside its own `try/catch`, so one broken
  component degrades to a dead feature rather than a dead page.

## Checks

```bash
node scripts/check-translations.js   # all three languages, all keys present
./build.sh                           # + bundles to dist/, warns on placeholders
```

Before saying a change works, verify at **320px and 1440px** — those are the two
widths where this layout has historically broken.

---

## Still outstanding

Everything the Young Life Armenia team has to supply:

- A **monthly/recurring** donation link. `DONATION_URL` is set and works,
  but it carries `Frequency=One-Time`, while the giving levels on the page
  are written as monthly ($25/month club, $200 + $25/month for three
  years). Ask Young Life for the recurring equivalent of the same link and
  the Support card can offer both.
- **Every photograph on the site is now a real Young Life Armenia photo.**
  Where none existed the slot was removed rather than filled with stock: the
  Our Story archive photo is gone, and the two historic camp-history panels
  run as text.
- A local Armenian phone number and email. The invented
  `+374 XX XXX XXX` / `info@younglifearmenia.am` pair has been deleted, so
  the only contact details on the page are ones that actually work.
- Article pages for the Stories section. The six cards are previews with no
  links; the section points to Instagram instead.
- Two testimonials. Only the Jerry & Nelda Baker quote is real, so the two
  invented ones were removed and the carousel controls with them.
- Higher-resolution originals of the three Pioneer Camp grounds photos.
  The supplied files are 335–547px wide; they are stored upscaled 2x with an
  unsharp mask (`images/camp/`). The Pioneer Camp header was changed from a
  full-bleed band to a contained split layout so the photo is displayed at
  roughly half its stored size instead of stretched. If a high-resolution
  original arrives, the full-bleed version can be restored — see the comment
  at the top of `css/sections/camp.css`.
- A high-resolution original of the Water Games group shot. The copy supplied
  is 724px wide, so it spans two columns rather than four (see the note in
  `css/responsive.css`). Widen it once a larger file arrives.
- Confirm the mission-year figures. The "In numbers" block is headed as if
  it covers all twenty-five years, but the footnote dates it to mission
  year-end May 2025. One of the two is wrong.
- The real domain (`example.org` in `index.html`, `robots.txt`, `sitemap.xml`)
- Every value marked with `class="ph"`: founding dates, phone, email,
  testimonial names, article dates
- A local Armenian phone and email. The July 2025 handout lists Carrie
  Fraser (cfraser@sc.younglife.org, +1 719 229-4970) as Armenia Development
  Coordinator — a US number, so it is deliberately NOT the site's main
  contact. Add it as a separate line for supporters abroad if you want it.

## Sourced from the July 2025 supporter handout

These are real and should not be edited without checking the source:

- Impact figures (9,835 / 3,938 / 543 / 309 / 256), mission year-end May 2025
- Mission statement, Matthew 9:37, and the three prayer requests
- Pioneer Camp history: a former Soviet youth gathering place where atheism
  was taught, refurbished and repurposed by Young Life
- Armenia context: first nation to adopt Christianity in 301 AD, independent
  since 1991
- Giving levels: $25/month club, $150 per camper, $200 + $25/month for 3 years
- The Jerry & Nelda Baker testimonial
- Action Team (second Tuesday, one hour a month) and Come & See visits
- Carrie Fraser's contact details, shown only in the "Supporting from abroad?"
  block — a US number is deliberately not the site's main contact
