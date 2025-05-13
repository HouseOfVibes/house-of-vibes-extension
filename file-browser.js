// House of Vibes - File Browser Extension
// Version 1.0 - Visual file manager

(function() {
  console.log('📁 House of Vibes File Browser loading...');
  
  // Mock file data with actions
  const mockFiles = [
    { 
      name: 'Project Ideas.md', 
      type: 'document', 
      size: '2.3 KB', 
      modified: '2 days ago', 
      icon: '📄',
      action: () => showFilePreview('Project Ideas.md', '# Project Ideas\n\n- Build a TypingMind extension\n- Create ADHD-friendly tools\n- Design beautiful themes')
    },
    { 
      name: 'Client Meeting Notes.txt', 
      type: 'document', 
      size: '1.8 KB', 
      modified: '1 day ago', 
      icon: '📝',
      action: () => alert('📝 Opening Client Meeting Notes.txt\n\nThis would open your text file!')
    },
    { 
      name: 'Design Assets', 
      type: 'folder', 
      items: '15', 
      modified: '3 hours ago', 
      icon: '📁',
      action: () => showFolderContents('Design Assets')
    },
    { 
      name: 'Screenshot_2024.png', 
      type: 'image', 
      size: '1.2 MB', 
      modified: '5 hours ago', 
      icon: '🖼️',
      action: () => alert('🖼️ Opening Screenshot_2024.png\n\nThis would open the image in a preview window!')
    },
    { 
      name: 'Budget.xlsx', 
      type: 'spreadsheet', 
      size: '45 KB', 
      modified: '1 week ago', 
      icon: '📊',
      action: () => alert('📊 Opening Budget.xlsx\n\nThis would open your spreadsheet!')
    },
    { 
      name: 'Presentation.pptx', 
      type: 'presentation', 
      size: '8.5 MB', 
      modified: '3 days ago', 
      icon: '📺',
      action: () => alert('📺 Opening Presentation.pptx\n\nThis would open your presentation!')
    }
  ];

  // Inject file browser styles
  function injectFileBrowserStyles() {
    const styleEl = document.createElement('style');
    styleEl.id = 'house-of-vibes-files';
    styleEl.textContent = `
      /* House of Vibes - File Browser Styles */
      
      /* Get theme colors from the themes extension */
      .hov-file-button {
        position: fixed;
        bottom: 30px;
        right: 30px;
        z-index: 9999;
        background: linear-gradient(135deg, var(--hov-primary, #4ec5d4) 0%, var(--hov-secondary, #72c6ef) 100%);
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
      
      .hov-file-button:hover {
        transform: scale(1.05);
        box-shadow: 0 6px 25px rgba(0,0,0,0.3);
      }
      
      /* File browser modal */
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
        background: white;
        border-radius: 20px;
        width: 90vw;
        max-width: 900px;
        height: 80vh;
        max-height: 700px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }
      
      .hov-file-header {
        background: linear-gradient(135deg, var(--hov-primary, #4ec5d4) 0%, var(--hov-secondary, #72c6ef) 100%);
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
      
      .hov-file-content {
        padding: 20px;
        flex: 1;
        overflow-y: auto;
      }
      
      .hov-file-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 15px;
      }
      
      .hov-file-card {
        background: white;
        border-radius: 15px;
        padding: 20px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        transition: all 0.3s ease;
        cursor: pointer;
        border: 2px solid #f0f0f0;
      }
      
      .hov-file-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        border-color: var(--hov-primary, #4ec5d4);
      }
      
      .hov-file-icon {
        font-size: 48px;
        text-align: center;
        margin-bottom: 15px;
      }
      
      .hov-file-name {
        font-weight: bold;
        color: #333;
        font-size: 16px;
        margin-bottom: 8px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      
      .hov-file-info {
        color: #666;
        font-size: 14px;
        line-height: 1.4;
      }
      
      /* File preview styles */
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
        height: 70%;
        padding: 20px;
        display: flex;
        flex-direction: column;
      }
      
      .hov-preview-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 15px;
        border-bottom: 1px solid #eee;
      }
      
      .hov-preview-text {
        flex: 1;
        overflow-y: auto;
        white-space: pre-wrap;
        font-family: 'Courier New', monospace;
        padding: 20px 0;
        font-size: 14px;
        line-height: 1.6;
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

  // Show file preview
  function showFilePreview(fileName, content) {
    const preview = document.createElement('div');
    preview.className = 'hov-file-preview';
    preview.style.display = 'flex';
    
    preview.innerHTML = `
      <div class="hov-preview-content">
        <div class="hov-preview-header">
          <h3>${fileName}</h3>
          <button class="hov-file-close">×</button>
        </div>
        <div class="hov-preview-text">${content}</div>
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

  // Show folder contents
  function showFolderContents(folderName) {
    alert(`📁 Opening ${folderName} folder\n\n📄 logo.svg\n🎨 icons/\n📸 photos/\n🎥 videos/\n\nThis would show the actual folder contents!`);
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
    
    const header = document.createElement('div');
    header.className = 'hov-file-header';
    header.innerHTML = `
      <div class="hov-file-title">📁 File Explorer</div>
      <button class="hov-file-close">×</button>
    `;
    
    const content = document.createElement('div');
    content.className = 'hov-file-content';
    
    const grid = document.createElement('div');
    grid.className = 'hov-file-grid';
    
    // Add files
    mockFiles.forEach(file => {
      const card = document.createElement('div');
      card.className = 'hov-file-card';
      card.innerHTML = `
        <div class="hov-file-icon">${file.icon}</div>
        <div class="hov-file-name">${file.name}</div>
        <div class="hov-file-info">${file.type === 'folder' ? `${file.items} items` : file.size}<br>Modified ${file.modified}</div>
      `;
      
      card.onclick = () => file.action();
      grid.appendChild(card);
    });
    
    content.appendChild(grid);
    modal.appendChild(header);
    modal.appendChild(content);
    browser.appendChild(modal);
    document.body.appendChild(browser);
    
    // Make modal draggable by header
    makeDraggable(modal, header);
    
    // Close browser
    header.querySelector('.hov-file-close').onclick = () => {
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
