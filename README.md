# CalcWise - Financial Calculator Platform

**Smart calculators for smarter decisions.**

CalcWise is a free, open-source collection of 40+ financial calculators covering real estate, personal finance, and business metrics. Every calculator runs entirely in the browser with no server-side processing, no sign-ups, and no ads.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Markup | HTML5 (semantic) |
| Styling | CSS3 with custom properties (design tokens) |
| Logic | Vanilla JavaScript (ES6+, zero dependencies) |
| Build | Node.js build script (`build.js`) for template compilation |
| Hosting | Any static file server |

No frameworks. No bundlers. No runtime dependencies. The entire site ships as plain HTML, CSS, and JS.

---

## Getting Started

### Prerequisites

- Any modern web browser
- A local HTTP server (for development)
- Node.js 18+ (only needed for the build script)

### Run Locally

```bash
# Clone the repository
git clone https://github.com/calcwise/financial-toolkit.git
cd financial-toolkit

# Option 1: Python
python3 -m http.server 8000

# Option 2: Node
npx serve .

# Option 3: PHP
php -S localhost:8000
```

Open `http://localhost:8000` in your browser.

### Build

```bash
node build.js
```

The build script compiles calculator templates and outputs production-ready files.

---

## Project Structure

```
Financial-Toolkit/
├── index.html                  # Homepage
├── build.js                    # Template build script
├── sitemap.xml                 # XML sitemap (all pages)
├── robots.txt                  # Crawler directives
├── assets/                     # Images, icons, fonts
├── css/                        # Global and component styles
├── js/                         # Shared JavaScript modules
├── calculators/                # Calculator-specific logic
├── pages/                      # Static pages (about, contact, etc.)
└── docs/                       # Project documentation
    ├── SEO_STRATEGY.md
    ├── SITE_ARCHITECTURE.md
    ├── BRAND_GUIDELINES.md
    ├── CONTENT_TEMPLATE.md
    └── CALCULATOR_ROADMAP.md
```

### Key Directories

- **`css/`** -- Design-token-driven stylesheets. Global variables live in a single file; component styles are modular.
- **`js/`** -- Shared utilities (formatting, validation, chart rendering). Each calculator page imports only what it needs.
- **`calculators/`** -- One directory per calculator category, each containing the calculator-specific JS logic.
- **`pages/`** -- Static content pages (about, contact, privacy, terms, disclaimer).

---

## Adding a New Calculator

1. **Create the calculator logic** in `calculators/<category>/<calculator-name>.js`.
2. **Create the HTML page** following the template in `docs/CONTENT_TEMPLATE.md`. Every calculator page must include:
   - H1 with the calculator name
   - Interactive calculator form with labeled inputs
   - Results display area
   - "How to use" section
   - "How it works" (formula explanation)
   - FAQ section (4-6 questions, using `<details>` elements)
   - Related calculators sidebar
3. **Add the page to `sitemap.xml`** with the correct category path.
4. **Add internal links** from the category hub page and from 2-3 related calculator pages.
5. **Run `node build.js`** to compile.

See `docs/CONTENT_TEMPLATE.md` for the full page template and `docs/SITE_ARCHITECTURE.md` for technical details.

---

## Deployment

CalcWise is a fully static site. Deploy to any static hosting provider:

### Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod --dir=.
```

### Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Cloudflare Pages

1. Connect your GitHub repository in the Cloudflare Pages dashboard.
2. Set the build command to `node build.js`.
3. Set the output directory to `.` (root).

### GitHub Pages

Push to the `main` branch and enable GitHub Pages in repository settings with the source set to the root directory.

---

## Calculator Categories

### Real Estate (14 calculators)
Mortgage, Affordability, Rent vs. Buy, Refinance, Closing Cost, Property Tax, Down Payment, Amortization, Cap Rate, Rental Cash Flow, Rental Property ROI, Airbnb Income, House Flip, Commission

### Personal Finance (13 calculators)
Loan, Interest, Compound Interest, Savings, Investment Return, Debt Payoff, Credit Card Payoff, Net Worth, Budget, Emergency Fund, Retirement Savings, Inflation, Salary to Hourly

### Business (13 calculators)
Profit Margin, Markup, Break-Even, ROI, Burn Rate, CAC, LTV, Commission, Sales Tax, Freelance Rate, Pricing, Revenue Growth, Cash Runway

---

## Contributing

Contributions are welcome. Please follow these guidelines:

1. **Fork** the repository and create a feature branch.
2. **Follow the existing code style** -- no frameworks, no build-time dependencies beyond `build.js`.
3. **Use semantic HTML** and ensure accessibility (ARIA labels, keyboard navigation, sufficient contrast).
4. **Test** your calculator logic with edge cases (zero values, negative numbers, very large numbers).
5. **Add your calculator** to the sitemap and link it from the appropriate category hub.
6. **Submit a pull request** with a clear description of the calculator and its use case.

### Code Standards

- Vanilla JS only -- no jQuery, no React, no Vue.
- All calculator logic must work offline (no API calls).
- Follow the design system documented in `docs/BRAND_GUIDELINES.md`.
- Every calculator page must include structured data (JSON-LD schema).
- Maintain a Lighthouse score of 95+ across all categories.

---

## License

MIT License. See `LICENSE` for details.
