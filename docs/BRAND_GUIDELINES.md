# CalcWise Brand Guidelines

---

## 1. Brand Identity

### Name

**CalcWise**

- Always written as one word with a capital C and capital W.
- Never: Calc Wise, calcwise, CALCWISE, Calc-Wise.

### Tagline

**"Smart calculators for smarter decisions."**

Use the tagline in the site header, meta descriptions, and social profiles. Do not alter the wording.

### Mission

CalcWise helps people make confident financial decisions by providing free, fast, and accurate calculators -- no sign-ups, no ads, no complexity.

---

## 2. Color Palette

### Primary Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Deep Green | `#1B4D3E` | 27, 77, 62 | Primary brand color. Headers, nav, buttons, links. |
| Deep Green Light | `#2A6B56` | 42, 107, 86 | Hover states, secondary surfaces. |
| Deep Green Dark | `#0F3328` | 15, 51, 40 | Active states, footer background. |

### Accent Color

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Gold | `#C9A84C` | 201, 168, 76 | Call-to-action highlights, result emphasis, badges. |
| Gold Light | `#D4BC72` | 212, 188, 114 | Hover states on accent elements. |

### Neutral Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| White | `#FFFFFF` | 255, 255, 255 | Card backgrounds, surface color. |
| Off-White | `#FAFAFA` | 250, 250, 250 | Page background. |
| Light Gray | `#E0E0E0` | 224, 224, 224 | Borders, dividers. |
| Medium Gray | `#555555` | 85, 85, 85 | Secondary text, captions. |
| Dark | `#1A1A1A` | 26, 26, 26 | Primary body text. |

### Semantic Colors

| Name | Hex | Usage |
|------|-----|-------|
| Success | `#2E7D32` | Positive results, savings indicators. |
| Error | `#C62828` | Validation errors, negative values. |
| Info | `#1565C0` | Informational callouts, tips. |
| Warning | `#F57F17` | Caution messages, disclaimers. |

### Color Accessibility

- All text must meet WCAG 2.1 AA contrast ratios (4.5:1 for normal text, 3:1 for large text).
- Deep Green on White: contrast ratio 7.8:1 (passes AAA).
- Gold on Deep Green Dark: contrast ratio 5.2:1 (passes AA).
- Never place light text on light backgrounds or dark text on dark backgrounds.

---

## 3. Typography

### Font Family

**Inter** -- a clean, highly legible sans-serif designed for screens.

- Self-hosted for performance (no external font service dependency).
- Fallback stack: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`

### Type Scale

| Element | Size | Weight | Line Height |
|---------|------|--------|-------------|
| H1 | 2.5rem (40px) | 700 (Bold) | 1.2 |
| H2 | 2rem (32px) | 700 (Bold) | 1.2 |
| H3 | 1.5rem (24px) | 600 (Semibold) | 1.3 |
| H4 | 1.125rem (18px) | 600 (Semibold) | 1.4 |
| Body | 1rem (16px) | 400 (Regular) | 1.6 |
| Body Small | 0.875rem (14px) | 400 (Regular) | 1.5 |
| Caption | 0.75rem (12px) | 400 (Regular) | 1.4 |
| Button | 1rem (16px) | 600 (Semibold) | 1.0 |
| Result Number | 2rem (32px) | 700 (Bold) | 1.2 |

### Usage Rules

- Use **bold (700)** only for headings and result numbers.
- Use **semibold (600)** for buttons, labels, and subheadings.
- Use **regular (400)** for body text.
- Never use italic for emphasis in UI elements; use semibold instead.
- Maximum line length for body text: 70 characters.

---

## 4. Voice and Tone

### Brand Voice Attributes

| Attribute | What It Means | Example |
|-----------|--------------|---------|
| **Trustworthy** | Accurate, cited sources, no hype. | "Based on a 30-year fixed rate of 6.5%..." |
| **Precise** | Specific numbers, clear formulas. | "Your monthly payment: $1,847.23" |
| **Clean** | No clutter, no jargon without explanation. | "APR (Annual Percentage Rate) is the total yearly cost of a loan, including fees." |
| **Professional** | Authoritative but not stuffy. | "Here's how to calculate your break-even point." |

### Writing Guidelines

- Use **active voice**: "Enter your loan amount" not "Your loan amount should be entered."
- Use **second person**: "you" and "your" to address the user directly.
- **Define jargon** on first use. Financial literacy varies widely.
- Keep sentences under 25 words where possible.
- Use numbers for all figures: "3 bedrooms" not "three bedrooms."
- Avoid superlatives: not "the best calculator" but "a fast, accurate calculator."
- Never make guarantees about financial outcomes.

### Content Disclaimers

Every calculator page must include a disclaimer stating that results are estimates and should not replace professional financial advice.

---

## 5. Logo Usage

### Logo Formats

- **Primary**: CalcWise wordmark in Deep Green (`#1B4D3E`) on white.
- **Reversed**: CalcWise wordmark in white on Deep Green background.
- **Icon**: Stylized "CW" monogram for favicons and small spaces.

### Clear Space

Maintain clear space around the logo equal to the height of the "C" in CalcWise on all sides.

### Minimum Size

- Wordmark: minimum width of 120px.
- Icon: minimum width of 32px.

### Do Not

- Stretch or distort the logo.
- Change the logo colors outside of approved variants.
- Place the logo on busy or low-contrast backgrounds.
- Add effects (shadows, gradients, outlines) to the logo.
- Rotate or skew the logo.

---

## 6. UI Design Principles

### 1. Calculator First

The interactive calculator is always the most prominent element on the page. It appears above the fold, before any educational content.

### 2. Progressive Disclosure

Show the essential inputs first. Advanced options (e.g., PMI, property tax, HOA) are collapsed behind a "Show advanced options" toggle.

### 3. Instant Feedback

Results update immediately as users modify inputs (using debounced real-time calculation). No separate "Calculate" step required, though a calculate button is provided as a fallback.

### 4. Visual Hierarchy

- Result numbers are large (2rem+), bold, and use the accent gold color.
- Input labels are clear and positioned above their fields.
- Section headings create a scannable structure.

### 5. Whitespace

Generous spacing between sections. Minimum 2rem between major content blocks. Cards have 1.5rem internal padding.

### 6. Accessibility

- All interactive elements are keyboard accessible.
- Form inputs have associated labels (not just placeholders).
- Color is never the sole indicator of state (always pair with text or icons).
- Focus states are clearly visible (2px outline in accent gold).
- Screen reader compatible (ARIA labels on dynamic results).

### 7. Mobile First

Layouts are designed for 320px minimum width and scale up. On mobile:
- Calculator inputs stack vertically.
- Sidebar content moves below the main content.
- Touch targets are at least 44x44px.
- Font sizes remain at least 16px to prevent iOS zoom.

---

## 7. Iconography

- Use simple, outlined SVG icons.
- Icon stroke width: 1.5px.
- Icon size: 24x24px default, 20x20px in compact contexts.
- Color: inherit from parent text color.
- Source: custom SVG set or a consistent open-source icon library.

---

## 8. Imagery

- Calculator illustrations: flat, minimal style using the brand color palette.
- No stock photography.
- Charts and graphs within calculators use the brand color palette (Deep Green for primary data, Gold for highlights, grays for secondary data).
- Open Graph images: white background, CalcWise wordmark, calculator name in Deep Green, gold accent bar.
