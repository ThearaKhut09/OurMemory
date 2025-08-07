// Memory storage
let memories = [];
let currentMemoryId = null; // Track current memory for editing/deleting

// DOM elements
const memoryForm = document.getElementById('memory-form');
const memoriesGrid = document.getElementById('memories-grid');
const imageInput = document.getElementById('memory-image');
const imagePreview = document.getElementById('image-preview');
const modal = document.getElementById('memory-modal');
const editModal = document.getElementById('edit-modal');
const confirmModal = document.getElementById('confirm-modal');
const editForm = document.getElementById('edit-form');
const editImageInput = document.getElementById('edit-image');
const editImagePreview = document.getElementById('edit-image-preview');
const notificationContainer = document.getElementById('notification-container');

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    loadLanguagePreference(); // Load language first
    loadMemories();
    setupEventListeners();
    setupThemeToggle();
    setupLanguageSelector();
    loadSampleMemories(); // Add some sample memories for demo
});

// Setup event listeners
function setupEventListeners() {
    // Form submission
    memoryForm.addEventListener('submit', handleFormSubmit);
    
    // Edit form submission
    editForm.addEventListener('submit', handleEditSubmit);
    
    // Image upload
    imageInput.addEventListener('change', handleImageUpload);
    editImageInput.addEventListener('change', function(e) {
        handleImageUpload(e, 'edit-image-preview');
    });
    
    // Modal close
    document.querySelector('.close-modal').addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Edit modal close
    editModal.addEventListener('click', function(e) {
        if (e.target === editModal) {
            closeEditModal();
        }
    });
    
    // Confirm modal close
    confirmModal.addEventListener('click', function(e) {
        if (e.target === confirmModal) {
            closeConfirmModal();
        }
    });
    
    // Drag and drop for image upload
    setupDragAndDrop('.file-upload-label', imageInput);
}

// Setup drag and drop functionality
function setupDragAndDrop(labelSelector, inputElement) {
    const fileUploadLabels = document.querySelectorAll(labelSelector);
    
    fileUploadLabels.forEach(label => {
        label.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.style.background = 'rgba(255, 107, 157, 0.2)';
        });
        
        label.addEventListener('dragleave', function(e) {
            e.preventDefault();
            this.style.background = 'rgba(255, 107, 157, 0.05)';
        });
        
        label.addEventListener('drop', function(e) {
            e.preventDefault();
            this.style.background = 'rgba(255, 107, 157, 0.05)';
            
            const files = e.dataTransfer.files;
            if (files.length > 0 && files[0].type.startsWith('image/')) {
                inputElement.files = files;
                const previewId = inputElement.id === 'edit-image' ? 'edit-image-preview' : 'image-preview';
                handleImageUpload({ target: inputElement }, previewId);
            }
        });
    });
}

// Setup language selector functionality
function setupLanguageSelector() {
    const languageToggle = document.querySelector('.language-toggle');
    const languageDropdown = document.querySelector('.language-dropdown');
    const langOptions = document.querySelectorAll('.lang-option');
    
    // Update active language option
    function updateActiveLanguage() {
        langOptions.forEach(option => {
            option.classList.remove('active');
            if (option.dataset.lang === currentLanguage) {
                option.classList.add('active');
            }
        });
    }
    
    // Initialize active language
    updateActiveLanguage();
    
    // Language option click handlers are handled by the changeLanguage function
    // which is defined in languages.js and called via onclick attributes
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.language-selector')) {
            languageDropdown.style.opacity = '0';
            languageDropdown.style.visibility = 'hidden';
            languageDropdown.style.transform = 'translateY(-10px)';
        }
    });
    
    // Update active language when language changes
    window.addEventListener('languageChanged', updateActiveLanguage);
}

// Setup theme toggle functionality
function setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const root = document.documentElement;
    
    // Load saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        root.classList.add('dark-mode');
        updateThemeIcon(true);
    }
    
    themeToggle.addEventListener('click', function() {
        const isDark = root.classList.toggle('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateThemeIcon(isDark);
        
        // Add a little animation effect
        this.style.transform = 'scale(0.9) rotate(180deg)';
        setTimeout(() => {
            this.style.transform = 'scale(1) rotate(0deg)';
        }, 150);
    });
}

// Update theme toggle icon
function updateThemeIcon(isDark) {
    const icon = document.querySelector('#theme-toggle i');
    if (isDark) {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

// Scroll to section function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        // Show the add-memory section if it's being accessed
        if (sectionId === 'add-memory') {
            section.classList.add('show');
        }
        
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = section.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Close add memory section
function closeAddMemorySection() {
    const addMemorySection = document.getElementById('add-memory');
    addMemorySection.classList.remove('show');
    
    // Reset form when closing
    const memoryForm = document.getElementById('memory-form');
    memoryForm.reset();
    const imagePreview = document.getElementById('image-preview');
    imagePreview.innerHTML = '';
    
    // Scroll back to hero section
    scrollToSection('home');
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(memoryForm);
    const memory = {
        id: Date.now(),
        title: formData.get('title'),
        description: formData.get('description'),
        date: formData.get('date'),
        image: null,
        createdAt: new Date().toISOString()
    };
    
    // Handle image
    const imageFile = formData.get('image');
    if (imageFile && imageFile.size > 0) {
        const reader = new FileReader();
        reader.onload = function(e) {
            memory.image = e.target.result;
            saveMemory(memory);
        };
        reader.readAsDataURL(imageFile);
    } else {
        saveMemory(memory);
    }
}

// Save memory
function saveMemory(memory) {
    memories.unshift(memory); // Add to beginning of array
    localStorage.setItem('ourMemories', JSON.stringify(memories));
    
    // Reset form
    memoryForm.reset();
    imagePreview.innerHTML = '';
    
    // Hide the add-memory section after saving
    const addMemorySection = document.getElementById('add-memory');
    addMemorySection.classList.remove('show');
    
    // Show success notification
    showNotification('success', getText('memorySavedTitle'), getText('memorySavedMessage'));
    
    // Refresh memories display
    displayMemories();
    
    // Scroll to memories section
    setTimeout(() => {
        scrollToSection('memories');
    }, 1000);
}

// Handle image upload and preview
function handleImageUpload(e, previewId = 'image-preview') {
    const file = e.target.files[0];
    const preview = document.getElementById(previewId);
    
    if (file) {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                preview.innerHTML = `
                    <img src="${e.target.result}" alt="Preview" style="max-width: 100%; max-height: 200px; border-radius: 10px; box-shadow: 0 10px 30px rgba(255, 107, 157, 0.2);">
                `;
                
                // Add animation to preview
                const img = preview.querySelector('img');
                img.style.opacity = '0';
                img.style.transform = 'scale(0.8)';
                
                setTimeout(() => {
                    img.style.transition = 'all 0.3s ease';
                    img.style.opacity = '1';
                    img.style.transform = 'scale(1)';
                }, 100);
            };
            reader.readAsDataURL(file);
        } else {
            showNotification('error', getText('invalidFileTitle'), getText('invalidFileMessage'));
            e.target.value = '';
        }
    }
}

// Load memories from localStorage
function loadMemories() {
    const stored = localStorage.getItem('ourMemories');
    if (stored) {
        memories = JSON.parse(stored);
        displayMemories();
    }
}

// Display memories in grid
function displayMemories() {
    if (memories.length === 0) {
        const isDark = document.documentElement.classList.contains('dark-mode');
        const emptyStateColor = isDark ? 'rgba(248, 249, 250, 0.8)' : 'rgba(255, 255, 255, 0.8)';
        
        memoriesGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: ${emptyStateColor}; font-size: 1.2rem;">
                <i class="fas fa-heart" style="font-size: 3rem; margin-bottom: 1rem; display: block;"></i>
                ${getText('noMemoriesText')}
            </div>
        `;
        return;
    }
    
    memoriesGrid.innerHTML = memories.map(memory => `
        <div class="memory-card" onclick="openMemoryModal(${memory.id})" data-aos="fade-up">
            ${memory.image ? `<img src="${memory.image}" alt="${memory.title}">` : `
                <div style="height: 250px; background: linear-gradient(135deg, #ff6b9d 0%, #ff8fab 50%, #ffc3d8 100%); display: flex; align-items: center; justify-content: center; color: white; font-size: 3rem;">
                    <i class="fas fa-image"></i>
                </div>
            `}
            <div class="memory-info">
                <h3>${memory.title}</h3>
                <div class="date">${formatDate(memory.date)}</div>
                <p>${memory.description.length > 100 ? memory.description.substring(0, 100) + '...' : memory.description}</p>
            </div>
        </div>
    `).join('');
    
    // Add staggered animation to cards
    const cards = document.querySelectorAll('.memory-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 150);
    });
}

// Format date for display
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    
    // Use appropriate locale based on current language
    const locale = currentLanguage === 'km' ? 'km-KH' : 'en-US';
    
    try {
        return date.toLocaleDateString(locale, options);
    } catch (e) {
        // Fallback to English if Khmer locale is not supported
        return date.toLocaleDateString('en-US', options);
    }
}

// Open memory modal
function openMemoryModal(memoryId) {
    const memory = memories.find(m => m.id === memoryId);
    if (!memory) return;
    
    currentMemoryId = memoryId; // Store for edit/delete operations
    
    document.getElementById('modal-title').textContent = memory.title;
    document.getElementById('modal-date').textContent = formatDate(memory.date);
    document.getElementById('modal-description').textContent = memory.description;
    
    const modalImage = document.getElementById('modal-image');
    if (memory.image) {
        modalImage.src = memory.image;
        modalImage.alt = memory.title;
    } else {
        modalImage.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSJ1cmwoI3BhaW50MF9saW5lYXJfMF8xKSIvPgo8cGF0aCBkPSJNMjAwIDE1MEMxOTQuNDc3IDE1MCAxOTAgMTQ1LjUyMyAxOTAgMTQwQzE5MCAxMzQuNDc3IDE5NC40NzcgMTMwIDIwMCAxMzBDMjA1LjUyMyAxMzAgMjEwIDEzNC40NzcgMjEwIDE0MEMyMTAgMTQ1LjUyMyAyMDUuNTIzIDE1MCAyMDAgMTUwWiIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC41Ii8+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MF9saW5lYXJfMF8xIiB4MT0iMCIgeTE9IjAiIHgyPSI0MDAiIHkyPSIzMDAiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0iI0ZGNkI5RCIvPgo8c3RvcCBvZmZzZXQ9IjAuNSIgc3RvcC1jb2xvcj0iI0ZGOEZBQiIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNGRkMzRDgiLz4KPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8L3N2Zz4K';
        modalImage.alt = 'No image available';
    }
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Open edit modal
function openEditModal() {
    if (!currentMemoryId) return;
    
    const memory = memories.find(m => m.id === currentMemoryId);
    if (!memory) return;
    
    // Populate edit form
    document.getElementById('edit-title').value = memory.title;
    document.getElementById('edit-description').value = memory.description;
    document.getElementById('edit-date').value = memory.date;
    
    // Show current image if exists
    if (memory.image) {
        editImagePreview.innerHTML = `
            <img src="${memory.image}" alt="Current Image" style="max-width: 100%; max-height: 200px; border-radius: 10px; box-shadow: 0 10px 30px rgba(255, 107, 157, 0.2);">
        `;
    } else {
        editImagePreview.innerHTML = '';
    }
    
    // Close main modal and open edit modal
    modal.style.display = 'none';
    editModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Handle edit form submission
function handleEditSubmit(e) {
    e.preventDefault();
    
    if (!currentMemoryId) return;
    
    const formData = new FormData(editForm);
    const memoryIndex = memories.findIndex(m => m.id === currentMemoryId);
    
    if (memoryIndex === -1) return;
    
    // Update memory data
    memories[memoryIndex].title = formData.get('title');
    memories[memoryIndex].description = formData.get('description');
    memories[memoryIndex].date = formData.get('date');
    
    // Handle image update
    const imageFile = formData.get('image');
    if (imageFile && imageFile.size > 0) {
        const reader = new FileReader();
        reader.onload = function(e) {
            memories[memoryIndex].image = e.target.result;
            saveEditedMemory();
        };
        reader.readAsDataURL(imageFile);
    } else {
        saveEditedMemory();
    }
}

// Save edited memory
function saveEditedMemory() {
    localStorage.setItem('ourMemories', JSON.stringify(memories));
    
    // Close edit modal
    closeEditModal();
    
    // Show success notification
    showNotification('success', getText('memoryUpdatedTitle'), getText('memoryUpdatedMessage'));
    
    // Refresh memories display
    displayMemories();
    
    // Reset current memory ID
    currentMemoryId = null;
}

// Confirm delete
function confirmDelete() {
    if (!currentMemoryId) return;
    
    // Close main modal and show confirmation
    modal.style.display = 'none';
    confirmModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Delete memory
function deleteMemory() {
    if (!currentMemoryId) return;
    
    const memoryIndex = memories.findIndex(m => m.id === currentMemoryId);
    if (memoryIndex === -1) return;
    
    // Remove memory from array
    memories.splice(memoryIndex, 1);
    localStorage.setItem('ourMemories', JSON.stringify(memories));
    
    // Close confirmation modal
    closeConfirmModal();
    
    // Show success notification
    showNotification('success', getText('memoryDeletedTitle'), getText('memoryDeletedMessage'));
    
    // Refresh memories display
    displayMemories();
    
    // Reset current memory ID
    currentMemoryId = null;
}

// Close memory modal
function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    currentMemoryId = null;
}

// Close edit modal
function closeEditModal() {
    editModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    editForm.reset();
    editImagePreview.innerHTML = '';
}

// Close confirmation modal
function closeConfirmModal() {
    confirmModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Notification System
function showNotification(type, title, message, duration = 5000) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        warning: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle'
    };
    
    notification.innerHTML = `
        <div class="notification-icon">
            <i class="${icons[type]}"></i>
        </div>
        <div class="notification-content">
            <div class="notification-title">${title}</div>
            <div class="notification-message">${message}</div>
        </div>
        <button class="notification-close" onclick="removeNotification(this.parentNode)">
            <i class="fas fa-times"></i>
        </button>
        <div class="notification-progress"></div>
    `;
    
    notificationContainer.appendChild(notification);
    
    // Auto remove after duration
    setTimeout(() => {
        removeNotification(notification);
    }, duration);
    
    // Add vibration for mobile devices
    if (navigator.vibrate && (type === 'success' || type === 'error')) {
        navigator.vibrate(type === 'success' ? [100] : [200, 100, 200]);
    }
}

// Remove notification
function removeNotification(notification) {
    if (notification && notification.parentNode) {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }
}

// Add slideOutRight animation to CSS (add this to styles.css later)
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Load sample memories for demonstration
function loadSampleMemories() {
    const stored = localStorage.getItem('ourMemories');
    if (!stored || JSON.parse(stored).length === 0) {
        const sampleMemoriesData = getSampleMemories();
        const sampleMemories = sampleMemoriesData.map((sample, index) => ({
            id: index + 1,
            title: sample.title,
            description: sample.description,
            date: ["2024-02-14", "2024-06-15", "2024-07-20", "2024-08-05", "2024-07-30"][index],
            image: `./image/image${index + 1}.jpg`,
            createdAt: new Date().toISOString()
        }));
        
        memories = sampleMemories;
        localStorage.setItem('ourMemories', JSON.stringify(memories));
        displayMemories();
    }
}

// Add some interactive animations
function addInteractiveAnimations() {
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        const heroVisual = document.querySelector('.hero-visual');
        if (heroVisual) {
            heroVisual.style.transform = `translateY(${rate}px)`;
        }
    });
    
    // Hover effects for memory cards
    document.addEventListener('mouseover', function(e) {
        if (e.target.closest('.memory-card')) {
            const card = e.target.closest('.memory-card');
            card.style.transform = 'translateY(-10px) rotateY(5deg) scale(1.02)';
        }
    });
    
    document.addEventListener('mouseout', function(e) {
        if (e.target.closest('.memory-card')) {
            const card = e.target.closest('.memory-card');
            card.style.transform = 'translateY(0) rotateY(0) scale(1)';
        }
    });
}

// Initialize interactive animations
addInteractiveAnimations();

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Escape key to close modal or hide add-memory section
    if (e.key === 'Escape') {
        if (editModal.style.display === 'block') {
            closeEditModal();
        } else if (confirmModal.style.display === 'block') {
            closeConfirmModal();
        } else if (modal.style.display === 'block') {
            closeModal();
        } else {
            const addMemorySection = document.getElementById('add-memory');
            if (addMemorySection.classList.contains('show')) {
                addMemorySection.classList.remove('show');
            }
        }
    }
    
    // Enter key to confirm delete in confirmation modal
    if (e.key === 'Enter' && confirmModal.style.display === 'block') {
        deleteMemory();
    }
    
    // Ctrl/Cmd + N to focus on new memory form
    if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        scrollToSection('add-memory');
        setTimeout(() => {
            document.getElementById('memory-title').focus();
        }, 500);
    }
    
    // Ctrl/Cmd + E to edit current memory (if modal is open)
    if ((e.ctrlKey || e.metaKey) && e.key === 'e' && modal.style.display === 'block') {
        e.preventDefault();
        openEditModal();
    }
    
    // Ctrl/Cmd + D to toggle dark mode
    if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        document.getElementById('theme-toggle').click();
    }
});

// Add touch gestures for mobile
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
});

document.addEventListener('touchend', function(e) {
    if (!touchStartX || !touchStartY) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    
    const deltaX = touchStartX - touchEndX;
    const deltaY = touchStartY - touchEndY;
    
    // Swipe left on any modal to close (mobile)
    if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX > 50) {
        if (editModal.style.display === 'block') {
            closeEditModal();
        } else if (confirmModal.style.display === 'block') {
            closeConfirmModal();
        } else if (modal.style.display === 'block') {
            closeModal();
        }
    }
    
    touchStartX = 0;
    touchStartY = 0;
});

// Add loading animation for form submission
memoryForm.addEventListener('submit', function() {
    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 1500);
});

// Add loading animation for edit form submission
editForm.addEventListener('submit', function() {
    const submitBtn = this.querySelector('.save-btn');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 1500);
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth reveal animations to sections
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe sections for scroll animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'all 0.8s ease';
        observer.observe(section);
    });
});
