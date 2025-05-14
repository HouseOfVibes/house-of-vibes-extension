// House of Vibes - Google Drive File Browser
// Version 3.0 - Real Google Drive Integration

(function() {
  console.log('📁 House of Vibes Google Drive Browser loading...');
  
  // Google Drive API configuration
  const CLIENT_ID = '30768369486-au122hgqa6oltsuim81b20lj3ljb3qn1.apps.googleusercontent.com';
  const API_KEY = ''; // Not needed for OAuth
  const SCOPES = 'https://www.googleapis.com/auth/drive.readonly https://www.googleapis.com/auth/userinfo.email';
  
  // Authentication state
  let isAuthenticated = false;
  let accessToken = null;
  let userEmail = null;
  
  // Navigation state
  let currentFolderId = 'root';
  let folderHistory = ['root'];
  let folderNames = ['My Drive'];
  let currentFiles = [];
  
  // Load Google APIs
  function loadGoogleAPIs() {
    return new Promise((resolve) => {
      if (window.gapi) {
        resolve();
        return;
      }
      
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/api.js';
      script.onload = () => {
        window.gapi.load('client:auth2', resolve);
      };
      document.head.appendChild(script);
    });
  }
  
  // Initialize Google API client
  async function initializeGapi() {
    await window.gapi.client.init({
      clientId: CLIENT_ID,
      scope: SCOPES,
      discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest']
    });
    
    // Check if user is already signed in
    const authInstance = window.gapi.auth2.getAuthInstance();
    if (authInstance.isSignedIn.get()) {
      await handleAuthentication();
    }
  }
  
  // Handle authentication
  async function handleAuthentication() {
    const authInstance = window.gapi.auth2.getAuthInstance();
    const user = authInstance.currentUser.get();
    
    if (user.hasGrantedScopes(SCOPES)) {
      isAuthenticated = true;
      accessToken = user.getAuthResponse().access_token;
      userEmail = user.getBasicProfile().getEmail();
      
      updateAuthUI();
      await loadFiles();
    }
  }
  
  // Sign in to Google
  async function signIn() {
    try {
      const authInstance = window.gapi.auth2.getAuthInstance();
      await authInstance.signIn();
      await handleAuthentication();
    } catch (error) {
      console.error('Authentication failed:', error);
      showError('Authentication failed. Please try again.');
    }
  }
  
  // Sign out
  function signOut() {
    const authInstance = window.gapi.auth2.getAuthInstance();
    authInstance.signOut();
    isAuthenticated = false;
    accessToken = null;
    userEmail = null;
    updateAuthUI();
    showAuthScreen();
  }
  
  // Update authentication UI
  function updateAuthUI() {
    const authBtn = document.querySelector('.hov-auth-btn');
    const userInfo = document.querySelector('.hov-user-info');
    
    if (authBtn && userInfo) {
      if (isAuthenticated) {
        authBtn.textContent = 'Sign Out';
        authBtn.onclick = signOut;
        userInfo.textContent = userEmail || 'Signed In';
        userInfo.style.display = 'block';
      } else {
        authBtn.textContent = 'Sign In to Google Drive';
        authBtn.onclick = signIn;
        userInfo.style.display = 'none';
      }
    }
  }
  
  // Load files from Google Drive
  async function loadFiles(folderId = currentFolderId) {
    if (!isAuthenticated) {
      showAuthScreen();
      return;
    }
    
    try {
      showLoading(true);
      
      const response = await window.gapi.client.drive.files.list({
        q: `'${folderId}' in parents and trashed=false`,
        fields: 'files(id,name,mimeType,size,modifiedTime,thumbnailLink,webViewLink)',
        orderBy: 'folder desc, name'
      });
      
      currentFiles = response.result.files.map(file => ({
        id: file.id,
        name: file.name,
        type: getMimeTypeCategory(file.mimeType),
        size: formatFileSize(file.size),
        modified: formatDate(file.modifiedTime),
        icon: getFileIcon(file.mimeType, file.name),
        mimeType: file.mimeType,
        webViewLink: file.webViewLink,
        thumbnailLink: file.thumbnailLink
      }));
      
      renderFiles(currentFiles);
      updateBreadcrumbs();
      showLoading(false);
      
    } catch (error) {
      console.error('Error loading files:', error);
      showError('Failed to load files. Please try again.');
      showLoading(false);
    }
  }
  
  // Get file type category from MIME type
  function getMimeTypeCategory(mimeType) {
    if (mimeType === 'application/vnd.google-apps.folder') return 'folder';
    if (mimeType.startsWith('image/')) return 'image';
    if (mimeType.startsWith('video/')) return 'video';
    if (mimeType.startsWith('audio/')) return 'audio';
    if (mimeType.includes('document')) return 'document';
    if (mimeType.includes('spreadsheet')) return 'spreadsheet';
    if (mimeType.includes('presentation')) return 'presentation';
    if (mimeType.includes('pdf')) return 'pdf';
    if (mimeType.includes('text')) return 'text';
    return 'file';
  }
  
  // Get file icon based on type
  function getFileIcon(mimeType, fileName) {
    const type = getMimeTypeCategory(mimeType);
    const iconMap = {
      folder: '📁',
      image: '🖼️',
      video: '🎬',
      audio: '🎵',
      document: '📄',
      spreadsheet: '📊',
      presentation: '📺',
      pdf: '📄',
      text: '📝',
      file: '📎'
    };
    return iconMap[type] || '📎';
  }
  
  // Format file size
  function formatFileSize(bytes) {
    if (!bytes) return '-';
    const sizes = ['B', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 B';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  }
  
  // Format date
  function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  }
  
  // Navigate to folder
  async function navigateToFolder(folderId, folderName) {
    if (folderId === 'back') {
      // Go back
      if (folderHistory.length > 1) {
        folderHistory.pop();
        folderNames.pop();
        currentFolderId = folderHistory[folderHistory.length - 1];
        await loadFiles(currentFolderId);
      }
      return;
    }
    
    folderHistory.push(folderId);
    folderNames.push(folderName);
    currentFolderId = folderId;
    await loadFiles(folderId);
  }
  
  // Navigate to breadcrumb
  async function navigateToBreadcrumb(index) {
    folderHistory = folderHistory.slice(0, index + 1);
    folderNames = folderNames.slice(0, index + 1);
    currentFolderId = folderHistory[folderHistory.length - 1];
    await loadFiles(currentFolderId);
  }
  
  // Search files
  async function searchFiles(query) {
    if (!query) {
      await loadFiles();
      return;
    }
    
    try {
      showLoading(true);
      
      const response = await window.gapi.client.drive.files.list({
        q: `name contains '${query}' and trashed=false`,
        fields: 'files(id,name,mimeType,size,modifiedTime,thumbnailLink,webViewLink)',
        orderBy: 'name'
      });
      
      const searchResults = response.result.files.map(file => ({
        id: file.id,
        name: file.name,
        type: getMimeTypeCategory(file.mimeType),
        size: formatFileSize(file.size),
        modified: formatDate(file.modifiedTime),
        icon: getFileIcon(file.mimeType, file.name),
        mimeType: file.mimeType,
        webViewLink: file.webViewLink,
        thumbnailLink: file.thumbnailLink
      }));
      
      renderFiles(searchResults);
      showLoading(false);
      
    } catch (error) {
      console.error('Search failed:', error);
      showError('Search failed. Please try again.');
      showLoading(false);
    }
  }
  
  // Show loading state
  function showLoading(show) {
    const loading = document.querySelector('.hov-loading');
    if (loading) {
      loading.style.display = show ? 'flex' : 'none';
    }
  }
  
  // Show error message
  function showError(message) {
    const error = document.querySelector('.hov-error');
    if (error) {
      error.textContent = message;
      error.style.display = 'block';
      setTimeout(() => {
        error.style.display = 'none';
      }, 5000);
    }
  }
  
  // Show authentication screen
  function showAuthScreen() {
    const content = document.querySelector('.hov-file-content');
    if (!content) return;
    
    content.innerHTML = `
      <div class="hov-auth-screen">
        <div class="hov-auth-card">
          <div class="hov-auth-icon">🔒</div>
          <h2>Connect to Google Drive</h2>
          <p>Sign in to access your Google Drive files</p>
          <button class="hov-auth-btn hov-sign-in-btn" onclick="signIn()">
            Sign In to Google Drive
          </button>
        </div>
      </div>
    `;
  }
  
  // Inject Google Drive file browser styles
  function injectFileBrowserStyles() {
    const styleEl = document.createElement('style');
    styleEl.id = 'house-of-vibes-gdrive-files';
    styleEl.textContent = `
      /* House of Vibes - Google Drive File Browser */
      
      /* File browser button */
      .hov-file-button {
        position: fixed;
        bottom: 30px;
        right: 30px;
        z-index: 9999;
        background: var(--hov-surface-color, rgba(255, 255, 255, 0.9));
        color: var(--hov-primary, #6bb6d6);
        border: 2px solid var(--hov-primary, #6bb6d6);
        padding: 12px 20px;
        border-radius: 25px;
        cursor: move;
        font-size: 16px;
        font-weight: 600;
        box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        transition: all 0.3s ease;
        user-select: none;
        backdrop-filter: blur(10px);
      }
      
      .hov-file-button:hover {
        background: var(--hov-primary, #6bb6d6);
        color: white;
        transform: translateY(-2px);
        box-shadow: 0 6px 25px rgba(0,0,0,0.15);
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
        background: var(--hov-surface-color, white);
        border-radius: 20px;
        width: 95vw;
        max-width: 1200px;
        height: 85vh;
        max-height: 800px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        display: flex;
        flex-direction: column;
        overflow: hidden;
        border: 1px solid rgba(0,0,0,0.1);
      }
      
      .hov-file-header {
        background: var(--hov-primary, #6bb6d6);
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
      
      .hov-user-info {
        background: rgba(255,255,255,0.2);
        padding: 5px 12px;
        border-radius: 15px;
        font-size: 14px;
        margin-right: 15px;
      }
      
      .hov-auth-btn {
        background: rgba(255,255,255,0.9);
        color: var(--hov-primary, #6bb6d6);
        border: none;
        padding: 8px 16px;
        border-radius: 20px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.3s ease;
      }
      
      .hov-auth-btn:hover {
        background: white;
        transform: scale(1.05);
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
      
      /* Navigation breadcrumbs */
      .hov-file-nav {
        background: #f8fafc;
        padding: 15px 20px;
        border-bottom: 1px solid #e2e8f0;
        display: flex;
        align-items: center;
        gap: 8px;
        flex-wrap: wrap;
      }
      
      .hov-breadcrumb {
        color: var(--hov-primary, #6bb6d6);
        text-decoration: none;
        font-weight: 500;
        cursor: pointer;
        padding: 5px 10px;
        border-radius: 6px;
        transition: all 0.2s ease;
        font-size: 14px;
      }
      
      .hov-breadcrumb:hover {
        background: rgba(107, 182, 214, 0.1);
      }
      
      .hov-breadcrumb.current {
        color: var(--hov-text-color, #1f2937);
        cursor: default;
        background: rgba(0,0,0,0.05);
      }
      
      .hov-breadcrumb-separator {
        color: #6b7280;
        font-size: 12px;
        margin: 0 4px;
      }
      
      /* Toolbar */
      .hov-file-toolbar {
        background: white;
        padding: 15px 20px;
        border-bottom: 1px solid #e2e8f0;
        display: flex;
        gap: 15px;
        align-items: center;
        flex-wrap: wrap;
      }
      
      .hov-toolbar-btn {
        background: var(--hov-surface-color, white);
        border: 1px solid #d1d5db;
        color: var(--hov-text-color, #374151);
        padding: 8px 16px;
        border-radius: 8px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
        transition: all 0.2s ease;
      }
      
      .hov-toolbar-btn:hover {
        background: #f3f4f6;
        border-color: var(--hov-primary, #6bb6d6);
      }
      
      .hov-toolbar-btn.active {
        background: var(--hov-primary, #6bb6d6);
        color: white;
        border-color: var(--hov-primary, #6bb6d6);
      }
      
      /* Search */
      .hov-file-search {
        position: relative;
        flex: 1;
        max-width: 300px;
      }
      
      .hov-search-input {
        width: 100%;
        padding: 8px 35px 8px 12px;
        border: 1px solid #d1d5db;
        border-radius: 8px;
        font-size: 14px;
        background: white;
      }
      
      .hov-search-icon {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        color: #6b7280;
        font-size: 16px;
      }
      
      /* Content area */
      .hov-file-content {
        padding: 20px;
        flex: 1;
        overflow-y: auto;
        background: #fafbfc;
        position: relative;
      }
      
      /* Loading state */
      .hov-loading {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(255,255,255,0.9);
        display: none;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: 15px;
      }
      
      .hov-loading-spinner {
        width: 40px;
        height: 40px;
        border: 4px solid #e5e7eb;
        border-top: 4px solid var(--hov-primary, #6bb6d6);
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }
      
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      
      /* Error message */
      .hov-error {
        background: #fef2f2;
        border: 1px solid #fecaca;
        color: #dc2626;
        padding: 12px 16px;
        border-radius: 8px;
        margin-bottom: 15px;
        display: none;
      }
      
      /* Authentication screen */
      .hov-auth-screen {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        background: #fafbfc;
      }
      
      .hov-auth-card {
        background: white;
        padding: 40px;
        border-radius: 15px;
        text-align: center;
        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        max-width: 400px;
      }
      
      .hov-auth-icon {
        font-size: 48px;
        margin-bottom: 20px;
      }
      
      .hov-auth-card h2 {
        color: var(--hov-text-color, #1f2937);
        margin-bottom: 10px;
      }
      
      .hov-auth-card p {
        color: #6b7280;
        margin-bottom: 25px;
      }
      
      .hov-sign-in-btn {
        background: var(--hov-primary, #6bb6d6);
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 25px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
      }
      
      .hov-sign-in-btn:hover {
        background: #5a9bb8;
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
      }
      
      /* File grid */
      .hov-file-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 15px;
        padding: 5px;
      }
      
      .hov-file-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      
      /* File cards */
      .hov-file-card {
        background: white;
        border-radius: 12px;
        padding: 16px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        transition: all 0.2s ease;
        cursor: pointer;
        border: 1px solid #e5e7eb;
      }
      
      .hov-file-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        border-color: var(--hov-primary, #6bb6d6);
      }
      
      .hov-file-list-item {
        background: white;
        border-radius: 8px;
        padding: 12px 16px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        transition: all 0.2s ease;
        cursor: pointer;
        border: 1px solid #e5e7eb;
        display: flex;
        align-items: center;
        gap: 12px;
      }
      
      .hov-file-list-item:hover {
        background: #f9fafb;
        border-color: var(--hov-primary, #6bb6d6);
      }
      
      .hov-file-icon {
        font-size: 32px;
        text-align: center;
        margin-bottom: 10px;
      }
      
      .hov-file-list-icon {
        font-size: 24px;
        width: 32px;
        text-align: center;
        flex-shrink: 0;
      }
      
      .hov-file-name {
        font-weight: 600;
        color: var(--hov-text-color, #1f2937);
        font-size: 14px;
        margin-bottom: 8px;
        word-break: break-word;
        line-height: 1.3;
      }
      
      .hov-file-list-name {
        font-weight: 600;
        color: var(--hov-text-color, #1f2937);
        flex: 1;
        margin-right: 12px;
      }
      
      .hov-file-info {
        color: #6b7280;
        font-size: 12px;
        line-height: 1.4;
      }
      
      .hov-file-list-info {
        color: #6b7280;
        font-size: 12px;
        text-align: right;
        flex-shrink: 0;
      }
      
      /* Back button for folders */
      .hov-back-btn {
        background: #f3f4f6;
        border: 1px solid #d1d5db;
        color: #374151;
        padding: 8px 16px;
        border-radius: 8px;
        cursor: pointer;
        font-size: 14px;
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 15px;
        transition: all 0.2s ease;
      }
      
      .hov-back-btn:hover {
        background: #e5e7eb;
      }
      
      /* Responsive design */
      @media (max-width: 768px) {
        .hov-file-modal {
          width: 98vw;
          height: 95vh;
        }
        
        .hov-file-grid {
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        }
        
        .hov-file-toolbar {
          flex-wrap: wrap;
        }
        
        .hov-file-search {
          width: 100%;
          max-width: none;
        }
      }
    `;
    
    // Remove any existing style
    const existing = document.getElementById('house-of-vibes-gdrive-files');
    if (existing) existing.remove();
    
    document.head.appendChild(styleEl);
  }
  
  // Make element draggable
  function makeDraggable(element, handle = null) {
    const dragHandle = handle || element;
    let isDragging = false;
    let startX, startY;
    
    dragHandle.addEventListener('mousedown', (e) => {
      if (e.target.closest('.hov-file-close') || e.target.closest('.hov-auth-btn')) return;
      
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
  
  // Render files
  function renderFiles(files) {
    const content = document.querySelector('.hov-file-content');
    const isGridView = document.querySelector('.hov-view-grid')?.classList.contains('active') ?? true;
    
    if (!content) return;
    
    // Clear existing content
    const existing = content.querySelector('.hov-file-grid, .hov-file-list, .hov-back-btn');
    if (existing) existing.remove();
    
    // Add back button if not in root folder
    if (currentFolderId !== 'root') {
      const backBtn = document.createElement('button');
      backBtn.className = 'hov-back-btn';
      backBtn.innerHTML = '<span>←</span> Back';
      backBtn.onclick = () => navigateToFolder('back');
      content.insertBefore(backBtn, content.firstChild);
    }
    
    if (isGridView) {
      const grid = document.createElement('div');
      grid.className = 'hov-file-grid';
      
      files.forEach(file => {
        const card = document.createElement('div');
        card.className = 'hov-file-card';
        
        card.innerHTML = `
          <div class="hov-file-icon">${file.icon}</div>
          <div class="hov-file-name">${file.name}</div>
          <div class="hov-file-info">${file.size}<br>Modified ${file.modified}</div>
        `;
        
        card.onclick = () => handleFileClick(file);
        grid.appendChild(card);
      });
      
      content.appendChild(grid);
    } else {
      const list = document.createElement('div');
      list.className = 'hov-file-list';
      
      files.forEach(file => {
        const item = document.createElement('div');
        item.className = 'hov-file-list-item';
        
        item.innerHTML = `
          <div class="hov-file-list-icon">${file.icon}</div>
          <div class="hov-file-list-name">${file.name}</div>
          <div class="hov-file-list-info">${file.size}<br>${file.modified}</div>
        `;
        
        item.onclick = () => handleFileClick(file);
        list.appendChild(item);
      });
      
      content.appendChild(list);
    }
  }
  
  // Handle file/folder click
  function handleFileClick(file) {
    if (file.type === 'folder') {
      navigateToFolder(file.id, file.name);
    } else {
      // Open file in Google Drive
      if (file.webViewLink) {
        window.open(file.webViewLink, '_blank');
      }
    }
  }
  
  // Update breadcrumbs
  function updateBreadcrumbs() {
    const nav = document.querySelector('.hov-file-nav');
    if (!nav) return;
    
    let breadcrumbsHtml = '';
    
    folderNames.forEach((name, index) => {
      const isLast = index === folderNames.length - 1;
      
      if (isLast) {
        breadcrumbsHtml += `<span class="hov-breadcrumb current">${name}</span>`;
      } else {
        breadcrumbsHtml += `<span class="hov-breadcrumb" onclick="navigateToBreadcrumb(${index})">${name}</span>`;
        breadcrumbsHtml += `<span class="hov-breadcrumb-separator">›</span>`;
      }
    });
    
    nav.innerHTML = breadcrumbsHtml;
  }
  
  // Toggle view
  function toggleView(viewType) {
    document.querySelectorAll('.hov-toolbar-btn[data-view]').forEach(btn => {
      btn.classList.remove('active');
    });
    document.querySelector(`[data-view="${viewType}"]`)?.classList.add('active');
    renderFiles(currentFiles);
  }
  
  // Create file browser button
  function createFileBrowserButton() {
    const button = document.createElement('button');
    button.className = 'hov-file-button';
    button.innerHTML = '📁 Drive';
    
    button.onclick = (e) => {
      e.preventDefault();
      const browser = document.querySelector('.hov-file-browser');
      if (browser) {
        browser.style.display = browser.style.display === 'none' ? 'flex' : 'none';
        if (browser.style.display === 'flex' && isAuthenticated) {
          loadFiles();
        }
      }
    };
    
    document.body.appendChild(button);
    makeDraggable(button);
    
    return button;
  }
  
  // Create file browser modal
  function createFileBrowser() {
    const browser = document.createElement('div');
    browser.className = 'hov-file-browser';
    
    const modal = document.createElement('div');
    modal.className = 'hov-file-modal';
    
    modal.innerHTML = `
      <div class="hov-file-header">
        <div class="hov-file-title">📁 Google Drive</div>
        <div style="display: flex; align-items: center;">
          <div class="hov-user-info" style="display: none;"></div>
          <button class="hov-auth-btn">Sign In to Google Drive</button>
          <button class="hov-file-close">×</button>
        </div>
      </div>
      
      <div class="hov-file-nav"></div>
      
      <div class="hov-file-toolbar">
        <button class="hov-toolbar-btn hov-view-grid active" data-view="grid" onclick="toggleView('grid')">
          ◻️ Grid
        </button>
        <button class="hov-toolbar-btn hov-view-list" data-view="list" onclick="toggleView('list')">
          ☰ List
        </button>
        <div class="hov-file-search">
          <input type="text" class="hov-search-input" placeholder="Search Google Drive...">
          <span class="hov-search-icon">🔍</span>
        </div>
      </div>
      
      <div class="hov-file-content">
        <div class="hov-loading">
          <div class="hov-loading-spinner"></div>
          <div>Loading files...</div>
        </div>
        <div class="hov-error"></div>
      </div>
    `;
    
    browser.appendChild(modal);
    document.body.appendChild(browser);
    
    // Make modal draggable by header
    makeDraggable(modal, modal.querySelector('.hov-file-header'));
    
    // Search functionality
    const searchInput = modal.querySelector('.hov-search-input');
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        searchFiles(e.target.value);
      }, 500);
    });
    
    // Close browser
    modal.querySelector('.hov-file-close').onclick = () => {
      browser.style.display = 'none';
    };
    
    browser.onclick = (e) => {
      if (e.target === browser) {
        browser.style.display = 'none';
      }
    };
    
    // Update auth UI
    updateAuthUI();
    
    return browser;
  }
  
  // Make functions globally available
  window.navigateToBreadcrumb = navigateToBreadcrumb;
  window.toggleView = toggleView;
  window.signIn = signIn;
  
  // Initialize file browser extension
  async function init() {
    console.log('📁 Initializing House of Vibes Google Drive Browser...');
    
    // Wait for page to be ready
    setTimeout(async () => {
      injectFileBrowserStyles();
      createFileBrowserButton();
      createFileBrowser();
      
      // Load Google APIs
      try {
        await loadGoogleAPIs();
        await initializeGapi();
        console.log('✅ House of Vibes Google Drive Browser ready!');
      } catch (error) {
        console.error('Failed to initialize Google Drive API:', error);
      }
    }, 1500);
  }
  
  // Start when page loads
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
