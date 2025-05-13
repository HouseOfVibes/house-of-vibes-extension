// House of Vibes - Business Analytics Extension
// Version 1.0 - Comprehensive business insights

(function() {
  console.log('📈 House of Vibes Business Analytics loading...');
  
  // Mock analytics data (in real implementation, this would aggregate from other extensions)
  const analyticsData = {
    revenue: {
      BrandHaus: {
        monthly: [45000, 52000, 48000, 62000, 55000],
        ytd: 262000,
        target: 300000,
        projects: [
          { name: 'Website Redesign', value: 35000, profit: 22000 },
          { name: 'Brand Guidelines', value: 18000, profit: 12000 },
          { name: 'Logo Animation', value: 12000, profit: 8000 }
        ]
      },
      'Creative Studio': {
        monthly: [28000, 31000, 29000, 35000, 32000],
        ytd: 155000,
        target: 180000,
        projects: [
          { name: 'Client Portfolio', value: 22000, profit: 14000 },
          { name: 'Social Media Pack', value: 15000, profit: 10000 }
        ]
      },
      'Freelance': {
        monthly: [15000, 18000, 16000, 22000, 20000],
        ytd: 91000,
        target: 120000,
        projects: [
          { name: 'AI Extension', value: 25000, profit: 18000 },
          { name: 'Client Onboarding', value: 8000, profit: 5000 }
        ]
      }
    },
    productivity: {
      pomodorosCompleted: 145,
      focusTimeTotal: 87.5, // hours
      energyAverage: 78,
      tasksCompleted: 89,
      weeklyTrend: [12, 15, 18, 20, 16, 22, 24]
    },
    clients: {
      total: 18,
      active: 8,
      potential: 5,
      completed: 5,
      averageValue: 28500,
      topClients: [
        { name: 'Emma Rodriguez', value: 67000, projects: 3 },
        { name: 'Sarah Johnson', value: 45000, projects: 2 },
        { name: 'Michael Chen', value: 28000, projects: 1 }
      ]
    },
    projects: {
      total: 25,
      active: 7,
      completed: 18,
      averageDuration: 28, // days
      onTimeDelivery: 85.7, // percentage
      status: {
        planning: 2,
        active: 5,
        review: 2,
        completed: 16
      }
    }
  };
  
  // Chart.js integration for visualizations
  let chartLibraryLoaded = false;
  
  // Color schemes for charts
  const chartColors = {
    primary: ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#06b6d4'],
    gradients: {
      blue: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
      green: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      purple: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
      orange: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)'
    }
  };

  // Inject analytics styles
  function injectAnalyticsStyles() {
    const styleEl = document.createElement('style');
    styleEl.id = 'house-of-vibes-analytics';
    styleEl.textContent = `
      /* House of Vibes - Business Analytics Styles */
      
      /* Analytics button */
      .hov-analytics-button {
        position: fixed;
        bottom: 380px;
        right: 30px;
        z-index: 9999;
        background: linear-gradient(135deg, var(--hov-primary, #10b981) 0%, var(--hov-secondary, #06b6d4) 100%);
        color: white;
        border: none;
        padding: 15px 25px;
        border-radius: 50px;
        cursor: move;
        font-size: 18px;
        font-weight: bold;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        transition: all 0.3s ease;
        user-select: none;
      }
      
      .hov-analytics-button:hover {
        transform: scale(1.05);
        box-shadow: 0 6px 25px rgba(0,0,0,0.3);
      }
      
      /* Analytics modal */
      .hov-analytics-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        backdrop-filter: blur(10px);
        z-index: 10001;
        display: none;
        align-items: center;
        justify-content: center;
      }
      
      .hov-analytics-container {
        background: white;
        border-radius: 20px;
        width: 98vw;
        max-width: 1800px;
        height: 90vh;
        max-height: 900px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }
      
      .hov-analytics-header {
        background: linear-gradient(135deg, var(--hov-primary, #10b981) 0%, var(--hov-secondary, #06b6d4) 100%);
        padding: 20px;
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: move;
      }
      
      .hov-analytics-title {
        font-size: 24px;
        font-weight: bold;
        text-shadow: 1px 1px 3px rgba(0,0,0,0.3);
      }
      
      .hov-analytics-period {
        display: flex;
        gap: 10px;
      }
      
      .hov-period-btn {
        background: rgba(255,255,255,0.2);
        border: 1px solid rgba(255,255,255,0.3);
        color: white;
        padding: 8px 16px;
        border-radius: 20px;
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 14px;
      }
      
      .hov-period-btn.active {
        background: rgba(255,255,255,0.3);
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      }
      
      .hov-analytics-tabs {
        display: flex;
        background: #f8fafc;
        border-bottom: 1px solid #e2e8f0;
      }
      
      .hov-analytics-tab {
        flex: 1;
        padding: 15px;
        text-align: center;
        cursor: pointer;
        background: transparent;
        border: none;
        font-size: 16px;
        font-weight: 500;
        transition: all 0.3s ease;
      }
      
      .hov-analytics-tab.active {
        background: white;
        color: var(--hov-primary, #10b981);
        border-bottom: 3px solid var(--hov-primary, #10b981);
      }
      
      .hov-analytics-content {
        padding: 30px;
        flex: 1;
        overflow-y: auto;
      }
      
      /* KPI Cards */
      .hov-kpi-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 20px;
        margin-bottom: 30px;
      }
      
      .hov-kpi-card {
        background: white;
        border-radius: 15px;
        padding: 20px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.08);
        transition: all 0.3s ease;
        border-left: 5px solid var(--hov-primary, #10b981);
      }
      
      .hov-kpi-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 25px rgba(0,0,0,0.12);
      }
      
      .hov-kpi-label {
        color: #666;
        font-size: 14px;
        margin-bottom: 5px;
        font-weight: 500;
      }
      
      .hov-kpi-value {
        font-size: 32px;
        font-weight: bold;
        color: #333;
        margin-bottom: 10px;
      }
      
      .hov-kpi-change {
        font-size: 14px;
        font-weight: 600;
      }
      
      .hov-kpi-change.positive {
        color: #10b981;
      }
      
      .hov-kpi-change.negative {
        color: #ef4444;
      }
      
      /* Charts */
      .hov-chart-container {
        background: white;
        border-radius: 15px;
        padding: 25px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.08);
        margin-bottom: 30px;
      }
      
      .hov-chart-title {
        font-size: 20px;
        font-weight: bold;
        color: #333;
        margin-bottom: 20px;
      }
      
      .hov-chart-canvas {
        max-height: 400px;
      }
      
      /* Business comparison */
      .hov-business-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 20px;
        margin-top: 20px;
      }
      
      .hov-business-card {
        background: white;
        border-radius: 15px;
        padding: 20px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.08);
        transition: all 0.3s ease;
        border-top: 5px solid var(--hov-primary, #10b981);
      }
      
      .hov-business-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 25px rgba(0,0,0,0.12);
      }
      
      .hov-business-name {
        font-size: 20px;
        font-weight: bold;
        color: #333;
        margin-bottom: 15px;
      }
      
      .hov-business-metrics {
        display: flex;
        justify-content: space-between;
        margin-bottom: 15px;
      }
      
      .hov-metric {
        text-align: center;
      }
      
      .hov-metric-value {
        font-size: 24px;
        font-weight: bold;
        color: var(--hov-primary, #10b981);
      }
      
      .hov-metric-label {
        font-size: 12px;
        color: #666;
        margin-top: 5px;
      }
      
      .hov-progress-indicator {
        background: #f0f0f0;
        border-radius: 10px;
        height: 8px;
        margin-top: 15px;
        overflow: hidden;
      }
      
      .hov-progress-fill {
        height: 100%;
        background: linear-gradient(90deg, var(--hov-primary, #10b981) 0%, var(--hov-secondary, #06b6d4) 100%);
        border-radius: 10px;
        transition: width 0.5s ease;
      }
      
      /* Table styles */
      .hov-analytics-table {
        width: 100%;
        border-collapse: collapse;
        background: white;
        border-radius: 15px;
        overflow: hidden;
        box-shadow: 0 4px 15px rgba(0,0,0,0.08);
      }
      
      .hov-analytics-table th {
        background: #f8fafc;
        padding: 15px;
        text-align: left;
        font-weight: 600;
        color: #333;
        border-bottom: 2px solid #e2e8f0;
      }
      
      .hov-analytics-table td {
        padding: 15px;
        border-bottom: 1px solid #f0f0f0;
      }
      
      .hov-analytics-table tr:hover {
        background: #f8fafc;
      }
      
      /* Export button */
      .hov-export-btn {
        background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
        color: white;
        border: none;
        padding: 12px 25px;
        border-radius: 10px;
        cursor: pointer;
        font-size: 16px;
        font-weight: 600;
        transition: all 0.3s ease;
        margin-top: 20px;
      }
      
      .hov-export-btn:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 15px rgba(99,102,241,0.3);
      }
      
      /* Responsive */
      @media (max-width: 768px) {
        .hov-analytics-container {
          width: 98vw;
          height: 95vh;
        }
        
        .hov-kpi-grid {
          grid-template-columns: 1fr;
        }
        
        .hov-business-metrics {
          flex-direction: column;
          gap: 10px;
        }
      }
    `;
    
    // Remove any existing style
    const existing = document.getElementById('house-of-vibes-analytics');
    if (existing) existing.remove();
    
    document.head.appendChild(styleEl);
  }

  // Load Chart.js library
  function loadChartLibrary() {
    if (chartLibraryLoaded) return Promise.resolve();
    
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
      script.onload = () => {
        chartLibraryLoaded = true;
        console.log('Chart.js loaded successfully');
        resolve();
      };
      document.head.appendChild(script);
    });
  }

  // Make element draggable
  function makeDraggable(element, handle = null) {
    const dragHandle = handle || element;
    let isDragging = false;
    let startX, startY;
    
    dragHandle.addEventListener('mousedown', (e) => {
      if (e.target.closest('.hov-analytics-close') || e.target.closest('.hov-analytics-tab')) return;
      
      isDragging = true;
      startX = e.clientX - element.offsetLeft;
      startY = e.clientY - element.offsetTop;
      element.style.cursor = 'move';
      e.preventDefault();
    });
    
    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
      
      const x = Math.max(0, Math.min(e.clientX - startX, window.innerWidth - element.offsetWidth));
      const y = Math.max(0, Math.min(e.clientY - startY, window.innerHeight - element.offsetHeight));
      
      element.style.left = x + 'px';
      element.style.top = y + 'px';
      element.style.right = 'auto';
      element.style.bottom = 'auto';
    });
    
    document.addEventListener('mouseup', () => {
      if (isDragging) {
        isDragging = false;
        element.style.cursor = '';
      }
    });
  }

  // Format currency
  function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  }

  // Calculate percentage change
  function calculateChange(current, previous) {
    const change = ((current - previous) / previous) * 100;
    return change.toFixed(1);
  }

  // Create revenue chart
  function createRevenueChart(canvas, business) {
    const ctx = canvas.getContext('2d');
    const data = analyticsData.revenue[business];
    
    return new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [{
          label: `${business} Revenue`,
          data: data.monthly,
          borderColor: chartColors.primary[0],
          backgroundColor: chartColors.primary[0] + '20',
          borderWidth: 3,
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return formatCurrency(value);
              }
            }
          }
        }
      }
    });
  }

  // Create productivity chart
  function createProductivityChart(canvas) {
    const ctx = canvas.getContext('2d');
    const data = analyticsData.productivity;
    
    return new Chart(ctx, {
      type: 'radar',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Pomodoros Completed',
          data: data.weeklyTrend,
          borderColor: chartColors.primary[1],
          backgroundColor: chartColors.primary[1] + '30',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            beginAtZero: true,
            max: 25
          }
        }
      }
    });
  }

  // Create project status chart
  function createProjectStatusChart(canvas) {
    const ctx = canvas.getContext('2d');
    const data = analyticsData.projects.status;
    
    return new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Planning', 'Active', 'Review', 'Completed'],
        datasets: [{
          data: [data.planning, data.active, data.review, data.completed],
          backgroundColor: chartColors.primary,
          borderWidth: 2,
          borderColor: '#ffffff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });
  }

  // Switch analytics period
  function switchPeriod(period) {
    const buttons = document.querySelectorAll('.hov-period-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Update charts and data based on selected period
    console.log(`Switching to ${period} view`);
  }

  // Switch tab view
  function switchAnalyticsTab(tabName) {
    // Update active tab
    document.querySelectorAll('.hov-analytics-tab').forEach(tab => {
      tab.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    
    // Update content
    updateAnalyticsView(tabName);
  }

  // Update analytics view
  function updateAnalyticsView(tab) {
    const content = document.querySelector('.hov-analytics-content');
    if (!content) return;
    
    content.innerHTML = '';
    
    switch (tab) {
      case 'overview':
        content.innerHTML = `
          <div class="hov-kpi-grid">
            <div class="hov-kpi-card">
              <div class="hov-kpi-label">Total Revenue (YTD)</div>
              <div class="hov-kpi-value">${formatCurrency(Object.values(analyticsData.revenue).reduce((sum, business) => sum + business.ytd, 0))}</div>
              <div class="hov-kpi-change positive">+18.5% vs last year</div>
            </div>
            <div class="hov-kpi-card">
              <div class="hov-kpi-label">Active Projects</div>
              <div class="hov-kpi-value">${analyticsData.projects.active}</div>
              <div class="hov-kpi-change positive">+2 this month</div>
            </div>
            <div class="hov-kpi-card">
              <div class="hov-kpi-label">Focus Time (Hours)</div>
              <div class="hov-kpi-value">${analyticsData.productivity.focusTimeTotal}</div>
              <div class="hov-kpi-change positive">+12% this week</div>
            </div>
            <div class="hov-kpi-card">
              <div class="hov-kpi-label">Average Energy</div>
              <div class="hov-kpi-value">${analyticsData.productivity.energyAverage}%</div>
              <div class="hov-kpi-change positive">+5% this month</div>
            </div>
          </div>
          
          <div class="hov-chart-container">
            <div class="hov-chart-title">Revenue Overview by Business</div>
            <canvas id="revenue-overview-chart" class="hov-chart-canvas"></canvas>
          </div>
          
          <div class="hov-chart-container">
            <div class="hov-chart-title">Productivity Trends</div>
            <canvas id="productivity-chart" class="hov-chart-canvas"></canvas>
          </div>
        `;
        
        // Create charts after DOM is updated
        setTimeout(async () => {
          await loadChartLibrary();
          
          // Revenue overview chart
          const revenueCanvas = document.getElementById('revenue-overview-chart');
          if (revenueCanvas) {
            const ctx = revenueCanvas.getContext('2d');
            new Chart(ctx, {
              type: 'bar',
              data: {
                labels: Object.keys(analyticsData.revenue),
                datasets: [{
                  label: 'YTD Revenue',
                  data: Object.values(analyticsData.revenue).map(b => b.ytd),
                  backgroundColor: chartColors.primary,
                  borderWidth: 2,
                  borderColor: '#ffffff'
                }]
              },
              options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      callback: function(value) {
                        return formatCurrency(value);
                      }
                    }
                  }
                }
              }
            });
          }
          
          // Productivity chart
          const productivityCanvas = document.getElementById('productivity-chart');
          if (productivityCanvas) {
            createProductivityChart(productivityCanvas);
          }
        }, 100);
        break;
        
      case 'revenue':
        content.innerHTML = `
          <div class="hov-business-grid">
            ${Object.entries(analyticsData.revenue).map(([business, data]) => `
              <div class="hov-business-card">
                <div class="hov-business-name">${business}</div>
                <div class="hov-business-metrics">
                  <div class="hov-metric">
                    <div class="hov-metric-value">${formatCurrency(data.ytd)}</div>
                    <div class="hov-metric-label">YTD Revenue</div>
                  </div>
                  <div class="hov-metric">
                    <div class="hov-metric-value">${data.projects.length}</div>
                    <div class="hov-metric-label">Active Projects</div>
                  </div>
                  <div class="hov-metric">
                    <div class="hov-metric-value">${Math.round((data.ytd / data.target) * 100)}%</div>
                    <div class="hov-metric-label">Target</div>
                  </div>
                </div>
                <div class="hov-progress-indicator">
                  <div class="hov-progress-fill" style="width: ${(data.ytd / data.target) * 100}%"></div>
                </div>
              </div>
            `).join('')}
          </div>
          
          <div class="hov-chart-container">
            <div class="hov-chart-title">Monthly Revenue Trends</div>
            <canvas id="monthly-revenue-chart" class="hov-chart-canvas"></canvas>
          </div>
          
          <div class="hov-chart-container">
            <div class="hov-chart-title">Project Profitability Analysis</div>
            <table class="hov-analytics-table">
              <thead>
                <tr>
                  <th>Project</th>
                  <th>Business</th>
                  <th>Revenue</th>
                  <th>Profit</th>
                  <th>Margin</th>
                </tr>
              </thead>
              <tbody>
                ${Object.entries(analyticsData.revenue).flatMap(([business, data]) => 
                  data.projects.map(project => `
                    <tr>
                      <td><strong>${project.name}</strong></td>
                      <td>${business}</td>
                      <td>${formatCurrency(project.value)}</td>
                      <td>${formatCurrency(project.profit)}</td>
                      <td style="color: ${project.profit/project.value > 0.5 ? '#10b981' : '#f59e0b'}">
                        ${Math.round((project.profit / project.value) * 100)}%
                      </td>
                    </tr>
                  `)
                ).join('')}
              </tbody>
            </table>
          </div>
        `;
        
        setTimeout(async () => {
          await loadChartLibrary();
          
          // Monthly revenue chart
          const monthlyCanvas = document.getElementById('monthly-revenue-chart');
          if (monthlyCanvas) {
            const ctx = monthlyCanvas.getContext('2d');
            const datasets = Object.entries(analyticsData.revenue).map(([business, data], index) => ({
              label: business,
              data: data.monthly,
              borderColor: chartColors.primary[index],
              backgroundColor: chartColors.primary[index] + '20',
              borderWidth: 3,
              tension: 0.4
            }));
            
            new Chart(ctx, {
              type: 'line',
              data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
                datasets
              },
              options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      callback: function(value) {
                        return formatCurrency(value);
                      }
                    }
                  }
                },
                plugins: {
                  legend: {
                    position: 'top'
                  }
                }
              }
            });
          }
        }, 100);
        break;
        
      case 'clients':
        content.innerHTML = `
          <div class="hov-kpi-grid">
            <div class="hov-kpi-card">
              <div class="hov-kpi-label">Total Clients</div>
              <div class="hov-kpi-value">${analyticsData.clients.total}</div>
              <div class="hov-kpi-change positive">+3 this month</div>
            </div>
            <div class="hov-kpi-card">
              <div class="hov-kpi-label">Active Clients</div>
              <div class="hov-kpi-value">${analyticsData.clients.active}</div>
              <div class="hov-kpi-change positive">80% retention rate</div>
            </div>
            <div class="hov-kpi-card">
              <div class="hov-kpi-label">Average Client Value</div>
              <div class="hov-kpi-value">${formatCurrency(analyticsData.clients.averageValue)}</div>
              <div class="hov-kpi-change positive">+15% vs last quarter</div>
            </div>
            <div class="hov-kpi-card">
              <div class="hov-kpi-label">Potential Pipeline</div>
              <div class="hov-kpi-value">${analyticsData.clients.potential}</div>
              <div class="hov-kpi-change positive">$85k potential</div>
            </div>
          </div>
          
          <div class="hov-chart-container">
            <div class="hov-chart-title">Top Clients by Value</div>
            <table class="hov-analytics-table">
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Total Value</th>
                  <th>Projects</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                ${analyticsData.clients.topClients.map(client => `
                  <tr>
                    <td><strong>${client.name}</strong></td>
                    <td>${formatCurrency(client.value)}</td>
                    <td>${client.projects}</td>
                    <td><span style="color: #10b981; font-weight: 600;">Active</span></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
          
          <div class="hov-chart-container">
            <div class="hov-chart-title">Client Status Distribution</div>
            <canvas id="client-status-chart" class="hov-chart-canvas"></canvas>
          </div>
        `;
        
        setTimeout(async () => {
          await loadChartLibrary();
          
          // Client status chart
          const clientCanvas = document.getElementById('client-status-chart');
          if (clientCanvas) {
            const ctx = clientCanvas.getContext('2d');
            new Chart(ctx, {
              type: 'pie',
              data: {
                labels: ['Active', 'Potential', 'Completed'],
                datasets: [{
                  data: [analyticsData.clients.active, analyticsData.clients.potential, analyticsData.clients.completed],
                  backgroundColor: [chartColors.primary[0], chartColors.primary[1], chartColors.primary[2]],
                  borderWidth: 3,
                  borderColor: '#ffffff'
                }]
              },
              options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom'
                  }
                }
              }
            });
          }
        }, 100);
        break;
        
      case 'productivity':
        content.innerHTML = `
          <div class="hov-kpi-grid">
            <div class="hov-kpi-card">
              <div class="hov-kpi-label">Pomodoros Completed</div>
              <div class="hov-kpi-value">${analyticsData.productivity.pomodorosCompleted}</div>
              <div class="hov-kpi-change positive">+22 this week</div>
            </div>
            <div class="hov-kpi-card">
              <div class="hov-kpi-label">Total Focus Time</div>
              <div class="hov-kpi-value">${analyticsData.productivity.focusTimeTotal}h</div>
              <div class="hov-kpi-change positive">+12 hours this month</div>
            </div>
            <div class="hov-kpi-card">
              <div class="hov-kpi-label">Average Energy Level</div>
              <div class="hov-kpi-value">${analyticsData.productivity.energyAverage}%</div>
              <div class="hov-kpi-change positive">+8% this month</div>
            </div>
            <div class="hov-kpi-card">
              <div class="hov-kpi-label">Tasks Completed</div>
              <div class="hov-kpi-value">${analyticsData.productivity.tasksCompleted}</div>
              <div class="hov-kpi-change positive">95% completion rate</div>
            </div>
          </div>
          
          <div class="hov-chart-container">
            <div class="hov-chart-title">Weekly Productivity Trend</div>
            <canvas id="weekly-productivity-chart" class="hov-chart-canvas"></canvas>
          </div>
          
          <div class="hov-chart-container">
            <div class="hov-chart-title">Project Status Overview</div>
            <canvas id="project-status-chart" class="hov-chart-canvas"></canvas>
          </div>
          
          <div style="margin-top: 30px; background: #f0f9ff; padding: 25px; border-radius: 15px; border-left: 5px solid #0ea5e9;">
            <h3>📊 Productivity Insights</h3>
            <div style="grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); display: grid; gap: 20px; margin-top: 20px;">
              <div>
                <h4>🎯 Peak Performance</h4>
                <p style="color: #666;">Your most productive day is Wednesday with an average of ${Math.max(...analyticsData.productivity.weeklyTrend)} pomodoros.</p>
              </div>
              <div>
                <h4>⚡ Energy Pattern</h4>
                <p style="color: #666;">Energy levels are highest in the morning (9-11 AM) at 85%.</p>
              </div>
              <div>
                <h4>📅 Weekly Goal</h4>
                <p style="color: #666;">Target: 150 pomodoros. Current: ${analyticsData.productivity.pomodorosCompleted} (97%)</p>
              </div>
            </div>
          </div>
        `;
        
        setTimeout(async () => {
          await loadChartLibrary();
          
          // Weekly productivity chart
          const weeklyCanvas = document.getElementById('weekly-productivity-chart');
          if (weeklyCanvas) {
            createProductivityChart(weeklyCanvas);
          }
          
          // Project status chart
          const projectCanvas = document.getElementById('project-status-chart');
          if (projectCanvas) {
            createProjectStatusChart(projectCanvas);
          }
        }, 100);
        break;
    }
  }

  // Export analytics data
  function exportAnalytics() {
    const exportData = {
      generated: new Date().toISOString(),
      revenue: analyticsData.revenue,
      productivity: analyticsData.productivity,
      clients: analyticsData.clients,
      projects: analyticsData.projects
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `house-of-vibes-analytics-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // Create analytics button
  function createAnalyticsButton() {
    const button = document.createElement('button');
    button.className = 'hov-analytics-button';
    button.innerHTML = '📈 Analytics';
    
    button.onclick = (e) => {
      e.preventDefault();
      const modal = document.querySelector('.hov-analytics-modal');
      if (modal) {
        modal.style.display = modal.style.display === 'none' ? 'flex' : 'none';
        if (modal.style.display === 'flex') {
          updateAnalyticsView('overview');
        }
      }
    };
    
    document.body.appendChild(button);
    makeDraggable(button);
    
    return button;
  }

  // Create analytics modal
  function createAnalyticsModal() {
    const modal = document.createElement('div');
    modal.className = 'hov-analytics-modal';
    
    const container = document.createElement('div');
    container.className = 'hov-analytics-container';
    
    const header = document.createElement('div');
    header.className = 'hov-analytics-header';
    
    header.innerHTML = `
      <div class="hov-analytics-title">📈 Business Analytics</div>
      <div class="hov-analytics-period">
        <button class="hov-period-btn active" onclick="switchPeriod('week')">Week</button>
        <button class="hov-period-btn" onclick="switchPeriod('month')">Month</button>
        <button class="hov-period-btn" onclick="switchPeriod('quarter')">Quarter</button>
        <button class="hov-period-btn" onclick="switchPeriod('year')">Year</button>
      </div>
      <button class="hov-analytics-close hov-clients-close">×</button>
    `;
    
    const tabs = document.createElement('div');
    tabs.className = 'hov-analytics-tabs';
    
    tabs.innerHTML = `
      <button class="hov-analytics-tab active" data-tab="overview">📊 Overview</button>
      <button class="hov-analytics-tab" data-tab="revenue">💰 Revenue</button>
      <button class="hov-analytics-tab" data-tab="clients">👥 Clients</button>
      <button class="hov-analytics-tab" data-tab="productivity">⚡ Productivity</button>
    `;
    
    const content = document.createElement('div');
    content.className = 'hov-analytics-content';
    
    container.appendChild(header);
    container.appendChild(tabs);
    container.appendChild(content);
    modal.appendChild(container);
    document.body.appendChild(modal);
    
    // Make modal draggable by header
    makeDraggable(container, header);
    
    // Make functions globally available
    window.switchPeriod = switchPeriod;
    
    // Tab click handlers
    tabs.addEventListener('click', (e) => {
      if (e.target.classList.contains('hov-analytics-tab')) {
        const tabName = e.target.dataset.tab;
        switchAnalyticsTab(tabName);
      }
    });
    
    // Close modal
    header.querySelector('.hov-analytics-close').onclick = () => {
      modal.style.display = 'none';
    };
    
    modal.onclick = (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    };
    
    return modal;
  }

  // Initialize analytics extension
  function init() {
    console.log('📈 Initializing House of Vibes Business Analytics...');
    
    // Wait for page to be ready
    setTimeout(() => {
      injectAnalyticsStyles();
      createAnalyticsButton();
      createAnalyticsModal();
      
      console.log('✅ House of Vibes Business Analytics ready!');
    }, 4000);
  }

  // Start when page loads
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
