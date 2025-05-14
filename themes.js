// House of Vibes - Themes Extension
// Version 1.2 - Refined Modern Colors

(function() {
  console.log('🎨 House of Vibes Themes loading...');
  
  // Refined color palette - softer, more sophisticated
  const themes = {
    sunset: {
      name: "🌅 Sunset Vibes",
      primary: "#ff8b7a",    // Softer coral
      secondary: "#ffa8bc",  // Soft pink
      background: "linear-gradient(135deg, #fff2f0 0%, #ffe8ed 30%, #ffd1dc 100%)"
    },
    ocean: {
      name: "🌊 Ocean Breeze",
      primary: "#6bb6d6",    // Softer blue
      secondary: "#a8d5e5",  // Light blue
      background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 30%, #b8e6ff 100%)"
    },
    spring: {
      name: "🌿 Spring Fresh",
      primary: "#4ade80",    // Fresh green
      secondary: "#86efac",  // Mint green
      background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 30%, #bbf7d0 100%)"
    },
    tropical: {
      name: "🏝️ Tropical",
      primary: "#06b6d4",    // Cyan
      secondary: "#22d3ee",  // Light cyan
      background: "linear-gradient(135deg, #f0fdfa 0%, #e6fffa 30%, #ccfbf1 100%)"
    },
    energy: {
      name: "🔥 Energy Burst",
      primary: "#fb923c",    // Warm orange
      secondary: "#fdba74",  // Light orange
      background: "linear-gradient(135deg, #fff7ed 0%, #ffedd5 30%, #fed7aa 100%)"
    },
    focus: {
      name: "⚡ Focus Mode",
      primary: "#6366f1",    // Clean indigo
      secondary: "#a5b4fc",  // Soft indigo
      background: "linear-gradient(135deg, #f8faff 0%, #eef2ff 30%, #e0e7ff 100%)"
    },
    calm: {
      name: "🧘 Calm Focus",
      primary: "#a855f7",    // Soft purple
      secondary: "#c084fc",  // Light purple
      background: "linear-gradient(135deg, #faf5ff 0%, #f3e8ff 30%, #e9d5ff 100%)"
    },
    professional: {
      name: "💼 Professional",
      primary: "#1e40af",    // Navy blue
      secondary: "#3b82f6",  // Blue
      background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)"
    },
    creative: {
      name: "🎨 Creative Flow",
      primary: "#ec4899",    // Rose
      secondary: "#8b5cf6",  // Purple
      background: "linear-gradient(135deg, #fdf2f8 0%, #fae8ff 25%, #f3e8ff 50%, #ede9fe 75%, #f0f9ff 100%)"
    },
    action: {
      name: "🎯 Action Time",
      primary: "#10b981",    // Emerald
      secondary: "#34d399",  // Light emerald
      background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 30%, #a7f3d0 100%)"
    }
  };

  let currentTheme = 'ocean';

  // Inject refined theme styles
  function injectThemeStyles() {
    const styleEl = document.createElement('style');
    styleEl.id = 'house-of-vibes-themes';
    styleEl.textContent = `
      /* House of Vibes - Refined Theme System */
      
      /* Theme CSS variables */
      :root {
        --hov-primary: #6bb6d6;
        --hov-secondary: #a8d5e5;
        --hov-background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 30%, #b8e6ff 100%);
      }
      
      /* Subtle, elegant gradient background */
      body {
        background: var(--hov-background) !important;
        transition: background 0.5s ease;
      }
      
      /* Refined sidebar with subtle color blend */
      aside,
      nav,
      .sidebar,
      [class*="w-64"],
      [class*="w-60"],
      .fixed.left-0 {
        background: 
          linear-gradient(180deg, 
            rgba(255, 255, 255, 0.95) 0%, 
            rgba(255, 255, 255, 0.9) 50%,
            rgba(255, 255, 255, 0.85) 100%
          ) !important;
        backdrop-filter: blur(20px) saturate(1.2) !important;
        border-right: 1px solid rgba(0, 0, 0, 0.1) !important;
        box-shadow: 2px 0 10px rgba(0, 0, 0, 0.05) !important;
      }
      
      /* High contrast, readable text in sidebar */
      aside *,
      nav *,
      .sidebar *,
      [class*="w-64"] *,
      [class*="w-60"] * {
        color: #1f2937 !important;
        text-shadow: none !important;
      }
      
      /* Refined sidebar buttons with subtle hover effects */
      aside button,
      nav button,
      .sidebar button {
        background: rgba(255, 255, 255, 0.8) !important;
        border: 1px solid rgba(0, 0, 0, 0.1) !important;
        border-radius: 8px !important;
        transition: all 0.2s ease !important;
        color: #374151 !important;
      }
      
      aside button:hover,
      nav button:hover,
      .sidebar button:hover {
        background: rgba(255, 255, 255, 0.95) !important;
        border-color: var(--hov-primary) !important;
        transform: translateX(3px) !important;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
      }
      
      /* Clean input fields */
      input, textarea {
        background: rgba(255, 255, 255, 0.95) !important;
        color: #1f2937 !important;
        border: 2px solid rgba(0, 0, 0, 0.1) !important;
        border-radius: 8px !important;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1) !important;
        transition: border-color 0.2s ease !important;
      }
      
      input:focus, textarea:focus {
        border-color: var(--hov-primary) !important;
        outline: none !important;
        box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1) !important;
      }
      
      /* Theme container with glass effect */
      .hov-theme-container {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
      }
      
      /* Modern theme button */
      .hov-theme-btn {
        background: rgba(255, 255, 255, 0.95) !important;
        color: var(--hov-primary) !important;
        border: 2px solid var(--hov-primary) !important;
        padding: 12px 24px !important;
        border-radius: 25px !important;
        cursor: pointer !important;
        font-size: 16px !important;
        font-weight: 600 !important;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1) !important;
        transition: all 0.3s ease !important;
        user-select: none !important;
        backdrop-filter: blur(10px) !important;
      }
      
      .hov-theme-btn:hover {
        background: var(--hov-primary) !important;
        color: white !important;
        transform: translateY(-2px) !important;
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15) !important;
      }
      
      /* Clean dropdown */
      .hov-theme-dropdown {
        position: absolute;
        top: 100%;
        right: 0;
        background: rgba(255, 255, 255, 0.98);
        border-radius: 15px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
        display: none;
        min-width: 220px;
        margin-top: 8px;
        overflow: hidden;
        backdrop-filter: blur(20px);
        border: 1px solid rgba(0, 0, 0, 0.1);
      }
      
      .hov-theme-option {
        padding: 15px 20px;
        cursor: pointer;
        color: #374151 !important;
        font-size: 16px;
        font-weight: 500;
        transition: all 0.2s ease;
        border-left: 3px solid transparent;
      }
      
      .hov-theme-option:hover {
        background: #f9fafb;
        border-left-color: var(--hov-primary);
        transform: translateX(3px);
      }
      
      /* Smooth, subtle animations */
      * {
        transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
      }
    `;
    
    // Remove any existing style
    const existing = document.getElementById('house-of-vibes-themes');
    if (existing) existing.remove();
    
    document.head.appendChild(styleEl);
  }

  // Apply specific theme with refined colors
  function applyTheme(themeName) {
    const theme = themes[themeName];
    if (!theme) return;
    
    // Update CSS variables
    document.documentElement.style.setProperty('--hov-primary', theme.primary);
    document.documentElement.style.setProperty('--hov-secondary', theme.secondary);
    document.documentElement.style.setProperty('--hov-background', theme.background);
    
    // Apply background immediately
    document.body.style.background = theme.background;
    
    // Update theme button colors
    const themeBtn = document.querySelector('.hov-theme-btn');
    if (themeBtn) {
      themeBtn.style.borderColor = theme.primary;
      themeBtn.style.color = theme.primary;
    }
    
    currentTheme = themeName;
    localStorage.setItem('hov-theme', themeName);
    console.log(`🌈 Applied refined theme: ${theme.name}`);
  }

  // Create theme switcher with modern design
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
        option.style.background = '#f3f4f6';
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
    
    // Draggable functionality (same as before)
    let isDragging = false;
    let startX, startY;
    
    button.addEventListener('mousedown', (e) => {
      e.preventDefault();
      isDragging = true;
      
      const rect = container.getBoundingClientRect();
      startX = e.clientX - rect.left;
      startY = e.clientY - rect.top;
      
      container.style.cursor = 'grabbing';
      document.body.style.userSelect = 'none';
    });
    
    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
      
      const newX = e.clientX - startX;
      const newY = e.clientY - startY;
      
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
