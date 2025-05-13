// House of Vibes Extension - Fixed Version  
// Version 2.3 - Better TypingMind compatibility

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

  // Mock file data
  const mockFiles = [
    { name: 'Project Ideas.md', type: 'document', size: '2.3 KB', modified: '2 days ago', icon: '📄' },
    { name: 'Client Meeting Notes.txt', type: 'document', size: '1.8 KB', modified: '1 day ago', icon: '📝' },
    { name: 'Design Assets', type: 'folder', items: '15', modified: '3 hours ago', icon: '📁' },
    { name: 'Screenshot_2024.png', type: 'image', size: '1.2 MB', modified: '5 hours ago', icon: '🖼️' },
    { name: 'Budget.xlsx', type: 'spreadsheet', size: '45 KB', modified: '1 week ago', icon: '📊' },
    { name: 'Presentation.pptx', type: 'presentation', size: '8.5 MB', modified: '3 days ago', icon: '📺' }
  ];

  // Inject CSS styles (more targeted)
  function injectStyles() {
    const styleEl = document.createElement('style');
    styleEl.textContent = `
      /* House of Vibes Extension - Light Touch Styles */
      
      /* Theme variables */
      :root {
        --theme-primary: #4ec5d4;
        --theme-secondary: #72c6ef;
        --theme-background: linear-gradient(135deg, #4ec5d4 0%, #72c6ef 100%);
      }
      
      /* ONLY apply background to body */
      body {
        background: var(--theme-background) !important;
      }
      
      /* Light styling for text readability */
      .sidebar *,
      nav *,
      aside * {
        color: white !important;
        text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
      }
      
      /* Keep original button functionality, just style them */
      .hov-theme-button,
      .hov-file-button {
        background: linear-gradient(135deg, var(--theme-primary) 0%, var(--theme-secondary) 100%) !important;
        color: white !important;
        border: none !important;
        transition: all 0.3s ease !important;
      }
      
      /* File Browser Styles */
      .hov-file-browser {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        border-radius: 20px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        width: 800px;
        height: 600px;
        z-index: 10001;
        display: none;
      }
      
      .hov-file-header {
        background: linear-gradient(135deg, var(--theme-primary) 0%, var(--theme-secondary) 100%);
        padding: 20px;
        border-radius: 20px 20px 0 0;
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      
      .hov-file-content {
        padding: 20px;
        height: calc(100% - 80px);
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
        border: 2px solid #eee;
      }
      
      .hov-file-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        border-color: var(--theme-primary);
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
      }
      
      .hov-file-info {
        color: #666;
        font-size: 14px;
      }
      
      .hov-close-btn {
        background: rgba(255,255,255,0.2) !important;
        border: none !important;
        color: white !important;
        width: 40px !important;
        height: 40px !important;
        border-radius: 50% !important;
        font-size: 20px !important;
        cursor: pointer !important;
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
    
    document.body.style.background = theme.background;
    
    // Update buttons
    document.querySelectorAll('.hov-theme-button, .hov-file-button').forEach(btn => {
      if (btn) {
        btn.style.background = `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)`;
      }
    });
    
    currentTheme = themeName;
    console.log(`Applied theme: ${theme.name}`);
  }

  // Create file browser
  function createFileBrowser() {
    const browser = document.createElement('div');
    browser.className = 'hov-file-browser';
    
    const header = document.createElement('div');
    header.className = 'hov-file-header';
    header.innerHTML = `
      <h3>📁 File Explorer</h3>
      <button class="hov-close-btn">×</button>
    `;
    
    const content = document.createElement('div');
    content.className = 'hov-file-content';
    
    const grid = document.createElement('div');
    grid.className = 'hov-file-grid';
    
    mockFiles.forEach(file => {
      const card = document.createElement('div');
      card.className = 'hov-file-card';
      card.innerHTML = `
        <div class="hov-file-icon">${file.icon}</div>
        <div class="hov-file-name">${file.name}</div>
        <div class="hov-file-info">${file.type === 'folder' ? `${file.items} items` : file.size}<br>Modified ${file.modified}</div>
      `;
      grid.appendChild(card);
    });
    
    content.appendChild(grid);
    browser.appendChild(header);
    browser.appendChild(content);
    document.body.appendChild(browser);
    
    // Close button
    header.querySelector('.hov-close-btn').onclick = () => {
      browser.style.display = 'none';
    };
    
    return browser;
  }

  // Create theme switcher
  function createThemeSwitcher() {
    const container = document.createElement('div');
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
      padding: 12px 24px;
      border-radius: 30px;
      cursor: pointer;
      font-size: 16px;
      font-weight: bold;
      box-shadow: 0 4px 20px rgba(0,0,0,0.2);
    `;
    
    const dropdown = document.createElement('div');
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
    `;
    
    Object.keys(themes).forEach(themeName => {
      const option = document.createElement('div');
      option.innerHTML = themes[themeName].name;
      option.style.cssText = `
        padding: 15px 20px;
        cursor: pointer;
        color: #333;
        font-size: 16px;
        transition: background 0.2s ease;
      `;
      
      option.onmouseenter = () => option.style.background = '#f0f0f0';
      option.onmouseleave = () => option.style.background = 'transparent';
      option.onclick = (e) => {
        e.stopPropagation();
        applyTheme(themeName);
        dropdown.style.display = 'none';
      };
      
      dropdown.appendChild(option);
    });
    
    // Make draggable 
    let isDragging = false;
    let startX, startY;
    
    button.onmousedown = (e) => {
      isDragging = true;
      startX = e.clientX - container.offsetLeft;
      startY = e.clientY - container.offsetTop;
      e.preventDefault();
    };
    
    document.onmousemove = (e) => {
      if (!isDragging) return;
      e.preventDefault();
      container.style.left = (e.clientX - startX) + 'px';
      container.style.top = (e.clientY - startY) + 'px';
      container.style.right = 'auto';
    };
    
    document.onmouseup = () => {
      isDragging = false;
    };
    
    button.onclick = (e) => {
      if (!isDragging) {
        e.stopPropagation();
        dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
      }
    };
    
    // Close dropdown on outside click
    document.onclick = (e) => {
      if (!container.contains(e.target)) {
        dropdown.style.display = 'none';
      }
    };
    
    container.appendChild(button);
    container.appendChild(dropdown);
    document.body.appendChild(container);
    
    return container;
  }

  // Create file browser button
  function createFileBrowserButton() {
    const button = document.createElement('button');
    button.className = 'hov-file-button';
    button.innerHTML = '📁 Files';
    button.style.cssText = `
      position: fixed;
      bottom: 30px;
      right: 30px;
      z-index: 9999;
      padding: 15px 25px;
      border-radius: 50px;
      cursor: pointer;
      font-size: 18px;
      font-weight: bold;
      box-shadow: 0 4px 20px rgba(0,0,0,0.2);
    `;
    
    button.onclick = () => {
      const browser = document.querySelector('.hov-file-browser');
      if (browser) {
        browser.style.display = browser.style.display === 'none' ? 'block' : 'none';
      }
    };
    
    document.body.appendChild(button);
    return button;
  }

  // Initialize extension
  function init() {
    console.log('House of Vibes Extension loaded! 🎉');
    
    // Wait a bit for TypingMind to load
    setTimeout(() => {
      injectStyles();
      createThemeSwitcher();
      createFileBrowserButton();
      createFileBrowser();
      applyTheme('ocean');
    }, 1000);
  }

  // Load when ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
