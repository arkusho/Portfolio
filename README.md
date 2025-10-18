# Arpit – Interactive Portfolio

A fast, accessible, and interactive portfolio site with animations, PWA (installable), offline caching, and micro‑interactions designed for strong visitor retention.

Live hosting target: GitHub Pages (user.github.io or a repo with Pages enabled).

## Customize content
- Update your name, summary, and links in `index.html` (search for placeholders like `Company X`, `your-github`).
- Replace contact email `arpit.dev@example.com` with your real address in `index.html` and `main.js`.
- Projects: Update the projects grid cards with your real work and links.
- Profile photo: Currently using `1755945970807.png` at repo root. Replace that file to update the avatar and PWA icon.
- Resume: Linked to `./Arpit_Resume.pdf`. Replace the file or update the link if needed.

## Run locally
Open `index.html` directly or serve locally (recommended for service worker and PWA to work properly).

```sh
# Linux/macOS, using Python
python3 -m http.server 5173

# Then open http://localhost:5173
```

SW and PWA features require `http://` or `https://` origin (or `http://localhost`).

## Deploy to GitHub Pages
1. Create a new GitHub repository and push these files.
2. Option A: Name the repo `your-username.github.io` — GitHub Pages will publish the `main` branch automatically.
3. Option B: Any repo name — in Settings → Pages, set Source to `Deploy from a branch`, Branch `main` and folder `/root`.
4. Wait a minute, then visit the URL shown in Pages settings.

Optional: Add a file named `CNAME` at the repo root with your custom domain to use it with Pages.

## Lighthouse tips
- Keep images optimized (use 512×512 PNG for icon if replacing).
- Avoid blocking scripts; this template uses `defer` and efficient observers.
- Colors have high contrast; test with Lighthouse/axe.

## Structure
- `index.html` – markup and sections
- `styles.css` – theme variables, layout, animations
- `main.js` – all interactivity and PWA registration
- `service-worker.js` – cache-first offline support
- `manifest.webmanifest` – PWA manifest referencing the avatar as icon
- `Arpit_Resume.pdf` – your resume (linked in header and Contact)
- `1755945970807.png` – your avatar (also used for favicon/PWA icon)

---
Built with care to be simple, fast, and flexible.
