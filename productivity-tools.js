// House of Vibes - Productivity Tools Extension
// Version 1.0 - ADHD-friendly productivity features

(function() {
  console.log('⚡ House of Vibes Productivity Tools loading...');
  
  // Productivity state
  let pomodoroState = {
    isRunning: false,
    timeLeft: 25 * 60, // 25 minutes
    totalTime: 25 * 60,
    currentMode: 'work', // work, shortBreak, longBreak
    pomodoroCount: 0
  };
  
  let focusMode = false;
  let energyLevel = 80; // 0-100
  
  // Pomodoro settings
  const pomodoroSettings = {
    work: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60,
    cycles: 4
  };
  
  // Quick actions
  const quickActions = [
    { icon: '✅', label: 'New Task', action: () => createQuickTask() },
    { icon: '📝', label: 'Note', action: () => createQuickNote() },
    { icon: '⏰', label: 'Reminder', action: () => createReminder() },
    { icon: '🔍', label: 'Search', action: () => openQuickSearch() },
    { icon: '📞', label: 'Call Client', action: () => quickCallClient() },
    { icon: '📧', label: 'Email', action: () => openEmailDraft() }
  ];

  // Inject productivity styles
  function injectProductivityStyles() {
    const styleEl = document.createElement('style');
    styleEl.id = 'house-of-vibes-productivity';
    styleEl.textContent = `
      /* House of Vibes - Productivity Tools Styles */
      
      /* Productivity button */
      .hov-productivity-button {
        position: fixed;
        bottom: 240px;
        right: 30px;
        z-index: 9999;
        background: linear-gradient(135deg, var(--hov-primary, #8b5cf6) 0%, var(--hov-secondary, #ec4899) 100%);
        color: white;
        border: none;
        padding: 15px 25px;
        border-radius: 50px;
        cursor: move;
        font-size: 18px;
        font-weight: bold;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        transition: all 0.3s ease;
        user-select: none;
      }
      
      .hov-productivity-button:hover {
        transform: scale(1.05);
        box-shadow: 0 6px 25px rgba(0,0,0,0.3);
      }
      
      /* Productivity modal */
      .hov-productivity-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        backdrop-filter: blur(10px);
        z-index: 10001;
        display: none;
        align-items: center;
        justify-content: center;
      }
      
      .hov-productivity-container {
        background: white;
        border-radius: 20px;
        width: 95vw;
        max-width: 1000px;
        height: 85vh;
        max-height: 700px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }
      
      .hov-productivity-header {
        background: linear-gradient(135deg, var(--hov-primary, #8b5cf6) 0%, var(--hov-secondary, #ec4899) 100%);
        padding: 20px;
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: move;
      }
      
      .hov-productivity-title {
        font-size: 24px;
        font-weight: bold;
        text-shadow: 1px 1px 3px rgba(0,0,0,0.3);
      }
      
      .hov-productivity-tabs {
        display: flex;
        background: #f8fafc;
        border-bottom: 1px solid #e2e8f0;
      }
      
      .hov-productivity-tab {
        flex: 1;
        padding: 15px;
        text-align: center;
        cursor: pointer;
        background: transparent;
        border: none;
        font-size: 16px;
        font-weight: 500;
        transition: all 0.3s ease;
      }
      
      .hov-productivity-tab.active {
        background: white;
        color: var(--hov-primary, #8b5cf6);
        border-bottom: 3px solid var(--hov-primary, #8b5cf6);
      }
      
      .hov-productivity-content {
        padding: 30px;
        flex: 1;
        overflow-y: auto;
      }
      
      /* Pomodoro Timer */
      .hov-pomodoro-container {
        text-align: center;
      }
      
      .hov-pomodoro-display {
        width: 300px;
        height: 300px;
        border-radius: 50%;
        background: linear-gradient(135deg, var(--hov-primary, #8b5cf6) 0%, var(--hov-secondary, #ec4899) 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 20px auto;
        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        position: relative;
      }
      
      .hov-timer-text {
        font-size: 72px;
        font-weight: bold;
        color: white;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
      }
      
      .hov-progress-ring {
        position: absolute;
        top: -10px;
        left: -10px;
        transform: rotate(-90deg);
      }
      
      .hov-timer-mode {
        font-size: 24px;
        color: #333;
        margin-bottom: 20px;
        font-weight: 600;
      }
      
      .hov-timer-controls {
        display: flex;
        gap: 20px;
        justify-content: center;
        margin-top: 30px;
      }
      
      .hov-timer-btn {
        padding: 12px 30px;
        border: none;
        border-radius: 50px;
        font-size: 18px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
      }
      
      .hov-timer-btn.primary {
        background: linear-gradient(135deg, var(--hov-primary, #8b5cf6) 0%, var(--hov-secondary, #ec4899) 100%);
        color: white;
      }
      
      .hov-timer-btn.secondary {
        background: #f1f5f9;
        color: #475569;
      }
      
      .hov-timer-btn:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
      }
      
      /* Focus Mode */
      .hov-focus-container {
        text-align: center;
      }
      
      .hov-focus-toggle {
        width: 200px;
        height: 100px;
        background: #ddd;
        border-radius: 50px;
        position: relative;
        cursor: pointer;
        transition: all 0.3s ease;
        margin: 20px auto;
      }
      
      .hov-focus-toggle.active {
        background: linear-gradient(135deg, var(--hov-primary, #8b5cf6) 0%, var(--hov-secondary, #ec4899) 100%);
      }
      
      .hov-focus-slider {
        width: 90px;
        height: 90px;
        background: white;
        border-radius: 50%;
        position: absolute;
        top: 5px;
        left: 5px;
        transition: all 0.3s ease;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
      }
      
      .hov-focus-toggle.active .hov-focus-slider {
        left: 105px;
      }
      
      .hov-focus-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        backdrop-filter: blur(5px);
        z-index: 9998;
        display: none;
        align-items: center;
        justify-content: center;
      }
      
      .hov-focus-message {
        background: white;
        padding: 30px;
        border-radius: 20px;
        text-align: center;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
      }
      
      /* Energy Tracker */
      .hov-energy-container {
        text-align: center;
      }
      
      .hov-energy-meter {
        width: 100%;
        max-width: 400px;
        height: 30px;
        background: #e5e7eb;
        border-radius: 15px;
        overflow: hidden;
        margin: 20px auto;
        position: relative;
      }
      
      .hov-energy-fill {
        height: 100%;
        background: linear-gradient(90deg, #ef4444 0%, #f59e0b 25%, #10b981 50%, #06b6d4 75%, #8b5cf6 100%);
        border-radius: 15px;
        transition: width 0.5s ease;
      }
      
      .hov-energy-controls {
        display: flex;
        justify-content: center;
        gap: 20px;
        margin-top: 20px;
      }
      
      .hov-energy-btn {
        padding: 10px 20px;
        border: 2px solid var(--hov-primary, #8b5cf6);
        border-radius: 10px;
        background: white;
        color: var(--hov-primary, #8b5cf6);
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
      }
      
      .hov-energy-btn:hover {
        background: var(--hov-primary, #8b5cf6);
        color: white;
      }
      
      /* Quick Actions */
      .hov-actions-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 20px;
        margin-top: 20px;
      }
      
      .hov-action-card {
        background: white;
        border: 2px solid #f0f0f0;
        border-radius: 15px;
        padding: 20px;
        text-align: center;
        cursor: pointer;
        transition: all 0.3s ease;
      }
      
      .hov-action-card:hover {
        border-color: var(--hov-primary, #8b5cf6);
        transform: translateY(-5px);
        box-shadow: 0 8px 25px rgba(0,0,0,0.1);
      }
      
      .hov-action-icon {
        font-size: 48px;
        margin-bottom: 10px;
      }
      
      .hov-action-label {
        font-size: 16px;
        font-weight: 600;
        color: #333;
      }
      
      /* Celebrations */
      .hov-celebration {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 10003;
        text-align: center;
        animation: hov-celebrate 3s ease-in-out;
      }
      
      @keyframes hov-celebrate {
        0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
        20% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
        80% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        100% { transform: translate(-50%, -50%) scale(0.8); opacity: 0; }
      }
      
      .hov-celebration-text {
        font-size: 72px;
        color: var(--hov-primary, #8b5cf6);
        text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        margin-bottom: 20px;
      }
      
      .hov-celebration-message {
        font-size: 24px;
        color: #333;
        font-weight: 600;
      }
      
      /* Responsiveness */
      @media (max-width: 768px) {
        .hov-productivity-container {
          width: 98vw;
          height: 95vh;
        }
        
        .hov-pomodoro-display {
          width: 250px;
          height: 250px;
        }
        
        .hov-timer-text {
          font-size: 56px;
        }
      }
    `;
    
    // Remove any existing style
    const existing = document.getElementById('house-of-vibes-productivity');
    if (existing) existing.remove();
    
    document.head.appendChild(styleEl);
  }

  // Make element draggable
  function makeDraggable(element, handle = null) {
    const dragHandle = handle || element;
    let isDragging = false;
    let startX, startY;
    
    dragHandle.addEventListener('mousedown', (e) => {
      if (e.target.closest('.hov-productivity-close') || e.target.closest('.hov-productivity-tab')) return;
      
      isDragging = true;
      startX = e.clientX - element.offsetLeft;
      startY = e.clientY - element.offsetTop;
      element.style.cursor = 'move';
      e.preventDefault();
    });
    
    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
      
      const x = Math.max(0, Math.min(e.clientX - startX, window.innerWidth - element.offsetWidth));
      const y = Math.max(0, Math.min(e.clientY - startY, window.innerHeight - element.offsetHeight));
      
      element.style.left = x + 'px';
      element.style.top = y + 'px';
      element.style.right = 'auto';
      element.style.bottom = 'auto';
    });
    
    document.addEventListener('mouseup', () => {
      if (isDragging) {
        isDragging = false;
        element.style.cursor = '';
      }
    });
  }

  // Format time for display
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  // Show celebration
  function showCelebration(message, emoji) {
    const celebration = document.createElement('div');
    celebration.className = 'hov-celebration';
    celebration.innerHTML = `
      <div class="hov-celebration-text">${emoji}</div>
      <div class="hov-celebration-message">${message}</div>
    `;
    
    document.body.appendChild(celebration);
    
    setTimeout(() => {
      celebration.remove();
    }, 3000);
  }

  // Pomodoro functions
  function startPomodoro() {
    pomodoroState.isRunning = true;
    updatePomodoroDisplay();
    
    const timer = setInterval(() => {
      if (!pomodoroState.isRunning) {
        clearInterval(timer);
        return;
      }
      
      pomodoroState.timeLeft--;
      updatePomodoroDisplay();
      
      if (pomodoroState.timeLeft <= 0) {
        pomodoroState.isRunning = false;
        clearInterval(timer);
        handlePomodoroComplete();
      }
    }, 1000);
  }

  function pausePomodoro() {
    pomodoroState.isRunning = false;
    updatePomodoroDisplay();
  }

  function resetPomodoro() {
    pomodoroState.isRunning = false;
    pomodoroState.timeLeft = pomodoroSettings[pomodoroState.currentMode];
    pomodoroState.totalTime = pomodoroSettings[pomodoroState.currentMode];
    updatePomodoroDisplay();
  }

  function handlePomodoroComplete() {
    if (pomodoroState.currentMode === 'work') {
      pomodoroState.pomodoroCount++;
      if (pomodoroState.pomodoroCount % pomodoroSettings.cycles === 0) {
        pomodoroState.currentMode = 'longBreak';
        showCelebration('Time for a long break!', '🎉');
      } else {
        pomodoroState.currentMode = 'shortBreak';
        showCelebration('Time for a short break!', '☕');
      }
    } else {
      pomodoroState.currentMode = 'work';
      showCelebration('Back to work!', '💪');
    }
    
    pomodoroState.timeLeft = pomodoroSettings[pomodoroState.currentMode];
    pomodoroState.totalTime = pomodoroSettings[pomodoroState.currentMode];
    updatePomodoroDisplay();
  }

  function updatePomodoroDisplay() {
    const timerText = document.querySelector('.hov-timer-text');
    const modeText = document.querySelector('.hov-timer-mode');
    const startBtn = document.querySelector('.hov-timer-start');
    const progressRing = document.querySelector('.hov-progress-ring circle:last-child');
    
    if (timerText) {
      timerText.textContent = formatTime(pomodoroState.timeLeft);
    }
    
    if (modeText) {
      const modes = {
        work: '💼 Work Time',
        shortBreak: '☕ Short Break',
        longBreak: '🎉 Long Break'
      };
      modeText.textContent = modes[pomodoroState.currentMode];
    }
    
    if (startBtn) {
      startBtn.textContent = pomodoroState.isRunning ? 'Pause' : 'Start';
    }
    
    if (progressRing) {
      const progress = 1 - (pomodoroState.timeLeft / pomodoroState.totalTime);
      const circumference = 2 * Math.PI * 140;
      const offset = circumference * (1 - progress);
      progressRing.style.strokeDashoffset = offset;
    }
  }

  // Focus mode functions
  function toggleFocusMode() {
    focusMode = !focusMode;
    const toggle = document.querySelector('.hov-focus-toggle');
    const overlay = document.querySelector('.hov-focus-overlay');
    
    if (toggle) {
      toggle.classList.toggle('active', focusMode);
    }
    
    if (focusMode) {
      overlay.style.display = 'flex';
      showCelebration('Focus mode activated!', '🎯');
    } else {
      overlay.style.display = 'none';
      showCelebration('Focus mode deactivated', '✨');
    }
  }

  // Energy tracker functions
  function updateEnergyLevel(change) {
    energyLevel = Math.max(0, Math.min(100, energyLevel + change));
    const energyFill = document.querySelector('.hov-energy-fill');
    const energyText = document.querySelector('.hov-energy-level');
    
    if (energyFill) {
      energyFill.style.width = `${energyLevel}%`;
    }
    
    if (energyText) {
      energyText.textContent = `${energyLevel}%`;
    }
    
    // Change theme based on energy level
    if (energyLevel > 80) {
      showCelebration(`High energy! ${energyLevel}%`, '⚡');
    } else if (energyLevel < 20) {
      showCelebration(`Low energy ${energyLevel}%`, '😴');
    }
  }

  // Quick actions
  function createQuickTask() {
    const task = prompt('Enter a quick task:');
    if (task) {
      alert(`✅ Task created: "${task}"\n\nThis would be added to your task list!`);
    }
  }

  function createQuickNote() {
    const note = prompt('Enter a quick note:');
    if (note) {
      alert(`📝 Note saved: "${note}"\n\nThis would be added to your notes!`);
    }
  }

  function createReminder() {
    const reminder = prompt('Enter reminder:');
    if (reminder) {
      const time = prompt('Remind me in (minutes):');
      if (time) {
        alert(`⏰ Reminder set: "${reminder}" in ${time} minutes\n\nThis would schedule a notification!`);
      }
    }
  }

  function openQuickSearch() {
    const query = prompt('Search for:');
    if (query) {
      alert(`🔍 Searching for: "${query}"\n\nThis would open a search interface!`);
    }
  }

  function quickCallClient() {
    alert('📞 Quick Call Client\n\nThis would show your client list for quick calling!');
  }

  function openEmailDraft() {
    alert('📧 Quick Email\n\nThis would open a quick email template!');
  }

  // Switch tab view
  function switchProductivityTab(tabName) {
    // Update active tab
    document.querySelectorAll('.hov-productivity-tab').forEach(tab => {
      tab.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    
    // Update content
    updateProductivityView(tabName);
  }

  // Update productivity view
  function updateProductivityView(tab) {
    const content = document.querySelector('.hov-productivity-content');
    if (!content) return;
    
    content.innerHTML = '';
    
    switch (tab) {
      case 'pomodoro':
        content.innerHTML = `
          <div class="hov-pomodoro-container">
            <div class="hov-timer-mode">💼 Work Time</div>
            <div class="hov-pomodoro-display">
              <svg class="hov-progress-ring" width="320" height="320">
                <circle cx="160" cy="160" r="140" stroke="#ffffff40" stroke-width="10" fill="none"/>
                <circle cx="160" cy="160" r="140" stroke="white" stroke-width="10" fill="none" 
                        stroke-dasharray="${2 * Math.PI * 140}" stroke-dashoffset="0" 
                        stroke-linecap="round" style="transition: stroke-dashoffset 0.5s;"/>
              </svg>
              <div class="hov-timer-text">${formatTime(pomodoroState.timeLeft)}</div>
            </div>
            <div class="hov-timer-controls">
              <button class="hov-timer-btn primary hov-timer-start">${pomodoroState.isRunning ? 'Pause' : 'Start'}</button>
              <button class="hov-timer-btn secondary hov-timer-reset">Reset</button>
            </div>
            <div style="margin-top: 30px; text-align: center;">
              <h3>Pomodoros completed today: ${pomodoroState.pomodoroCount}</h3>
              <p style="color: #666;">Stay focused! You're doing great! 🌟</p>
            </div>
          </div>
        `;
        
        // Add event listeners
        content.querySelector('.hov-timer-start').onclick = () => {
          if (pomodoroState.isRunning) {
            pausePomodoro();
          } else {
            startPomodoro();
          }
        };
        
        content.querySelector('.hov-timer-reset').onclick = resetPomodoro;
        updatePomodoroDisplay();
        break;
        
      case 'focus':
        content.innerHTML = `
          <div class="hov-focus-container">
            <h2>🎯 Focus Mode</h2>
            <p style="color: #666; margin-bottom: 30px;">Block distractions and enter deep work mode</p>
            <div class="hov-focus-toggle ${focusMode ? 'active' : ''}">
              <div class="hov-focus-slider"></div>
            </div>
            <div class="hov-focus-status">
              <h3>${focusMode ? 'Focus Mode: ON' : 'Focus Mode: OFF'}</h3>
              <p style="color: #666;">
                ${focusMode ? 'Distractions are minimized. Stay focused!' : 'Click the toggle to activate focus mode'}
              </p>
            </div>
          </div>
        `;
        
        content.querySelector('.hov-focus-toggle').onclick = toggleFocusMode;
        break;
        
      case 'energy':
        content.innerHTML = `
          <div class="hov-energy-container">
            <h2>⚡ Energy Tracker</h2>
            <p style="color: #666; margin-bottom: 30px;">Track and boost your energy levels</p>
            <div class="hov-energy-meter">
              <div class="hov-energy-fill" style="width: ${energyLevel}%"></div>
            </div>
            <h3 class="hov-energy-level">${energyLevel}%</h3>
            <div class="hov-energy-controls">
              <button class="hov-energy-btn" onclick="updateEnergyLevel(10)">☕ Coffee Break (+10)</button>
              <button class="hov-energy-btn" onclick="updateEnergyLevel(20)">🚶 Walk (+20)</button>
              <button class="hov-energy-btn" onclick="updateEnergyLevel(30)">💪 Exercise (+30)</button>
              <button class="hov-energy-btn" onclick="updateEnergyLevel(-20)">😴 Getting Tired (-20)</button>
            </div>
            <div style="margin-top: 40px; text-align: center;">
              <h4>Energy Tips:</h4>
              <p style="color: #666; line-height: 1.6;">
                • Take regular breaks every 90 minutes<br>
                • Stay hydrated 💧<br>
                • Get some fresh air 🌿<br>
                • Stretch or move your body 🤸‍♀️
              </p>
            </div>
          </div>
        `;
        
        // Make energy update functions global
        window.updateEnergyLevel = updateEnergyLevel;
        break;
        
      case 'actions':
        content.innerHTML = `
          <div class="hov-actions-container">
            <h2>⚡ Quick Actions</h2>
            <p style="color: #666; margin-bottom: 30px;">Access common tasks instantly</p>
            <div class="hov-actions-grid">
              ${quickActions.map(action => `
                <div class="hov-action-card" data-action="${action.label}">
                  <div class="hov-action-icon">${action.icon}</div>
                  <div class="hov-action-label">${action.label}</div>
                </div>
              `).join('')}
            </div>
          </div>
        `;
        
        // Add click handlers
        content.querySelectorAll('.hov-action-card').forEach(card => {
          card.onclick = () => {
            const actionLabel = card.dataset.action;
            const action = quickActions.find(a => a.label === actionLabel);
            if (action) action.action();
          };
        });
        break;
    }
  }

  // Create productivity button
  function createProductivityButton() {
    const button = document.createElement('button');
    button.className = 'hov-productivity-button';
    button.innerHTML = '⚡ Focus';
    
    button.onclick = (e) => {
      e.preventDefault();
      const modal = document.querySelector('.hov-productivity-modal');
      if (modal) {
        modal.style.display = modal.style.display === 'none' ? 'flex' : 'none';
        if (modal.style.display === 'flex') {
          updateProductivityView('pomodoro');
        }
      }
    };
    
    document.body.appendChild(button);
    makeDraggable(button);
    
    return button;
  }

  // Create productivity modal
  function createProductivityModal() {
    const modal = document.createElement('div');
    modal.className = 'hov-productivity-modal';
    
    const container = document.createElement('div');
    container.className = 'hov-productivity-container';
    
    const header = document.createElement('div');
    header.className = 'hov-productivity-header';
    
    header.innerHTML = `
      <div class="hov-productivity-title">⚡ Productivity Hub</div>
      <button class="hov-productivity-close hov-clients-close">×</button>
    `;
    
    const tabs = document.createElement('div');
    tabs.className = 'hov-productivity-tabs';
    
    tabs.innerHTML = `
      <button class="hov-productivity-tab active" data-tab="pomodoro">🍅 Pomodoro</button>
      <button class="hov-productivity-tab" data-tab="focus">🎯 Focus Mode</button>
      <button class="hov-productivity-tab" data-tab="energy">⚡ Energy</button>
      <button class="hov-productivity-tab" data-tab="actions">⚡ Quick Actions</button>
    `;
    
    const content = document.createElement('div');
    content.className = 'hov-productivity-content';
    
    container.appendChild(header);
    container.appendChild(tabs);
    container.appendChild(content);
    modal.appendChild(container);
    document.body.appendChild(modal);
    
    // Make modal draggable by header
    makeDraggable(container, header);
    
    // Tab click handlers
    tabs.addEventListener('click', (e) => {
      if (e.target.classList.contains('hov-productivity-tab')) {
        const tabName = e.target.dataset.tab;
        switchProductivityTab(tabName);
      }
    });
    
    // Close modal
    header.querySelector('.hov-productivity-close').onclick = () => {
      modal.style.display = 'none';
    };
    
    modal.onclick = (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    };
    
    return modal;
  }

  // Create focus overlay
  function createFocusOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'hov-focus-overlay';
    overlay.innerHTML = `
      <div class="hov-focus-message">
        <h2>🎯 Focus Mode Active</h2>
        <p style="margin: 20px 0; color: #666;">Distractions are minimized. Stay focused on your current task!</p>
        <button onclick="document.querySelector('.hov-focus-overlay').style.display = 'none'; focusMode = false; document.querySelector('.hov-focus-toggle').classList.remove('active');" 
                style="padding: 10px 20px; background: var(--hov-primary, #8b5cf6); color: white; border: none; border-radius: 10px; cursor: pointer;">
          Exit Focus Mode
        </button>
      </div>
    `;
    
    document.body.appendChild(overlay);
    return overlay;
  }

  // Initialize productivity extension
  function init() {
    console.log('⚡ Initializing House of Vibes Productivity Tools...');
    
    // Wait for page to be ready
    setTimeout(() => {
      injectProductivityStyles();
      createProductivityButton();
      createProductivityModal();
      createFocusOverlay();
      
      console.log('✅ House of Vibes Productivity Tools ready!');
    }, 3000);
  }

  // Start when page loads
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
