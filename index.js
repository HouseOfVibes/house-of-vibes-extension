// House of Vibes Extension - Theme Switcher with Draggable Button
// Version 1.1 - Working theme system with movable button

(function() {
  // Theme Configuration
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
      button.style.background = theme.primary;
    }
    
    currentTheme = themeName;
    console.log(`Applied theme: ${theme.name}`);
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
      background: var(--theme-primary, #4ec5d4);
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 25px;
      cursor: pointer;
      font-size: 14px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.2);
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
      border-radius: 10px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
      display: none;
      min-width: 180px;
      margin-top: 5px;
      overflow: hidden;
    `;
    
    // Add theme options
    Object.keys(themes).forEach(themeName => {
      const option = document.createElement('div');
      option.innerHTML = themes[themeName].name;
      option.className = 'hov-theme-option';
      option.style.cssText = `
        padding: 12px 15px;
        cursor: pointer;
        color: #333;
        font-size: 14px;
        transition: background 0.2s ease;
      `;
      
      option.addEventListener('mouseenter', () => {
        option.style.background = '#f0f0f0';
      });
      
      option.addEventListener('mouseleave', () => {
        option.style.background = 'transparent';
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
    let containerStartX = 0;
    let containerStartY = 0;
    
    // Make container draggable
    button.addEventListener('mousedown', (e) => {
      e.preventDefault();
      isDragging = true;
      
      // Store where the mouse was clicked relative to the button
      const rect = container.getBoundingClientRect();
      dragStartX = e.clientX - rect.left;
      dragStartY = e.clientY - rect.top;
      
      container.style.cursor = 'grabbing';
      document.body.style.userSelect = 'none';
    });
    
    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      
      e.preventDefault();
      
      // Calculate new position
      const newX = e.clientX - dragStartX;
      const newY = e.clientY - dragStartY;
      
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

  // Initialize extension
  function init() {
    console.log('House of Vibes Extension loaded! 🎉');
    createThemeSwitcher();
    applyTheme('ocean'); // Start with ocean theme
  }

  // Wait for page to load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
