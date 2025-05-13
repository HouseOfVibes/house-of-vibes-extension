// House of Vibes Extension - Complete Theme System + File Browser
// Version 2.2 - Added Visual File Browser

(function() {
  // Theme Configuration - All 10 themes
  const themes = {
    sunset: {
      name: "🌅 Sunset Vibes",
      primary: "#ff6b35",
      secondary: "#f54888",
      background: "linear-gradient(135deg, #ff6b35 0%, #f54888 100%)"
    },
    ocean: {
      name: "🌊 Ocean Breeze", 
      primary: "#4ec5d4",
      secondary: "#72c6ef",
      background: "linear-gradient(135deg, #4ec5d4 0%, #72c6ef 100%)"
    },
    spring: {
      name: "🌿 Spring Fresh",
      primary: "#00b894",
      secondary: "#6c5ce7",
      background: "linear-gradient(135deg, #00b894 0%, #6c5ce7 100%)"
    },
    tropical: {
      name: "🏝️ Tropical",
      primary: "#17a2b8",
      secondary: "#6f42c1",
      background: "linear-gradient(135deg, #17a2b8 0%, #6f42c1 100%)"
    },
    energy: {
      name: "🔥 Energy Burst",
      primary: "#e74c3c",
      secondary: "#f39c12",
      background: "linear-gradient(135deg, #e74c3c 0%, #f39c12 100%)"
    },
    focus: {
      name: "⚡ Focus Mode",
      primary: "#3498db",
      secondary: "#5dade2",
      background: "linear-gradient(135deg, #3498db 0%, #5dade2 100%)"
    },
    calm: {
      name: "🧘 Calm Focus",
      primary: "#8e44ad",
      secondary: "#d7bde2",
      background: "linear-gradient(135deg, #8e44ad 0%, #d7bde2 100%)"
    },
    professional: {
      name: "💼 Professional",
      primary: "#1e3a8a",
      secondary: "#fbbf24",
      background: "linear-gradient(135deg, #1e3a8a 0%, #3730a3 50%, #fbbf24 100%)"
    },
    creative: {
      name: "🎨 Creative Flow",
      primary: "#ec4899",
      secondary: "#3b82f6",
      background: "linear-gradient(45deg, #ec4899 0%, #8b5cf6 25%, #3b82f6 50%, #10b981 75%, #f59e0b 100%)"
    },
    action: {
      name: "🎯 Action Time",
      primary: "#059669",
      secondary: "#047857",
      background: "linear-gradient(135deg, #059669 0%, #0891b2 100%)"
    }
  };

  let currentTheme = 'ocean';

  // Mock file data - replace with actual file retrieval later
  const mockFiles = [
    { name: 'Project Ideas.md', type: 'document', size: '2.3 KB', modified: '2 days ago', icon: '📄' },
    { name: 'Client Meeting Notes.txt', type: 'document', size: '1.8 KB', modified: '1 day ago', icon: '📝' },
    { name: 'Design Assets', type: 'folder', items: '15', modified: '3 hours ago', icon: '📁' },
    { name: 'Screenshot_2024.png', type: 'image', size: '1.2 MB', modified: '5 hours ago', icon: '🖼️' },
    { name: 'Budget.xlsx', type: 'spreadsheet', size: '45 KB', modified: '1 week ago', icon: '📊' },
    { name: 'Presentation.pptx', type: 'presentation', size: '8.5 MB', modified: '3 days ago', icon: '📺' }
  ];

  // Inject CSS styles directly into the page
  function injectStyles() {
    const styleEl = document.createElement('style');
    styleEl.textContent = `
      /* House of Vibes Extension - Enhanced Styles */
      
      /* Theme variables */
      :root {
        --theme-primary: #4ec5d4;
        --theme-secondary: #72c6ef;
        --theme-background: linear-gradient(135deg, #4ec5d4 0%, #72c6ef 100%);
      }
      
      /* Apply theme background */
      body {
        background: var(--theme-background) !important;
        transition: background 0.3s ease;
      }
      
      /* Sidebar styling - blend with theme colors */
      aside,
      nav,
      .sidebar,
      .navigation,
      [class*="sidebar"],
      [class*="w-64"],
      [class*="w-60"],
      .fixed.left-0,
      .fixed.top-0.left-0,
      [data-element-id="side-bar"] {
        background: 
          linear-gradient(135deg, 
            var(--theme-primary, #4ec5d4) 0%, 
            rgba(255,255,255,0.1) 30%, 
            rgba(255,255,255,0.05) 100%
          ) !important;
        backdrop-filter: blur(15px) !important;
        border-right: 1px solid rgba(255,255,255,0.3) !important;
        position: relative;
      }
      
      /* Add subtle gradient overlay to sidebar */
      aside::before,
      nav::before,
      .sidebar::before,
      [class*="w-64"]::before,
      [class*="w-60"]::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%);
        pointer-events: none;
      }
      
      /* ALL text white */
      body *:not(input):not(textarea):not(.hov-theme-option):not(.file-card-name):not(.file-card-info),
      aside *,
      nav *,
      .sidebar *,
      .navigation *,
      [class*="sidebar"] *,
      [class*="w-64"] *,
      [class*="w-60"] *,
      .fixed.left-0 *,
      [data-element-id="side-bar"] * {
        color: white !important;
        text-shadow: 1px 1px 3px rgba(0,0,0,0.4) !important;
      }
      
      /* Sidebar buttons with better styling */
      aside button,
      nav button,
      nav .flex,
      nav .p-2,
      nav .p-3,
      .sidebar button,
      .sidebar .flex,
      [class*="sidebar"] button,
      [class*="w-64"] button,
      [class*="w-60"] button {
        background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%) !important;
        border-radius: 12px !important;
        transition: all 0.3s ease !important;
        color: white !important;
        border: 1px solid rgba(255,255,255,0.1) !important;
      }
      
      /* Sidebar hover effects */
      aside button:hover,
      nav button:hover,
      .sidebar button:hover,
      [class*="sidebar"] button:hover {
        background: linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.15) 100%) !important;
        transform: translateX(8px) scale(1.02) !important;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2) !important;
      }
      
      /* Input fields */
      input, 
      textarea {
        background: rgba(255,255,255,0.95) !important;
        color: #333 !important;
        border: 2px solid var(--theme-primary, #4ec5d4) !important;
        border-radius: 10px !important;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1) !important;
      }
      
      /* Main content buttons */
      button:not(.hov-theme-button):not(.hov-theme-option):not(.file-browser-close) {
        background: linear-gradient(135deg, var(--theme-primary, #4ec5d4) 0%, var(--theme-secondary, #72c6ef) 100%) !important;
        color: white !important;
        border: none !important;
        border-radius: 8px !important;
        transition: all 0.3s ease !important;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1) !important;
      }
      
      button:not(.hov-theme-button):not(.hov-theme-option):not(.file-browser-close):hover {
        transform: translateY(-2px) !important;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2) !important;
      }
      
      /* Custom header */
      [data-element-id="header-container"]::before,
      header::before,
      .header::before {
        content: "🏠 House of Vibes";
        font-weight: bold;
        color: white !important;
        margin-right: 15px;
        text-shadow: 2px 2px 6px rgba(0,0,0,0.6);
        font-size: 18px;
      }
      
      /* File Browser Styles */
      .file-browser-container {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(255,255,255,0.95);
        backdrop-filter: blur(20px);
        border-radius: 20px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        width: 70vw;
        height: 80vh;
        z-index: 9998;
        display: none;
      }
      
      .file-browser-header {
        background: linear-gradient(135deg, var(--theme-primary, #4ec5d4) 0%, var(--theme-secondary, #72c6ef) 100%);
        padding: 20px;
        border-radius: 20px 20px 0 0;
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      
      .file-browser-title {
        font-size: 24px;
        font-weight: bold;
        text-shadow: 1px 1px 3px rgba(0,0,0,0.3);
      }
      
      .file-browser-close {
        background: rgba(255,255,255,0.2) !important;
        border: none !important;
        color: white !important;
        width: 40px !important;
        height: 40px !important;
        border-radius: 50% !important;
        cursor: pointer !important;
        font-size: 20px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        transition: all 0.3s ease !important;
      }
      
      .file-browser-close:hover {
        background: rgba(255,255,255,0.3) !important;
        transform: scale(1.1) !important;
      }
      
      .file-browser-content {
        padding: 20px;
        height: calc(100% - 80px);
        overflow-y: auto;
      }
      
      .file-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 15px;
        padding: 10px 0;
      }
      
      .file-card {
        background: white;
        border-radius: 15px;
        padding: 20px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        transition: all 0.3s ease;
        cursor: pointer;
        border: 2px solid transparent;
      }
      
      .file-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        border-color: var(--theme-primary, #4ec5d4);
      }
      
      .file-card-icon {
        font-size: 48px;
        text-align: center;
        margin-bottom: 15px;
      }
      
      .file-card-name {
        font-weight: bold;
        color: #333 !important;
        font-size: 16px;
        margin-bottom: 8px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      
      .file-card-info {
        color: #666 !important;
        font-size: 14px;
        line-height: 1.4;
      }
      
      /* Override dark text classes */
      .text-gray-500,
      .text-gray-600,
      .text-gray-700,
      .text-gray-800,
      .text-gray-900,
      .text-black {
        color: white !important;
      }
      
      /* Smooth transitions */
      * {
        transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
      }
    `;
    
    document.head.appendChild(styleEl);
  }

  // Apply theme
  function applyTheme(themeName) {
    const theme = themes[themeName];
    if (!theme) return;
    
    document.documentElement.style.setProperty('--theme-primary', theme.primary);
    document.documentElement.style.setProperty('--theme-secondary', theme.secondary);
    document.documentElement.style.setProperty('--theme-background', theme.background);
    
    // Apply to body immediately
    document.body.style.background = theme.background;
    
    // Update button color
    const button = document.querySelector('.hov-theme-button');
    if (button) {
      button.style.background = `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)`;
    }
    
    currentTheme = themeName;
    console.log(`Applied theme: ${theme.name}`);
  }

  // Create file browser widget
  function createFileBrowser() {
    const container = document.createElement('div');
    container.className = 'file-browser-container';
    
    // Header
    const header = document.createElement('div');
    header.className = 'file-browser-header';
    header.innerHTML = `
      <div class="file-browser-title">📁 File Explorer</div>
      <button class="file-browser-close">×</button>
    `;
    
    // Content
    const content = document.createElement('div');
    content.className = 'file-browser-content';
    
    // File grid
    const fileGrid = document.createElement('div');
    fileGrid.className = 'file-grid';
    
    // Add files
    mockFiles.forEach(file => {
      const card = document.createElement('div');
      card.className = 'file-card';
      card.innerHTML = `
        <div class="file-card-icon">${file.icon}</div>
        <div class="file-card-name">${file.name}</div>
        <div class="file-card-info">
          ${file.type === 'folder' ? `${file.items} items` : file.size}<br>
          Modified ${file.modified}
        </div>
      `;
      
      card.addEventListener('click', () => {
        console.log(`Opening file: ${file.name}`);
        // Add file opening logic here
      });
      
      fileGrid.appendChild(card);
    });
    
    content.appendChild(fileGrid);
    container.appendChild(header);
    container.appendChild(content);
    document.body.appendChild(container);
    
    // Close button functionality
    header.querySelector('.file-browser-close').addEventListener('click', () => {
      container.style.display = 'none';
    });
    
    return container;
  }

  // Create theme switcher dropdown
  function createThemeSwitcher() {
    const container = document.createElement('div');
    container.className = 'hov-theme-container';
    container.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 10000;
    `;
    
    const button = document.createElement('button');
    button.className = 'hov-theme-button';
    button.innerHTML = '🎨 Themes';
    button.style.cssText = `
      background: linear-gradient(135deg, var(--theme-primary, #4ec5d4) 0%, var(--theme-secondary, #72c6ef) 100%);
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 30px;
      cursor: pointer;
      font-size: 16px;
      font-weight: bold;
      box-shadow: 0 4px 20px rgba(0,0,0,0.2);
      user-select: none;
      transition: all 0.3s ease;
    `;
    
    const dropdown = document.createElement('div');
    dropdown.className = 'hov-theme-dropdown';
    dropdown.style.cssText = `
      position: absolute;
      top: 100%;
      right: 0;
      background: white;
      border-radius: 15px;
      box-shadow: 0 8px 25px rgba(0,0,0,0.15);
      display: none;
      min-width: 200px;
      margin-top: 8px;
      overflow: hidden;
      backdrop-filter: blur(10px);
    `;
    
    // Add theme options with proper dark text
    Object.keys(themes).forEach(themeName => {
      const option = document.createElement('div');
      option.innerHTML = themes[themeName].name;
      option.className = 'hov-theme-option';
      option.style.cssText = `
        padding: 15px 20px;
        cursor: pointer;
        color: #333 !important;
        font-size: 16px;
        font-weight: 500;
        transition: all 0.2s ease;
        border-left: 4px solid transparent;
      `;
      
      option.addEventListener('mouseenter', () => {
        option.style.background = '#f8f9fa';
        option.style.borderLeft = `4px solid ${themes[themeName].primary}`;
        option.style.transform = 'translateX(5px)';
      });
      
      option.addEventListener('mouseleave', () => {
        option.style.background = 'transparent';
        option.style.borderLeft = '4px solid transparent';
        option.style.transform = 'translateX(0)';
      });
      
      option.addEventListener('click', (e) => {
        e.stopPropagation();
        applyTheme(themeName);
        dropdown.style.display = 'none';
      });
      
      dropdown.appendChild(option);
    });
    
    // Dragging variables
    let isDragging = false;
    let dragStartX = 0;
    let dragStartY = 0;
    
    // Make container draggable
    button.addEventListener('mousedown', (e) => {
      e.preventDefault();
      isDragging = true;
      
      const rect = container.getBoundingClientRect();
      dragStartX = e.clientX - rect.left;
      dragStartY = e.clientY - rect.top;
      
      container.style.cursor = 'grabbing';
      document.body.style.userSelect = 'none';
    });
    
    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      
      e.preventDefault();
      
      const newX = e.clientX - dragStartX;
      const newY = e.clientY - dragStartY;
      
      const maxX = window.innerWidth - container.offsetWidth;
      const maxY = window.innerHeight - container.offsetHeight;
      
      const constrainedX = Math.max(0, Math.min(newX, maxX));
      const constrainedY = Math.max(0, Math.min(newY, maxY));
      
      container.style.left = constrainedX + 'px';
      container.style.top = constrainedY + 'px';
      container.style.right = 'auto';
      container.style.bottom = 'auto';
    });
    
    document.addEventListener('mouseup', () => {
      if (isDragging) {
        isDragging = false;
        container.style.cursor = 'pointer';
        document.body.style.userSelect = '';
      }
    });
    
    // Toggle dropdown
    button.addEventListener('click', (e) => {
      if (!isDragging) {
        e.stopPropagation();
        dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
      }
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!container.contains(e.target)) {
        dropdown.style.display = 'none';
      }
    });
    
    container.appendChild(button);
    container.appendChild(dropdown);
    document.body.appendChild(container);
    
    return container;
  }

  // Create file browser button (floating action button)
  function createFileBrowserButton() {
    const button = document.createElement('button');
    button.className = 'file-browser-fab';
    button.innerHTML = '📁 Files';
    button.style.cssText = `
      position: fixed;
      bottom: 30px;
      right: 30px;
      z-index: 9999;
      background: linear-gradient(135deg, var(--theme-primary, #4ec5d4) 0%, var(--theme-secondary, #72c6ef) 100%);
      color: white;
      border: none;
      padding: 15px 25px;
      border-radius: 50px;
      cursor: pointer;
      font-size: 18px;
      font-weight: bold;
      box-shadow: 0 4px 20px rgba(0,0,0,0.2);
      transition: all 0.3s ease;
    `;
    
    button.addEventListener('mouseenter', () => {
      button.style.transform = 'scale(1.1)';
      button.style.boxShadow = '0 6px 25px rgba(0,0,0,0.3)';
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.transform = 'scale(1)';
      button.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
    });
    
    button.addEventListener('click', () => {
      const browser = document.querySelector('.file-browser-container');
      if (browser) {
        browser.style.display = browser.style.display === 'none' ? 'block' : 'none';
      }
    });
    
    document.body.appendChild(button);
    return button;
  }

  // Initialize extension
  function init() {
    console.log('House of Vibes Extension loaded! 🎉');
    injectStyles();
    createThemeSwitcher();
    createFileBrowserButton();
    createFileBrowser();
    applyTheme('ocean');
  }

  // Wait for page to load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
