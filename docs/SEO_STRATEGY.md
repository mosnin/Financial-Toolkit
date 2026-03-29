# CalcWise SEO Strategy

This document defines the search engine optimization strategy for CalcWise, covering site architecture, content requirements, keyword targeting, and the scaling plan from 40 to 200+ calculators.

---

## 1. Topical Cluster Architecture

CalcWise uses a **hub-and-spoke** content model organized around financial calculator categories.

```
Homepage (calcwise.io/)
├── Hub: Real Estate Calculators (/real-estate-calculators/)
│   ├── Spoke: Mortgage Calculator
│   ├── Spoke: Affordability Calculator
│   ├── Spoke: Rent vs. Buy Calculator
│   └── ... (14 total)
├── Hub: Finance Calculators (/finance-calculators/)
│   ├── Spoke: Loan Calculator
│   ├── Spoke: Compound Interest Calculator
│   └── ... (13 total)
└── Hub: Business Calculators (/business-calculators/)
    ├── Spoke: Profit Margin Calculator
    ├── Spoke: Break-Even Calculator
    └── ... (13 total)
```

### Why This Works

- **Topical authority**: Google rewards sites that demonstrate comprehensive coverage of a topic. Grouping related calculators under a hub signals depth.
- **Crawl efficiency**: Category hubs link to every spoke; spokes link back to the hub and to 2-3 siblings. Every page is reachable within 3 clicks of the homepage.
- **Keyword cannibalization prevention**: Each spoke targets a distinct primary keyword. The hub targets the broader category keyword.

---

## 2. Internal Linking Logic

### Hub-to-Spoke

Every category hub page lists all calculators in that category with:
- Calculator name (linked)
- One-sentence description
- Primary use case

### Spoke-to-Hub

Every calculator page includes:
- Breadcrumb navigation: `Home > [Category] > [Calculator]`
- "More [Category] Calculators" section in the sidebar or footer

### Spoke-to-Spoke (Cross-Links)

Every calculator page links to 2-4 related calculators based on user intent:

| Calculator | Cross-Links To |
|-----------|---------------|
| Mortgage Calculator | Affordability, Amortization, Down Payment |
| Compound Interest | Savings, Investment Return, Retirement Savings |
| Profit Margin | Markup, Break-Even, Pricing |
| Rent vs. Buy | Mortgage, Affordability, Closing Cost |
| Burn Rate | Cash Runway, ROI, Break-Even |

### Cross-Category Links

Where relevant, calculators link across categories:
- Mortgage Calculator (Real Estate) links to Loan Calculator (Finance)
- Commission Calculator (Real Estate) links to Commission Calculator (Business)
- ROI Calculator (Business) links to Investment Return Calculator (Finance)

---

## 3. Page Template Strategy

Every calculator page follows an identical structure to ensure consistent SEO signals. See `CONTENT_TEMPLATE.md` for the full template.

### Critical SEO Elements Per Page

| Element | Requirement |
|---------|------------|
| Title tag | `[Calculator Name] - Free Online [Type] Calculator \| CalcWise` |
| Meta description | 150-160 chars, includes primary keyword and value proposition |
| H1 | Exact match or close variant of primary keyword |
| URL | `/[category]/[calculator-name]` |
| Schema markup | `WebApplication` + `FAQPage` structured data |
| Canonical URL | Self-referencing canonical |
| Open Graph | Title, description, image for social sharing |

### Content Depth Requirements

Each calculator page must include:

1. **Interactive calculator** (above the fold)
2. **How to use this calculator** (200-300 words) -- step-by-step instructions
3. **How [concept] works** (400-600 words) -- educational content explaining the formula, concepts, and real-world application
4. **Example calculation** (150-250 words) -- a worked example with realistic numbers
5. **FAQ section** (4-6 questions) -- targeting long-tail "People Also Ask" queries
6. **Related calculators** (3-5 links) -- internal linking to sibling and cross-category pages

**Minimum word count per page: 1,200 words** (excluding the calculator interface itself).

---

## 4. Schema Markup Approach

Every calculator page includes two schema types in JSON-LD format:

### WebApplication Schema

```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Mortgage Calculator",
  "url": "https://calcwise.io/real-estate-calculators/mortgage-calculator",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Any",
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
```

### FAQPage Schema

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I calculate my monthly mortgage payment?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "..."
      }
    }
  ]
}
```

### BreadcrumbList Schema

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://calcwise.io/" },
    { "@type": "ListItem", "position": 2, "name": "Real Estate Calculators", "item": "https://calcwise.io/real-estate-calculators/" },
    { "@type": "ListItem", "position": 3, "name": "Mortgage Calculator" }
  ]
}
```

---

## 5. URL Structure

```
https://calcwise.io/                                          # Homepage
https://calcwise.io/real-estate-calculators/                  # Category hub
https://calcwise.io/real-estate-calculators/mortgage-calculator  # Calculator page
https://calcwise.io/about.html                                # Static page
```

### Rules

- All URLs are lowercase, hyphenated, and trailing-slash-free (except hubs).
- Category hubs use trailing slashes for directory-style semantics.
- Calculator URLs always end with `-calculator` for consistency and keyword targeting.
- No file extensions on calculator pages (clean URLs via server config or static site generation).
- Static pages retain `.html` extensions.

---

## 6. Keyword Targeting by Category

### Real Estate Calculators

| Calculator | Primary Keyword | Monthly Search Volume (est.) |
|-----------|----------------|------------------------------|
| Mortgage Calculator | mortgage calculator | 1,200,000 |
| Affordability Calculator | how much house can I afford | 450,000 |
| Rent vs. Buy Calculator | rent vs buy calculator | 40,000 |
| Refinance Calculator | refinance calculator | 200,000 |
| Closing Cost Calculator | closing cost calculator | 90,000 |
| Property Tax Calculator | property tax calculator | 150,000 |
| Down Payment Calculator | down payment calculator | 60,000 |
| Amortization Calculator | amortization calculator | 300,000 |
| Cap Rate Calculator | cap rate calculator | 40,000 |
| Rental Cash Flow Calculator | rental property cash flow | 8,000 |
| Rental Property ROI | rental property ROI calculator | 12,000 |
| Airbnb Income Calculator | airbnb calculator | 25,000 |
| House Flip Calculator | house flip calculator | 15,000 |
| Commission Calculator | real estate commission calculator | 30,000 |

### Finance Calculators

| Calculator | Primary Keyword | Monthly Search Volume (est.) |
|-----------|----------------|------------------------------|
| Loan Calculator | loan calculator | 800,000 |
| Interest Calculator | interest calculator | 200,000 |
| Compound Interest | compound interest calculator | 350,000 |
| Savings Calculator | savings calculator | 150,000 |
| Investment Return | investment calculator | 250,000 |
| Debt Payoff | debt payoff calculator | 30,000 |
| Credit Card Payoff | credit card payoff calculator | 50,000 |
| Net Worth Calculator | net worth calculator | 60,000 |
| Budget Calculator | budget calculator | 40,000 |
| Emergency Fund | emergency fund calculator | 15,000 |
| Retirement Savings | retirement calculator | 300,000 |
| Inflation Calculator | inflation calculator | 100,000 |
| Salary to Hourly | salary to hourly calculator | 80,000 |

### Business Calculators

| Calculator | Primary Keyword | Monthly Search Volume (est.) |
|-----------|----------------|------------------------------|
| Profit Margin | profit margin calculator | 200,000 |
| Markup Calculator | markup calculator | 100,000 |
| Break-Even | break even calculator | 80,000 |
| ROI Calculator | ROI calculator | 150,000 |
| Burn Rate | burn rate calculator | 10,000 |
| CAC Calculator | customer acquisition cost calculator | 8,000 |
| LTV Calculator | lifetime value calculator | 12,000 |
| Commission Calculator | commission calculator | 60,000 |
| Sales Tax Calculator | sales tax calculator | 200,000 |
| Freelance Rate | freelance rate calculator | 15,000 |
| Pricing Calculator | pricing calculator | 20,000 |
| Revenue Growth | revenue growth calculator | 5,000 |
| Cash Runway | cash runway calculator | 5,000 |

---

## 7. Scaling Plan

### Phase 1: Foundation (Current -- 40 calculators)

- 3 category hubs, 40 calculator pages
- Establish topical authority in real estate, personal finance, and business
- Target high-volume head terms and mid-tail keywords

### Phase 2: Expansion (Target: 60 calculators)

- Add 20 high-priority calculators (see `CALCULATOR_ROADMAP.md`)
- Introduce 2 new category hubs: Tax Calculators, Insurance Calculators
- Begin building backlinks through calculator embeds and partnerships

### Phase 3: Dominance (Target: 100+ calculators)

- Expand into salary, credit, home costs, vehicle, and legal categories
- Launch comparison tools (e.g., "Compare Mortgage Rates", "Compare Savings Accounts")
- Add location-specific variants (state tax calculators, city cost-of-living)
- Programmatic SEO for long-tail variations

### Phase 4: Platform (Target: 200+ tools)

- User accounts for saving calculations
- API access for calculator embeds
- White-label calculator widgets
- Content partnerships with financial publications

### Technical SEO Checklist (Ongoing)

- [ ] Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1
- [ ] Mobile-first responsive design on all pages
- [ ] Self-referencing canonical tags on every page
- [ ] XML sitemap updated with every new page
- [ ] Structured data validated via Google Rich Results Test
- [ ] Internal link audit quarterly (no orphan pages, no broken links)
- [ ] 301 redirects for any URL changes
- [ ] Image optimization (WebP, lazy loading, descriptive alt text)
