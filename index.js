// House of Vibes Extension - Theme Switcher
// Version 1.0 - Working theme system

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
    
    currentTheme = themeName;
    console.log(`Applied theme: ${theme.name}`);
  }

  // Create theme switcher dropdown
  function createThemeSwitcher() {
    const container = document.createElement('div');
    container.style.cssText = `
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  cursor: move;
`;
    `;
    
    const button = document.createElement('button');
    button.innerHTML = '🎨 Themes';
    button.style.cssText = `
      background: var(--theme-primary, #4ec5d4);
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 25px;
      cursor: pointer;
      font-size: 14px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    `;
    
    const dropdown = document.createElement('div');
    dropdown.style.cssText = `
      position: absolute;
      top: 100%;
      right: 0;
      background: white;
      border-radius: 10px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
      display: none;
      min-width: 150px;
      margin-top: 5px;
    `;
    
    // Add theme options
    Object.keys(themes).forEach(themeName => {
      const option = document.createElement('div');
      option.innerHTML = themes[themeName].name;
      option.style.cssText = `
        padding: 10px 15px;
        cursor: pointer;
        color: #333;
        border-radius: 5px;
      `;
      
      option.addEventListener('mouseenter', () => {
        option.style.background = '#f0f0f0';
      });
      
      option.addEventListener('mouseleave', () => {
        option.style.background = 'transparent';
      });
      
      option.addEventListener('click', () => {
        applyTheme(themeName);
        dropdown.style.display = 'none';
      });
      
      dropdown.appendChild(option);
    });
    
    // Toggle dropdown
    button.addEventListener('click', () => {
      dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
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
    // Make button draggable
let isDragging = false;
let currentX = 0;
let currentY = 0;
let initialX = 0;
let initialY = 0;

container.addEventListener('mousedown', (e) => {
  if (e.target === button && !e.target.closest('div[style*="background: white"]')) {
    isDragging = true;
    initialX = e.clientX - currentX;
    initialY = e.clientY - currentY;
    container.style.cursor = 'grabbing';
  }
});

document.addEventListener('mousemove', (e) => {
  if (isDragging) {
    e.preventDefault();
    currentX = e.clientX - initialX;
    currentY = e.clientY - initialY;
    container.style.transform = `translate(${currentX}px, ${currentY}px)`;
  }
});

document.addEventListener('mouseup', () => {
  if (isDragging) {
    isDragging = false;
    container.style.cursor = 'move';
  }
});
    
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
