#!/usr/bin/env node
/**
 * CalcWise Static Site Builder
 * Generates calculator pages from template + data definitions
 */

const fs = require('fs');
const path = require('path');

// ============================================
// Template Helpers
// ============================================

function getHeader(currentPath = '/') {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!--METADATA-->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/css/design-system.css">
  <!--EXTRA_CSS-->
</head>
<body>
  <header class="site-header" role="banner">
    <div class="container header-inner">
      <a href="/" class="logo" aria-label="CalcWise Home">
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <rect width="32" height="32" rx="8" fill="currentColor"/>
          <path d="M8 10h16M8 16h16M8 22h10" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
        </svg>
        CalcWise
      </a>
      <nav class="main-nav" aria-label="Main navigation">
        <a href="/real-estate-calculators/">Real Estate</a>
        <a href="/finance-calculators/">Finance</a>
        <a href="/business-calculators/">Business</a>
        <a href="/about.html">About</a>
      </nav>
      <button class="mobile-menu-toggle" aria-label="Open menu" aria-expanded="false">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
      </button>
    </div>
    <nav class="mobile-nav" aria-label="Mobile navigation">
      <a href="/">Home</a>
      <a href="/real-estate-calculators/">Real Estate Calculators</a>
      <a href="/finance-calculators/">Finance Calculators</a>
      <a href="/business-calculators/">Business Calculators</a>
      <a href="/about.html">About</a>
      <a href="/contact.html">Contact</a>
    </nav>
  </header>`;
}

function getFooter() {
  return `
  <footer class="site-footer" role="contentinfo">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="/" class="logo" aria-label="CalcWise Home">
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <rect width="32" height="32" rx="8" fill="currentColor"/>
              <path d="M8 10h16M8 16h16M8 22h10" stroke="#1B4D3E" stroke-width="2.5" stroke-linecap="round"/>
            </svg>
            CalcWise
          </a>
          <p>Free financial calculators built for clarity, accuracy, and speed. Make smarter money decisions with tools you can trust.</p>
        </div>
        <div class="footer-col">
          <h4>Real Estate</h4>
          <a href="/real-estate-calculators/mortgage-calculator/">Mortgage Calculator</a>
          <a href="/real-estate-calculators/affordability-calculator/">Affordability Calculator</a>
          <a href="/real-estate-calculators/rent-vs-buy-calculator/">Rent vs Buy</a>
          <a href="/real-estate-calculators/">View All</a>
        </div>
        <div class="footer-col">
          <h4>Finance</h4>
          <a href="/finance-calculators/compound-interest-calculator/">Compound Interest</a>
          <a href="/finance-calculators/loan-calculator/">Loan Calculator</a>
          <a href="/finance-calculators/retirement-savings-calculator/">Retirement Savings</a>
          <a href="/finance-calculators/">View All</a>
        </div>
        <div class="footer-col">
          <h4>Company</h4>
          <a href="/about.html">About</a>
          <a href="/contact.html">Contact</a>
          <a href="/privacy.html">Privacy Policy</a>
          <a href="/terms.html">Terms of Use</a>
          <a href="/disclaimer.html">Disclaimer</a>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2026 CalcWise. All rights reserved.</p>
        <div class="footer-links">
          <a href="/privacy.html">Privacy</a>
          <a href="/terms.html">Terms</a>
          <a href="/disclaimer.html">Disclaimer</a>
          <a href="/sitemap.xml">Sitemap</a>
        </div>
      </div>
    </div>
  </footer>
  <script src="/js/calculator-engine.js"><\/script>
  <script src="/js/search-index.js"><\/script>
  <!--EXTRA_JS-->
</body>
</html>`;
}

function breadcrumbs(items) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": item.name,
      ...(item.url ? { "item": `https://calcwise.io${item.url}` } : {})
    }))
  };

  const html = items.map((item, i) => {
    if (i === items.length - 1) {
      return `<li><span aria-current="page">${item.name}</span></li>`;
    }
    return `<li><a href="${item.url}">${item.name}</a></li>`;
  }).join('');

  return `<nav class="breadcrumbs" aria-label="Breadcrumb">
    <ol>${html}</ol>
  </nav>
  <script type="application/ld+json">${JSON.stringify(jsonLd)}<\/script>`;
}

// Export for use by other scripts
if (typeof module !== 'undefined') {
  module.exports = { getHeader, getFooter, breadcrumbs };
}

console.log('CalcWise build system ready. Use templates to generate pages.');
