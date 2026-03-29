# CalcWise Calculator Page Content Template

This document defines the required structure, content guidelines, SEO requirements, and schema implementation for every calculator page on CalcWise.

---

## 1. Required Page Sections

Every calculator page must include the following sections in this order:

### Section 1: Header and Breadcrumbs

```html
<nav class="breadcrumb" aria-label="Breadcrumb">
  <ol>
    <li><a href="/">Home</a></li>
    <li><a href="/[category-slug]/">[Category Name]</a></li>
    <li aria-current="page">[Calculator Name]</li>
  </ol>
</nav>
```

### Section 2: Page Title (H1)

```html
<h1>[Calculator Name]</h1>
<p class="subtitle">[One sentence describing what this calculator does and who it's for.]</p>
```

**Rules:**
- The H1 must contain the primary keyword (e.g., "Mortgage Calculator").
- Only one H1 per page.
- Subtitle is 15-25 words and includes a secondary keyword variant.

### Section 3: Interactive Calculator (Above the Fold)

```html
<section class="calculator-widget" aria-label="[Calculator Name]">
  <form id="[slug]-form">
    <!-- Input groups -->
    <div class="input-group">
      <label for="[field-id]">[Field Label]</label>
      <input type="number" id="[field-id]" name="[field-name]"
             placeholder="e.g., 350000" min="0" step="any" required>
      <span class="hint">[Helper text explaining the field]</span>
    </div>

    <!-- Advanced options (collapsed by default) -->
    <details class="advanced-options">
      <summary>Advanced Options</summary>
      <!-- Additional input groups -->
    </details>

    <button type="submit" class="btn btn-primary">Calculate</button>
    <button type="reset" class="btn btn-ghost">Reset</button>
  </form>

  <!-- Results -->
  <div id="[slug]-results" class="results-panel" aria-live="polite">
    <div class="result-card result-primary">
      <span class="result-label">[Primary Result Label]</span>
      <span class="result-value" id="result-[key]">--</span>
    </div>
    <!-- Additional result cards -->
  </div>

  <!-- Chart (optional) -->
  <div class="chart-container">
    <canvas id="[slug]-chart" aria-label="[Chart description]" role="img"></canvas>
  </div>
</section>
```

**Rules:**
- Every input must have a `<label>` element (not just a placeholder).
- Use `aria-live="polite"` on the results container so screen readers announce updates.
- Include a chart when the calculator produces data that benefits from visualization (breakdowns, projections, comparisons).

### Section 4: How to Use This Calculator (H2)

```html
<section>
  <h2>How to Use the [Calculator Name]</h2>
  <ol>
    <li><strong>Step 1:</strong> [Instruction for first input]</li>
    <li><strong>Step 2:</strong> [Instruction for second input]</li>
    <li><strong>Step 3:</strong> [Instruction for remaining inputs]</li>
    <li><strong>Step 4:</strong> Click "Calculate" to see your results.</li>
  </ol>
</section>
```

**Rules:**
- 200-300 words.
- Use an ordered list.
- Mention specific field names.

### Section 5: How [Concept] Works (H2)

```html
<section>
  <h2>How [Concept] Works</h2>
  <p>[Explanation of the underlying financial concept.]</p>

  <h3>The Formula</h3>
  <div class="formula-block">
    <code>[Mathematical formula]</code>
  </div>
  <p>[Explanation of each variable in the formula.]</p>

  <h3>Key Factors That Affect [Concept]</h3>
  <ul>
    <li><strong>[Factor 1]:</strong> [Explanation]</li>
    <li><strong>[Factor 2]:</strong> [Explanation]</li>
    <li><strong>[Factor 3]:</strong> [Explanation]</li>
  </ul>
</section>
```

**Rules:**
- 400-600 words.
- Always include the formula.
- Explain every variable.
- Use subheadings (H3) to break up the content.

### Section 6: Example Calculation (H2)

```html
<section>
  <h2>Example: [Specific Scenario]</h2>
  <p>[Set up the example with realistic numbers.]</p>

  <div class="example-box">
    <h3>Inputs</h3>
    <ul>
      <li>[Input 1]: [Value]</li>
      <li>[Input 2]: [Value]</li>
    </ul>

    <h3>Results</h3>
    <ul>
      <li>[Result 1]: [Value]</li>
      <li>[Result 2]: [Value]</li>
    </ul>
  </div>

  <p>[Interpretation of the results and what the user should consider.]</p>
</section>
```

**Rules:**
- 150-250 words.
- Use realistic, relatable numbers (median home prices, typical salaries).
- Explain what the results mean in practical terms.

### Section 7: FAQ Section (H2)

```html
<section>
  <h2>Frequently Asked Questions</h2>

  <details class="faq-item">
    <summary>[Question targeting a long-tail keyword]</summary>
    <div class="faq-answer">
      <p>[Answer in 50-150 words.]</p>
    </div>
  </details>

  <!-- Repeat for 4-6 questions -->
</section>
```

**Rules:**
- 4-6 questions per calculator.
- Each question should target a "People Also Ask" query related to the calculator's topic.
- Answers should be 50-150 words -- concise but thorough enough to be a featured snippet candidate.
- Use `<details>` and `<summary>` elements for native accordion behavior.

### Section 8: Related Calculators (H2)

```html
<section>
  <h2>Related Calculators</h2>
  <div class="related-list">
    <a href="/[category]/[slug]" class="related-card">
      <h3>[Calculator Name]</h3>
      <p>[One-sentence description]</p>
    </a>
    <!-- 3-5 related calculator links -->
  </div>
</section>
```

**Rules:**
- Include 3-5 related calculators.
- At least 2 from the same category.
- At least 1 from a different category (cross-link).
- Each link includes the calculator name and a brief description.

### Section 9: Disclaimer

```html
<aside class="disclaimer">
  <p><strong>Disclaimer:</strong> This calculator provides estimates for informational
  purposes only. Results should not be considered financial advice. Consult a qualified
  financial professional before making important financial decisions. Actual results may
  vary based on factors not accounted for in this calculator.</p>
</aside>
```

This disclaimer must appear on every calculator page, unchanged.

---

## 2. Content Guidelines

### Word Count

| Section | Minimum Words | Maximum Words |
|---------|--------------|---------------|
| Subtitle | 15 | 25 |
| How to Use | 200 | 300 |
| How It Works | 400 | 600 |
| Example | 150 | 250 |
| Each FAQ Answer | 50 | 150 |
| **Total Page Minimum** | **1,200** | -- |

### Writing Style

- Follow the voice guidelines in `BRAND_GUIDELINES.md`.
- Use second person ("you", "your").
- Define financial terms on first use.
- Use concrete numbers in examples.
- No promotional language or superlatives.
- Every claim should be factually accurate and verifiable.

---

## 3. SEO Requirements Per Page

### Meta Tags

```html
<title>[Calculator Name] - Free Online [Type] Calculator | CalcWise</title>
<meta name="description" content="[150-160 character description with primary keyword and value proposition]">
<link rel="canonical" href="https://calcwise.io/[category]/[slug]">

<!-- Open Graph -->
<meta property="og:title" content="[Calculator Name] | CalcWise">
<meta property="og:description" content="[Same as meta description]">
<meta property="og:url" content="https://calcwise.io/[category]/[slug]">
<meta property="og:type" content="website">
<meta property="og:image" content="https://calcwise.io/assets/images/og/[slug].png">
<meta property="og:site_name" content="CalcWise">

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="[Calculator Name] | CalcWise">
<meta name="twitter:description" content="[Same as meta description]">
<meta name="twitter:image" content="https://calcwise.io/assets/images/og/[slug].png">
```

### Heading Hierarchy

Every page must follow a strict heading hierarchy:

```
H1: [Calculator Name]
  H2: How to Use the [Calculator Name]
  H2: How [Concept] Works
    H3: The Formula
    H3: Key Factors That Affect [Concept]
  H2: Example: [Specific Scenario]
    H3: Inputs
    H3: Results
  H2: Frequently Asked Questions
  H2: Related Calculators
```

Never skip heading levels (e.g., no H1 followed directly by H3).

### Image Requirements

- All images must have descriptive `alt` text.
- Charts must have an `aria-label` describing the data.
- OG images: 1200x630px, PNG format.

---

## 4. Schema Implementation

Every calculator page must include three JSON-LD schema blocks in the `<head>`:

### WebApplication

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "[Calculator Name]",
  "description": "[Meta description]",
  "url": "https://calcwise.io/[category]/[slug]",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Any",
  "browserRequirements": "Requires JavaScript",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "author": {
    "@type": "Organization",
    "name": "CalcWise",
    "url": "https://calcwise.io"
  }
}
</script>
```

### FAQPage

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "[Question text]",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[Answer text]"
      }
    }
  ]
}
</script>
```

### BreadcrumbList

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://calcwise.io/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "[Category Name]",
      "item": "https://calcwise.io/[category-slug]/"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "[Calculator Name]"
    }
  ]
}
</script>
```

---

## 5. Internal Linking Rules

### Mandatory Links Per Page

1. **Breadcrumb**: Links to Home and Category hub.
2. **Related Calculators section**: 3-5 links to other calculator pages.
3. **Contextual in-text links**: At least 2 natural links within the "How It Works" or "Example" sections to related calculators.

### Link Format

- Use descriptive anchor text: "Use our amortization calculator to see a full payment schedule" (not "click here").
- Open internal links in the same tab.
- Open external links in a new tab with `rel="noopener noreferrer"`.

### Cross-Link Matrix

Maintain a cross-link matrix to ensure no calculator page is an orphan and that link equity distributes evenly across the site. Every calculator should be linked from at least 3 other pages (its hub + 2 siblings minimum).

---

## 6. Page Template Checklist

Use this checklist when creating or reviewing a calculator page:

- [ ] H1 contains primary keyword
- [ ] Only one H1 on the page
- [ ] Meta title is under 60 characters
- [ ] Meta description is 150-160 characters
- [ ] Canonical URL is self-referencing
- [ ] Open Graph and Twitter meta tags are set
- [ ] Breadcrumb navigation is present and correct
- [ ] Calculator form has labeled inputs with `for`/`id` pairs
- [ ] Results area has `aria-live="polite"`
- [ ] "How to Use" section is 200-300 words
- [ ] "How It Works" section is 400-600 words with formula
- [ ] Example section uses realistic numbers
- [ ] FAQ section has 4-6 questions with schema markup
- [ ] Related calculators section links to 3-5 pages
- [ ] Disclaimer is present
- [ ] WebApplication schema is valid
- [ ] FAQPage schema is valid
- [ ] BreadcrumbList schema is valid
- [ ] Total word count is 1,200+
- [ ] Page is added to sitemap.xml
- [ ] Page is linked from category hub
- [ ] Page is cross-linked from 2+ sibling calculators
- [ ] Lighthouse score is 95+ (Performance, Accessibility, Best Practices, SEO)
