/**
 * CalcWise Print Module
 * Clean print functionality for calculator results
 */

const CalcPrint = {
  /**
   * Open print dialog for a specific results section
   * @param {string} sectionId - ID of the element containing calculator results
   */
  printResults(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) {
      console.warn('CalcPrint: Section "' + sectionId + '" not found.');
      return;
    }

    // Mark the target section for the print stylesheet
    document.body.classList.add('calcwise-printing');
    section.classList.add('calcwise-print-target');

    // Inject print-specific styles if not already present
    this._injectPrintStyles();

    // Allow the browser to apply styles before triggering print
    requestAnimationFrame(() => {
      window.print();

      // Clean up after print dialog closes
      document.body.classList.remove('calcwise-printing');
      section.classList.remove('calcwise-print-target');
    });
  },

  /**
   * Inject inline print styles as a fallback when print.css is not linked
   */
  _injectPrintStyles() {
    if (document.getElementById('calcwise-print-styles')) return;

    const style = document.createElement('style');
    style.id = 'calcwise-print-styles';
    style.textContent = `
      @media print {
        /* Hide everything except the print target */
        body.calcwise-printing * {
          visibility: hidden;
        }
        body.calcwise-printing .calcwise-print-target,
        body.calcwise-printing .calcwise-print-target * {
          visibility: visible;
        }
        body.calcwise-printing .calcwise-print-target {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
        }

        /* Hide interactive elements */
        .calcwise-print-target button,
        .calcwise-print-target .btn-print,
        .calcwise-print-target input[type="range"] {
          display: none !important;
        }

        /* Branding header for print */
        .calcwise-print-target::before {
          content: 'CalcWise.com';
          display: block;
          visibility: visible;
          font-size: 14pt;
          font-weight: 700;
          color: #1B4D3E;
          border-bottom: 2px solid #1B4D3E;
          padding-bottom: 8pt;
          margin-bottom: 16pt;
        }

        /* Clean table styles for print */
        .calcwise-print-target table {
          border-collapse: collapse;
          width: 100%;
          font-size: 9pt;
        }
        .calcwise-print-target th,
        .calcwise-print-target td {
          border: 1px solid #D1D5DB;
          padding: 4pt 6pt;
          text-align: right;
        }
        .calcwise-print-target th {
          background: #F3F4F6 !important;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
          font-weight: 600;
        }
      }
    `;
    document.head.appendChild(style);
  }
};
