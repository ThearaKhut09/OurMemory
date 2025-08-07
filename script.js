// Memory storage
let memories = [];

// DOM elements
const memoryForm = document.getElementById('memory-form');
const memoriesGrid = document.getElementById('memories-grid');
const imageInput = document.getElementById('memory-image');
const imagePreview = document.getElementById('image-preview');
const modal = document.getElementById('memory-modal');
const successMessage = document.getElementById('success-message');

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    loadMemories();
    setupEventListeners();
    setupThemeToggle();
    loadSampleMemories(); // Add some sample memories for demo
});

// Setup event listeners
function setupEventListeners() {
    // Form submission
    memoryForm.addEventListener('submit', handleFormSubmit);
    
    // Image upload
    imageInput.addEventListener('change', handleImageUpload);
    
    // Modal close
    document.querySelector('.close-modal').addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Drag and drop for image upload
    const fileUploadLabel = document.querySelector('.file-upload-label');
    
    fileUploadLabel.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.style.background = 'rgba(255, 107, 157, 0.2)';
    });
    
    fileUploadLabel.addEventListener('dragleave', function(e) {
        e.preventDefault();
        this.style.background = 'rgba(255, 107, 157, 0.05)';
    });
    
    fileUploadLabel.addEventListener('drop', function(e) {
        e.preventDefault();
        this.style.background = 'rgba(255, 107, 157, 0.05)';
        
        const files = e.dataTransfer.files;
        if (files.length > 0 && files[0].type.startsWith('image/')) {
            imageInput.files = files;
            handleImageUpload({ target: imageInput });
        }
    });
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
    
    // Show success message
    showSuccessMessage();
    
    // Refresh memories display
    displayMemories();
    
    // Scroll to memories section
    setTimeout(() => {
        scrollToSection('memories');
    }, 1000);
}

// Handle image upload and preview
function handleImageUpload(e) {
    const file = e.target.files[0];
    if (file) {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                imagePreview.innerHTML = `
                    <img src="${e.target.result}" alt="Preview" style="max-width: 100%; max-height: 200px; border-radius: 10px; box-shadow: 0 10px 30px rgba(255, 107, 157, 0.2);">
                `;
                
                // Add animation to preview
                const img = imagePreview.querySelector('img');
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
            alert('Please select a valid image file.');
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
                No memories yet. Create your first beautiful memory above! 💕
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
    return date.toLocaleDateString('en-US', options);
}

// Open memory modal
function openMemoryModal(memoryId) {
    const memory = memories.find(m => m.id === memoryId);
    if (!memory) return;
    
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

// Close memory modal
function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Show success message
function showSuccessMessage() {
    successMessage.classList.add('show');
    
    setTimeout(() => {
        successMessage.classList.remove('show');
    }, 3000);
}

// Load sample memories for demonstration
function loadSampleMemories() {
    const stored = localStorage.getItem('ourMemories');
    if (!stored || JSON.parse(stored).length === 0) {
        const sampleMemories = [
            {
                id: 1,
                title: "Our First Date ❤️",
                description: "That magical evening at the Italian restaurant where we talked for hours and realized we had so much in common. The way you laughed at my silly jokes made my heart skip a beat.",
                date: "2024-02-14",
                image: "./image/image1.jpg",
                createdAt: new Date().toISOString()
            },
            {
                id: 2,
                title: "Weekend Getaway 🏖️",
                description: "Our spontaneous trip to the beach where we watched the sunset together. Building sandcastles and sharing ice cream while the waves crashed nearby - pure bliss.",
                date: "2024-06-15",
                image: "./image/image2.jpg",
                createdAt: new Date().toISOString()
            },
            {
                id: 3,
                title: "Movie Night Cuddles 🎬",
                description: "Cozy evening watching our favorite romantic comedy. You fell asleep on my shoulder during the credits, and I didn't want to move because you looked so peaceful.",
                date: "2024-07-20",
                image: "./image/image3.jpg",
                createdAt: new Date().toISOString()
            },
            {
                id: 4,
                title: "Anniversary Celebration 💐",
                description: "Celebrating our special milestone with dinner at our favorite restaurant. The flowers you surprised me with were absolutely beautiful and made the evening even more perfect.",
                date: "2024-08-05",
                image: "./image/image4.jpg",
                createdAt: new Date().toISOString()
            },
            {
                id: 5,
                title: "Adventure Together 🌟",
                description: "Our exciting adventure exploring new places together. Every moment with you feels like a new discovery, and I love how we create beautiful memories wherever we go.",
                date: "2024-07-30",
                image: "./image/image5.jpg",
                createdAt: new Date().toISOString()
            }
        ];
        
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
        if (modal.style.display === 'block') {
            closeModal();
        } else {
            const addMemorySection = document.getElementById('add-memory');
            if (addMemorySection.classList.contains('show')) {
                addMemorySection.classList.remove('show');
            }
        }
    }
    
    // Ctrl/Cmd + N to focus on new memory form
    if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        scrollToSection('add-memory');
        setTimeout(() => {
            document.getElementById('memory-title').focus();
        }, 500);
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
    
    // Swipe left on modal to close (mobile)
    if (modal.style.display === 'block' && Math.abs(deltaX) > Math.abs(deltaY) && deltaX > 50) {
        closeModal();
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
