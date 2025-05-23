// House of Vibes Extension Loader
// Version 2.0 - Loads the modern themes extension

(function() {
  console.log('🏠 House of Vibes Extension Loader v2.0 initializing...');
  
  // Function to load external scripts
  function loadScript(url, callback) {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url + '?v=' + Date.now(); // Cache busting
    
    script.onload = function() {
      console.log('✅ Script loaded successfully:', url);
      if (callback) callback();
    };
    
    script.onerror = function() {
      console.error('❌ Failed to load script:', url);
    };
    
    document.head.appendChild(script);
  }
  
  // Function to check if we're on TypingMind
  function isTypingMind() {
    // Check various indicators that we're on TypingMind
    return (
      window.location.hostname.includes('typingmind') ||
      document.querySelector('[class*="chat"]') !== null ||
      document.querySelector('[class*="message"]') !== null
    );
  }
  
  // Initialize the extension
  function initialize() {
    console.log('🚀 Initializing House of Vibes Extension...');
    
    // Only load on TypingMind or similar chat interfaces
    if (!isTypingMind()) {
      console.log('⚠️ Not on TypingMind, extension will not load');
      return;
    }
    
    // Load the themes extension
    const themesUrl = 'https://houseofvibes.github.io/house-of-vibes-extension/themes-v2.js';
    
    loadScript(themesUrl, function() {
      console.log('🎨 House of Vibes Themes v2.0 loaded successfully!');
      
      // Show a welcome message (optional)
      setTimeout(() => {
        showWelcomeMessage();
      }, 2000);
    });
    
    // Future: Load additional extensions here
    // loadScript('https://houseofvibes.github.io/house-of-vibes-extension/another-extension.js');
  }
  
  // Optional: Show a welcome notification
  function showWelcomeMessage() {
    // Check if we've already shown the welcome message
    const hasShownWelcome = localStorage.getItem('hov-welcome-shown-v2');
    
    if (!hasShownWelcome) {
      const welcomeDiv = document.createElement('div');
      welcomeDiv.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        background: rgba(255, 255, 255, 0.95);
        padding: 20px;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        max-width: 300px;
        z-index: 10000;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        animation: slideIn 0.5s ease-out;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(0, 0, 0, 0.05);
      `;
      
      welcomeDiv.innerHTML = `
        <div style="display: flex; align-items: center; margin-bottom: 10px;">
          <span style="font-size: 24px; margin-right: 10px;">🏠</span>
          <strong style="font-size: 16px; color: #1f2937;">House of Vibes v2.0</strong>
        </div>
        <p style="color: #4b5563; font-size: 14px; line-height: 1.5; margin: 0;">
          Your themes are ready! Click the 🎨 button in the top-right corner to explore 10 beautiful themes.
        </p>
        <button onclick="this.parentElement.remove(); localStorage.setItem('hov-welcome-shown-v2', 'true');" 
                style="margin-top: 15px; padding: 8px 16px; background: #3b9ddb; color: white; border: none; 
                       border-radius: 6px; cursor: pointer; font-size: 14px; font-weight: 500;">
          Got it!
        </button>
        <style>
          @keyframes slideIn {
            from {
              transform: translateX(-100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
        </style>
      `;
      
      document.body.appendChild(welcomeDiv);
      
      // Auto-remove after 10 seconds
      setTimeout(() => {
        if (welcomeDiv.parentElement) {
          welcomeDiv.style.animation = 'slideIn 0.5s ease-out reverse';
          setTimeout(() => welcomeDiv.remove(), 500);
        }
      }, 10000);
    }
  }
  
  // Start initialization when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    initialize();
  }
  
  // Also try to initialize on load (backup)
  window.addEventListener('load', function() {
    // Double-check initialization after everything loads
    setTimeout(initialize, 1000);
  });
  
  console.log('🏠 House of Vibes Extension Loader ready');
})();
