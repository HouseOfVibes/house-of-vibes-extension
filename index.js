// House of Vibes Extension - Theme Switcher
// Version 1.0 - Basic theme system

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
    }
  };

  // Create theme switcher button
  function createThemeSwitcher() {
    const button = document.createElement('button');
    button.innerHTML = '🎨 Themes';
    button.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 9999;
      background: var(--theme-primary, #4ec5d4);
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 25px;
      cursor: pointer;
      font-size: 14px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    `;
    
    document.body.appendChild(button);
    return button;
  }

  // Initialize extension
  function init() {
    console.log('House of Vibes Extension loaded! 🎉');
    createThemeSwitcher();
  }

  // Wait for page to load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
