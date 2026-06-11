# Deploy to Vercel — El Rancho P Auto (rebuild)

This is a **static site** (HTML/CSS/JS + images). No build step, no framework.
The deploy root is **this folder** (`04-rebuild/`).

---

## Option A — Vercel CLI (fastest)

**You need:** Node.js installed + a free Vercel account.

```bash
npm i -g vercel
cd "/Users/juanescanar/Documents/Landing Page HL/Landing Page/04-rebuild"
vercel login        # opens your browser — log into YOUR account
vercel              # creates a Preview deployment → prints a URL
vercel --prod       # (optional) promote to a Production URL
```

On the first `vercel` run, accept the defaults:
- Set up and deploy? **Y**
- Scope: **your personal account**
- Link to existing project? **N**
- Project name: e.g. `elranchopauto`
- In which directory is your code? **`./`**
- Framework Preset: **Other**  ·  Build Command: *(none)*  ·  Output Directory: **`./`**

That's it — you'll get a `https://elranchopauto-xxxx.vercel.app` URL to review.

---

## Option B — GitHub + Vercel (best for ongoing updates)

1. Put this folder in a GitHub repo (root = the rebuild files, or set "Root Directory" to `04-rebuild` in Vercel).
2. vercel.com → **Add New… → Project → Import** the repo.
3. Framework Preset: **Other**. Root Directory: `04-rebuild` (or `/` if the repo root is the site). Deploy.
4. Every `git push` redeploys automatically.

---

## Notes
- `vercel.json` is included (static config + 1-year cache on `/assets`). Links keep `.html` so the site also opens locally.
- **Google Fonts** and the **Google Maps** embed load from the network — fine once it's online.
- **Forms are front-end demos.** To receive submissions, point them at email, a service like Formspree, or your own backend.
- **Image weight:** the 3 service PNGs are ~1 MB each. Converting them to WebP/JPG will speed up loads.
