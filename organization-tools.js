// House of Vibes - Advanced Organization Extension
// Version 1.0 - Smart connections and organization

(function() {
  console.log('🧠 House of Vibes Advanced Organization loading...');
  
  // Smart tags for different content types
  const smartTags = {
    projects: ['urgent', 'design', 'development', 'client-review', 'brainstorming', 'completed'],
    clients: ['vip', 'new', 'returning', 'high-value', 'low-maintenance', 'collaboration-heavy'],
    files: ['draft', 'final', 'archived', 'needs-review', 'reference', 'template'],
    tasks: ['pending', 'in-progress', 'blocked', 'waiting', 'done'],
    priority: ['low', 'medium', 'high', 'critical'],
    energy: ['morning-task', 'afternoon-task', 'evening-task', 'high-energy', 'low-energy']
  };
  
  // Mock connections between different elements
  const connections = [
    { type: 'project-client', from: 'Website Redesign', to: 'Sarah Johnson', strength: 95 },
    { type: 'project-file', from: 'Brand Guidelines', to: 'logo-design.ai', strength: 88 },
    { type: 'client-file', from: 'Emma Rodriguez', to: 'green-branding.pdf', strength: 92 },
    { type: 'task-project', from: 'Review mockups', to: 'Creative Portfolio', strength: 85 },
    { type: 'project-task', from: 'AI Extension', to: 'Implement themes', strength: 78 }
  ];
  
  // Goals tracking
  let goals = [
    { 
      id: 1, 
      title: 'Complete 3 Client Projects', 
      deadline: '2025-06-30', 
      progress: 67,
      category: 'business',
      connectedProjects: ['Website Redesign', 'Brand Guidelines'],
      milestones: [
        { name: 'Project 1: Wire-frames', completed: true },
        { name: 'Project 2: Design Phase', completed: true },
        { name: 'Project 3: Client Review', completed: false }
      ]
    },
    {
      id: 2,
      title: 'Grow Client Base by 25%',
      deadline: '2025-08-01',
      progress: 40,
      category: 'growth',
      connectedClients: ['David Kim', 'Lisa Wilson'],
      milestones: [
        { name: 'Reach out to 20 prospects', completed: true },
        { name: 'Convert 5 prospects', completed: false },
        { name: 'Onboard new clients', completed: false }
      ]
    },
    {
      id: 3,
      title: 'Organize All Project Files',
      deadline: '2025-05-31',
      progress: 80,
      category: 'organization',
      connectedItems: 85,
      milestones: [
        { name: 'Audit existing files', completed: true },
        { name: 'Create new structure', completed: true },
        { name: 'Migrate all files', completed: false }
      ]
    }
  ];

  // Inject organization styles
  function injectOrganizationStyles() {
    const styleEl = document.createElement('style');
    styleEl.id = 'house-of-vibes-organization';
    styleEl.textContent = `
      /* House of Vibes - Advanced Organization Styles */
      
      /* Organization button */
      .hov-organization-button {
        position: fixed;
        bottom: 310px;
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
      
      .hov-organization-button:hover {
        transform: scale(1.05);
        box-shadow: 0 6px 25px rgba(0,0,0,0.3);
      }
      
      /* Organization modal */
      .hov-organization-modal {
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
      
      .hov-organization-container {
        background: white;
        border-radius: 20px;
        width: 98vw;
        max-width: 1600px;
        height: 90vh;
        max-height: 900px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }
      
      .hov-organization-header {
        background: linear-gradient(135deg, var(--hov-primary, #6366f1) 0%, var(--hov-secondary, #8b5cf6) 100%);
        padding: 20px;
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: move;
      }
      
      .hov-organization-title {
        font-size: 24px;
        font-weight: bold;
        text-shadow: 1px 1px 3px rgba(0,0,0,0.3);
      }
      
      .hov-organization-tabs {
        display: flex;
        background: #f8fafc;
        border-bottom: 1px solid #e2e8f0;
      }
      
      .hov-organization-tab {
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
      
      .hov-organization-tab.active {
        background: white;
        color: var(--hov-primary, #6366f1);
        border-bottom: 3px solid var(--hov-primary, #6366f1);
      }
      
      .hov-organization-content {
        padding: 30px;
        flex: 1;
        overflow-y: auto;
      }
      
      /* Smart Search */
      .hov-smart-search {
        position: relative;
        margin-bottom: 30px;
      }
      
      .hov-search-input {
        width: 100%;
        padding: 15px 50px 15px 20px;
        border: 2px solid var(--hov-primary, #6366f1);
        border-radius: 25px;
        font-size: 16px;
        background: white;
        box-shadow: 0 2px 10px rgba(0,0,0,0.05);
      }
      
      .hov-search-icon {
        position: absolute;
        right: 15px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 24px;
        color: var(--hov-primary, #6366f1);
      }
      
      .hov-search-results {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        display: none;
        max-height: 400px;
        overflow-y: auto;
        z-index: 1000;
      }
      
      .hov-search-result {
        padding: 15px 20px;
        border-bottom: 1px solid #f0f0f0;
        cursor: pointer;
        transition: all 0.2s ease;
      }
      
      .hov-search-result:hover {
        background: #f8fafc;
      }
      
      .hov-search-result-type {
        color: var(--hov-primary, #6366f1);
        font-size: 12px;
        font-weight: 600;
        text-transform: uppercase;
      }
      
      .hov-search-result-title {
        font-weight: 600;
        margin: 5px 0;
      }
      
      .hov-search-result-context {
        color: #666;
        font-size: 14px;
      }
      
      /* Goals Tracking */
      .hov-goals-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        gap: 25px;
        margin-top: 20px;
      }
      
      .hov-goal-card {
        background: white;
        border-radius: 20px;
        padding: 25px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.08);
        transition: all 0.3s ease;
        border-left: 5px solid var(--hov-primary, #6366f1);
      }
      
      .hov-goal-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 25px rgba(0,0,0,0.12);
      }
      
      .hov-goal-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 20px;
      }
      
      .hov-goal-title {
        font-size: 20px;
        font-weight: bold;
        color: #333;
        flex: 1;
      }
      
      .hov-goal-category {
        background: var(--hov-primary, #6366f1);
        color: white;
        padding: 4px 12px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: 600;
        text-transform: uppercase;
      }
      
      .hov-goal-progress {
        margin-bottom: 20px;
      }
      
      .hov-progress-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
      }
      
      .hov-progress-bar {
        width: 100%;
        height: 12px;
        background: #e5e7eb;
        border-radius: 6px;
        overflow: hidden;
      }
      
      .hov-progress-fill {
        height: 100%;
        background: linear-gradient(90deg, var(--hov-primary, #6366f1) 0%, var(--hov-secondary, #8b5cf6) 100%);
        border-radius: 6px;
        transition: width 0.5s ease;
      }
      
      .hov-goal-deadline {
        color: #666;
        font-size: 14px;
        margin-bottom: 15px;
      }
      
      .hov-goal-milestones {
        margin-top: 20px;
      }
      
      .hov-milestone {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 0;
        border-bottom: 1px solid #f0f0f0;
      }
      
      .hov-milestone-checkbox {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #e5e7eb;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s ease;
      }
      
      .hov-milestone-checkbox.completed {
        background: var(--hov-primary, #6366f1);
        color: white;
      }
      
      .hov-milestone-text {
        flex: 1;
        color: #333;
      }
      
      .hov-milestone-text.completed {
        text-decoration: line-through;
        color: #999;
      }
      
      /* Connections Visualizer */
      .hov-connections-container {
        background: #f8fafc;
        border-radius: 15px;
        padding: 20px;
        margin-top: 20px;
      }
      
      .hov-connection-node {
        background: white;
        border-radius: 10px;
        padding: 15px;
        margin: 10px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        display: inline-block;
        transition: all 0.3s ease;
        cursor: pointer;
      }
      
      .hov-connection-node:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
      }
      
      .hov-connection-type {
        font-size: 12px;
        color: var(--hov-primary, #6366f1);
        font-weight: 600;
        text-transform: uppercase;
      }
      
      .hov-connection-strength {
        width: 100%;
        height: 4px;
        background: #e5e7eb;
        border-radius: 2px;
        margin: 8px 0;
        overflow: hidden;
      }
      
      .hov-connection-strength-fill {
        height: 100%;
        background: linear-gradient(90deg, var(--hov-primary, #6366f1) 0%, var(--hov-secondary, #8b5cf6) 100%);
        border-radius: 2px;
      }
      
      /* Auto-archive suggestions */
      .hov-archive-suggestions {
        background: #fef3c7;
        border-radius: 15px;
        padding: 20px;
        margin-top: 20px;
        border-left: 5px solid #f59e0b;
      }
      
      .hov-archive-item {
        background: white;
        border-radius: 10px;
        padding: 15px;
        margin: 10px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0 2px 8px rgba(0,0,0,0.05);
      }
      
      .hov-archive-info {
        flex: 1;
      }
      
      .hov-archive-actions {
        display: flex;
        gap: 10px;
      }
      
      .hov-archive-btn {
        padding: 6px 12px;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
        transition: all 0.3s ease;
      }
      
      .hov-archive-btn.primary {
        background: var(--hov-primary, #6366f1);
        color: white;
      }
      
      .hov-archive-btn.secondary {
        background: #f1f5f9;
        color: #475569;
      }
      
      /* Smart tags */
      .hov-tag-suggestions {
        background: #f0f9ff;
        border-radius: 15px;
        padding: 20px;
        margin-bottom: 20px;
        border-left: 5px solid #0ea5e9;
      }
      
      .hov-tag-group {
        margin-bottom: 15px;
      }
      
      .hov-tag-label {
        font-weight: 600;
        color: #333;
        margin-bottom: 8px;
      }
      
      .hov-tag-list {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }
      
      .hov-tag {
        background: white;
        color: #333;
        padding: 6px 12px;
        border-radius: 20px;
        font-size: 14px;
        cursor: pointer;
        transition: all 0.3s ease;
        border: 2px solid #e5e7eb;
      }
      
      .hov-tag:hover,
      .hov-tag.selected {
        background: var(--hov-primary, #6366f1);
        color: white;
        border-color: var(--hov-primary, #6366f1);
      }
      
      /* Add goal button */
      .hov-add-goal {
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        color: white;
        border: none;
        padding: 15px 30px;
        border-radius: 50px;
        cursor: pointer;
        font-size: 16px;
        font-weight: bold;
        margin-top: 20px;
        transition: all 0.3s ease;
      }
      
      .hov-add-goal:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 15px rgba(16,185,129,0.3);
      }
    `;
    
    // Remove any existing style
    const existing = document.getElementById('house-of-vibes-organization');
    if (existing) existing.remove();
    
    document.head.appendChild(styleEl);
  }

  // Make element draggable
  function makeDraggable(element, handle = null) {
    const dragHandle = handle || element;
    let isDragging = false;
    let startX, startY;
    
    dragHandle.addEventListener('mousedown', (e) => {
      if (e.target.closest('.hov-organization-close') || e.target.closest('.hov-organization-tab')) return;
      
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

  // Smart search functionality
  function setupSmartSearch() {
    const searchInput = document.querySelector('.hov-search-input');
    const searchResults = document.querySelector('.hov-search-results');
    
    if (!searchInput || !searchResults) return;
    
    // Mock search data (in real implementation, this would search across all extensions)
    const searchData = [
      { type: 'project', title: 'Website Redesign', context: 'Client: Sarah Johnson - 80% complete' },
      { type: 'client', title: 'Emma Rodriguez', context: 'Green Earth Co. - 3 active projects' },
      { type: 'file', title: 'logo-design.ai', context: 'Brand Guidelines project - Last modified yesterday' },
      { type: 'task', title: 'Review mockups', context: 'Creative Portfolio - Due in 2 days' },
      { type: 'goal', title: 'Complete 3 Client Projects', context: '67% complete - Deadline: June 30' },
      { type: 'note', title: 'Meeting notes with David', context: 'Startup Innovations - Budget discussion' }
    ];
    
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      
      if (query.length < 2) {
        searchResults.style.display = 'none';
        return;
      }
      
      const results = searchData.filter(item => 
        item.title.toLowerCase().includes(query) || 
        item.context.toLowerCase().includes(query)
      );
      
      if (results.length > 0) {
        searchResults.innerHTML = results.map(result => `
          <div class="hov-search-result">
            <div class="hov-search-result-type">${result.type}</div>
            <div class="hov-search-result-title">${highlightMatch(result.title, query)}</div>
            <div class="hov-search-result-context">${highlightMatch(result.context, query)}</div>
          </div>
        `).join('');
        searchResults.style.display = 'block';
      } else {
        searchResults.style.display = 'none';
      }
    });
    
    // Close search results when clicking outside
    document.addEventListener('click', (e) => {
      if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
        searchResults.style.display = 'none';
      }
    });
  }

  // Highlight search matches
  function highlightMatch(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<strong style="background: #fef3c7;">$1</strong>');
  }

  // Toggle milestone completion
  function toggleMilestone(goalId, milestoneIndex) {
    const goal = goals.find(g => g.id === goalId);
    if (goal && goal.milestones[milestoneIndex]) {
      goal.milestones[milestoneIndex].completed = !goal.milestones[milestoneIndex].completed;
      
      // Recalculate progress
      const completedMilestones = goal.milestones.filter(m => m.completed).length;
      goal.progress = Math.round((completedMilestones / goal.milestones.length) * 100);
      
      updateOrganizationView('goals');
    }
  }

  // Switch tab view
  function switchOrganizationTab(tabName) {
    // Update active tab
    document.querySelectorAll('.hov-organization-tab').forEach(tab => {
      tab.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    
    // Update content
    updateOrganizationView(tabName);
  }

  // Update organization view
  function updateOrganizationView(tab) {
    const content = document.querySelector('.hov-organization-content');
    if (!content) return;
    
    content.innerHTML = '';
    
    switch (tab) {
      case 'search':
        content.innerHTML = `
          <div class="hov-smart-search">
            <input type="text" class="hov-search-input" placeholder="Search projects, clients, files, tasks...">
            <div class="hov-search-icon">🔍</div>
            <div class="hov-search-results"></div>
          </div>
          
          <div class="hov-tag-suggestions">
            <h3>🏷️ Smart Tag Suggestions</h3>
            <p style="color: #666; margin-bottom: 20px;">AI-powered tags to organize your content</p>
            
            <div class="hov-tag-group">
              <div class="hov-tag-label">Project Tags:</div>
              <div class="hov-tag-list">
                ${smartTags.projects.map(tag => `<div class="hov-tag">${tag}</div>`).join('')}
              </div>
            </div>
            
            <div class="hov-tag-group">
              <div class="hov-tag-label">Client Tags:</div>
              <div class="hov-tag-list">
                ${smartTags.clients.map(tag => `<div class="hov-tag">${tag}</div>`).join('')}
              </div>
            </div>
            
            <div class="hov-tag-group">
              <div class="hov-tag-label">File Tags:</div>
              <div class="hov-tag-list">
                ${smartTags.files.map(tag => `<div class="hov-tag">${tag}</div>`).join('')}
              </div>
            </div>
          </div>
        `;
        
        setupSmartSearch();
        
        // Add tag click handlers
        content.querySelectorAll('.hov-tag').forEach(tag => {
          tag.addEventListener('click', () => {
            tag.classList.toggle('selected');
            console.log(`Tag ${tag.textContent} ${tag.classList.contains('selected') ? 'selected' : 'deselected'}`);
          });
        });
        break;
        
      case 'goals':
        content.innerHTML = `
          <h2>🎯 Goal Tracking</h2>
          <p style="color: #666; margin-bottom: 30px;">Track your progress and stay motivated</p>
          
          <div class="hov-goals-grid">
            ${goals.map(goal => `
              <div class="hov-goal-card">
                <div class="hov-goal-header">
                  <div class="hov-goal-title">${goal.title}</div>
                  <div class="hov-goal-category">${goal.category}</div>
                </div>
                
                <div class="hov-goal-progress">
                  <div class="hov-progress-header">
                    <span>Progress</span>
                    <span>${goal.progress}%</span>
                  </div>
                  <div class="hov-progress-bar">
                    <div class="hov-progress-fill" style="width: ${goal.progress}%"></div>
                  </div>
                </div>
                
                <div class="hov-goal-deadline">⏰ ${formatDate(goal.deadline)}</div>
                
                <div class="hov-goal-milestones">
                  <strong>Milestones:</strong>
                  ${goal.milestones.map((milestone, index) => `
                    <div class="hov-milestone">
                      <div class="hov-milestone-checkbox ${milestone.completed ? 'completed' : ''}" 
                           onclick="toggleMilestone(${goal.id}, ${index})">
                        ${milestone.completed ? '✓' : ''}
                      </div>
                      <div class="hov-milestone-text ${milestone.completed ? 'completed' : ''}">
                        ${milestone.name}
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>
            `).join('')}
          </div>
          
          <button class="hov-add-goal" onclick="alert('➕ Add New Goal\\n\\nThis would open a goal creation form!')">
            + Add New Goal
          </button>
        `;
        
        // Make toggleMilestone available globally
        window.toggleMilestone = toggleMilestone;
        break;
        
      case 'connections':
        content.innerHTML = `
          <h2>🔗 Smart Connections</h2>
          <p style="color: #666; margin-bottom: 30px;">Discover relationships between your projects, clients, and files</p>
          
          <div class="hov-connections-container">
            <h3>Active Connections</h3>
            ${connections.map(conn => `
              <div class="hov-connection-node">
                <div class="hov-connection-type">${conn.type.replace('-', ' → ')}</div>
                <div><strong>${conn.from}</strong> ↔ <strong>${conn.to}</strong></div>
                <div class="hov-connection-strength">
                  <div class="hov-connection-strength-fill" style="width: ${conn.strength}%"></div>
                </div>
                <small>Connection strength: ${conn.strength}%</small>
              </div>
            `).join('')}
          </div>
          
          <div style="margin-top: 30px; text-align: center;">
            <button class="hov-timer-btn primary" onclick="alert('🔍 Analyzing Connections\\n\\nSearching for new connections across your workspace...')">
              Find New Connections
            </button>
          </div>
        `;
        break;
        
      case 'archive':
        content.innerHTML = `
          <h2>📥 Auto-Archive System</h2>
          <p style="color: #666; margin-bottom: 30px;">Smart suggestions for organizing old content</p>
          
          <div class="hov-archive-suggestions">
            <h3>⚠️ Archive Suggestions</h3>
            <p style="margin-bottom: 20px;">These items might be ready for archiving:</p>
            
            <div class="hov-archive-item">
              <div class="hov-archive-info">
                <strong>Old Client Presentations</strong><br>
                <small style="color: #666;">15 files from completed projects - Last accessed 3 months ago</small>
              </div>
              <div class="hov-archive-actions">
                <button class="hov-archive-btn primary" onclick="alert('📦 Archiving 15 presentation files...')">Archive</button>
                <button class="hov-archive-btn secondary" onclick="alert('⏭️ Reminding you in 30 days')">Remind Later</button>
              </div>
            </div>
            
            <div class="hov-archive-item">
              <div class="hov-archive-info">
                <strong>Completed Project Files</strong><br>
                <small style="color: #666;">Project: Brand Guidelines - Completed 2 months ago</small>
              </div>
              <div class="hov-archive-actions">
                <button class="hov-archive-btn primary" onclick="alert('📦 Archiving Brand Guidelines project...')">Archive</button>
                <button class="hov-archive-btn secondary" onclick="alert('⏭️ Keeping active for now')">Keep Active</button>
              </div>
            </div>
            
            <div class="hov-archive-item">
              <div class="hov-archive-info">
                <strong>Unused Design Assets</strong><br>
                <small style="color: #666;">23 files not referenced in any active project</small>
              </div>
              <div class="hov-archive-actions">
                <button class="hov-archive-btn primary" onclick="alert('📦 Archiving unused assets...')">Archive</button>
                <button class="hov-archive-btn secondary" onclick="alert('🔍 Reviewing assets manually')">Review</button>
              </div>
            </div>
          </div>
          
          <div style="margin-top: 30px; background: #ecfdf5; padding: 20px; border-radius: 15px; border-left: 5px solid #10b981;">
            <h4>✅ Archive Settings</h4>
            <p style="color: #666; margin-bottom: 15px;">Customize your auto-archive preferences:</p>
            <div style="display: flex; flex-wrap: wrap; gap: 15px;">
              <label style="display: flex; align-items: center; gap: 8px;">
                <input type="checkbox" checked> Archive completed projects after 60 days
              </label>
              <label style="display: flex; align-items: center; gap: 8px;">
                <input type="checkbox" checked> Archive unused files after 90 days
              </label>
              <label style="display: flex; align-items: center; gap: 8px;">
                <input type="checkbox"> Auto-archive client files after project completion
              </label>
            </div>
          </div>
        `;
        break;
    }
  }

  // Create organization button
  function createOrganizationButton() {
    const button = document.createElement('button');
    button.className = 'hov-organization-button';
    button.innerHTML = '🧠 Smart';
    
    button.onclick = (e) => {
      e.preventDefault();
      const modal = document.querySelector('.hov-organization-modal');
      if (modal) {
        modal.style.display = modal.style.display === 'none' ? 'flex' : 'none';
        if (modal.style.display === 'flex') {
          updateOrganizationView('search');
        }
      }
    };
    
    document.body.appendChild(button);
    makeDraggable(button);
    
    return button;
  }

  // Create organization modal
  function createOrganizationModal() {
    const modal = document.createElement('div');
    modal.className = 'hov-organization-modal';
    
    const container = document.createElement('div');
    container.className = 'hov-organization-container';
    
    const header = document.createElement('div');
    header.className = 'hov-organization-header';
    
    header.innerHTML = `
      <div class="hov-organization-title">🧠 Smart Organization</div>
      <button class="hov-organization-close hov-clients-close">×</button>
    `;
    
    const tabs = document.createElement('div');
    tabs.className = 'hov-organization-tabs';
    
    tabs.innerHTML = `
      <button class="hov-organization-tab active" data-tab="search">🔍 Smart Search</button>
      <button class="hov-organization-tab" data-tab="goals">🎯 Goals</button>
      <button class="hov-organization-tab" data-tab="connections">🔗 Connections</button>
      <button class="hov-organization-tab" data-tab="archive">📥 Archive</button>
    `;
    
    const content = document.createElement('div');
    content.className = 'hov-organization-content';
    
    container.appendChild(header);
    container.appendChild(tabs);
    container.appendChild(content);
    modal.appendChild(container);
    document.body.appendChild(modal);
    
    // Make modal draggable by header
    makeDraggable(container, header);
    
    // Tab click handlers
    tabs.addEventListener('click', (e) => {
      if (e.target.classList.contains('hov-organization-tab')) {
        const tabName = e.target.dataset.tab;
        switchOrganizationTab(tabName);
      }
    });
    
    // Close modal
    header.querySelector('.hov-organization-close').onclick = () => {
      modal.style.display = 'none';
    };
    
    modal.onclick = (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    };
    
    return modal;
  }

  // Initialize organization extension
  function init() {
    console.log('🧠 Initializing House of Vibes Smart Organization...');
    
    // Wait for page to be ready
    setTimeout(() => {
      injectOrganizationStyles();
      createOrganizationButton();
      createOrganizationModal();
      
      console.log('✅ House of Vibes Smart Organization ready!');
    }, 3500);
  }

  // Start when page loads
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
