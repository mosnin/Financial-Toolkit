/**
 * CalcWise Analytics Module
 * Placeholder hooks for Google Analytics / GA4 integration
 *
 * Usage:
 *   CalcAnalytics.init('G-XXXXXXXXXX');
 *   CalcAnalytics.trackPageView('/finance-calculators/mortgage-calculator/');
 *   CalcAnalytics.trackCalculation('Mortgage Calculator', { principal: 300000, rate: 6.5, years: 30 });
 */

const CalcAnalytics = {
  /** Whether analytics has been initialized */
  _initialized: false,

  /** GA4 measurement ID */
  _measurementId: null,

  /**
   * Initialize Google Analytics (GA4)
   * Call this once with your measurement ID to enable tracking.
   * @param {string} measurementId - GA4 measurement ID (e.g. 'G-XXXXXXXXXX')
   */
  init(measurementId) {
    if (!measurementId) return;
    this._measurementId = measurementId;
    this._initialized = true;

    // TODO: Load the GA4 gtag.js script
    // Uncomment the following block when ready for production:
    //
    // const script = document.createElement('script');
    // script.async = true;
    // script.src = 'https://www.googletagmanager.com/gtag/js?id=' + measurementId;
    // document.head.appendChild(script);
    //
    // window.dataLayer = window.dataLayer || [];
    // window.gtag = function() { window.dataLayer.push(arguments); };
    // window.gtag('js', new Date());
    // window.gtag('config', measurementId);

    this._log('Analytics initialized', { measurementId });
  },

  /**
   * Track a page view
   * @param {string} pagePath - The page path (e.g. '/finance-calculators/loan-calculator/')
   * @param {string} [pageTitle] - Optional page title
   */
  trackPageView(pagePath, pageTitle) {
    const params = {
      page_path: pagePath,
      page_title: pageTitle || document.title
    };

    this._send('page_view', params);
  },

  /**
   * Track a calculator usage event
   * @param {string} calculatorName - Name of the calculator (e.g. 'Mortgage Calculator')
   * @param {Object} inputs - Calculator input values
   */
  trackCalculation(calculatorName, inputs) {
    const params = {
      calculator_name: calculatorName,
      event_category: 'calculator',
      event_label: calculatorName
    };

    // Flatten numeric inputs as custom dimensions
    if (inputs && typeof inputs === 'object') {
      Object.keys(inputs).forEach(key => {
        const val = inputs[key];
        if (typeof val === 'number' || typeof val === 'string') {
          params['calc_' + key] = val;
        }
      });
    }

    this._send('calculation', params);
  },

  /**
   * Track a generic user interaction event
   * @param {string} action - Event action (e.g. 'click_print', 'toggle_chart')
   * @param {Object} [params] - Additional event parameters
   */
  trackEvent(action, params) {
    this._send(action, {
      event_category: 'engagement',
      ...params
    });
  },

  /**
   * Track an error for monitoring
   * @param {string} errorType - Type of error (e.g. 'validation_error', 'calc_error')
   * @param {string} message - Error message
   */
  trackError(errorType, message) {
    this._send('exception', {
      description: errorType + ': ' + message,
      fatal: false
    });
  },

  /**
   * Internal: send an event to GA4
   * @param {string} eventName - GA4 event name
   * @param {Object} params - Event parameters
   */
  _send(eventName, params) {
    this._log(eventName, params);

    // TODO: Uncomment when GA4 is loaded:
    // if (typeof window.gtag === 'function') {
    //   window.gtag('event', eventName, params);
    // }
  },

  /**
   * Internal: log events to console in development
   */
  _log(eventName, params) {
    if (typeof console !== 'undefined' && console.debug) {
      console.debug('[CalcAnalytics]', eventName, params || '');
    }
  }
};
