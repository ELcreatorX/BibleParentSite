# Bible Parent — Waitlist landing page

A static sign-up (waitlist) page to collect emails from future **Bible Parent**
users. No database or server to manage: emails are saved into a
**Google Sheet** (exportable to CSV).

- **Stack:** HTML / CSS / JavaScript (no build step)
- **Hosting:** Vercel
- **Email storage:** Google Sheets via Google Apps Script

---

## 📁 Structure

| File | Role |
|---|---|
| `index.html` | The page |
| `styles.css` | The styling |
| `script.js` | Form validation + submission (⚠️ needs configuration) |
| `google-apps-script.gs` | Code to paste into Google Apps Script |
| `vercel.json` | Vercel config (clean URLs + security headers) |
| `assets/` | Logo, favicon, and social preview image |

---

## 1. Connect Google Sheets (email storage)

1. Create a **Google Sheet**. In the first row, add the headers:
   `Date` (A1), `Email` (B1), `Source` (C1).
2. Menu **Extensions ▸ Apps Script**.
3. Delete the sample code and **paste the entire contents of `google-apps-script.gs`**.
4. Click **Deploy ▸ New deployment ▸ type "Web app"**.
   - *Execute as:* **Me**
   - *Who has access:* **Anyone**
5. **Deploy**, authorize access, then **copy the Web app URL**
   (it ends with `/exec`).
6. Open `script.js` and replace the value of `ENDPOINT_URL` with that URL.

> 💡 Test tip: paste the URL into a browser and add `?email=test@test.com`
> at the end. A new row should appear in the Sheet.

> 📤 To get a **CSV** later: in the Sheet, **File ▸ Download ▸
> Comma-separated values (.csv)**.

Until `ENDPOINT_URL` is configured, sign-ups are stored
**locally in the browser** (so you can still test the page).

---

## 2. Test locally

Just open `index.html` in your browser, **or** start a small local server:

```bash
# Python (already installed on most machines)
python -m http.server 8000
# then open http://localhost:8000
```

---

## 3. Push to GitHub

```bash
git init
git add .
git commit -m "Bible Parent waitlist landing page"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/bible-parent-waitlist.git
git push -u origin main
```

---

## 4. Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub.
2. **Add New ▸ Project**, then import your `bible-parent-waitlist` repo.
3. Vercel detects a static site — **no config needed**:
   - Framework Preset: **Other**
   - Build Command: *(leave empty)*
   - Output Directory: *(leave empty / root)*
4. Click **Deploy**. 🎉

Every `git push` to `main` automatically redeploys the site.

---

## Quick customization

- **Text / headings:** in `index.html`.
- **Colors:** the `:root` variables at the top of `styles.css`
  (`--accent` is the main gold color).
- **Perks:** the `<ul class="perks">` list in `index.html`.
- **Logo:** replace `assets/logo.png`.
