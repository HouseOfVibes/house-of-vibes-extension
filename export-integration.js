// House of Vibes - Export & Integration Extension
// Version 1.0 - Connect with external tools

(function() {
  console.log('🔗 House of Vibes Export & Integration loading...');
  
  // Integration configurations
  const integrations = {
    googleDrive: {
      name: 'Google Drive',
      icon: '💾',
      enabled: false,
      connected: false,
      description: 'Sync files and export documents to Google Drive'
    },
    notion: {
      name: 'Notion',
      icon: '📝',
      enabled: false,
      connected: false,
      description: 'Export projects and clients to Notion databases'
    },
    slack: {
      name: 'Slack',
      icon: '💬',
      enabled: false,
      connected: false,
      description: 'Send project updates and notifications to Slack'
    },
    gmail: {
      name: 'Gmail',
      icon: '📧',
      enabled: false,
      connected: false,
      description: 'Create email drafts and manage client communications'
    }
  };
  
  // Export templates
  const exportTemplates = {
    project: {
      name: 'Project Summary',
      description: 'Export project details, milestones, and client info',
      formats: ['PDF', 'CSV', 'JSON', 'Markdown']
    },
    client: {
      name: 'Client Report',
      description: 'Export client information and project history',
      formats: ['PDF', 'CSV', 'JSON']
    },
    analytics: {
      name: 'Analytics Report',
      description: 'Export charts and business metrics',
      formats: ['PDF', 'Excel', 'JSON']
    },
    goals: {
      name: 'Goals Progress',
      description: 'Export goal tracking and milestones',
      formats: ['PDF', 'Markdown', 'JSON']
    },
    backup: {
      name: 'Full Backup',
      description: 'Export all data for backup purposes',
      formats: ['JSON', 'ZIP']
    }
  };
  
  // Mock data for export examples
  const mockExportData = {
    project: {
      name: 'Website Redesign',
      client: 'Sarah Johnson - TechFlow Solutions',
      status: 'Active',
      progress: 80,
      budget: '$35,000',
      deadline: '2025-06-15',
      milestones: [
        'Wireframes completed',
        'Design approved', 
        'Development in progress'
      ]
    },
    client: {
      name: 'Emma Rodriguez',
      company: 'Green Earth Co.',
      email: 'emma.r@greenearth.com',
      projects: 3,
      totalValue: '$67,000',
      status: 'Active'
    }
  };

  // Inject export integration styles
  function injectExportStyles() {
    const styleEl = document.createElement('style');
    styleEl.id = 'house-of-vibes-export';
    styleEl.textContent = `
      /* House of Vibes - Export & Integration Styles */
      
      /* Export button */
      .hov-export-button {
        position: fixed;
        bottom: 450px;
        right: 30px;
        z-index: 9999;
        background: linear-gradient(135deg, var(--hov-primary, #6366f1) 0%, var(--hov-secondary, #8b5cf6) 100%);
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
      
      .hov-export-button:hover {
        transform: scale(1.05);
        box-shadow: 0 6px 25px rgba(0,0,0,0.3);
      }
      
      /* Export modal */
      .hov-export-modal {
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
      
      .hov-export-container {
        background: white;
        border-radius: 20px;
        width: 95vw;
        max-width: 1200px;
        height: 85vh;
        max-height: 800px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }
      
      .hov-export-header {
        background: linear-gradient(135deg, var(--hov-primary, #6366f1) 0%, var(--hov-secondary, #8b5cf6) 100%);
        padding: 20px;
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: move;
      }
      
      .hov-export-title {
        font-size: 24px;
        font-weight: bold;
        text-shadow: 1px 1px 3px rgba(0,0,0,0.3);
      }
      
      .hov-export-tabs {
        display: flex;
        background: #f8fafc;
        border-bottom: 1px solid #e2e8f0;
      }
      
      .hov-export-tab {
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
      
      .hov-export-tab.active {
        background: white;
        color: var(--hov-primary, #6366f1);
        border-bottom: 3px solid var(--hov-primary, #6366f1);
      }
      
      .hov-export-content {
        padding: 30px;
        flex: 1;
        overflow-y: auto;
      }
      
      /* Integration cards */
      .hov-integration-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 20px;
        margin-bottom: 30px;
      }
      
      .hov-integration-card {
        background: white;
        border-radius: 15px;
        padding: 25px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.08);
        transition: all 0.3s ease;
        border: 2px solid #f0f0f0;
        position: relative;
      }
      
      .hov-integration-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 25px rgba(0,0,0,0.12);
        border-color: var(--hov-primary, #6366f1);
      }
      
      .hov-integration-header {
        display: flex;
        align-items: center;
        gap: 15px;
        margin-bottom: 15px;
      }
      
      .hov-integration-icon {
        font-size: 48px;
      }
      
      .hov-integration-name {
        font-size: 24px;
        font-weight: bold;
        color: #333;
      }
      
      .hov-integration-status {
        position: absolute;
        top: 15px;
        right: 15px;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: #dcfce7;
      }
      
      .hov-integration-status.connected {
        background: #10b981;
        animation: pulse 2s infinite;
      }
      
      @keyframes pulse {
        0% { opacity: 1; }
        50% { opacity: 0.5; }
        100% { opacity: 1; }
      }
      
      .hov-integration-description {
        color: #666;
        margin-bottom: 20px;
        line-height: 1.6;
      }
      
      .hov-integration-actions {
        display: flex;
        gap: 10px;
      }
      
      .hov-integration-btn {
        flex: 1;
        padding: 10px 20px;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 600;
        transition: all 0.3s ease;
      }
      
      .hov-integration-btn.primary {
        background: var(--hov-primary, #6366f1);
        color: white;
      }
      
      .hov-integration-btn.secondary {
        background: #f1f5f9;
        color: #475569;
        border: 1px solid #e2e8f0;
      }
      
      .hov-integration-btn:hover {
        transform: scale(1.02);
      }
      
      /* Export templates */
      .hov-template-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 20px;
      }
      
      .hov-template-card {
        background: white;
        border-radius: 15px;
        padding: 20px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.08);
        transition: all 0.3s ease;
        border: 2px solid #f0f0f0;
        cursor: pointer;
      }
      
      .hov-template-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 25px rgba(0,0,0,0.12);
        border-color: var(--hov-primary, #6366f1);
      }
      
      .hov-template-name {
        font-size: 20px;
        font-weight: bold;
        color: #333;
        margin-bottom: 10px;
      }
      
      .hov-template-description {
        color: #666;
        margin-bottom: 15px;
        line-height: 1.5;
      }
      
      .hov-template-formats {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }
      
      .hov-format-tag {
        background: var(--hov-primary, #6366f1);
        color: white;
        padding: 4px 10px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: 600;
      }
      
      /* Export preview */
      .hov-export-preview {
        background: #f8fafc;
        border-radius: 15px;
        padding: 25px;
        margin-top: 20px;
        border: 2px dashed #cbd5e1;
      }
      
      .hov-preview-header {
        display: flex;
        justify-content: between;
        align-items: center;
        margin-bottom: 20px;
      }
      
      .hov-preview-title {
        font-size: 20px;
        font-weight: bold;
        color: #333;
      }
      
      .hov-preview-content {
        background: white;
        border-radius: 10px;
        padding: 20px;
        border: 1px solid #e2e8f0;
        font-family: 'Courier New', monospace;
        font-size: 14px;
        line-height: 1.6;
        white-space: pre-wrap;
        max-height: 400px;
        overflow-y: auto;
      }
      
      .hov-preview-actions {
        display: flex;
        gap: 15px;
        margin-top: 20px;
      }
      
      .hov-preview-btn {
        padding: 12px 25px;
        border: none;
        border-radius: 10px;
        cursor: pointer;
        font-size: 16px;
        font-weight: 600;
        transition: all 0.3s ease;
      }
      
      .hov-download-btn {
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        color: white;
      }
      
      .hov-share-btn {
        background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
        color: white;
      }
      
      .hov-copy-btn {
        background: #f1f5f9;
        color: #475569;
        border: 1px solid #e2e8f0;
      }
      
      /* Settings panel */
      .hov-export-settings {
        background: white;
        border-radius: 15px;
        padding: 25px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.08);
        margin-bottom: 30px;
      }
      
      .hov-setting-group {
        margin-bottom: 20px;
      }
      
      .hov-setting-label {
        font-weight: 600;
        color: #333;
        margin-bottom: 10px;
        display: block;
      }
      
      .hov-setting-input {
        width: 100%;
        padding: 10px 15px;
        border: 2px solid #e2e8f0;
        border-radius: 8px;
        font-size: 16px;
      }
      
      .hov-checkbox-group {
        display: flex;
        flex-wrap: wrap;
        gap: 15px;
      }
      
      .hov-checkbox-item {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      
      .hov-checkbox {
        width: 18px;
        height: 18px;
        cursor: pointer;
      }
      
      /* Success/error messages */
      .hov-message {
        padding: 15px 20px;
        border-radius: 10px;
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 500;
      }
      
      .hov-message.success {
        background: #dcfce7;
        color: #15803d;
        border: 1px solid #bbf7d0;
      }
      
      .hov-message.error {
        background: #fef2f2;
        color: #dc2626;
        border: 1px solid #fecaca;
      }
      
      .hov-message.info {
        background: #dbeafe;
        color: #1d4ed8;
        border: 1px solid #bfdbfe;
      }
    `;
    
    // Remove any existing style
    const existing = document.getElementById('house-of-vibes-export');
    if (existing) existing.remove();
    
    document.head.appendChild(styleEl);
  }

  // Make element draggable
  function makeDraggable(element, handle = null) {
    const dragHandle = handle || element;
    let isDragging = false;
    let startX, startY;
    
    dragHandle.addEventListener('mousedown', (e) => {
      if (e.target.closest('.hov-export-close') || e.target.closest('.hov-export-tab')) return;
      
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

  // Generate export data
  function generateExportData(template) {
    const timestamp = new Date().toISOString();
    switch (template) {
      case 'project':
        return {
          generatedAt: timestamp,
          type: 'project_summary',
          data: mockExportData.project,
          metadata: {
            version: '1.0',
            generator: 'House of Vibes'
          }
        };
      case 'client':
        return {
          generatedAt: timestamp,
          type: 'client_report',
          data: mockExportData.client,
          metadata: {
            version: '1.0',
            generator: 'House of Vibes'
          }
        };
      case 'analytics':
        return {
          generatedAt: timestamp,
          type: 'analytics_report',
          data: {
            summary: 'Business analytics export',
            period: 'Q2 2025',
            revenue: '$508,000',
            projects: 25,
            clients: 18
          },
          metadata: {
            version: '1.0',
            generator: 'House of Vibes'
          }
        };
      case 'goals':
        return {
          generatedAt: timestamp,
          type: 'goals_progress',
          data: {
            totalGoals: 3,
            completed: 1,
            inProgress: 2,
            averageProgress: 62.3
          },
          metadata: {
            version: '1.0',
            generator: 'House of Vibes'
          }
        };
      case 'backup':
        return {
          generatedAt: timestamp,
          type: 'full_backup',
          data: {
            projects: 'All project data...',
            clients: 'All client data...',
            files: 'All file references...',
            goals: 'All goal data...',
            settings: 'User preferences...'
          },
          metadata: {
            version: '1.0',
            generator: 'House of Vibes'
          }
        };
      default:
        return null;
    }
  }

  // Format export data based on format
  function formatExportData(data, format) {
    switch (format.toLowerCase()) {
      case 'json':
        return JSON.stringify(data, null, 2);
      case 'csv':
        if (data.data && typeof data.data === 'object') {
          const headers = Object.keys(data.data).join(',');
          const values = Object.values(data.data).join(',');
          return `${headers}\n${values}`;
        }
        return 'No data available for CSV export';
      case 'markdown':
        if (data.type === 'project_summary') {
          return `# Project Summary\n\n` +
            `**Generated:** ${data.generatedAt}\n\n` +
            `## Project Details\n` +
            `- **Name:** ${data.data.name}\n` +
            `- **Client:** ${data.data.client}\n` +
            `- **Status:** ${data.data.status}\n` +
            `- **Progress:** ${data.data.progress}%\n` +
            `- **Budget:** ${data.data.budget}\n` +
            `- **Deadline:** ${data.data.deadline}\n\n` +
            `## Milestones\n` +
            data.data.milestones.map(m => `- [x] ${m}`).join('\n');
        }
        return `# ${data.type}\n\nGenerated: ${data.generatedAt}\n\n\`\`\`json\n${JSON.stringify(data.data, null, 2)}\n\`\`\``;
      case 'pdf':
        return 'PDF generation requires additional processing...';
      default:
        return JSON.stringify(data, null, 2);
    }
  }

  // Download file
  function downloadFile(content, filename, type = 'application/json') {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // Copy to clipboard
  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      showMessage('Copied to clipboard!', 'success');
    }).catch(() => {
      showMessage('Failed to copy to clipboard', 'error');
    });
  }

  // Show message
  function showMessage(text, type = 'info') {
    const message = document.createElement('div');
    message.className = `hov-message ${type}`;
    message.innerHTML = `
      <span>${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
      ${text}
    `;
    
    const content = document.querySelector('.hov-export-content');
    if (content) {
      content.insertBefore(message, content.firstChild);
      setTimeout(() => {
        message.remove();
      }, 3000);
    }
  }

  // Connect to integration
  function connectIntegration(integrationKey) {
    const integration = integrations[integrationKey];
    
    // Simulate connection process
    showMessage(`Connecting to ${integration.name}...`, 'info');
    
    setTimeout(() => {
      integration.connected = true;
      integration.enabled = true;
      showMessage(`Successfully connected to ${integration.name}!`, 'success');
      updateExportView('integrations');
    }, 2000);
  }

  // Disconnect integration
  function disconnectIntegration(integrationKey) {
    const integration = integrations[integrationKey];
    integration.connected = false;
    integration.enabled = false;
    showMessage(`Disconnected from ${integration.name}`, 'info');
    updateExportView('integrations');
  }

  // Export to integration
  function exportToIntegration(integrationKey, data) {
    const integration = integrations[integrationKey];
    
    if (!integration.connected) {
      showMessage(`Please connect to ${integration.name} first`, 'error');
      return;
    }
    
    showMessage(`Exporting to ${integration.name}...`, 'info');
    
    setTimeout(() => {
      showMessage(`Successfully exported to ${integration.name}!`, 'success');
    }, 1500);
  }

  // Switch tab view
  function switchExportTab(tabName) {
    // Update active tab
    document.querySelectorAll('.hov-export-tab').forEach(tab => {
      tab.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    
    // Update content
    updateExportView(tabName);
  }

  // Update export view
  function updateExportView(tab) {
    const content = document.querySelector('.hov-export-content');
    if (!content) return;
    
    content.innerHTML = '';
    
    switch (tab) {
      case 'export':
        content.innerHTML = `
          <h2>📤 Export Templates</h2>
          <p style="color: #666; margin-bottom: 30px;">Choose a template to export your data</p>
          
          <div class="hov-template-grid">
            ${Object.entries(exportTemplates).map(([key, template]) => `
              <div class="hov-template-card" onclick="selectExportTemplate('${key}')">
                <div class="hov-template-name">${template.name}</div>
                <div class="hov-template-description">${template.description}</div>
                <div class="hov-template-formats">
                  ${template.formats.map(format => `
                    <span class="hov-format-tag">${format}</span>
                  `).join('')}
                </div>
              </div>
            `).join('')}
          </div>
          
          <div id="export-preview-container"></div>
        `;
        
        // Make function globally available
        window.selectExportTemplate = selectExportTemplate;
        break;
        
      case 'integrations':
        content.innerHTML = `
          <h2>🔗 Integrations</h2>
          <p style="color: #666; margin-bottom: 30px;">Connect with your favorite tools</p>
          
          <div class="hov-integration-grid">
            ${Object.entries(integrations).map(([key, integration]) => `
              <div class="hov-integration-card">
                <div class="hov-integration-status ${integration.connected ? 'connected' : ''}"></div>
                <div class="hov-integration-header">
                  <div class="hov-integration-icon">${integration.icon}</div>
                  <div class="hov-integration-name">${integration.name}</div>
                </div>
                <div class="hov-integration-description">${integration.description}</div>
                <div class="hov-integration-actions">
                  ${integration.connected ? `
                    <button class="hov-integration-btn secondary" onclick="disconnectIntegration('${key}')">
                      Disconnect
                    </button>
                    <button class="hov-integration-btn primary" onclick="testIntegration('${key}')">
                      Test
                    </button>
                  ` : `
                    <button class="hov-integration-btn primary" onclick="connectIntegration('${key}')">
                      Connect
                    </button>
                    <button class="hov-integration-btn secondary" onclick="showIntegrationHelp('${key}')">
                      Help
                    </button>
                  `}
                </div>
              </div>
            `).join('')}
          </div>
          
          ${Object.values(integrations).some(i => i.connected) ? `
            <div class="hov-export-settings">
              <h3>⚙️ Integration Settings</h3>
              <div class="hov-setting-group">
                <label class="hov-setting-label">Default Export Format</label>
                <select class="hov-setting-input">
                  <option value="json">JSON</option>
                  <option value="csv">CSV</option>
                  <option value="pdf">PDF</option>
                  <option value="markdown">Markdown</option>
                </select>
              </div>
              <div class="hov-setting-group">
                <label class="hov-setting-label">Auto-sync Options</label>
                <div class="hov-checkbox-group">
                  <div class="hov-checkbox-item">
                    <input type="checkbox" class="hov-checkbox" checked>
                    <span>Sync completed projects</span>
                  </div>
                  <div class="hov-checkbox-item">
                    <input type="checkbox" class="hov-checkbox">
                    <span>Auto-backup daily</span>
                  </div>
                  <div class="hov-checkbox-item">
                    <input type="checkbox" class="hov-checkbox" checked>
                    <span>Send notifications</span>
                  </div>
                </div>
              </div>
            </div>
          ` : ''}
        `;
        
        // Make functions globally available
        window.connectIntegration = connectIntegration;
        window.disconnectIntegration = disconnectIntegration;
        window.testIntegration = (key) => {
          showMessage(`Testing ${integrations[key].name} connection...`, 'info');
          setTimeout(() => showMessage(`${integrations[key].name} connection successful!`, 'success'), 1000);
        };
        window.showIntegrationHelp = (key) => {
          const helpTexts = {
            googleDrive: 'To connect Google Drive, you\'ll need to authorize the application and select which folders to sync.',
            notion: 'Connect your Notion workspace to automatically create and update databases with your project and client data.',
            slack: 'Set up Slack notifications to receive updates about project milestones and deadlines.',
            gmail: 'Integrate with Gmail to create email drafts and manage client communications directly from the app.'
          };
          alert(`${integrations[key].name} Help\n\n${helpTexts[key]}`);
        };
        break;
        
      case 'backup':
        content.innerHTML = `
          <h2>💾 Backup & Restore</h2>
          <p style="color: #666; margin-bottom: 30px;">Keep your data safe with automated backups</p>
          
          <div class="hov-export-settings">
            <h3>🔄 Automatic Backup</h3>
            <div class="hov-setting-group">
              <label class="hov-setting-label">Backup Frequency</label>
              <select class="hov-setting-input">
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="manual">Manual only</option>
              </select>
            </div>
            <div class="hov-setting-group">
              <label class="hov-setting-label">Backup Location</label>
              <div class="hov-checkbox-group">
                <div class="hov-checkbox-item">
                  <input type="checkbox" class="hov-checkbox" checked>
                  <span>Local Download</span>
                </div>
                <div class="hov-checkbox-item">
                  <input type="checkbox" class="hov-checkbox">
                  <span>Google Drive</span>
                </div>
                <div class="hov-checkbox-item">
                  <input type="checkbox" class="hov-checkbox">
                  <span>GitHub Repository</span>
                </div>
              </div>
            </div>
          </div>
          
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-top: 30px;">
            <div class="hov-export-settings">
              <h3>📥 Create Backup</h3>
              <p style="color: #666; margin-bottom: 20px;">Generate a complete backup of all your data</p>
              <button class="hov-download-btn hov-preview-btn" onclick="createBackup()">
                🗜️ Create Full Backup
              </button>
            </div>
            
            <div class="hov-export-settings">
              <h3>📤 Restore from Backup</h3>
              <p style="color: #666; margin-bottom: 20px;">Upload and restore a previous backup</p>
              <input type="file" id="backup-file" accept=".json,.zip" style="margin-bottom: 15px;">
              <button class="hov-share-btn hov-preview-btn" onclick="restoreBackup()">
                🔄 Restore Backup
              </button>
            </div>
          </div>
          
          <div class="hov-export-settings" style="margin-top: 30px;">
            <h3>📊 Backup History</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="background: #f8fafc;">
                  <th style="padding: 15px; text-align: left; border-bottom: 2px solid #e2e8f0;">Date</th>
                  <th style="padding: 15px; text-align: left; border-bottom: 2px solid #e2e8f0;">Size</th>
                  <th style="padding: 15px; text-align: left; border-bottom: 2px solid #e2e8f0;">Type</th>
                  <th style="padding: 15px; text-align: left; border-bottom: 2px solid #e2e8f0;">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr style="border-bottom: 1px solid #f0f0f0;">
                  <td style="padding: 15px;">May 13, 2025 - 10:30 AM</td>
                  <td style="padding: 15px;">2.4 MB</td>
                  <td style="padding: 15px;">Full Backup</td>
                  <td style="padding: 15px;">
                    <button class="hov-copy-btn" style="padding: 6px 12px; margin-right: 8px;">Download</button>
                    <button class="hov-copy-btn" style="padding: 6px 12px;">Delete</button>
                  </td>
                </tr>
                <tr style="border-bottom: 1px solid #f0f0f0;">
                  <td style="padding: 15px;">May 12, 2025 - 10:30 AM</td>
                  <td style="padding: 15px;">2.2 MB</td>
                  <td style="padding: 15px;">Auto Backup</td>
                  <td style="padding: 15px;">
                    <button class="hov-copy-btn" style="padding: 6px 12px; margin-right: 8px;">Download</button>
                    <button class="hov-copy-btn" style="padding: 6px 12px;">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        `;
        
        // Make functions globally available
        window.createBackup = () => {
          showMessage('Creating full backup...', 'info');
          const backupData = generateExportData('backup');
          const filename = `house-of-vibes-backup-${new Date().toISOString().split('T')[0]}.json`;
          setTimeout(() => {
            downloadFile(JSON.stringify(backupData, null, 2), filename);
            showMessage('Backup created successfully!', 'success');
          }, 1500);
        };
        
        window.restoreBackup = () => {
          const fileInput = document.getElementById('backup-file');
          const file = fileInput.files[0];
          
          if (!file) {
            showMessage('Please select a backup file first', 'error');
            return;
          }
          
          showMessage('Restoring backup...', 'info');
          setTimeout(() => {
            showMessage('Backup restored successfully!', 'success');
            fileInput.value = '';
          }, 2000);
        };
        break;
    }
  }

  // Select export template and show preview
  function selectExportTemplate(templateKey) {
    const template = exportTemplates[templateKey];
    const data = generateExportData(templateKey);
    
    const previewContainer = document.getElementById('export-preview-container');
    if (!previewContainer) return;
    
    previewContainer.innerHTML = `
      <div class="hov-export-preview">
        <div class="hov-preview-header">
          <div class="hov-preview-title">📋 ${template.name} Preview</div>
        </div>
        <div class="hov-preview-content" id="preview-content">${formatExportData(data, 'JSON')}</div>
        <div class="hov-preview-actions">
          <select id="format-selector" onchange="updatePreview('${templateKey}')" style="padding: 10px; border-radius: 8px; border: 2px solid #e2e8f0; margin-right: 15px;">
            ${template.formats.map(format => `
              <option value="${format.toLowerCase()}">${format}</option>
            `).join('')}
          </select>
          <button class="hov-download-btn hov-preview-btn" onclick="downloadExport('${templateKey}')">
            💾 Download
          </button>
          <button class="hov-share-btn hov-preview-btn" onclick="shareExport('${templateKey}')">
            📤 Share
          </button>
          <button class="hov-copy-btn hov-preview-btn" onclick="copyExport('${templateKey}')">
            📋 Copy
          </button>
        </div>
      </div>
    `;
    
    // Make functions globally available
    window.updatePreview = (templateKey) => {
      const formatSelector = document.getElementById('format-selector');
      const previewContent = document.getElementById('preview-content');
      const data = generateExportData(templateKey);
      const format = formatSelector.value;
      previewContent.textContent = formatExportData(data, format);
    };
    
    window.downloadExport = (templateKey) => {
      const formatSelector = document.getElementById('format-selector');
      const format = formatSelector.value;
      const data = generateExportData(templateKey);
      const content = formatExportData(data, format);
      const timestamp = new Date().toISOString().split('T')[0];
      const filename = `hov-${templateKey}-${timestamp}.${format === 'markdown' ? 'md' : format}`;
      downloadFile(content, filename, `text/${format === 'markdown' ? 'markdown' : format}`);
      showMessage(`${template.name} downloaded successfully!`, 'success');
    };
    
    window.shareExport = (templateKey) => {
      const data = generateExportData(templateKey);
      const connectedIntegrations = Object.entries(integrations).filter(([key, integration]) => integration.connected);
      
      if (connectedIntegrations.length === 0) {
        showMessage('No integrations connected. Connect to a service first.', 'error');
        return;
      }
      
      const integration = connectedIntegrations[0][0];
      exportToIntegration(integration, data);
    };
    
    window.copyExport = (templateKey) => {
      const formatSelector = document.getElementById('format-selector');
      const format = formatSelector.value;
      const data = generateExportData(templateKey);
      const content = formatExportData(data, format);
      copyToClipboard(content);
    };
  }

  // Create export button
  function createExportButton() {
    const button = document.createElement('button');
    button.className = 'hov-export-button';
    button.innerHTML = '🔗 Export';
    
    button.onclick = (e) => {
      e.preventDefault();
      const modal = document.querySelector('.hov-export-modal');
      if (modal) {
        modal.style.display = modal.style.display === 'none' ? 'flex' : 'none';
        if (modal.style.display === 'flex') {
          updateExportView('export');
        }
      }
    };
    
    document.body.appendChild(button);
    makeDraggable(button);
    
    return button;
  }

  // Create export modal
  function createExportModal() {
    const modal = document.createElement('div');
    modal.className = 'hov-export-modal';
    
    const container = document.createElement('div');
    container.className = 'hov-export-container';
    
    const header = document.createElement('div');
    header.className = 'hov-export-header';
    
    header.innerHTML = `
      <div class="hov-export-title">🔗 Export & Integration</div>
      <button class="hov-export-close hov-clients-close">×</button>
    `;
    
    const tabs = document.createElement('div');
    tabs.className = 'hov-export-tabs';
    
    tabs.innerHTML = `
      <button class="hov-export-tab active" data-tab="export">📤 Export Data</button>
      <button class="hov-export-tab" data-tab="integrations">🔗 Integrations</button>
      <button class="hov-export-tab" data-tab="backup">💾 Backup</button>
    `;
    
    const content = document.createElement('div');
    content.className = 'hov-export-content';
    
    container.appendChild(header);
    container.appendChild(tabs);
    container.appendChild(content);
    modal.appendChild(container);
    document.body.appendChild(modal);
    
    // Make modal draggable by header
    makeDraggable(container, header);
    
    // Tab click handlers
    tabs.addEventListener('click', (e) => {
      if (e.target.classList.contains('hov-export-tab')) {
        const tabName = e.target.dataset.tab;
        switchExportTab(tabName);
      }
    });
    
    // Close modal
    header.querySelector('.hov-export-close').onclick = () => {
      modal.style.display = 'none';
    };
    
    modal.onclick = (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    };
    
    return modal;
  }

  // Initialize export extension
  function init() {
    console.log('🔗 Initializing House of Vibes Export & Integration...');
    
    // Wait for page to be ready
    setTimeout(() => {
      injectExportStyles();
      createExportButton();
      createExportModal();
      
      console.log('✅ House of Vibes Export & Integration ready!');
    }, 4500);
  }

  // Start when page loads
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
