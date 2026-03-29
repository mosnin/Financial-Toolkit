/**
 * CalcWise Charts Module
 * Lightweight canvas-based chart rendering for financial calculators
 */

const CalcCharts = {
  // Default CalcWise palette (fallback hex values for CSS custom properties)
  palette: [
    '#1B4D3E', // --color-primary
    '#C9A84C', // --color-accent
    '#2A7A5F', // --color-primary-light
    '#059669', // --color-success
    '#2563EB', // --color-info
    '#D97706', // --color-warning
    '#6EC9A7', // --color-primary-300
    '#A68A2E', // --color-accent-dark
    '#45B88E', // --color-primary-400
    '#9CA3AF'  // --color-gray-400
  ],

  /**
   * Resolve a CSS custom property to its computed value, with hex fallback
   */
  _resolveColor(color) {
    if (!color) return '#1B4D3E';
    if (!color.startsWith('var(')) return color;

    const match = color.match(/var\(([^,)]+)(?:,\s*([^)]+))?\)/);
    if (!match) return color;

    const computed = getComputedStyle(document.documentElement).getPropertyValue(match[1]).trim();
    return computed || (match[2] ? match[2].trim() : '#1B4D3E');
  },

  /**
   * Assign colors from the palette to data items that lack a color
   */
  _assignColors(data) {
    return data.map((item, i) => ({
      ...item,
      color: item.color
        ? this._resolveColor(item.color)
        : this.palette[i % this.palette.length]
    }));
  },

  /**
   * Get or create a canvas element inside a container
   */
  _getCanvas(canvasId) {
    const container = document.getElementById(canvasId);
    if (!container) return null;

    let canvas = container.querySelector('canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      container.appendChild(canvas);
    }

    // Responsive sizing: match container dimensions
    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const width = rect.width || 400;
    const height = rect.height || 300;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    return { canvas, ctx, width, height };
  },

  /**
   * Render a legend below the chart
   */
  _renderLegend(container, data) {
    let legend = container.querySelector('.chart-legend');
    if (!legend) {
      legend = document.createElement('div');
      legend.className = 'chart-legend';
      container.appendChild(legend);
    }

    legend.innerHTML = data.map(item =>
      `<div class="chart-legend-item">
        <span class="chart-legend-swatch" style="background:${item.color}"></span>
        <span class="chart-legend-label">${item.label}</span>
      </div>`
    ).join('');
  },

  // ============================================
  // Pie Chart
  // ============================================

  /**
   * Render a pie/donut chart for payment breakdowns
   * @param {string} canvasId - ID of the container element
   * @param {Array} data - [{label, value, color?}]
   * @param {Object} options - {donut: boolean, showLabels: boolean}
   */
  pieChart(canvasId, data, options = {}) {
    const setup = this._getCanvas(canvasId);
    if (!setup || !data || data.length === 0) return;

    const { ctx, width, height } = setup;
    data = this._assignColors(data);

    const donut = options.donut !== false;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) - 20;
    const innerRadius = donut ? radius * 0.55 : 0;

    const total = data.reduce((sum, d) => sum + d.value, 0);
    if (total === 0) return;

    let startAngle = -Math.PI / 2;

    // Draw slices
    data.forEach(item => {
      const sliceAngle = (item.value / total) * Math.PI * 2;
      const endAngle = startAngle + sliceAngle;

      ctx.beginPath();
      ctx.moveTo(centerX + innerRadius * Math.cos(startAngle), centerY + innerRadius * Math.sin(startAngle));
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.arc(centerX, centerY, innerRadius, endAngle, startAngle, true);
      ctx.closePath();
      ctx.fillStyle = item.color;
      ctx.fill();

      // Percentage labels
      if (options.showLabels !== false && sliceAngle > 0.25) {
        const midAngle = startAngle + sliceAngle / 2;
        const labelRadius = innerRadius + (radius - innerRadius) * 0.65;
        const lx = centerX + labelRadius * Math.cos(midAngle);
        const ly = centerY + labelRadius * Math.sin(midAngle);
        const pct = Math.round((item.value / total) * 100);

        ctx.fillStyle = '#FFFFFF';
        ctx.font = '600 13px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(pct + '%', lx, ly);
      }

      startAngle = endAngle;
    });

    // Center label for donut
    if (donut && options.centerLabel) {
      ctx.fillStyle = '#1F2937';
      ctx.font = '700 18px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(options.centerLabel, centerX, centerY - 8);

      if (options.centerSubLabel) {
        ctx.fillStyle = '#6B7280';
        ctx.font = '400 12px Inter, sans-serif';
        ctx.fillText(options.centerSubLabel, centerX, centerY + 12);
      }
    }

    // Legend
    const container = document.getElementById(canvasId);
    this._renderLegend(container, data);
  },

  // ============================================
  // Bar Chart
  // ============================================

  /**
   * Render a bar chart for comparisons
   * @param {string} canvasId - ID of the container element
   * @param {Array} data - [{label, value, color?}]
   * @param {Object} options - {horizontal: boolean, showValues: boolean}
   */
  barChart(canvasId, data, options = {}) {
    const setup = this._getCanvas(canvasId);
    if (!setup || !data || data.length === 0) return;

    const { ctx, width, height } = setup;
    data = this._assignColors(data);

    const padding = { top: 20, right: 20, bottom: 50, left: 60 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;
    const maxValue = Math.max(...data.map(d => d.value)) * 1.1 || 1;
    const barGap = 8;
    const barWidth = Math.min(60, (chartWidth / data.length) - barGap);

    // Y-axis grid lines
    const gridLines = 5;
    ctx.strokeStyle = '#E5E7EB';
    ctx.lineWidth = 1;
    ctx.fillStyle = '#6B7280';
    ctx.font = '400 11px Inter, sans-serif';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';

    for (let i = 0; i <= gridLines; i++) {
      const y = padding.top + chartHeight - (i / gridLines) * chartHeight;
      const val = (i / gridLines) * maxValue;

      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();

      // Y-axis label
      const label = val >= 1000 ? (val / 1000).toFixed(1) + 'k' : Math.round(val).toString();
      ctx.fillText(label, padding.left - 8, y);
    }

    // Draw bars
    const totalBarSpace = data.length * barWidth + (data.length - 1) * barGap;
    const offsetX = padding.left + (chartWidth - totalBarSpace) / 2;

    data.forEach((item, i) => {
      const x = offsetX + i * (barWidth + barGap);
      const barHeight = (item.value / maxValue) * chartHeight;
      const y = padding.top + chartHeight - barHeight;

      // Bar with rounded top corners
      const cornerRadius = Math.min(4, barWidth / 4);
      ctx.beginPath();
      ctx.moveTo(x, padding.top + chartHeight);
      ctx.lineTo(x, y + cornerRadius);
      ctx.arcTo(x, y, x + cornerRadius, y, cornerRadius);
      ctx.lineTo(x + barWidth - cornerRadius, y);
      ctx.arcTo(x + barWidth, y, x + barWidth, y + cornerRadius, cornerRadius);
      ctx.lineTo(x + barWidth, padding.top + chartHeight);
      ctx.closePath();
      ctx.fillStyle = item.color;
      ctx.fill();

      // Value label on top of bar
      if (options.showValues !== false) {
        ctx.fillStyle = '#1F2937';
        ctx.font = '600 11px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        const valText = item.value >= 1000 ? (item.value / 1000).toFixed(1) + 'k' : item.value.toFixed(0);
        ctx.fillText(valText, x + barWidth / 2, y - 4);
      }

      // X-axis label
      ctx.fillStyle = '#4B5563';
      ctx.font = '400 11px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillText(item.label, x + barWidth / 2, padding.top + chartHeight + 8);
    });
  },

  // ============================================
  // Line Chart
  // ============================================

  /**
   * Render a line chart for growth over time
   * @param {string} canvasId - ID of the container element
   * @param {Array} data - [{label, value, color?}] or for multi-line: {lines: [{label, color, points: [{label, value}]}]}
   * @param {Object} options - {fill: boolean, smooth: boolean, showDots: boolean}
   */
  lineChart(canvasId, data, options = {}) {
    const setup = this._getCanvas(canvasId);
    if (!setup) return;

    const { ctx, width, height } = setup;
    const padding = { top: 20, right: 20, bottom: 50, left: 60 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    // Normalize input: support both flat array and multi-line format
    let lines;
    if (Array.isArray(data)) {
      lines = [{ label: '', color: this.palette[0], points: data }];
    } else if (data && data.lines) {
      lines = data.lines.map((line, i) => ({
        ...line,
        color: line.color ? this._resolveColor(line.color) : this.palette[i % this.palette.length]
      }));
    } else {
      return;
    }

    const allValues = lines.flatMap(l => l.points.map(p => p.value));
    const maxValue = Math.max(...allValues) * 1.1 || 1;
    const minValue = Math.min(0, Math.min(...allValues));
    const valueRange = maxValue - minValue || 1;
    const pointCount = Math.max(...lines.map(l => l.points.length));

    if (pointCount === 0) return;

    // Y-axis grid lines
    const gridLines = 5;
    ctx.strokeStyle = '#E5E7EB';
    ctx.lineWidth = 1;
    ctx.fillStyle = '#6B7280';
    ctx.font = '400 11px Inter, sans-serif';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';

    for (let i = 0; i <= gridLines; i++) {
      const y = padding.top + chartHeight - (i / gridLines) * chartHeight;
      const val = minValue + (i / gridLines) * valueRange;

      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();

      const label = val >= 1000 ? (val / 1000).toFixed(0) + 'k' : Math.round(val).toString();
      ctx.fillText(label, padding.left - 8, y);
    }

    // X-axis labels
    const xLabels = lines[0].points;
    const maxLabels = Math.min(xLabels.length, Math.floor(chartWidth / 50));
    const labelStep = Math.max(1, Math.ceil(xLabels.length / maxLabels));

    ctx.fillStyle = '#4B5563';
    ctx.font = '400 11px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';

    xLabels.forEach((point, i) => {
      if (i % labelStep === 0 || i === xLabels.length - 1) {
        const x = padding.left + (i / (pointCount - 1 || 1)) * chartWidth;
        ctx.fillText(point.label, x, padding.top + chartHeight + 8);
      }
    });

    // Draw lines
    const fill = options.fill !== false;
    const showDots = options.showDots !== false && pointCount <= 30;

    lines.forEach(line => {
      const points = line.points;
      const coords = points.map((p, i) => ({
        x: padding.left + (i / (pointCount - 1 || 1)) * chartWidth,
        y: padding.top + chartHeight - ((p.value - minValue) / valueRange) * chartHeight
      }));

      // Filled area
      if (fill) {
        ctx.beginPath();
        ctx.moveTo(coords[0].x, padding.top + chartHeight);
        coords.forEach(c => ctx.lineTo(c.x, c.y));
        ctx.lineTo(coords[coords.length - 1].x, padding.top + chartHeight);
        ctx.closePath();

        const gradient = ctx.createLinearGradient(0, padding.top, 0, padding.top + chartHeight);
        gradient.addColorStop(0, line.color + '30');
        gradient.addColorStop(1, line.color + '05');
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      // Line
      ctx.beginPath();
      ctx.strokeStyle = line.color;
      ctx.lineWidth = 2.5;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      coords.forEach((c, i) => i === 0 ? ctx.moveTo(c.x, c.y) : ctx.lineTo(c.x, c.y));
      ctx.stroke();

      // Data point dots
      if (showDots) {
        coords.forEach(c => {
          ctx.beginPath();
          ctx.arc(c.x, c.y, 3.5, 0, Math.PI * 2);
          ctx.fillStyle = '#FFFFFF';
          ctx.fill();
          ctx.strokeStyle = line.color;
          ctx.lineWidth = 2;
          ctx.stroke();
        });
      }
    });

    // Legend for multi-line
    if (lines.length > 1) {
      const container = document.getElementById(canvasId);
      this._renderLegend(container, lines);
    }
  }
};
