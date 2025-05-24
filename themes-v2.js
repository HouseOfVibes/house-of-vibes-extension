// House of Vibes - Themes Extension
// Version 2.1 - Contemporary Digital 2025 Edition with Accessibility & Touch Support

(function() {
  console.log('🎨 House of Vibes Themes v2.1 loading...');

  // Modern 2025 color palette - more vibrant yet balanced
  const themes = {
    sunset: {
      name: "🌅 Sunset",
      primary: "#ff6b5b",
      secondary: "#ff8fa0",
      background: "linear-gradient(135deg, #ffe2dd 0%, #ffd1e0 100%)",
      sidebarColor: "#fff5f5",
      accentColor: "#ff3d7f",
      textColor: "#1f2937",
      isDark: false
    },
    ocean: {
      name: "🌊 Ocean",
      primary: "#3b9ddb",
      secondary: "#64c4ff",
      background: "#e0f7ff",
      sidebarColor: "#f0fcff",
      accentColor: "#0077c2",
      textColor: "#1f2937",
      isDark: false
    },
    spring: {
      name: "🌿 Spring",
      primary: "#38c172",
      secondary: "#5eead4",
      background: "linear-gradient(135deg, #eaffef 0%, #dfffdc 100%)",
      sidebarColor: "#f5fff7",
      accentColor: "#0da678",
      textColor: "#1f2937",
      isDark: false
    },
    cyber: {
      name: "💻 Cybernetic",
      primary: "#7209b7",
      secondary: "#3a0ca3",
      background: "linear-gradient(135deg, #f0e7ff 0%, #e0c3fc 100%)",
      sidebarColor: "#f8f2ff",
      accentColor: "#4cc9f0",
      textColor: "#1f2937",
      isDark: false
    },
    retro: {
      name: "🕹️ Retrofuture",
      primary: "#ff8500",
      secondary: "#ff5252",
      background: "#fffaf0",
      sidebarColor: "#fff9e6",
      accentColor: "#ff0066",
      textColor: "#1f2937",
      isDark: false
    },
    minimal: {
      name: "✨ Minimal",
      primary: "#444444",
      secondary: "#999999",
      background: "#fafafa",
      sidebarColor: "#ffffff",
      accentColor: "#5e5e5e",
      textColor: "#1f2937",
      isDark: false
    },
    nightmode: {
      name: "🌃 Night Mode",
      primary: "#82dbff",
      secondary: "#c8a2ff",
      background: "#1a1a2e",
      sidebarColor: "#16213e",
      accentColor: "#4f46e5",
      textColor: "#f3f4f6",
      isDark: true
    },
    neotokyo: {
      name: "🏙️ Neo Tokyo",
      primary: "#f637ec",
      secondary: "#ffd60a",
      background: "linear-gradient(135deg, #240046 0%, #3c096c 100%)",
      sidebarColor: "#240046",
      accentColor: "#00f5d4",
      textColor: "#f9fafb",
      isDark: true
    },
    forest: {
      name: "🌲 Forest",
      primary: "#4ade80",
      secondary: "#d9f99d",
      background: "#1e3a29",
      sidebarColor: "#1a2e21",
      accentColor: "#a3e635",
      textColor: "#f3f4f6",
      isDark: true
    },
    horizon: {
      name: "🌅 Horizon",
      primary: "#fb923c",
      secondary: "#fda4af",
      background: "linear-gradient(135deg, #042f4b 0%, #164773 100%)",
      sidebarColor: "#042f4b",
      accentColor: "#fef08a",
      textColor: "#f3f4f6",
      isDark: true
    }
  };

  let currentTheme = 'ocean';

  // Helper: safely set localStorage
  function safeSetStorage(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.warn('localStorage unavailable:', e);
    }
  }
  // Helper: safely get localStorage
  function safeGetStorage(key) {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      console.warn('localStorage unavailable:', e);
      return null;
    }
  }

  // Inject refined 2025 theme styles
  function injectThemeStyles() {
    const styleEl = document.createElement('style');
    styleEl.id = 'house-of-vibes-themes';
    styleEl.textContent = `
      /* House of Vibes - Contemporary Digital 2025 Theme System */
      :root {
        --hov-primary: #3b9ddb;
        --hov-secondary: #64c4ff;
        --hov-background: #e0f7ff;
        --hov-sidebar: #f0fcff;
        --hov-accent: #0077c2;
        --hov-text: #1f2937;
        --hov-text-secondary: #4b5563;
        --hov-border: rgba(0, 0, 0, 0.1);
        --hov-hover-bg: rgba(0, 0, 0, 0.03);
      }
      .theme-dark {
        --hov-text: #f3f4f6;
        --hov-text-secondary: #d1d5db;
        --hov-border: rgba(255, 255, 255, 0.1);
        --hov-hover-bg: rgba(255, 255, 255, 0.05);
      }
      body {
        background: var(--hov-background) !important;
        color: var(--hov-text) !important;
        transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
      }
      aside, nav, .sidebar, [class*="w-64"], [class*="w-60"], .fixed.left-0 {
        background: var(--hov-sidebar) !important;
        border-right: 1px solid var(--hov-border) !important;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.03) !important;
      }
      aside *, nav *, .sidebar *, [class*="w-64"] *, [class*="w-60"] * {
        color: var(--hov-text) !important;
      }
      aside h1, aside h2, aside h3, nav h1, nav h2, nav h3, .sidebar h1, .sidebar h2, .sidebar h3 {
        color: var(--hov-primary) !important;
        font-weight: 600 !important;
      }
      aside button, nav button, .sidebar button, .conversation-item, .nav-item {
        background: transparent !important;
        border: 1px solid var(--hov-border) !important;
        border-radius: 8px !important;
        transition: all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
        color: var(--hov-text) !important;
        position: relative;
        overflow: hidden;
      }
      aside button:hover, nav button:hover, .sidebar button:hover, .conversation-item:hover, .nav-item:hover {
        background: var(--hov-hover-bg) !important;
        border-color: var(--hov-primary) !important;
        transform: translateY(-1px) !important;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05) !important;
      }
      input, textarea {
        background: rgba(255, 255, 255, 0.9) !important;
        color: var(--hov-text) !important;
        border: 1px solid var(--hov-border) !important;
        border-radius: 8px !important;
        padding: 12px 16px !important;
        transition: all 0.2s ease !important;
      }
      .theme-dark input, .theme-dark textarea {
        background: rgba(30, 41, 59, 0.9) !important;
      }
      input:focus, textarea:focus {
        border-color: var(--hov-primary) !important;
        outline: none !important;
        box-shadow: 0 0 0 3px rgba(59, 157, 219, 0.2) !important;
      }
      .chat-message, .message, [class*="message-container"], [class*="chat-bubble"] {
        background: rgba(255, 255, 255, 0.85) !important;
        border-radius: 12px !important;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04) !important;
        border: 1px solid var(--hov-border) !important;
        backdrop-filter: blur(10px) !important;
        overflow: hidden !important;
        position: relative !important;
      }
      .theme-dark .chat-message, .theme-dark .message, .theme-dark [class*="message-container"], .theme-dark [class*="chat-bubble"] {
        background: rgba(30, 41, 59, 0.85) !important;
      }
      .chat-message.user::before, .message.user::before, [class*="user-message"]::before {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        height: 100%;
        width: 4px;
        background: var(--hov-primary);
      }
      .chat-message.assistant::before, .message.assistant::before, [class*="ai-message"]::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 4px;
        background: var(--hov-secondary);
      }
      .hov-theme-container {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      }
      .hov-theme-btn {
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        width: 40px !important;
        height: 40px !important;
        border-radius: 20px !important;
        background: rgba(255, 255, 255, 0.9) !important;
        backdrop-filter: blur(10px) !important;
        border: 1px solid var(--hov-border) !important;
        color: var(--hov-primary) !important;
        font-size: 20px !important;
        cursor: pointer !important;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08) !important;
        transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
        padding: 0 !important;
        outline: none !important;
      }
      .theme-dark .hov-theme-btn {
        background: rgba(30, 41, 59, 0.9) !important;
      }
      .hov-theme-btn:hover {
        transform: translateY(-2px) !important;
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1) !important;
        width: auto !important;
        padding: 0 20px !important;
      }
      .hov-theme-btn:hover::after {
        content: "Themes";
        margin-left: 8px;
        font-size: 14px;
        font-weight: 500;
        color: var(--hov-text);
      }
      .hov-theme-dropdown {
        position: absolute;
        top: 100%;
        right: 0;
        background: rgba(255, 255, 255, 0.98);
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        display: none;
        min-width: 200px;
        margin-top: 10px;
        overflow: hidden;
        backdrop-filter: blur(20px);
        border: 1px solid rgba(0, 0, 0, 0.06);
        padding: 8px;
      }
      .theme-dark .hov-theme-dropdown {
        background: rgba(30, 41, 59, 0.98);
        border-color: rgba(255, 255, 255, 0.06);
      }
      .hov-theme-option {
        padding: 10px 15px;
        cursor: pointer;
        color: var(--hov-text) !important;
        font-size: 14px;
        font-weight: 500;
        transition: all 0.2s ease;
        border-radius: 8px;
        display: flex;
        align-items: center;
        margin: 2px 0;
      }
      .hov-theme-option:hover {
        background: var(--hov-hover-bg);
        transform: translateX(3px);
      }
      .hov-theme-preview {
        width: 16px;
        height: 16px;
        border-radius: 4px;
        margin-right: 10px;
        border: 1px solid rgba(0, 0, 0, 0.1);
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
    if (!theme) {
      console.error(`Theme "${themeName}" not found.`);
      return;
    }

    // Update CSS variables
    document.documentElement.style.setProperty('--hov-primary', theme.primary);
    document.documentElement.style.setProperty('--hov-secondary', theme.secondary);
    document.documentElement.style.setProperty('--hov-background', theme.background);
    document.documentElement.style.setProperty('--hov-sidebar', theme.sidebarColor);
    document.documentElement.style.setProperty('--hov-accent', theme.accentColor);
    document.documentElement.style.setProperty('--hov-text', theme.textColor);
    document.documentElement.style.setProperty('--hov-text-secondary', theme.isDark ? '#d1d5db' : '#4b5563');

    // Apply background immediately
    document.body.style.background = theme.background;

    // Toggle dark mode class
    if (theme.isDark) {
      document.body.classList.add('theme-dark');
    } else {
      document.body.classList.remove('theme-dark');
    }

    // Update theme button colors
    const themeBtn = document.querySelector('.hov-theme-btn');
    if (themeBtn) {
      themeBtn.style.color = theme.primary;
    }

    currentTheme = themeName;
    safeSetStorage('hov-theme', themeName);
    console.log(`🌈 Applied theme: ${theme.name}`);
  }

  // Responsive reposition on resize
  function constrainAndRestorePosition(container) {
    const savedPosition = safeGetStorage('hov-theme-position');
    if (savedPosition) {
      try {
        const { x, y } = JSON.parse(savedPosition);
        const maxX = window.innerWidth - container.offsetWidth;
        const maxY = window.innerHeight - container.offsetHeight;
        container.style.left = Math.max(0, Math.min(x, maxX)) + 'px';
        container.style.top = Math.max(0, Math.min(y, maxY)) + 'px';
        container.style.right = 'auto';
        container.style.bottom = 'auto';
      } catch (e) {
        console.error('Error restoring theme position', e);
      }
    }
  }

  // Create modern compact theme switcher
  function createThemeSwitcher() {
    const container = document.createElement('div');
    container.className = 'hov-theme-container';
    container.tabIndex = 0; // For keyboard focus

    const button = document.createElement('button');
    button.className = 'hov-theme-btn';
    button.innerHTML = '🎨';
    button.setAttribute('title', 'Choose Theme');
    button.setAttribute('aria-haspopup', 'listbox');
    button.setAttribute('aria-expanded', 'false');
    button.tabIndex = 0;

    const dropdown = document.createElement('div');
    dropdown.className = 'hov-theme-dropdown';
    dropdown.setAttribute('role', 'listbox');
    dropdown.setAttribute('aria-label', 'Theme selection');

    // Add theme options with previews
    Object.keys(themes).forEach((themeName, idx) => {
      const option = document.createElement('div');
      option.className = 'hov-theme-option';
      option.setAttribute('role', 'option');
      option.setAttribute('tabindex', '-1');
      option.setAttribute('data-theme', themeName);

      // Create theme preview
      const preview = document.createElement('div');
      preview.className = 'hov-theme-preview';
      preview.style.background = themes[themeName].background;
      preview.style.border = `1px solid ${themes[themeName].primary}`;

      const nameSpan = document.createElement('span');
      nameSpan.textContent = themes[themeName].name;

      option.appendChild(preview);
      option.appendChild(nameSpan);

      option.addEventListener('click', (e) => {
        e.stopPropagation();
        applyTheme(themeName);
        dropdown.style.display = 'none';
        button.setAttribute('aria-expanded', 'false');
      });

      // Keyboard select
      option.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          option.click();
        }
      });

      dropdown.appendChild(option);
    });

    // Draggable functionality (mouse and touch)
    let isDragging = false, isTouchDragging = false;
    let clickStartTime = 0, startX, startY;

    // DRAG: Mouse
    button.addEventListener('mousedown', (e) => {
      e.preventDefault();
      clickStartTime = Date.now();
      const rect = container.getBoundingClientRect();
      startX = e.clientX - rect.left;
      startY = e.clientY - rect.top;
      setTimeout(() => {
        if (clickStartTime > 0) {
          isDragging = true;
          container.style.cursor = 'grabbing';
          document.body.style.userSelect = 'none';
        }
      }, 150);
    });
    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const newX = e.clientX - startX;
      const newY = e.clientY - startY;
      const maxX = window.innerWidth - container.offsetWidth;
      const maxY = window.innerHeight - container.offsetHeight;
      container.style.left = Math.max(0, Math.min(newX, maxX)) + 'px';
      container.style.top = Math.max(0, Math.min(newY, maxY)) + 'px';
      container.style.right = 'auto';
      container.style.bottom = 'auto';
    });
    document.addEventListener('mouseup', () => {
      if (isDragging) {
        isDragging = false;
        container.style.cursor = 'pointer';
        document.body.style.userSelect = '';
        const rect = container.getBoundingClientRect();
        safeSetStorage('hov-theme-position', JSON.stringify({ x: rect.left, y: rect.top }));
      }
      clickStartTime = 0;
    });

    // DRAG: Touch
    button.addEventListener('touchstart', (e) => {
      e.preventDefault();
      isTouchDragging = true;
      const rect = container.getBoundingClientRect();
      const touch = e.touches[0];
      startX = touch.clientX - rect.left;
      startY = touch.clientY - rect.top;
    });
    document.addEventListener('touchmove', (e) => {
      if (!isTouchDragging) return;
      const touch = e.touches[0];
      const newX = touch.clientX - startX;
      const newY = touch.clientY - startY;
      const maxX = window.innerWidth - container.offsetWidth;
      const maxY = window.innerHeight - container.offsetHeight;
      container.style.left = Math.max(0, Math.min(newX, maxX)) + 'px';
      container.style.top = Math.max(0, Math.min(newY, maxY)) + 'px';
      container.style.right = 'auto';
      container.style.bottom = 'auto';
    });
    document.addEventListener('touchend', () => {
      if (isTouchDragging) {
        isTouchDragging = false;
        const rect = container.getBoundingClientRect();
        safeSetStorage('hov-theme-position', JSON.stringify({ x: rect.left, y: rect.top }));
      }
    });

    // Toggle dropdown on click (not drag)
    button.addEventListener('click', (e) => {
      const clickDuration = Date.now() - clickStartTime;
      if (clickDuration < 150 && !isDragging && !isTouchDragging) {
        e.stopPropagation();
        dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
        button.setAttribute('aria-expanded', dropdown.style.display === 'block');
        // Focus first option for accessibility
        if (dropdown.style.display === 'block') {
          const firstOption = dropdown.querySelector('.hov-theme-option');
          if (firstOption) firstOption.focus();
        }
      }
    });

    // Keyboard navigation for dropdown
    button.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        dropdown.style.display = 'block';
        button.setAttribute('aria-expanded', 'true');
        const firstOption = dropdown.querySelector('.hov-theme-option');
        if (firstOption) firstOption.focus();
      }
    });
    dropdown.addEventListener('keydown', (e) => {
      const options = Array.from(dropdown.querySelectorAll('.hov-theme-option'));
      const idx = options.indexOf(document.activeElement);
      if (e.key === 'ArrowDown' && idx < options.length - 1) {
        options[idx + 1].focus();
        e.preventDefault();
      } else if (e.key === 'ArrowUp' && idx > 0) {
        options[idx - 1].focus();
        e.preventDefault();
      } else if (e.key === 'Escape') {
        dropdown.style.display = 'none';
        button.setAttribute('aria-expanded', 'false');
        button.focus();
      }
    });

    // Close dropdown on outside click
    document.addEventListener('click', (e) => {
      if (!container.contains(e.target)) {
        dropdown.style.display = 'none';
        button.setAttribute('aria-expanded', 'false');
      }
    });

    // Restore position if saved
    constrainAndRestorePosition(container);

    // Responsive: constrain on window resize
    window.addEventListener('resize', () => constrainAndRestorePosition(container));

    container.appendChild(button);
    container.appendChild(dropdown);
    document.body.appendChild(container);

    return container;
  }

  // Initialize themes extension
  function init() {
    console.log('🎨 Initializing House of Vibes Themes v2.1...');

    setTimeout(() => {
      injectThemeStyles();
      createThemeSwitcher();

      // Load saved theme or default to ocean
      const savedTheme = safeGetStorage('hov-theme') || 'ocean';
      applyTheme(savedTheme);

      console.log('✅ House of Vibes Themes v2.1 ready!');
    }, 1000);
  }

  // Start when page loads
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
