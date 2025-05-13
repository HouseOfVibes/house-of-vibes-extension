// House of Vibes - Client Manager Extension
// Version 1.0 - Visual client management

(function() {
  console.log('👥 House of Vibes Client Manager loading...');
  
  // Mock client data - organized by status
  const clients = {
    active: [
      {
        id: 'client1',
        name: 'Sarah Johnson',
        company: 'TechFlow Solutions',
        email: 'sarah@techflow.com',
        phone: '(555) 123-4567',
        status: 'active',
        projects: 2,
        lastContact: '2025-05-10',
        value: '$45,000',
        avatar: '👩‍💼',
        notes: 'Loves minimalist designs. Prefers email communication. Has tight deadlines.',
        theme: 'ocean'
      },
      {
        id: 'client2',
        name: 'Michael Chen',
        company: 'Creative Labs',
        email: 'm.chen@creativelabs.io',
        phone: '(555) 987-6543',
        status: 'active',
        projects: 1,
        lastContact: '2025-05-11',
        value: '$28,000',
        avatar: '👨‍💻',
        notes: 'Very collaborative. Likes frequent check-ins. Budget conscious.',
        theme: 'energy'
      },
      {
        id: 'client3',
        name: 'Emma Rodriguez',
        company: 'Green Earth Co.',
        email: 'emma.r@greenearth.com',
        phone: '(555) 456-7890',
        status: 'active',
        projects: 3,
        lastContact: '2025-05-09',
        value: '$67,000',
        avatar: '🌱',
        notes: 'Sustainability focused. Quick decision maker. Values long-term partnerships.',
        theme: 'spring'
      }
    ],
    potential: [
      {
        id: 'client4',
        name: 'David Kim',
        company: 'Startup Innovations',
        email: 'david@startupinno.com',
        phone: '(555) 234-5678',
        status: 'potential',
        projects: 0,
        lastContact: '2025-05-12',
        value: '$12,000',
        avatar: '🚀',
        notes: 'Early stage startup. Interested in brand development. Budget limited.',
        theme: 'action'
      },
      {
        id: 'client5',
        name: 'Lisa Wilson',
        company: 'Wellness Center',
        email: 'lisa@wellnessctr.com',
        phone: '(555) 345-6789',
        status: 'potential',
        projects: 0,
        lastContact: '2025-05-08',
        value: '$22,000',
        avatar: '🧘‍♀️',
        notes: 'Looking for calming design. Health & wellness industry. Interested in holistic approach.',
        theme: 'calm'
      }
    ],
    completed: [
      {
        id: 'client6',
        name: 'Robert Davis',
        company: 'Media Group',
        email: 'r.davis@mediagroup.net',
        phone: '(555) 567-8901',
        status: 'completed',
        projects: 1,
        lastContact: '2025-04-28',
        value: '$33,000',
        avatar: '📺',
        notes: 'Project completed successfully. Great testimonial. May return for Phase 2.',
        theme: 'professional'
      }
    ]
  };

  let activeClient = null;

  // Inject client manager styles
  function injectClientStyles() {
    const styleEl = document.createElement('style');
    styleEl.id = 'house-of-vibes-clients';
    styleEl.textContent = `
      /* House of Vibes - Client Manager Styles */
      
      /* Client manager button */
      .hov-clients-button {
        position: fixed;
        bottom: 170px;
        right: 30px;
        z-index: 9999;
        background: linear-gradient(135deg, var(--hov-primary, #8b5cf6) 0%, var(--hov-secondary, #ec4899) 100%);
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
      
      .hov-clients-button:hover {
        transform: scale(1.05);
        box-shadow: 0 6px 25px rgba(0,0,0,0.3);
      }
      
      /* Client manager modal */
      .hov-clients-modal {
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
      
      .hov-clients-container {
        background: white;
        border-radius: 20px;
        width: 95vw;
        max-width: 1400px;
        height: 85vh;
        max-height: 800px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }
      
      .hov-clients-header {
        background: linear-gradient(135deg, var(--hov-primary, #8b5cf6) 0%, var(--hov-secondary, #ec4899) 100%);
        padding: 20px;
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: move;
      }
      
      .hov-clients-title {
        font-size: 24px;
        font-weight: bold;
        text-shadow: 1px 1px 3px rgba(0,0,0,0.3);
      }
      
      .hov-clients-close {
        background: rgba(255,255,255,0.2);
        border: none;
        color: white;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        font-size: 20px;
        cursor: pointer;
        transition: all 0.3s ease;
      }
      
      .hov-clients-close:hover {
        background: rgba(255,255,255,0.3);
        transform: scale(1.1);
      }
      
      .hov-clients-tabs {
        display: flex;
        background: #f8fafc;
        border-bottom: 1px solid #e2e8f0;
      }
      
      .hov-clients-tab {
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
      
      .hov-clients-tab.active {
        background: white;
        color: var(--hov-primary, #8b5cf6);
        border-bottom: 3px solid var(--hov-primary, #8b5cf6);
      }
      
      .hov-clients-content {
        padding: 20px;
        flex: 1;
        overflow-y: auto;
      }
      
      .hov-clients-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
        gap: 20px;
      }
      
      .hov-client-card {
        background: white;
        border-radius: 15px;
        padding: 20px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.08);
        transition: all 0.3s ease;
        cursor: pointer;
        border: 2px solid #f0f0f0;
        position: relative;
      }
      
      .hov-client-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 25px rgba(0,0,0,0.12);
        border-color: var(--hov-primary, #8b5cf6);
      }
      
      .hov-client-header {
        display: flex;
        align-items: center;
        gap: 15px;
        margin-bottom: 15px;
      }
      
      .hov-client-avatar {
        font-size: 48px;
        width: 60px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background: #f0f0f0;
      }
      
      .hov-client-info {
        flex: 1;
      }
      
      .hov-client-name {
        font-size: 20px;
        font-weight: bold;
        color: #333;
        margin-bottom: 5px;
      }
      
      .hov-client-company {
        font-size: 16px;
        color: #666;
      }
      
      .hov-client-status {
        position: absolute;
        top: 15px;
        right: 15px;
        padding: 4px 12px;
        border-radius: 20px;
        font-size: 11px;
        font-weight: bold;
        text-transform: uppercase;
      }
      
      .hov-status-active {
        background: #dbeafe;
        color: #1e40af;
      }
      
      .hov-status-potential {
        background: #fef3c7;
        color: #d97706;
      }
      
      .hov-status-completed {
        background: #dcfce7;
        color: #15803d;
      }
      
      .hov-client-details {
        margin-top: 15px;
      }
      
      .hov-client-detail {
        display: flex;
        justify-content: space-between;
        margin-bottom: 8px;
        font-size: 14px;
      }
      
      .hov-client-detail-label {
        color: #666;
      }
      
      .hov-client-detail-value {
        font-weight: 500;
        color: #333;
      }
      
      .hov-client-notes {
        margin-top: 15px;
        padding: 12px;
        background: #f8fafc;
        border-radius: 8px;
        font-size: 14px;
        color: #555;
        line-height: 1.5;
      }
      
      .hov-client-actions {
        margin-top: 15px;
        display: flex;
        gap: 10px;
      }
      
      .hov-client-action {
        flex: 1;
        padding: 8px 16px;
        border-radius: 8px;
        border: none;
        font-size: 13px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s ease;
      }
      
      .hov-action-primary {
        background: var(--hov-primary, #8b5cf6);
        color: white;
      }
      
      .hov-action-secondary {
        background: #f1f5f9;
        color: #475569;
      }
      
      .hov-action-primary:hover {
        background: #7c3aed;
      }
      
      .hov-action-secondary:hover {
        background: #e2e8f0;
      }
      
      /* Client detail modal */
      .hov-client-detail-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.6);
        backdrop-filter: blur(15px);
        z-index: 10002;
        display: none;
        align-items: center;
        justify-content: center;
      }
      
      .hov-client-detail-container {
        background: white;
        border-radius: 20px;
        width: 90%;
        max-width: 600px;
        height: 70%;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      }
      
      .hov-client-detail-header {
        background: linear-gradient(135deg, var(--hov-primary, #8b5cf6) 0%, var(--hov-secondary, #ec4899) 100%);
        padding: 20px;
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      
      .hov-client-detail-content {
        padding: 30px;
        flex: 1;
        overflow-y: auto;
      }
      
      /* Add client button */
      .hov-add-client {
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        color: white;
        border: none;
        padding: 15px 25px;
        border-radius: 50px;
        cursor: pointer;
        font-size: 16px;
        font-weight: bold;
        margin-top: 20px;
        transition: all 0.3s ease;
      }
      
      .hov-add-client:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 15px rgba(16,185,129,0.3);
      }
    `;
    
    // Remove any existing style
    const existing = document.getElementById('house-of-vibes-clients');
    if (existing) existing.remove();
    
    document.head.appendChild(styleEl);
  }

  // Make element draggable
  function makeDraggable(element, handle = null) {
    const dragHandle = handle || element;
    let isDragging = false;
    let startX, startY;
    
    dragHandle.addEventListener('mousedown', (e) => {
      if (e.target.closest('.hov-clients-close') || e.target.closest('.hov-clients-tab')) return;
      
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

  // Format date for display
  function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  }

  // Show client details
  function showClientDetails(client) {
    // Remove existing modal if any
    const existing = document.querySelector('.hov-client-detail-modal');
    if (existing) existing.remove();
    
    const modal = document.createElement('div');
    modal.className = 'hov-client-detail-modal';
    modal.style.display = 'flex';
    
    // Apply client's preferred theme
    const themes = {
      ocean: { primary: '#4ec5d4', secondary: '#72c6ef' },
      energy: { primary: '#e74c3c', secondary: '#f39c12' },
      spring: { primary: '#00b894', secondary: '#6c5ce7' },
      action: { primary: '#059669', secondary: '#047857' },
      calm: { primary: '#8e44ad', secondary: '#d7bde2' },
      professional: { primary: '#1e3a8a', secondary: '#fbbf24' }
    };
    
    const clientTheme = themes[client.theme] || themes.ocean;
    
    modal.innerHTML = `
      <div class="hov-client-detail-container">
        <div class="hov-client-detail-header" style="background: linear-gradient(135deg, ${clientTheme.primary} 0%, ${clientTheme.secondary} 100%);">
          <div>
            <h3>${client.avatar} ${client.name}</h3>
            <p style="margin: 5px 0; opacity: 0.9;">${client.company}</p>
          </div>
          <button class="hov-clients-close">×</button>
        </div>
        <div class="hov-client-detail-content">
          <h4>Contact Information</h4>
          <p><strong>Email:</strong> ${client.email}</p>
          <p><strong>Phone:</strong> ${client.phone}</p>
          <p><strong>Status:</strong> <span class="hov-client-status hov-status-${client.status}">${client.status}</span></p>
          
          <h4 style="margin-top: 25px;">Project Details</h4>
          <p><strong>Active Projects:</strong> ${client.projects}</p>
          <p><strong>Total Value:</strong> ${client.value}</p>
          <p><strong>Last Contact:</strong> ${formatDate(client.lastContact)}</p>
          
          <h4 style="margin-top: 25px;">Notes</h4>
          <div class="hov-client-notes" style="background: ${clientTheme.primary}15;">
            ${client.notes}
          </div>
          
          <div style="margin-top: 30px;">
            <button class="hov-client-action hov-action-primary" onclick="alert('📧 Sending email to ${client.name}')">Send Email</button>
            <button class="hov-client-action hov-action-primary" onclick="alert('📞 Calling ${client.name}')">Call Client</button>
            <button class="hov-client-action hov-action-secondary" onclick="alert('📝 Creating new note for ${client.name}')">Add Note</button>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal
    modal.querySelector('.hov-clients-close').onclick = () => {
      modal.remove();
    };
    
    modal.onclick = (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    };
  }

  // Switch tab view
  function switchTab(tabName) {
    // Update active tab
    document.querySelectorAll('.hov-clients-tab').forEach(tab => {
      tab.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    
    // Update content
    updateClientsView(tabName);
  }

  // Update clients view
  function updateClientsView(status = 'active') {
    const content = document.querySelector('.hov-clients-content');
    if (!content) return;
    
    content.innerHTML = '';
    
    const grid = document.createElement('div');
    grid.className = 'hov-clients-grid';
    
    // Add clients for the selected status
    if (clients[status]) {
      clients[status].forEach(client => {
        const card = document.createElement('div');
        card.className = 'hov-client-card';
        
        card.innerHTML = `
          <div class="hov-client-status hov-status-${client.status}">${client.status}</div>
          <div class="hov-client-header">
            <div class="hov-client-avatar">${client.avatar}</div>
            <div class="hov-client-info">
              <div class="hov-client-name">${client.name}</div>
              <div class="hov-client-company">${client.company}</div>
            </div>
          </div>
          <div class="hov-client-details">
            <div class="hov-client-detail">
              <span class="hov-client-detail-label">Email:</span>
              <span class="hov-client-detail-value">${client.email}</span>
            </div>
            <div class="hov-client-detail">
              <span class="hov-client-detail-label">Projects:</span>
              <span class="hov-client-detail-value">${client.projects}</span>
            </div>
            <div class="hov-client-detail">
              <span class="hov-client-detail-label">Value:</span>
              <span class="hov-client-detail-value">${client.value}</span>
            </div>
            <div class="hov-client-detail">
              <span class="hov-client-detail-label">Last Contact:</span>
              <span class="hov-client-detail-value">${formatDate(client.lastContact)}</span>
            </div>
          </div>
          <div class="hov-client-notes">${client.notes}</div>
          <div class="hov-client-actions">
            <button class="hov-client-action hov-action-primary">View Details</button>
            <button class="hov-client-action hov-action-secondary">Quick Note</button>
          </div>
        `;
        
        // Add click handlers
        card.querySelector('.hov-action-primary').onclick = (e) => {
          e.stopPropagation();
          showClientDetails(client);
        };
        
        card.querySelector('.hov-action-secondary').onclick = (e) => {
          e.stopPropagation();
          alert(`📝 Adding quick note for ${client.name}\n\nThis would open a note-taking interface!`);
        };
        
        card.onclick = () => {
          showClientDetails(client);
        };
        
        grid.appendChild(card);
      });
    }
    
    // Add "Add Client" button
    if (status === 'active' || status === 'potential') {
      const addBtn = document.createElement('button');
      addBtn.className = 'hov-add-client';
      addBtn.innerHTML = '+ Add New Client';
      addBtn.onclick = () => {
        alert(`➕ Adding new ${status} client\n\nThis would open a client creation form!`);
      };
      grid.appendChild(addBtn);
    }
    
    content.appendChild(grid);
  }

  // Create clients button
  function createClientsButton() {
    const button = document.createElement('button');
    button.className = 'hov-clients-button';
    button.innerHTML = '👥 Clients';
    
    button.onclick = (e) => {
      e.preventDefault();
      const modal = document.querySelector('.hov-clients-modal');
      if (modal) {
        modal.style.display = modal.style.display === 'none' ? 'flex' : 'none';
        if (modal.style.display === 'flex') {
          updateClientsView('active');
        }
      }
    };
    
    document.body.appendChild(button);
    makeDraggable(button);
    
    return button;
  }

  // Create clients modal
  function createClientsModal() {
    const modal = document.createElement('div');
    modal.className = 'hov-clients-modal';
    
    const container = document.createElement('div');
    container.className = 'hov-clients-container';
    
    const header = document.createElement('div');
    header.className = 'hov-clients-header';
    
    header.innerHTML = `
      <div class="hov-clients-title">👥 Client Manager</div>
      <button class="hov-clients-close">×</button>
    `;
    
    const tabs = document.createElement('div');
    tabs.className = 'hov-clients-tabs';
    
    tabs.innerHTML = `
      <button class="hov-clients-tab active" data-tab="active">Active Clients (${clients.active.length})</button>
      <button class="hov-clients-tab" data-tab="potential">Potential (${clients.potential.length})</button>
      <button class="hov-clients-tab" data-tab="completed">Completed (${clients.completed.length})</button>
    `;
    
    const content = document.createElement('div');
    content.className = 'hov-clients-content';
    
    container.appendChild(header);
    container.appendChild(tabs);
    container.appendChild(content);
    modal.appendChild(container);
    document.body.appendChild(modal);
    
    // Make modal draggable by header
    makeDraggable(container, header);
    
    // Tab click handlers
    tabs.addEventListener('click', (e) => {
      if (e.target.classList.contains('hov-clients-tab')) {
        const tabName = e.target.dataset.tab;
        switchTab(tabName);
      }
    });
    
    // Close modal
    header.querySelector('.hov-clients-close').onclick = () => {
      modal.style.display = 'none';
    };
    
    modal.onclick = (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    };
    
    return modal;
  }

  // Initialize client manager extension
  function init() {
    console.log('👥 Initializing House of Vibes Client Manager...');
    
    // Wait for page to be ready
    setTimeout(() => {
      injectClientStyles();
      createClientsButton();
      createClientsModal();
      
      console.log('✅ House of Vibes Client Manager ready!');
    }, 2500);
  }

  // Start when page loads
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
