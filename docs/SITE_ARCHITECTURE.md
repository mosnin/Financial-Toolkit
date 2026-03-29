# CalcWise Site Architecture

Technical documentation covering the directory structure, template system, CSS design system, JavaScript architecture, routing, and how to extend the platform.

---

## 1. Directory Structure

```
Financial-Toolkit/
│
├── index.html                          # Homepage
├── build.js                            # Build script (Node.js)
├── sitemap.xml                         # XML sitemap
├── robots.txt                          # Crawler directives
│
├── assets/
│   ├── images/                         # Calculator illustrations, OG images
│   ├── icons/                          # SVG icons, favicon set
│   └── fonts/                          # Self-hosted Inter font files
│
├── css/
│   ├── variables.css                   # Design tokens (colors, spacing, typography)
│   ├── reset.css                       # CSS reset / normalize
│   ├── base.css                        # Global element styles
│   ├── layout.css                      # Grid, container, section layouts
│   ├── components.css                  # Reusable UI components
│   ├── calculator.css                  # Calculator-specific styles
│   └── utilities.css                   # Utility classes
│
├── js/
│   ├── main.js                         # Global initialization, navigation
│   ├── calculator-base.js              # Shared calculator logic (validation, formatting)
│   ├── charts.js                       # Lightweight chart rendering
│   ├── schema.js                       # JSON-LD structured data generator
│   └── utils.js                        # Number formatting, date helpers
│
├── calculators/
│   ├── real-estate/
│   │   ├── mortgage-calculator.js
│   │   ├── affordability-calculator.js
│   │   ├── rent-vs-buy-calculator.js
│   │   └── ...
│   ├── finance/
│   │   ├── loan-calculator.js
│   │   ├── compound-interest-calculator.js
│   │   └── ...
│   └── business/
│       ├── profit-margin-calculator.js
│       ├── break-even-calculator.js
│       └── ...
│
├── pages/
│   ├── about.html
│   ├── contact.html
│   ├── privacy.html
│   ├── terms.html
│   └── disclaimer.html
│
└── docs/
    ├── SEO_STRATEGY.md
    ├── SITE_ARCHITECTURE.md
    ├── BRAND_GUIDELINES.md
    ├── CONTENT_TEMPLATE.md
    └── CALCULATOR_ROADMAP.md
```

---

## 2. Template System

The build script (`build.js`) compiles calculator pages from a shared HTML template and per-calculator configuration.

### How It Works

1. A base template (`_template.html` or inline in `build.js`) defines the page shell: head, nav, footer, sidebar, and content slots.
2. Each calculator is defined by a configuration object specifying its title, category, description, inputs, formula, FAQ entries, and related links.
3. `build.js` reads these configurations, injects the content into the template, and writes the final HTML files to the output directories.

### Template Slots

| Slot | Purpose |
|------|---------|
| `{{title}}` | Page title and H1 |
| `{{meta_description}}` | Meta description tag |
| `{{breadcrumbs}}` | Breadcrumb navigation HTML |
| `{{calculator_form}}` | Input fields and calculate button |
| `{{results_area}}` | Results display container |
| `{{how_to_use}}` | Step-by-step usage instructions |
| `{{explanation}}` | Educational content about the concept |
| `{{example}}` | Worked example with real numbers |
| `{{faq}}` | FAQ accordion items |
| `{{related}}` | Related calculator links |
| `{{schema}}` | JSON-LD structured data |
| `{{category_slug}}` | Category URL segment |
| `{{calculator_slug}}` | Calculator URL segment |

---

## 3. CSS Design System

The styling layer uses CSS custom properties (design tokens) for consistency and easy theming.

### Design Tokens (`variables.css`)

```css
:root {
  /* Colors */
  --color-primary: #1B4D3E;
  --color-primary-light: #2A6B56;
  --color-primary-dark: #0F3328;
  --color-accent: #C9A84C;
  --color-accent-light: #D4BC72;
  --color-bg: #FAFAFA;
  --color-surface: #FFFFFF;
  --color-text: #1A1A1A;
  --color-text-secondary: #555555;
  --color-border: #E0E0E0;
  --color-success: #2E7D32;
  --color-error: #C62828;

  /* Typography */
  --font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-size-base: 1rem;
  --font-size-sm: 0.875rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.5rem;
  --font-size-2xl: 2rem;
  --font-size-3xl: 2.5rem;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --line-height-base: 1.6;
  --line-height-heading: 1.2;

  /* Spacing */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;
  --space-2xl: 3rem;
  --space-3xl: 4rem;

  /* Layout */
  --container-max: 1200px;
  --sidebar-width: 320px;
  --border-radius: 8px;
  --border-radius-lg: 12px;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
}
```

### Component Library

| Component | File | Description |
|-----------|------|-------------|
| `.btn` | `components.css` | Primary, secondary, and ghost button variants |
| `.card` | `components.css` | Elevated surface with padding and border-radius |
| `.input-group` | `components.css` | Label + input + optional hint text |
| `.result-card` | `calculator.css` | Highlighted result display with large number |
| `.faq-item` | `components.css` | Collapsible question/answer using `<details>` |
| `.breadcrumb` | `components.css` | Breadcrumb navigation with separators |
| `.calculator-grid` | `calculator.css` | Two-column layout for calculator + sidebar |
| `.related-list` | `calculator.css` | Grid of related calculator cards |

### Responsive Breakpoints

```css
/* Mobile first */
@media (min-width: 640px)  { /* sm: Tablet portrait */ }
@media (min-width: 768px)  { /* md: Tablet landscape */ }
@media (min-width: 1024px) { /* lg: Desktop */ }
@media (min-width: 1280px) { /* xl: Large desktop */ }
```

---

## 4. JavaScript Architecture

### Core Modules

#### `calculator-base.js`

Provides shared functionality for all calculators:

```javascript
class CalculatorBase {
  constructor(formId, resultId) { ... }

  // Input handling
  getInputValue(name)          // Returns parsed float, defaults to 0
  getSelectValue(name)         // Returns selected option value
  validateInputs(rules)        // Validates against min/max/required rules
  showError(field, message)    // Displays inline validation error
  clearErrors()                // Removes all error states

  // Output
  displayResult(key, value)    // Updates a result field
  formatCurrency(num)          // $1,234.56
  formatPercent(num)           // 12.34%
  formatNumber(num)            // 1,234
  renderChart(type, data)      // Delegates to charts.js

  // Lifecycle
  init()                       // Binds form submit, sets defaults
  calculate()                  // Override in subclass
  reset()                      // Clears all inputs and results
}
```

#### `charts.js`

Lightweight chart rendering using Canvas API (no external libraries):

- Pie/donut charts for breakdowns (e.g., principal vs. interest)
- Bar charts for comparisons (e.g., rent vs. buy over time)
- Line charts for projections (e.g., compound growth)

#### `schema.js`

Generates JSON-LD structured data dynamically:

```javascript
function generateSchema(config) {
  // Produces WebApplication + FAQPage + BreadcrumbList
  // Injects into <script type="application/ld+json">
}
```

#### `utils.js`

Pure utility functions:

- `formatCurrency(amount, locale, currency)` -- locale-aware currency formatting
- `formatDate(date, format)` -- date formatting
- `debounce(fn, delay)` -- debounce for real-time calculation
- `clamp(value, min, max)` -- numeric clamping
- `roundTo(value, decimals)` -- precise rounding

### Calculator Implementation Pattern

Each calculator extends the base class:

```javascript
// calculators/real-estate/mortgage-calculator.js
import { CalculatorBase } from '../../js/calculator-base.js';

class MortgageCalculator extends CalculatorBase {
  calculate() {
    const principal = this.getInputValue('home-price') - this.getInputValue('down-payment');
    const monthlyRate = this.getInputValue('interest-rate') / 100 / 12;
    const numPayments = this.getInputValue('loan-term') * 12;

    const monthlyPayment = principal *
      (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
      (Math.pow(1 + monthlyRate, numPayments) - 1);

    this.displayResult('monthly-payment', this.formatCurrency(monthlyPayment));
    this.displayResult('total-paid', this.formatCurrency(monthlyPayment * numPayments));
    this.displayResult('total-interest', this.formatCurrency((monthlyPayment * numPayments) - principal));
  }
}

new MortgageCalculator('mortgage-form', 'mortgage-results').init();
```

---

## 5. Route Strategy

CalcWise uses **file-based routing with clean URLs**.

### URL Patterns

| Pattern | Maps To |
|---------|---------|
| `/` | `index.html` |
| `/real-estate-calculators/` | `real-estate-calculators/index.html` |
| `/real-estate-calculators/mortgage-calculator` | `real-estate-calculators/mortgage-calculator.html` |
| `/about.html` | `pages/about.html` |

### Server Configuration

For clean URLs (dropping `.html`), configure the static server:

**Netlify (`_redirects` or `netlify.toml`):**
```toml
[[redirects]]
  from = "/real-estate-calculators/:calculator"
  to = "/real-estate-calculators/:calculator.html"
  status = 200
```

**Vercel (`vercel.json`):**
```json
{
  "cleanUrls": true
}
```

**Cloudflare Pages:** Clean URLs are enabled by default.

---

## 6. Adding New Categories and Calculators

### Adding a New Calculator to an Existing Category

1. Create `calculators/<category>/<slug>.js` extending `CalculatorBase`.
2. Add a configuration entry in the build config (or create the HTML manually following `CONTENT_TEMPLATE.md`).
3. Run `node build.js`.
4. Add the URL to `sitemap.xml`.
5. Add a link on the category hub page.
6. Add cross-links from 2-3 related calculators.

### Adding a New Category

1. Create the directory: `calculators/<new-category>/`.
2. Create the hub page: `<new-category>/index.html` listing all calculators in the category.
3. Add the hub to the homepage navigation and footer.
4. Add the hub URL and all calculator URLs to `sitemap.xml`.
5. Update `robots.txt` if any paths should be excluded.
6. Create at least 3 calculators in the new category before launching it (minimum viable topical cluster).

### Checklist for Every New Page

- [ ] HTML follows semantic structure (proper heading hierarchy, ARIA labels)
- [ ] JSON-LD schema included (WebApplication + FAQPage + BreadcrumbList)
- [ ] Meta title and description are unique and keyword-optimized
- [ ] Canonical URL is self-referencing
- [ ] Open Graph tags are set
- [ ] Page is linked from category hub
- [ ] Page links to 2-4 related calculators
- [ ] Page is added to `sitemap.xml`
- [ ] Lighthouse score is 95+ across all categories
- [ ] Works on mobile (tested at 320px width)
