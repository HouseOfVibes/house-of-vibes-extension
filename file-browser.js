// House of Vibes - File Browser Extension
// Version 2.0 - Real Functionality & Modern Design

(function() {
  console.log('📁 House of Vibes File Browser loading...');
  
  // Current folder state
  let currentFolder = '/';
  let folderHistory = ['/'];
  
  // Enhanced file structure with real content
  const fileSystem = {
    '/': {
      'Project Ideas.md': { 
        type: 'markdown', 
        size: '2.3 KB', 
        modified: '2 days ago', 
        icon: '📄',
        content: `# Project Ideas

## 🚀 Upcoming Projects
- AI-powered content assistant
- Client onboarding automation
- Project timeline visualization
- Smart file organization system

## 💡 Business Development
- Explore AI integration services
- Develop SaaS templates
- Create design system library

## 🎯 Goals for Q2
- [ ] Launch new service offering
- [ ] Optimize current workflows  
- [ ] Expand client base by 30%`
      },
      'Meeting Notes/': { type: 'folder', items: 3, modified: '1 day ago', icon: '📁' },
      'Design Assets/': { type: 'folder', items: 15, modified: '3 hours ago', icon: '📁' },
      'Client Files/': { type: 'folder', items: 8, modified: '1 week ago', icon: '📁' },
      'Templates/': { type: 'folder', items: 12, modified: '5 days ago', icon: '📁' }
    },
    '/Meeting Notes/': {
      '../': { type: 'back', icon: '⬅️' },
      'Client Call - Sarah.txt': { 
        type: 'text', 
        size: '1.8 KB', 
        modified: '1 day ago', 
        icon: '📝',
        content: `Client Call Notes - Sarah Johnson
Date: May 13, 2025
Duration: 45 minutes

Key Discussion Points:
- Website redesign timeline
- Budget approval for Phase 2
- Mobile responsiveness priority
- Content strategy concerns

Action Items:
- Send wireframe revisions by Thursday
- Schedule design review meeting
- Prepare content outline
- Update project timeline

Next Meeting: May 20, 2025`
      },
      'Team Standup Notes.md': { 
        type: 'markdown', 
        size: '1.2 KB', 
        modified: '2 days ago', 
        icon: '📄',
        content: `# Team Standup - Week 20

## Yesterday's Progress
- Completed wireframes for client project
- Fixed responsive issues on landing page  
- Updated project documentation

## Today's Goals
- Client presentation prep
- Code review for new features
- Design system updates

## Blockers
- Waiting for client feedback on mockups
- Need approval for new design direction`
      },
      'Project Planning Session.txt': { 
        type: 'text', 
        size: '2.1 KB', 
        modified: '5 days ago', 
        icon: '📝',
        content: 'Project planning session notes...'
      }
    },
    '/Design Assets/': {
      '../': { type: 'back', icon: '⬅️' },
      'Logos/': { type: 'folder', items: 8, modified: '2 days ago', icon: '📁' },
      'Icons/': { type: 'folder', items: 24, modified: '1 day ago', icon: '📁' },
      'Brand-Guidelines.pdf': { type: 'pdf', size: '5.2 MB', modified: '1 week ago', icon: '📄' },
      'Color-Palette.figma': { type: 'design', size: '892 KB', modified: '3 days ago', icon: '🎨' },
      'Hero-Image.jpg': { 
        type: 'image', 
        size: '1.2 MB', 
        modified: '5 hours ago', 
        icon: '🖼️',
        preview: '/api/placeholder/400/300'
      }
    },
    '/Client Files/': {
      '../': { type: 'back', icon: '⬅️' },
      'Sarah Johnson/': { type: 'folder', items: 5, modified: '2 days ago', icon: '📁' },
      'Emma Rodriguez/': { type: 'folder', items: 7, modified: '1 week ago', icon: '📁' },
      'Michael Chen/': { type: 'folder', items: 3, modified: '3 days ago', icon: '📁' }
    }
  };

  // Inject modern file browser styles
  function injectFileBrowserStyles() {
    const styleEl = document.createElement('style');
    styleEl.id = 'house-of-vibes-files';
    styleEl.textContent = `
      /* House of Vibes - Modern File Browser */
      
      /* File browser button - matches theme system */
      .hov-file-button {
        position: fixed;
        bottom: 30px;
        right: 30px;
        z-index: 9999;
        background: var(--hov-surface-color, rgba(255, 255, 255, 0.9));
        color: var(--hov-primary, #6bb6d6);
        border: 2px solid var(--hov-primary, #6bb6d6);
        padding: 12px 20px;
        border-radius: 25px;
        cursor: move;
        font-size: 16px;
        font-weight: 600;
        box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        transition: all 0.3s ease;
        user-select: none;
        backdrop-filter: blur(10px);
      }
      
      .hov-file-button:hover {
        background: var(--hov-primary, #6bb6d6);
        color: white;
        transform: translateY(-2px);
        box-shadow: 0 6px 25px rgba(0,0,0,0.15);
      }
      
      /* Modern file browser modal */
      .hov-file-browser {
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
      
      .hov-file-modal {
        background: var(--hov-surface-color, white);
        border-radius: 20px;
        width: 95vw;
        max-width: 1200px;
        height: 85vh;
        max-height: 800px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        display: flex;
        flex-direction: column;
        overflow: hidden;
        border: 1px solid rgba(0,0,0,0.1);
      }
      
      .hov-file-header {
        background: var(--hov-primary, #6bb6d6);
        padding: 20px;
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: move;
      }
      
      .hov-file-title {
        font-size: 24px;
        font-weight: bold;
        text-shadow: 1px 1px 3px rgba(0,0,0,0.3);
      }
      
      .hov-file-close {
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
      
      .hov-file-close:hover {
        background: rgba(255,255,255,0.3);
        transform: scale(1.1);
      }
      
      /* Navigation breadcrumbs */
      .hov-file-nav {
        background: #f8fafc;
        padding: 15px 20px;
        border-bottom: 1px solid #e2e8f0;
        display: flex;
        align-items: center;
        gap: 10px;
      }
      
      .hov-breadcrumb {
        color: var(--hov-primary, #6bb6d6);
        text-decoration: none;
        font-weight: 500;
        cursor: pointer;
        padding: 5px 10px;
        border-radius: 6px;
        transition: all 0.2s ease;
      }
      
      .hov-breadcrumb:hover {
        background: rgba(107, 182, 214, 0.1);
      }
      
      .hov-breadcrumb.current {
        color: var(--hov-text-color, #1f2937);
        cursor: default;
      }
      
      .hov-breadcrumb-separator {
        color: #6b7280;
        font-size: 14px;
      }
      
      /* File content area */
      .hov-file-content {
        padding: 20px;
        flex: 1;
        overflow-y: auto;
        background: #fafbfc;
      }
      
      /* File actions toolbar */
      .hov-file-toolbar {
        background: white;
        padding: 15px 20px;
        border-bottom: 1px solid #e2e8f0;
        display: flex;
        gap: 10px;
        align-items: center;
      }
      
      .hov-toolbar-btn {
        background: var(--hov-surface-color, white);
        border: 1px solid #d1d5db;
        color: var(--hov-text-color, #374151);
        padding: 8px 16px;
        border-radius: 8px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
        transition: all 0.2s ease;
      }
      
      .hov-toolbar-btn:hover {
        background: #f3f4f6;
        border-color: var(--hov-primary, #6bb6d6);
      }
      
      .hov-toolbar-btn.active {
        background: var(--hov-primary, #6bb6d6);
        color: white;
        border-color: var(--hov-primary, #6bb6d6);
      }
      
      /* File grid */
      .hov-file-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 15px;
        padding: 5px;
      }
      
      .hov-file-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      
      /* File cards */
      .hov-file-card {
        background: white;
        border-radius: 12px;
        padding: 16px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        transition: all 0.2s ease;
        cursor: pointer;
        border: 1px solid #e5e7eb;
      }
      
      .hov-file-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        border-color: var(--hov-primary, #6bb6d6);
      }
      
      .hov-file-list-item {
        background: white;
        border-radius: 8px;
        padding: 12px 16px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        transition: all 0.2s ease;
        cursor: pointer;
        border: 1px solid #e5e7eb;
        display: flex;
        align-items: center;
        gap: 12px;
      }
      
      .hov-file-list-item:hover {
        background: #f9fafb;
        border-color: var(--hov-primary, #6bb6d6);
      }
      
      .hov-file-icon {
        font-size: 32px;
        text-align: center;
        margin-bottom: 10px;
      }
      
      .hov-file-list-icon {
        font-size: 24px;
        width: 32px;
        text-align: center;
      }
      
      .hov-file-name {
        font-weight: 600;
        color: var(--hov-text-color, #1f2937);
        font-size: 14px;
        margin-bottom: 5px;
        word-break: break-word;
      }
      
      .hov-file-list-name {
        font-weight: 600;
        color: var(--hov-text-color, #1f2937);
        flex: 1;
      }
      
      .hov-file-info {
        color: #6b7280;
        font-size: 12px;
        line-height: 1.4;
      }
      
      .hov-file-list-info {
        color: #6b7280;
        font-size: 12px;
        text-align: right;
      }
      
      /* File preview modal */
      .hov-file-preview {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.7);
        backdrop-filter: blur(15px);
        z-index: 10002;
        display: none;
        align-items: center;
        justify-content: center;
      }
      
      .hov-preview-content {
        background: white;
        border-radius: 15px;
        width: 90%;
        max-width: 800px;
        height: 80%;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      }
      
      .hov-preview-header {
        background: var(--hov-primary, #6bb6d6);
        padding: 15px 20px;
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      
      .hov-preview-body {
        flex: 1;
        overflow-y: auto;
        padding: 20px;
      }
      
      .hov-preview-text {
        font-family: 'SF Mono', 'Monaco', 'Cascadia Code', 'Roboto Mono', monospace;
        font-size: 14px;
        line-height: 1.6;
        white-space: pre-wrap;
        color: var(--hov-text-color, #1f2937);
      }
      
      .hov-preview-markdown {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        line-height: 1.6;
        color: var(--hov-text-color, #1f2937);
      }
      
      .hov-preview-markdown h1, 
      .hov-preview-markdown h2, 
      .hov-preview-markdown h3 {
        color: var(--hov-primary, #6bb6d6);
        margin-top: 24px;
        margin-bottom: 12px;
      }
      
      .hov-preview-markdown code {
        background: #f3f4f6;
        padding: 2px 6px;
        border-radius: 4px;
        font-family: 'SF Mono', 'Monaco', 'Cascadia Code', monospace;
      }
      
      .hov-preview-markdown ul {
        margin: 12px 0;
        padding-left: 24px;
      }
      
      .hov-preview-markdown li {
        margin: 4px 0;
      }
      
      .hov-preview-image {
        max-width: 100%;
        height: auto;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      }
      
      /* Search functionality */
      .hov-file-search {
        position: relative;
        flex: 1;
        max-width: 300px;
      }
      
      .hov-search-input {
        width: 100%;
        padding: 8px 35px 8px 12px;
        border: 1px solid #d1d5db;
        border-radius: 8px;
        font-size: 14px;
        background: white;
      }
      
      .hov-search-icon {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        color: #6b7280;
        font-size: 16px;
      }
      
      /* Responsive design */
      @media (max-width: 768px) {
        .hov-file-modal {
          width: 98vw;
          height: 95vh;
        }
        
        .hov-file-grid {
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        }
        
        .hov-file-toolbar {
          flex-wrap: wrap;
        }
      }
    `;
    
    // Remove any existing style
    const existing = document.getElementById('house-of-vibes-files');
    if (existing) existing.remove();
    
    document.head.appendChild(styleEl);
  }

  // Make element draggable
  function makeDraggable(element, handle = null) {
    const dragHandle = handle || element;
    let isDragging = false;
    let startX, startY;
    
    dragHandle.addEventListener('mousedown', (e) => {
      if (e.target.closest('.hov-file-close')) return;
      
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

  // Parse markdown to HTML
  function parseMarkdown(text) {
    return text
      .replace(/^# (.*$)/gm, '<h1>$1</h1>')
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
      .replace(/^\* (.*$)/gm, '<li>$1</li>')
      .replace(/^- (.*$)/gm, '<li>$1</li>')
      .replace(/(\r\n|\r|\n)/g, '<br>')
      .replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>');
  }

  // Show file preview
  function showFilePreview(fileName, file) {
    const preview = document.createElement('div');
    preview.className = 'hov-file-preview';
    preview.style.display = 'flex';
    
    let contentHtml = '';
    
    if (file.type === 'markdown') {
      contentHtml = `<div class="hov-preview-markdown">${parseMarkdown(file.content)}</div>`;
    } else if (file.type === 'text') {
      contentHtml = `<div class="hov-preview-text">${file.content}</div>`;
    } else if (file.type === 'image') {
      contentHtml = `<img src="${file.preview}" alt="${fileName}" class="hov-preview-image">`;
    } else {
      contentHtml = `<div class="hov-preview-text">Preview not available for this file type.</div>`;
    }
    
    preview.innerHTML = `
      <div class="hov-preview-content">
        <div class="hov-preview-header">
          <h3>${file.icon} ${fileName}</h3>
          <button class="hov-file-close">×</button>
        </div>
        <div class="hov-preview-body">
          ${contentHtml}
        </div>
      </div>
    `;
    
    document.body.appendChild(preview);
    
    // Close preview
    preview.querySelector('.hov-file-close').onclick = () => {
      preview.remove();
    };
    
    preview.onclick = (e) => {
      if (e.target === preview) {
        preview.remove();
      }
    };
  }

  // Navigate to folder
  function navigateToFolder(folderPath) {
    if (folderPath === '../') {
      // Go back
      folderHistory.pop();
      currentFolder = folderHistory[folderHistory.length - 1] || '/';
    } else {
      folderHistory.push(folderPath);
      currentFolder = folderPath;
    }
    updateFileView();
  }

  // Navigate to breadcrumb
  function navigateToBreadcrumb(path) {
    const index = folderHistory.indexOf(path);
    if (index !== -1) {
      folderHistory = folderHistory.slice(0, index + 1);
      currentFolder = path;
      updateFileView();
    }
  }

  // Search files
  function searchFiles(query) {
    if (!query) {
      updateFileView();
      return;
    }
    
    const files = fileSystem[currentFolder] || {};
    const filtered = {};
    
    for (const [name, file] of Object.entries(files)) {
      if (name.toLowerCase().includes(query.toLowerCase())) {
        filtered[name] = file;
      }
    }
    
    renderFiles(filtered);
  }

  // Render files
  function renderFiles(files) {
    const content = document.querySelector('.hov-file-content');
    const isGridView = document.querySelector('.hov-view-grid').classList.contains('active');
    
    content.innerHTML = '';
    
    if (isGridView) {
      const grid = document.createElement('div');
      grid.className = 'hov-file-grid';
      
      Object.entries(files).forEach(([name, file]) => {
        const card = document.createElement('div');
        card.className = 'hov-file-card';
        
        const displayInfo = file.type === 'folder' ? 
          `${file.items} items` : 
          `${file.size}`;
        
        card.innerHTML = `
          <div class="hov-file-icon">${file.icon}</div>
          <div class="hov-file-name">${name}</div>
          <div class="hov-file-info">${displayInfo}<br>Modified ${file.modified}</div>
        `;
        
        card.onclick = () => handleFileClick(name, file);
        grid.appendChild(card);
      });
      
      content.appendChild(grid);
    } else {
      const list = document.createElement('div');
      list.className = 'hov-file-list';
      
      Object.entries(files).forEach(([name, file]) => {
        const item = document.createElement('div');
        item.className = 'hov-file-list-item';
        
        const displayInfo = file.type === 'folder' ? 
          `${file.items} items` : 
          `${file.size}`;
        
        item.innerHTML = `
          <div class="hov-file-list-icon">${file.icon}</div>
          <div class="hov-file-list-name">${name}</div>
          <div class="hov-file-list-info">${displayInfo}<br>${file.modified}</div>
        `;
        
        item.onclick = () => handleFileClick(name, file);
        list.appendChild(item);
      });
      
      content.appendChild(list);
    }
  }

  // Handle file/folder click
  function handleFileClick(name, file) {
    if (file.type === 'folder') {
      const folderPath = currentFolder === '/' ? `/${name}/` : `${currentFolder}${name}/`;
      navigateToFolder(folderPath);
    } else if (file.type === 'back') {
      navigateToFolder('../');
    } else {
      showFilePreview(name, file);
    }
  }

  // Update file view
  function updateFileView() {
    const files = fileSystem[currentFolder] || {};
    renderFiles(files);
    updateBreadcrumbs();
  }

  // Update breadcrumbs
  function updateBreadcrumbs() {
    const nav = document.querySelector('.hov-file-nav');
    if (!nav) return;
    
    let breadcrumbsHtml = '';
    
    folderHistory.forEach((path, index) => {
      const isLast = index === folderHistory.length - 1;
      const name = path === '/' ? 'Home' : path.split('/').filter(Boolean).pop();
      
      if (isLast) {
        breadcrumbsHtml += `<span class="hov-breadcrumb current">${name}</span>`;
      } else {
        breadcrumbsHtml += `<a class="hov-breadcrumb" onclick="navigateToBreadcrumb('${path}')">${name}</a>`;
        breadcrumbsHtml += `<span class="hov-breadcrumb-separator">›</span>`;
      }
    });
    
    nav.innerHTML = breadcrumbsHtml;
  }

  // Toggle view
  function toggleView(viewType) {
    document.querySelectorAll('.hov-toolbar-btn[data-view]').forEach(btn => {
      btn.classList.remove('active');
    });
    document.querySelector(`[data-view="${viewType}"]`).classList.add('active');
    updateFileView();
  }

  // Create file browser button
  function createFileBrowserButton() {
    const button = document.createElement('button');
    button.className = 'hov-file-button';
    button.innerHTML = '📁 Files';
    
    button.onclick = (e) => {
      e.preventDefault();
      const browser = document.querySelector('.hov-file-browser');
      if (browser) {
        browser.style.display = browser.style.display === 'none' ? 'flex' : 'none';
        if (browser.style.display === 'flex') {
          updateFileView();
        }
      }
    };
    
    document.body.appendChild(button);
    makeDraggable(button);
    
    return button;
  }

  // Create file browser modal
  function createFileBrowser() {
    const browser = document.createElement('div');
    browser.className = 'hov-file-browser';
    
    const modal = document.createElement('div');
    modal.className = 'hov-file-modal';
    
    modal.innerHTML = `
      <div class="hov-file-header">
        <div class="hov-file-title">📁 File Explorer</div>
        <button class="hov-file-close">×</button>
      </div>
      
      <div class="hov-file-nav"></div>
      
      <div class="hov-file-toolbar">
        <button class="hov-toolbar-btn hov-view-grid active" data-view="grid" onclick="toggleView('grid')">
          ◻️ Grid
        </button>
        <button class="hov-toolbar-btn hov-view-list" data-view="list" onclick="toggleView('list')">
          ☰ List
        </button>
        <div class="hov-file-search">
          <input type="text" class="hov-search-input" placeholder="Search files...">
          <span class="hov-search-icon">🔍</span>
        </div>
      </div>
      
      <div class="hov-file-content"></div>
    `;
    
    browser.appendChild(modal);
    document.body.appendChild(browser);
    
    // Make modal draggable by header
    makeDraggable(modal, modal.querySelector('.hov-file-header'));
    
    // Search functionality
    const searchInput = modal.querySelector('.hov-search-input');
    searchInput.addEventListener('input', (e) => {
      searchFiles(e.target.value);
    });
    
    // Make functions globally available
    window.navigateToBreadcrumb = navigateToBreadcrumb;
    window.toggleView = toggleView;
    
    // Close browser
    modal.querySelector('.hov-file-close').onclick = () => {
      browser.style.display = 'none';
    };
    
    browser.onclick = (e) => {
      if (e.target === browser) {
        browser.style.display = 'none';
      }
    };
    
    return browser;
  }

  // Initialize file browser extension
  function init() {
    console.log('📁 Initializing House of Vibes File Browser...');
    
    // Wait for page to be ready
    setTimeout(() => {
      injectFileBrowserStyles();
      createFileBrowserButton();
      createFileBrowser();
      
      console.log('✅ House of Vibes File Browser ready!');
    }, 1500);
  }

  // Start when page loads
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
