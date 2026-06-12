# Deploy to Vercel — El Rancho P Auto (rebuild)

This is a lightweight **Hostinger/PHP site** (HTML/CSS/JS + images + `send-form.php`).
There is no build step and no framework.
The deploy root is **this folder** (`04-rebuild/`).

The contact and appointment forms require PHP hosting. If you deploy to a static-only platform such as Vercel without a serverless/PHP replacement, the forms will not send email.

---

## Option A — Hostinger / PHP Hosting (production)

Upload the production files in this folder to:

```text
/home/u270205007/domains/elranchopauto.com/public_html
```

Recommended deploy command from this folder:

```bash
rsync -az --delete --chmod=Du=rwx,Dgo=rx,Fu=rw,Fgo=r \
  --exclude .git --exclude .vercel --exclude .DS_Store \
  -e "ssh -i ~/.ssh/openclaw-hostinger -p 65002" \
  ./ u270205007@elranchopauto.com:/home/u270205007/domains/elranchopauto.com/public_html/
```

After deploy, test:

```bash
curl -I https://elranchopauto.com/send-form.php
curl -I https://elranchopauto.com/css/styles.css?v=20260612-hero-cachefix
```

Also submit one real test form and confirm the email arrives at `info@elranchopauto.com`.

### SMTP config

Hostinger local `sendmail` may be disabled. The domain currently uses Titan email MX records, so SMTP should use `smtp.titan.email`. For reliable form delivery, create this file outside `public_html`:

```text
/home/u270205007/domains/elranchopauto.com/form-mail-config.php
```

Use `form-mail-config.example.php` as the template and fill the real mailbox password there. Never commit the real config.

## Option B — Vercel CLI (static preview only)

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
- `vercel.json` is included for static preview compatibility. Production form handling lives in `send-form.php`.
- **Google Fonts** and the **Google Maps** embed load from the network — fine once it's online.
- **Forms require PHP + SMTP credentials** on the hosting account. For best deliverability, keep SPF/DKIM/DMARC aligned for `elranchopauto.com`.
- **Image weight:** the 3 service PNGs are ~1 MB each. Converting them to WebP/JPG will speed up loads.
