// House of Vibes - Themes Extension
// Version 2.1 - Contemporary Digital 2025 Edition with Accessibility & Touch Support

(function() {
  console.log('🎨 House of Vibes Themes v2.1 loading...');

  // Modern 2025 color palette - more vibrant yet balanced
  const themes = {
    // ... [same as before, unchanged] ...
    // [Insert your existing themes object here]
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
    // ... [same as before] ...
    // [Insert your existing injectThemeStyles function here]
  }

  // Apply specific theme with refined colors
  function applyTheme(themeName) {
    const theme = themes[themeName];
    if (!theme) {
      console.error(`Theme "${themeName}" not found.`);
      return;
    }

    // ... [same as before] ...

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
