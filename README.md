# Young Life Armenia — website

Homepage prototype. Static HTML, CSS and vanilla JavaScript: no framework,
no bundler, no `node_modules`. Open `index.html` in a browser and it runs.

---

## The four things to edit before launch

| # | What | Where |
|---|------|-------|
| 1 | Donation link | `js/config.js` → `DONATION_URL` (currently `DONATION_URL_HERE`) |
| 2 | Domain | `index.html` canonical / `og:` tags, `sitemap.xml`, `robots.txt` — search for `example.org` |
| 3 | Copy | `index.html` — English text lives in the markup |
| 4 | 25 Years film | drop the file into `videos/` — see `videos/README.md` for the exact filename |

Photographs are done: every image on the page is a real Young Life Armenia
photograph in `images/`, and `USE_LOCAL_IMAGES` is already `true`. To swap
one, drop a file into `images/` under the same name listed in `YL_IMAGES`
and update its `alt` text in `index.html`.

Nothing else needs touching to hand this to the Young Life Armenia team.

---

## Making changes

Read **`AGENTS.md`** first — it maps every likely task to the single file that
handles it, so a colour change means opening a 51-line file rather than reading
the project. It doubles as the brief for AI coding assistants (`CLAUDE.md` is a
copy of it).

## Structure

```
index.html                  markup only — no styles, no scripts inline
├── css/
│   ├── base/
│   │   ├── tokens.css       colour, type scale, spacing, radii — edit here first
│   │   ├── reset.css        element defaults, .wrap / .section, focus ring, skip link
│   │   ├── typography.css   eyebrow, lead, on-dark inversion, placeholder marker
│   │   └── motion.css       scroll reveal + prefers-reduced-motion opt-out
│   ├── components/          reusable across every page
│   │   ├── buttons.css      ornament.css      media.css
│   │   ├── header.css       mobile-menu.css   lightbox.css
│   │   └── forms.css
│   ├── sections/            one file per homepage section, named after it
│   │   ├── hero.css         story.css         years.css
│   │   ├── camp.css         camp-history.css  gallery.css
│   │   ├── videos.css       blog.css          impact.css
│   │   ├── testimonials.css involved.css      donation-cta.css
│   │   └── contact.css      footer.css
│   └── responsive.css       every breakpoint, in one place
├── js/
│   ├── config.js            donation URL, image map, gallery contents
│   ├── core/
│   │   ├── dom.js           helpers + the event bus modules talk over
│   │   └── images.js        loading, and the painted fallback
│   ├── components/          one file per behaviour
│   │   ├── donate.js        header.js         mobile-menu.js
│   │   ├── camp-history.js  gallery.js        lightbox.js
│   │   ├── videos.js        testimonials.js   contact-form.js
│   │   └── reveal.js
│   └── main.js              boot sequence
├── scripts/check-translations.js
├── build.sh
├── AGENTS.md / CLAUDE.md    task -> file routing, for humans and assistants
├── favicon.svg · site.webmanifest · robots.txt · sitemap.xml
└── images/                  real photographs go here
```

**Two rules keep this navigable as it grows.** A style lives in `sections/` if it
belongs to one section of one page, and in `components/` if it will reappear on
the inner pages. Every breakpoint lives in `responsive.css`, so "why does this
break on a tablet" is always one file, never twenty.

---

## How the JavaScript fits together

Classic scripts, one global (`YL`), loaded in dependency order and all deferred.
No modules, deliberately: `<script type="module">` will not run from `file://`,
and the team needs to be able to double-click `index.html` and see the site.

Modules never call each other's internals. They announce and listen:

```js
YL.dom.emit("yl:langchange", { lang: "ru" });   // i18n announces
YL.dom.on("yl:langchange", refreshText);        // lightbox and menu react
```

That is why changing the language also closes the mobile menu and relabels the
open lightbox without either module knowing the other exists.

Three couplings are real and intentional:

- `gallery` owns the visible-photo list; `lightbox` reads it via
  `YL.gallery.getVisible()`, so arrow keys only walk the current filter.
- `i18n.init()` runs **last** in `main.js` — the gallery must build its markup
  first, since its captions are translated like any other node.
- Everything reads `YL_IMAGES` / `YL_GALLERY` from `config.js`, loaded first.

---

## Build

```bash
./build.sh        # → dist/
```

Development loads 26 stylesheets and 18 scripts, which keeps each file small
enough to review but is too many requests for production. The build checks the
translations, concatenates both bundles in the exact order `index.html`
declares, rewrites the tags, and copies `images/`. Deploy `dist/`.

```bash
node scripts/check-translations.js
```

Fails if the three language files have drifted — a key present in Armenian but
missing from Russian renders as a blank heading on the live site, so it is
caught at build time instead. Currently 252 keys × 3 languages.

---

## Conventions worth keeping

- **Armenian is the default and drives the layout.** Armenian labels run about
  55% wider than English, so components are sized against `hy`, not `en`. The
  full desktop navigation only appears at 1440px because that is where seven
  Armenian labels genuinely fit; below it, the menu button carries them.
- **Accessibility floor:** body text 19px, nothing interactive under 56px tall
  (`--tap`), visible focus on everything, `prefers-reduced-motion` respected.
- **Placeholders are marked, not invented.** Unknown dates, figures and contact
  details are wrapped in `<span class="ph">`, which paints a dotted gold marker.
  Search the codebase for `class="ph"` to find every outstanding gap.
- **A missing photo is never a broken box.** Each `.media` sits on a painted
  `.scene`; the photo fades in over it, and stays transparent if it fails.

---

## Next

The design system is complete, so the inner pages reuse `css/base/`,
`css/components/` and `css/responsive.css` unchanged, and add one file each
under `css/sections/`: Our Story, Pioneer Camp, 25 Years, Photo Gallery, Video
Gallery, Stories, Contact.
