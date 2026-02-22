# Mucura — Hero Class DPS Reference

A static website that displays PVE DPS statistics and individual skill performance for all Hero classes on the Mucura Flyff private server. Built with original game skill icons and a dark fantasy UI design.

## Deploying to GitHub Pages

### Option A — Quickest (push site/ contents to repo root)

1. Create a new GitHub repository, e.g. `mucura-dps` (can be private or public).
2. Copy everything **inside** the `site/` folder to the root of the repository:
   ```
   index.html
   styles.css
   app.js
   icons/
   ```
3. Push to GitHub.
4. In the repo → **Settings → Pages**, set **Source** to `Deploy from a branch`, select `main`, folder `/root`.
5. Your site will be live at `https://<your-username>.github.io/mucura-dps/`

### Option B — Using a `docs/` subfolder

1. Rename the `site/` folder to `docs/`.
2. Push the whole repo (including `docs/`).
3. In **Settings → Pages**, set source to branch `main`, folder `/docs`.

### Option C — GitHub Actions (recommended for future updates)

Create `.github/workflows/pages.yml`:
```yaml
name: Deploy Pages
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      pages: write
      id-token: write
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/configure-pages@v4
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./site
      - id: deployment
        uses: actions/deploy-pages@v4
```

---

## Updating the data

All stat data lives in **`app.js`** at the top — the `CLASSES` array. Edit values there and re-deploy.

## Regenerating icons

If you update the `Icon/` folder, re-run:
```bash
python build_site.py
```
This re-converts all DDS skill icons to PNG and copies the class logos.

## Stack

- Vanilla HTML / CSS / JS — no build step, no dependencies
- Fonts: Cinzel + Exo 2 (Google Fonts)
- Icons: converted from original `.dds` game textures using Pillow (Python)
