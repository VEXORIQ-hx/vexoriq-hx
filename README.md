# VEXORIQ-HX — Portfolio & Brand Website

**Ahmad Shayan** | Web Developer & Website Design

---

## Project Structure

```
VEXOROQ -HX/
├── index.html              ← Main website
├── css/
│   └── style.css           ← Complete design system & layout
├── js/
│   └── main.js             ← Navigation, filters, form, animations
├── assets/
│   ├── images/
│   │   ├── photo.jpg       ← [ADD] Your personal photo (About section)
│   │   └── og-image.png    ← [ADD] Social sharing image (1200×630)
│   ├── icons/
│   │   ├── favicon.svg     ← Favicon (VX monogram)
│   │   └── favicon.png     ← [OPTIONAL] PNG fallback favicon
│   └── projects/           ← [ADD] Project screenshots
│       ├── studyflow.webp
│       ├── portfolio.webp
│       ├── orangebite.webp
│       ├── weather.webp
│       └── myproject1.webp
└── README.md
```

---

## Required Configuration Steps

### 1. Contact Form (Web3Forms)

The contact form uses [Web3Forms](https://web3forms.com/) — free, no backend needed.

**Setup:**
1. Go to https://web3forms.com/
2. Enter your email address to get a free access key
3. Open `index.html` and replace `YOUR_ACCESS_KEY_HERE`:
   ```html
   <input type="hidden" name="access_key" value="YOUR_ACTUAL_KEY_HERE">
   ```
4. Form submissions will be delivered to your email

**Until configured:** The form will show an error message and ask users to contact you directly via email.

---

### 2. Your Photo (About Section)

Add a photo to `assets/images/photo.jpg` (or `.webp`, `.png`).

Then in `index.html`, replace the placeholder block:
```html
<!-- Find this in the About section: -->
<div class="about__image-placeholder" ...>
  ...placeholder content...
</div>
```
Replace it with:
```html
<img
  src="assets/images/photo.jpg"
  alt="Ahmad Shayan — web developer"
  class="about__image"
  width="480"
  height="600"
  loading="lazy"
>
```

---

### 3. Project Screenshots

Add screenshots to `assets/projects/` as `.webp` files (preferred for performance).

For each project card, replace the `project-card__thumb-placeholder` div with:
```html
<img
  src="assets/projects/studyflow.webp"
  alt="StudyFlow — student productivity app screenshot"
  loading="lazy"
  width="400"
  height="225"
>
```

---

### 4. Email Address & Social Links

Update these in `index.html` (search for `vexoriq.hx@gmail.com` and `@vexoriq.hx`):
- Email: currently set to `vexoriq.hx@gmail.com`
- Instagram: currently set to `@vexoriq.hx` → `https://instagram.com/vexoriq.hx`
- GitHub: set to `https://github.com/AhmadShayaan19` ✓ (already correct)

---

### 5. Open Graph / Social Sharing Image

Create a 1200×630px image named `og-image.png` and place it in `assets/images/`.

Also update the OG URL in `index.html` once you have a domain:
```html
<meta property="og:url" content="https://your-domain.com">
```

---

## Deployment

### Option A: GitHub Pages (Free — Recommended)

1. Push the entire project folder to a GitHub repository
2. Go to repository Settings → Pages
3. Set source to `main` branch, root folder `/`
4. Your site will be live at `https://yourusername.github.io/repository-name/`

### Option B: Netlify (Free)

1. Go to https://netlify.com
2. Drag the project folder into the Netlify dashboard
3. Your site goes live instantly with a `.netlify.app` URL
4. Connect a custom domain in settings

### Option C: Vercel (Free)

1. Go to https://vercel.com
2. Import the GitHub repository
3. Deploy with zero configuration needed

---

## Customization Notes

- **Colors**: All colors use CSS variables in `:root` in `css/style.css`
- **Projects**: Add/remove cards in the `#projects` section of `index.html`
- **Experience**: Add timeline items to the `#experience` section
- **Services**: Edit the `.service-card` blocks in `#services`

---

## What Was Tested

- Navigation (desktop & mobile, anchor links, active states)
- Project filters (All / Web Apps / Frontend / Personal)
- Contact form (validation, error states, loading state)
- Scroll animations (with `prefers-reduced-motion` respect)
- Footer year (dynamic)
- All verified external links (Portfolio, MYPROJECT1, Weather, GitHub)
- Responsive layout structure (HTML/CSS verified, visual testing requires browser)

## What Requires Browser Testing

- Full cross-browser visual render (Chrome, Firefox, Safari, Edge)
- Form delivery end-to-end (needs Web3Forms access key configured)
- Mobile hardware keyboard behavior
- Actual scroll performance on low-powered devices

---

*Built with care. Designed for people.*
