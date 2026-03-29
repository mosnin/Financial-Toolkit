/**
 * CalcWise Calculator Engine
 * Shared utilities and calculator framework
 */

// ============================================
// Formatting Utilities
// ============================================

const CalcWise = {
  /**
   * Format a number as currency
   */
  formatCurrency(value, decimals = 2) {
    if (isNaN(value) || value === null) return '$0.00';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(value);
  },

  /**
   * Format a number with commas
   */
  formatNumber(value, decimals = 0) {
    if (isNaN(value) || value === null) return '0';
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(value);
  },

  /**
   * Format as percentage
   */
  formatPercent(value, decimals = 2) {
    if (isNaN(value) || value === null) return '0%';
    return new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(value / 100);
  },

  /**
   * Parse a currency or number string to float
   */
  parseNumber(str) {
    if (typeof str === 'number') return str;
    if (!str) return 0;
    return parseFloat(str.replace(/[^0-9.\-]/g, '')) || 0;
  },

  // ============================================
  // Financial Calculation Functions
  // ============================================

  /**
   * Calculate monthly mortgage payment
   */
  monthlyPayment(principal, annualRate, years) {
    const monthlyRate = annualRate / 100 / 12;
    const n = years * 12;
    if (monthlyRate === 0) return principal / n;
    return principal * (monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
  },

  /**
   * Generate amortization schedule
   */
  amortizationSchedule(principal, annualRate, years) {
    const monthlyRate = annualRate / 100 / 12;
    const n = years * 12;
    const payment = this.monthlyPayment(principal, annualRate, years);
    const schedule = [];
    let balance = principal;
    let totalInterest = 0;
    let totalPrincipal = 0;

    for (let month = 1; month <= n; month++) {
      const interest = balance * monthlyRate;
      const principalPaid = payment - interest;
      balance -= principalPaid;
      totalInterest += interest;
      totalPrincipal += principalPaid;

      schedule.push({
        month,
        payment: payment,
        principal: principalPaid,
        interest: interest,
        totalInterest: totalInterest,
        totalPrincipal: totalPrincipal,
        balance: Math.max(0, balance)
      });
    }
    return schedule;
  },

  /**
   * Calculate compound interest
   */
  compoundInterest(principal, annualRate, years, compoundsPerYear = 12, monthlyContribution = 0) {
    const r = annualRate / 100;
    const n = compoundsPerYear;
    const t = years;

    // Future value of initial principal
    let amount = principal * Math.pow(1 + r / n, n * t);

    // Future value of contributions
    if (monthlyContribution > 0 && r > 0) {
      amount += monthlyContribution * ((Math.pow(1 + r / n, n * t) - 1) / (r / n));
    } else if (monthlyContribution > 0) {
      amount += monthlyContribution * n * t;
    }

    const totalContributions = principal + (monthlyContribution * 12 * t);
    const interestEarned = amount - totalContributions;

    return {
      futureValue: amount,
      totalContributions,
      interestEarned,
      principal
    };
  },

  /**
   * Calculate loan details
   */
  loanCalculation(principal, annualRate, years) {
    const payment = this.monthlyPayment(principal, annualRate, years);
    const totalPayments = payment * years * 12;
    const totalInterest = totalPayments - principal;

    return {
      monthlyPayment: payment,
      totalPayments,
      totalInterest,
      principal
    };
  },

  /**
   * Calculate how long to pay off debt
   */
  debtPayoff(balance, annualRate, monthlyPayment) {
    const monthlyRate = annualRate / 100 / 12;
    if (monthlyRate === 0) return { months: Math.ceil(balance / monthlyPayment), totalInterest: 0 };
    if (monthlyPayment <= balance * monthlyRate) return { months: Infinity, totalInterest: Infinity };

    const months = Math.ceil(-Math.log(1 - (balance * monthlyRate / monthlyPayment)) / Math.log(1 + monthlyRate));
    let remaining = balance;
    let totalInterest = 0;

    for (let i = 0; i < months; i++) {
      const interest = remaining * monthlyRate;
      totalInterest += interest;
      remaining = remaining + interest - monthlyPayment;
    }

    return { months, totalInterest: Math.max(0, totalInterest) };
  },

  /**
   * Calculate ROI
   */
  roi(gain, cost) {
    if (cost === 0) return 0;
    return ((gain - cost) / cost) * 100;
  },

  /**
   * Calculate profit margin
   */
  profitMargin(revenue, cost) {
    if (revenue === 0) return 0;
    return ((revenue - cost) / revenue) * 100;
  },

  /**
   * Calculate markup
   */
  markup(cost, sellingPrice) {
    if (cost === 0) return 0;
    return ((sellingPrice - cost) / cost) * 100;
  },

  /**
   * Calculate break-even point
   */
  breakEven(fixedCosts, pricePerUnit, variableCostPerUnit) {
    const contribution = pricePerUnit - variableCostPerUnit;
    if (contribution <= 0) return { units: Infinity, revenue: Infinity };
    const units = Math.ceil(fixedCosts / contribution);
    return { units, revenue: units * pricePerUnit };
  },

  /**
   * Calculate cap rate
   */
  capRate(noi, propertyValue) {
    if (propertyValue === 0) return 0;
    return (noi / propertyValue) * 100;
  },

  /**
   * Inflation adjusted value
   */
  inflationAdjusted(currentValue, inflationRate, years) {
    return currentValue / Math.pow(1 + inflationRate / 100, years);
  },

  /**
   * Future value with inflation
   */
  futureValueWithInflation(currentValue, inflationRate, years) {
    return currentValue * Math.pow(1 + inflationRate / 100, years);
  },

  // ============================================
  // UI Utilities
  // ============================================

  /**
   * Get form values as an object
   */
  getFormValues(formId) {
    const form = document.getElementById(formId);
    if (!form) return {};
    const data = {};
    const inputs = form.querySelectorAll('input, select');
    inputs.forEach(input => {
      if (input.name) {
        data[input.name] = input.type === 'number' || input.type === 'range'
          ? parseFloat(input.value) || 0
          : input.value;
      }
    });
    return data;
  },

  /**
   * Show results section
   */
  showResults(resultId) {
    const el = document.getElementById(resultId);
    if (el) {
      el.classList.remove('hidden');
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  },

  /**
   * Hide results section
   */
  hideResults(resultId) {
    const el = document.getElementById(resultId);
    if (el) el.classList.add('hidden');
  },

  /**
   * Set text content by ID
   */
  setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  },

  /**
   * Set innerHTML by ID
   */
  setHtml(id, html) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
  },

  /**
   * Validate form inputs
   */
  validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;
    let valid = true;

    form.querySelectorAll('.form-group').forEach(group => {
      group.classList.remove('has-error');
    });

    form.querySelectorAll('input[required]').forEach(input => {
      if (!input.value || (input.type === 'number' && isNaN(parseFloat(input.value)))) {
        const group = input.closest('.form-group');
        if (group) group.classList.add('has-error');
        valid = false;
      }
    });

    return valid;
  }
};

// ============================================
// Site-wide UI Components
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
  }

  // FAQ accordions
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const wasOpen = item.classList.contains('is-open');

      // Close all in this section
      item.closest('.faq-section')?.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('is-open');
      });

      if (!wasOpen) {
        item.classList.add('is-open');
      }
    });
  });

  // Calculator search
  const searchInput = document.querySelector('.search-input');
  const searchResults = document.querySelector('.search-results');

  if (searchInput && searchResults && typeof CALCULATOR_INDEX !== 'undefined') {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      if (query.length < 2) {
        searchResults.classList.remove('is-open');
        return;
      }

      const matches = CALCULATOR_INDEX.filter(calc =>
        calc.name.toLowerCase().includes(query) ||
        calc.category.toLowerCase().includes(query) ||
        (calc.keywords && calc.keywords.some(k => k.includes(query)))
      ).slice(0, 8);

      if (matches.length === 0) {
        searchResults.classList.remove('is-open');
        return;
      }

      searchResults.innerHTML = matches.map(calc =>
        `<a href="${calc.url}" class="search-result-item">
          <div>${calc.name}</div>
          <span class="category">${calc.category}</span>
        </a>`
      ).join('');
      searchResults.classList.add('is-open');
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.search-box')) {
        searchResults.classList.remove('is-open');
      }
    });
  }

  // Range input live update
  document.querySelectorAll('input[type="range"]').forEach(range => {
    const output = document.getElementById(range.id + '-value');
    if (output) {
      range.addEventListener('input', () => {
        output.textContent = range.value;
      });
    }
  });
});
