/**
 * CalcWise Calculator Search Index
 * Used for site-wide calculator search functionality
 */
const CALCULATOR_INDEX = [
  // Real Estate
  { name: "Mortgage Calculator", category: "Real Estate", url: "/real-estate-calculators/mortgage-calculator/", keywords: ["mortgage", "home loan", "monthly payment"] },
  { name: "Affordability Calculator", category: "Real Estate", url: "/real-estate-calculators/affordability-calculator/", keywords: ["afford", "home price", "how much"] },
  { name: "Rent vs Buy Calculator", category: "Real Estate", url: "/real-estate-calculators/rent-vs-buy-calculator/", keywords: ["rent", "buy", "renting", "buying"] },
  { name: "Refinance Calculator", category: "Real Estate", url: "/real-estate-calculators/refinance-calculator/", keywords: ["refinance", "refi", "new rate"] },
  { name: "Closing Cost Calculator", category: "Real Estate", url: "/real-estate-calculators/closing-cost-calculator/", keywords: ["closing costs", "settlement"] },
  { name: "Property Tax Calculator", category: "Real Estate", url: "/real-estate-calculators/property-tax-calculator/", keywords: ["property tax", "real estate tax"] },
  { name: "Down Payment Calculator", category: "Real Estate", url: "/real-estate-calculators/down-payment-calculator/", keywords: ["down payment", "deposit"] },
  { name: "Amortization Calculator", category: "Real Estate", url: "/real-estate-calculators/amortization-calculator/", keywords: ["amortization", "schedule", "payoff"] },
  { name: "Cap Rate Calculator", category: "Real Estate", url: "/real-estate-calculators/cap-rate-calculator/", keywords: ["cap rate", "capitalization", "investment property"] },
  { name: "Rental Cash Flow Calculator", category: "Real Estate", url: "/real-estate-calculators/rental-cash-flow-calculator/", keywords: ["rental", "cash flow", "income property"] },
  { name: "ROI Calculator for Rental Property", category: "Real Estate", url: "/real-estate-calculators/rental-property-roi-calculator/", keywords: ["roi", "return", "rental investment"] },
  { name: "Airbnb Income Calculator", category: "Real Estate", url: "/real-estate-calculators/airbnb-income-calculator/", keywords: ["airbnb", "short term rental", "vacation rental"] },
  { name: "House Flip Profit Calculator", category: "Real Estate", url: "/real-estate-calculators/house-flip-calculator/", keywords: ["house flip", "flip profit", "fix and flip"] },
  { name: "Real Estate Commission Calculator", category: "Real Estate", url: "/real-estate-calculators/commission-calculator/", keywords: ["commission", "agent fee", "realtor"] },

  // Finance
  { name: "Loan Calculator", category: "Finance", url: "/finance-calculators/loan-calculator/", keywords: ["loan", "borrow", "payment"] },
  { name: "Interest Calculator", category: "Finance", url: "/finance-calculators/interest-calculator/", keywords: ["interest", "simple interest"] },
  { name: "Compound Interest Calculator", category: "Finance", url: "/finance-calculators/compound-interest-calculator/", keywords: ["compound interest", "growth"] },
  { name: "Savings Calculator", category: "Finance", url: "/finance-calculators/savings-calculator/", keywords: ["savings", "save", "goal"] },
  { name: "Investment Return Calculator", category: "Finance", url: "/finance-calculators/investment-return-calculator/", keywords: ["investment", "return", "portfolio"] },
  { name: "Debt Payoff Calculator", category: "Finance", url: "/finance-calculators/debt-payoff-calculator/", keywords: ["debt", "payoff", "pay off"] },
  { name: "Credit Card Payoff Calculator", category: "Finance", url: "/finance-calculators/credit-card-payoff-calculator/", keywords: ["credit card", "payoff", "minimum payment"] },
  { name: "Net Worth Calculator", category: "Finance", url: "/finance-calculators/net-worth-calculator/", keywords: ["net worth", "assets", "liabilities"] },
  { name: "Budget Calculator", category: "Finance", url: "/finance-calculators/budget-calculator/", keywords: ["budget", "spending", "50/30/20"] },
  { name: "Emergency Fund Calculator", category: "Finance", url: "/finance-calculators/emergency-fund-calculator/", keywords: ["emergency fund", "rainy day"] },
  { name: "Retirement Savings Calculator", category: "Finance", url: "/finance-calculators/retirement-savings-calculator/", keywords: ["retirement", "401k", "ira"] },
  { name: "Inflation Calculator", category: "Finance", url: "/finance-calculators/inflation-calculator/", keywords: ["inflation", "purchasing power"] },
  { name: "Salary to Hourly Calculator", category: "Finance", url: "/finance-calculators/salary-to-hourly-calculator/", keywords: ["salary", "hourly", "wage"] },

  // Business
  { name: "Profit Margin Calculator", category: "Business", url: "/business-calculators/profit-margin-calculator/", keywords: ["profit", "margin", "revenue"] },
  { name: "Markup Calculator", category: "Business", url: "/business-calculators/markup-calculator/", keywords: ["markup", "cost", "price"] },
  { name: "Break Even Calculator", category: "Business", url: "/business-calculators/break-even-calculator/", keywords: ["break even", "breakeven"] },
  { name: "ROI Calculator", category: "Business", url: "/business-calculators/roi-calculator/", keywords: ["roi", "return on investment"] },
  { name: "Startup Burn Rate Calculator", category: "Business", url: "/business-calculators/burn-rate-calculator/", keywords: ["burn rate", "startup", "runway"] },
  { name: "CAC Calculator", category: "Business", url: "/business-calculators/cac-calculator/", keywords: ["cac", "customer acquisition cost"] },
  { name: "LTV Calculator", category: "Business", url: "/business-calculators/ltv-calculator/", keywords: ["ltv", "lifetime value", "customer"] },
  { name: "Commission Calculator", category: "Business", url: "/business-calculators/commission-calculator/", keywords: ["commission", "sales commission"] },
  { name: "Sales Tax Calculator", category: "Business", url: "/business-calculators/sales-tax-calculator/", keywords: ["sales tax", "tax"] },
  { name: "Freelance Rate Calculator", category: "Business", url: "/business-calculators/freelance-rate-calculator/", keywords: ["freelance", "rate", "hourly rate"] },
  { name: "Pricing Calculator", category: "Business", url: "/business-calculators/pricing-calculator/", keywords: ["pricing", "price", "strategy"] },
  { name: "Revenue Growth Calculator", category: "Business", url: "/business-calculators/revenue-growth-calculator/", keywords: ["revenue", "growth", "mrr"] },
  { name: "Cash Runway Calculator", category: "Business", url: "/business-calculators/cash-runway-calculator/", keywords: ["cash runway", "burn", "startup"] }
];
