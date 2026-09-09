#!/usr/bin/env bash
# ============================================================
# Build for deployment.
#
# Development loads 26 stylesheets and 18 scripts so files stay
# small and reviewable. Production should not: this concatenates
# them, in the exact order index.html declares, into dist/ and
# rewrites the tags to match.
#
#   ./build.sh          -> dist/
#
# No dependencies beyond bash and python3. Add a real minifier
# (esbuild, lightningcss) here when the project earns one.
# ============================================================
set -euo pipefail
cd "$(dirname "$0")"

rm -rf dist
mkdir -p dist

echo "→ concatenating stylesheets"
python3 - <<'PY'
import re, os
html = open('index.html', encoding='utf-8').read()
# reuse the version already stamped on the source refs
m = re.search(r'\?v=(\d+)', html)
VERSION = m.group(1) if m else '1'
# refs carry a ?v= cache-busting suffix; strip it to get the real path
css = [p.split('?')[0] for p in re.findall(r'<link rel="stylesheet" href="(css/[^"]+)"', html)]
js  = [p.split('?')[0] for p in re.findall(r'<script src="(js/[^"]+)" defer></script>', html)]

def bundle(files, out):
    with open(out, 'w', encoding='utf-8') as fh:
        for f in files:
            fh.write("\n/* ---- %s ---- */\n" % f)
            fh.write(open(f, encoding='utf-8').read())
    return len(files)

n_css = bundle(css, 'dist/styles.css')
n_js  = bundle(js,  'dist/app.js')

# rewrite the tags: many links become one, many scripts become one
html = re.sub(r'<link rel="stylesheet" href="css/[^"]+">\n', '', html)
html = html.replace('</head>', '<link rel="stylesheet" href="styles.css?v=' + VERSION + '">\n</head>')
html = re.sub(r'<script src="js/[^"]+" defer></script>\n', '', html)
html = html.replace('</body>', '<script src="app.js?v=' + VERSION + '" defer></script>\n</body>')
open('dist/index.html', 'w', encoding='utf-8').write(html)
print("   %d stylesheets -> dist/styles.css" % n_css)
print("   %d scripts     -> dist/app.js" % n_js)
PY

echo "→ copying assets"
for asset in favicon.svg site.webmanifest robots.txt sitemap.xml; do
  [ -f "$asset" ] && cp "$asset" dist/
done
if [ -d images ]; then
  # Photos live in subfolders (camp/, club/, colour/, games/, wet-games/,
  # archive/) and config.js references those paths, so the tree has to be
  # copied whole — flattening it here would break every image on the page.
  # README.md in images/ is guidance for the team, not a deployable asset.
  mkdir -p dist/images
  (cd images && find . -type f ! -name '*.md' -exec cp --parents {} ../dist/images/ \;)
fi
if [ -d videos ]; then
  mkdir -p dist/videos
  (cd videos && find . -type f ! -name '*.md' -exec cp --parents {} ../dist/videos/ \;)
fi

echo "→ checking for placeholders left in the build"
# DONATION_URL_HERE also appears in donate.js as the guard it compares
# against, so check the value in config.js rather than the bundle.
grep -q 'DONATION_URL = "DONATION_URL_HERE"' js/config.js \
  && echo "   ⚠ DONATION_URL is still the placeholder (js/config.js)" || true
grep -o 'example\.org' dist/index.html dist/app.js 2>/dev/null \
  | sort | uniq -c | sed 's/^/   ⚠ /' || true

# The films are embedded from Google Drive, so nothing is copied into
# dist/ for them. Warn only if an entry has neither a Drive id nor a
# local file to fall back on.
python3 - <<'CHECK'
import re
cfg = open('js/config.js', encoding='utf-8').read()
block = cfg[cfg.index('const YL_VIDEOS'):cfg.index('/* Filter labels')]
entries = block.count('title:')
sources = len(re.findall(r'\b(?:drive|file):\s*"[^"]+"', block))
if sources < entries:
    print("   \u26a0 %d of %d films have no drive id or local file" % (entries - sources, entries))
CHECK

echo "✓ dist/ ready to deploy"
