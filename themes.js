// House of Vibes - Themes Extension
// Version 1.1 - Fixed draggable button

(function() {
  console.log('🎨 House of Vibes Themes loading...');
  
  // All 10 mood themes
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

  // Inject theme styles
  function injectThemeStyles() {
    const styleEl = document.createElement('style');
    styleEl.id = 'house-of-vibes-themes';
    styleEl.textContent = `
      /* House of Vibes - Theme System */
      
      /* Theme CSS variables */
      :root {
        --hov-primary: #4ec5d4;
        --hov-secondary: #72c6ef;
        --hov-background: linear-gradient(135deg, #4ec5d4 0%, #72c6ef 100%);
      }
      
      /* Apply beautiful gradient background */
      body {
        background: var(--hov-background) !important;
        transition: background 0.5s ease;
      }
      
      /* Colorful sidebar that blends with theme */
      aside,
      nav,
      .sidebar,
      [class*="w-64"],
      [class*="w-60"],
      .fixed.left-0 {
        background: 
          linear-gradient(135deg, 
            var(--hov-primary) 0%, 
            rgba(255,255,255,0.2) 30%, 
            rgba(255,255,255,0.1) 100%
          ) !important;
        backdrop-filter: blur(20px) !important;
        border-right: 2px solid rgba(255,255,255,0.3) !important;
      }
      
      /* White text in sidebar */
      aside *,
      nav *,
      .sidebar *,
      [class*="w-64"] *,
      [class*="w-60"] * {
        color: white !important;
        text-shadow: 1px 1px 3px rgba(0,0,0,0.4) !important;
      }
      
      /* Beautiful sidebar buttons */
      aside button,
      nav button,
      .sidebar button {
        background: linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.15) 100%) !important;
        border: 1px solid rgba(255,255,255,0.3) !important;
        border-radius: 12px !important;
        transition: all 0.3s ease !important;
        backdrop-filter: blur(10px) !important;
      }
      
      aside button:hover,
      nav button:hover,
      .sidebar button:hover {
        background: linear-gradient(135deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.25) 100%) !important;
        transform: translateX(8px) scale(1.02) !important;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2) !important;
      }
      
      /* Input fields with theme colors */
      input, textarea {
        background: rgba(255,255,255,0.95) !important;
        color: #333 !important;
        border: 2px solid var(--hov-primary) !important;
        border-radius: 10px !important;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1) !important;
      }
      
      /* Theme container */
      .hov-theme-container {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
      }
      
      /* Theme switcher button */
      .hov-theme-btn {
        background: linear-gradient(135deg, var(--hov-primary) 0%, var(--hov-secondary) 100%) !important;
        color: white !important;
        border: none !important;
        padding: 12px 24px !important;
        border-radius: 30px !important;
        cursor: pointer !important;
        font-size: 16px !important;
        font-weight: bold !important;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2) !important;
        transition: all 0.3s ease !important;
        user-select: none !important;
      }
      
      .hov-theme-btn:hover {
        transform: scale(1.05) !important;
        box-shadow: 0 6px 25px rgba(0,0,0,0.3) !important;
      }
      
      /* Theme dropdown */
      .hov-theme-dropdown {
        position: absolute;
        top: 100%;
        right: 0;
        background: white;
        border-radius: 15px;
        box-shadow: 0 8px 30px rgba(0,0,0,0.15);
        display: none;
        min-width: 200px;
        margin-top: 8px;
        overflow: hidden;
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255,255,255,0.2);
      }
      
      .hov-theme-option {
        padding: 15px 20px;
        cursor: pointer;
        color: #333 !important;
        font-size: 16px;
        font-weight: 500;
        transition: all 0.2s ease;
        border-left: 4px solid transparent;
      }
      
      .hov-theme-option:hover {
        background: #f8f9fa;
        transform: translateX(5px);
      }
      
      /* Smooth animations */
      * {
        transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease;
      }
    `;
    
    // Remove any existing style
    const existing = document.getElementById('house-of-vibes-themes');
    if (existing) existing.remove();
    
    document.head.appendChild(styleEl);
  }

  // Apply specific theme
  function applyTheme(themeName) {
    const theme = themes[themeName];
    if (!theme) return;
    
    // Update CSS variables
    document.documentElement.style.setProperty('--hov-primary', theme.primary);
    document.documentElement.style.setProperty('--hov-secondary', theme.secondary);
    document.documentElement.style.setProperty('--hov-background', theme.background);
    
    // Apply background immediately
    document.body.style.background = theme.background;
    
    // Update theme button color
    const themeBtn = document.querySelector('.hov-theme-btn');
    if (themeBtn) {
      themeBtn.style.background = `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)`;
    }
    
    currentTheme = themeName;
    localStorage.setItem('hov-theme', themeName);
    console.log(`🌈 Applied theme: ${theme.name}`);
  }

  // Create theme switcher with proper dragging
  function createThemeSwitcher() {
    const container = document.createElement('div');
    container.className = 'hov-theme-container';
    
    const button = document.createElement('button');
    button.className = 'hov-theme-btn';
    button.textContent = '🎨 Themes';
    
    const dropdown = document.createElement('div');
    dropdown.className = 'hov-theme-dropdown';
    
    // Add theme options
    Object.keys(themes).forEach(themeName => {
      const option = document.createElement('div');
      option.className = 'hov-theme-option';
      option.textContent = themes[themeName].name;
      
      option.addEventListener('mouseenter', () => {
        option.style.background = '#f0f0f0';
        option.style.borderLeftColor = themes[themeName].primary;
      });
      
      option.addEventListener('mouseleave', () => {
        option.style.background = 'transparent';
        option.style.borderLeftColor = 'transparent';
      });
      
      option.addEventListener('click', (e) => {
        e.stopPropagation();
        applyTheme(themeName);
        dropdown.style.display = 'none';
      });
      
      dropdown.appendChild(option);
    });
    
    // Make draggable - FIXED version
    let isDragging = false;
    let startX, startY;
    
    button.addEventListener('mousedown', (e) => {
      e.preventDefault();
      isDragging = true;
      
      // Calculate offset from button click to container corner
      const rect = container.getBoundingClientRect();
      startX = e.clientX - rect.left;
      startY = e.clientY - rect.top;
      
      container.style.cursor = 'grabbing';
      document.body.style.userSelect = 'none';
    });
    
    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
      
      // Calculate new position
      const newX = e.clientX - startX;
      const newY = e.clientY - startY;
      
      // Keep button on screen
      const maxX = window.innerWidth - container.offsetWidth;
      const maxY = window.innerHeight - container.offsetHeight;
      
      const constrainedX = Math.max(0, Math.min(newX, maxX));
      const constrainedY = Math.max(0, Math.min(newY, maxY));
      
      // Update position
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
    
    // Toggle dropdown (prevent if dragging)
    button.addEventListener('click', (e) => {
      if (!isDragging) {
        e.stopPropagation();
        dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
      }
    });
    
    // Close dropdown on outside click
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

  // Initialize themes extension
  function init() {
    console.log('🎨 Initializing House of Vibes Themes...');
    
    // Wait for page to be ready
    setTimeout(() => {
      injectThemeStyles();
      createThemeSwitcher();
      
      // Load saved theme or default to ocean
      const savedTheme = localStorage.getItem('hov-theme') || 'ocean';
      applyTheme(savedTheme);
      
      console.log('✅ House of Vibes Themes ready!');
    }, 1000);
  }

  // Start when page loads
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
