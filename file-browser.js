// House of Vibes - File Browser Extension
// Version 1.0 - Visual file manager

(function() {
  console.log('📁 House of Vibes File Browser loading...');
  
  // Mock file data with actions
  const mockFiles = [
    { 
      name: 'Project Ideas.md', 
      type: 'document', 
      size: '2.3 KB', 
      modified: '2 days ago', 
      icon: '📄',
      action: () => showFilePreview('Project Ideas.md', '# Project Ideas\n\n- Build a TypingMind extension\n- Create ADHD-friendly tools\n- Design beautiful themes')
    },
    { 
      name: 'Client Meeting Notes.txt', 
      type: 'document', 
      size: '1.8 KB', 
      modified: '1 day ago', 
      icon: '📝',
      action: () => alert('📝 Opening Client Meeting Notes.txt\n\nThis would open your text file!')
    },
    { 
      name: 'Design Assets', 
      type: 'folder', 
      items: '15', 
      modified: '3 hours ago', 
      icon: '📁',
      action: () => showFolderContents('Design Assets')
    },
    { 
      name: 'Screenshot_2024.png', 
      type: 'image', 
      size: '1.2 MB', 
      modified: '5 hours ago', 
      icon: '🖼️',
      action: () => alert('🖼️ Opening Screenshot_2024.png\n\nThis would open the image in a preview window!')
    },
    { 
      name: 'Budget.xlsx', 
      type: 'spreadsheet', 
      size: '45 KB', 
      modified: '1 week ago', 
      icon: '📊',
      action: () => alert('📊 Opening Budget.xlsx\n\nThis would open your spreadsheet!')
    },
    { 
      name: 'Presentation.pptx', 
      type: 'presentation', 
      size: '8.5 MB', 
      modified: '3 days ago', 
      icon: '📺',
      action: () => alert('📺 Opening Presentation.pptx\n\nThis would open your presentation!')
    }
  ];

  // Inject file browser styles
  function injectFileBrowserStyles() {
    const styleEl = document.createElement('style');
    styleEl.id = 'house-of-vibes-files';
    styleEl.textContent = `
      /* House of Vibes - File Browser Styles */
      
      /* Get theme colors from the themes extension */
      .hov-file-button {
        position: fixed;
        bottom: 30px;
        right: 30px;
        z-index: 9999;
        background: linear-gradient(135deg, var(--hov-primary, #4ec5d4) 0%, var(--hov-secondary, #72c6ef) 100%);
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
      
      .hov-file-button:hover {
        transform: scale(1.05);
        box-shadow: 0 6px 25px rgba(0,0,0,0.3);
      }
      
      /* File browser modal */
      .hov-file-browser {
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
      
      .hov-file-modal {
        background: white;
        border-radius: 20px;
        width: 90vw;
        max-width: 900px;
        height: 80vh;
        max-height: 700px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }
      
      .hov-file-header {
        background: linear-gradient(135deg, var(--hov-primary, #4ec5d4) 0%, var(--hov-secondary, #72c6ef) 100%);
        padding: 20px;
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: move;
      }
      
      .hov-file-title {
        font-size: 24px;
        font-weight: bold;
        text-shadow: 1px 1px 3px rgba(0,0,0,0.3);
      }
      
      .hov-file-close {
        background: rgba(255,255,255,0.2);
        border: none;
        color: white;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        font-size: 20px;
        cursor: pointer;
        transition: all 0.3s ease;
      }
      
      .hov-file-close:hover {
        background: rgba(255,255,255,0.3);
        transform: scale(1.1);
      }
      
      .hov-file-content {
        padding: 20px;
        flex: 1;
        overflow-y: auto;
      }
      
      .hov-file-grid {
        display:
