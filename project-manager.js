// House of Vibes - Project Manager Extension
// Version 1.0 - Visual project organization

(function() {
  console.log('📊 House of Vibes Project Manager loading...');
  
  // Mock project data - organized by business
  const businesses = {
    'BrandHaus': {
      name: 'BrandHaus',
      color: '#6366f1',
      icon: '🏢',
      projects: [
        { id: 'bh1', name: 'Website Redesign', status: 'active', progress: 80, dueDate: '2025-06-15', color: '#6366f1' },
        { id: 'bh2', name: 'Brand Guidelines', status: 'completed', progress: 100, dueDate: '2025-05-20', color: '#10b981' },
        { id: 'bh3', name: 'Logo Animation', status: 'planning', progress: 20, dueDate: '2025-07-01', color: '#f59e0b' }
      ]
    },
    'Creative Studio': {
      name: 'Creative Studio',
      color: '#ec4899',
      icon: '🎨',
      projects: [
        { id: 'cs1', name: 'Client Portfolio', status: 'active', progress: 65, dueDate: '2025-06-30', color: '#ec4899' },
        { id: 'cs2', name: 'Social Media Pack', status: 'active', progress: 45, dueDate: '2025-06-10', color: '#8b5cf6' }
      ]
    },
    'Freelance': {
      name: 'Freelance Work',
      color: '#ef4444',
      icon: '💼',
      projects: [
        { id: 'fl1', name: 'AI Extension', status: 'active', progress: 90, dueDate: '2025-05-25', color: '#ef4444' },
        { id: 'fl2', name: 'Client Onboarding', status: 'planning', progress: 10, dueDate: '2025-07-15', color: '#06b6d4' }
      ]
    }
  };

  let currentBusiness = 'BrandHaus';

  // Inject project manager styles
  function injectProjectStyles() {
    const styleEl = document.createElement('style');
    styleEl.id = 'house-of-vibes-projects';
    styleEl.textContent = `
      /* House of Vibes - Project Manager Styles */
      
      /* Project manager button */
      .hov-projects-button {
        position: fixed;
        bottom: 100px;
        right: 30px;
        z-index: 9999;
        background: linear-gradient(135deg, var(--hov-primary, #6366f1) 0%, var(--hov-secondary, #ec4899) 100%);
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
      
      .hov-projects-button:hover {
        transform: scale(1.05);
        box-shadow: 0 6px 25px rgba(0,0,0,0.3);
      }
      
      /* Project manager modal */
      .hov-projects-modal {
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
      
      .hov-projects-container {
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
      
      .hov-projects-header {
        background: linear-gradient(135deg, var(--hov-primary, #6366f1) 0%, var(--hov-secondary, #ec4899) 100%);
        padding: 20px;
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: move;
      }
      
      .hov-projects-title {
        font-size: 24px;
        font-weight: bold;
        text-shadow: 1px 1px 3px rgba(0,0,0,0.3);
      }
      
      .hov-business-switcher {
        display: flex;
        gap: 10px;
        align-items: center;
      }
      
      .hov-business-btn {
        background: rgba(255,255,255,0.2);
        border: 1px solid rgba(255,255,255,0.3);
        color: white;
        padding: 8px 16px;
        border-radius: 20px;
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 14px;
      }
      
      .hov-business-btn.active {
        background: rgba(255,255,255,0.3);
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      }
      
      .hov-projects-close {
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
      
      .hov-projects-close:hover {
        background: rgba(255,255,255,0.3);
        transform: scale(1.1);
      }
      
      .hov-projects-content {
        padding: 20px;
        flex: 1;
        overflow-y: auto;
      }
      
      .hov-business-section {
        margin-bottom: 30px;
      }
      
      .hov-business-header {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 20px;
      }
      
      .hov-business-icon {
        font-size: 32px;
      }
      
      .hov-business-name {
        font-size: 22px;
        font-weight: bold;
        color: #333;
      }
      
      .hov-projects-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 20px;
      }
      
      .hov-project-card {
        background: white;
        border-radius: 15px;
        padding: 20px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        transition: all 0.3s ease;
        cursor: pointer;
        border-left: 4px solid #ddd;
      }
      
      .hov-project-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 25px rgba(0,0,0,0.15);
      }
      
      .hov-project-name {
        font-size: 18px;
        font-weight: bold;
        color: #333;
        margin-bottom: 10px;
      }
      
      .hov-project-status {
        display: inline-block;
        padding: 4px 12px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: bold;
        text-transform: uppercase;
        margin-bottom: 15px;
      }
      
      .hov-status-active {
        background: #dbeafe;
        color: #1e40af;
      }
      
      .hov-status-completed {
        background: #dcfce7;
        color: #15803d;
      }
      
      .hov-status-planning {
        background: #fef3c7;
        color: #d97706;
      }
      
      .hov-project-progress {
        margin-bottom: 15px;
      }
      
      .hov-progress-bar {
        width: 100%;
        height: 8px;
        background: #f0f0f0;
        border-radius: 4px;
        overflow: hidden;
      }
      
      .hov-progress-fill {
        height: 100%;
        transition: width 0.3s ease;
      }
      
      .hov-project-due {
        font-size: 14px;
        color: #666;
      }
      
      /* Add project button */
      .hov-add-project {
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
      
      .hov-add-project:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 15px rgba(16,185,129,0.3);
      }
    `;
    
    // Remove any existing style
    const existing = document.getElementById('house-of-vibes-projects');
    if (existing) existing.remove();
    
    document.head.appendChild(styleEl);
  }

  // Make element draggable
  function makeDraggable(element, handle = null) {
    const dragHandle = handle || element;
    let isDragging = false;
    let startX, startY;
    
    dragHandle.addEventListener('mousedown', (e) => {
      if (e.target.closest('.hov-projects-close') || e.target.closest('.hov-business-btn')) return;
      
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
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return `${Math.abs(diffDays)} days overdue`;
    } else if (diffDays === 0) {
      return 'Due today';
    } else if (diffDays === 1) {
      return 'Due tomorrow';
    } else {
      return `${diffDays} days left`;
    }
  }

  // Switch business view
  function switchBusiness(businessName) {
    currentBusiness = businessName;
    updateProjectsView();
  }

  // Update projects view
  function updateProjectsView() {
    const content = document.querySelector('.hov-projects-content');
    if (!content) return;
    
    content.innerHTML = '';
    
    // Create section for current business
    const business = businesses[currentBusiness];
    if (!business) return;
    
    const section = document.createElement('div');
    section.className = 'hov-business-section';
    
    const header = document.createElement('div');
    header.className = 'hov-business-header';
    header.innerHTML = `
      <div class="hov-business-icon">${business.icon}</div>
      <div class="hov-business-name">${business.name}</div>
    `;
    
    const grid = document.createElement('div');
    grid.className = 'hov-projects-grid';
    
    // Add projects
    business.projects.forEach(project => {
      const card = document.createElement('div');
      card.className = 'hov-project-card';
      card.style.borderLeftColor = project.color;
      
      card.innerHTML = `
        <div class="hov-project-name">${project.name}</div>
        <div class="hov-project-status hov-status-${project.status}">${project.status}</div>
        <div class="hov-project-progress">
          <div class="hov-progress-bar">
            <div class="hov-progress-fill" style="width: ${project.progress}%; background: ${project.color};"></div>
          </div>
          <div style="margin-top: 8px; color: #666; font-size: 14px;">${project.progress}% complete</div>
        </div>
        <div class="hov-project-due">${formatDate(project.dueDate)}</div>
      `;
      
      card.onclick = () => {
        alert(`📋 Opening project: ${project.name}\n\nStatus: ${project.status}\nProgress: ${project.progress}%\nDue: ${project.dueDate}\n\nThis would open the project details!`);
      };
      
      grid.appendChild(card);
    });
    
    // Add "Add Project" button
    const addBtn = document.createElement('button');
    addBtn.className = 'hov-add-project';
    addBtn.innerHTML = '+ Add New Project';
    addBtn.onclick = () => {
      alert(`➕ Adding new project to ${business.name}\n\nThis would open a project creation form!`);
    };
    
    section.appendChild(header);
    section.appendChild(grid);
    section.appendChild(addBtn);
    content.appendChild(section);
  }

  // Create project manager button
  function createProjectsButton() {
    const button = document.createElement('button');
    button.className = 'hov-projects-button';
    button.innerHTML = '📊 Projects';
    
    button.onclick = (e) => {
      e.preventDefault();
      const modal = document.querySelector('.hov-projects-modal');
      if (modal) {
        modal.style.display = modal.style.display === 'none' ? 'flex' : 'none';
        if (modal.style.display === 'flex') {
          updateProjectsView();
        }
      }
    };
    
    document.body.appendChild(button);
    makeDraggable(button);
    
    return button;
  }

  // Create project manager modal
  function createProjectsModal() {
    const modal = document.createElement('div');
    modal.className = 'hov-projects-modal';
    
    const container = document.createElement('div');
    container.className = 'hov-projects-container';
    
    const header = document.createElement('div');
    header.className = 'hov-projects-header';
    
    const titleSection = document.createElement('div');
    titleSection.innerHTML = '<div class="hov-projects-title">📊 Project Manager</div>';
    
    const businessSwitcher = document.createElement('div');
    businessSwitcher.className = 'hov-business-switcher';
    
    // Create business buttons
    Object.keys(businesses).forEach(businessName => {
      const btn = document.createElement('button');
      btn.className = `hov-business-btn ${businessName === currentBusiness ? 'active' : ''}`;
      btn.innerHTML = `${businesses[businessName].icon} ${businessName}`;
      btn.onclick = () => {
        // Update active state
        businessSwitcher.querySelectorAll('.hov-business-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        switchBusiness(businessName);
      };
      businessSwitcher.appendChild(btn);
    });
    
    const closeBtn = document.createElement('button');
    closeBtn.className = 'hov-projects-close';
    closeBtn.innerHTML = '×';
    closeBtn.onclick = () => {
      modal.style.display = 'none';
    };
    
    header.appendChild(titleSection);
    header.appendChild(businessSwitcher);
    header.appendChild(closeBtn);
    
    const content = document.createElement('div');
    content.className = 'hov-projects-content';
    
    container.appendChild(header);
    container.appendChild(content);
    modal.appendChild(container);
    document.body.appendChild(modal);
    
    // Make modal draggable by header
    makeDraggable(container, header);
    
    // Close modal on backdrop click
    modal.onclick = (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    };
    
    return modal;
  }

  // Initialize project manager extension
  function init() {
    console.log('📊 Initializing House of Vibes Project Manager...');
    
    // Wait for page to be ready
    setTimeout(() => {
      injectProjectStyles();
      createProjectsButton();
      createProjectsModal();
      
      console.log('✅ House of Vibes Project Manager ready!');
    }, 2000);
  }

  // Start when page loads
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
