// Language translations for the Our Memory website
const languages = {
    km: {
        // Navigation and Header
        title: "អនុស្សាវរីយ៍របស់យើង - រឿងស្នេហា",
        logoText: "អនុស្សាវរីយ៍របស់យើង",
        toggleTheme: "ប្តូរម៉ូដងងឹត",
        language: "ភាសា",
        
        // Hero Section
        heroTitle1: "ដំណើរអស្ចារ្យ",
        heroTitle2: "របស់យើងជាមួយគ្នា",
        heroSubtitle: "ចាប់យករាល់ពេលវេលាដ៏មានតម្លៃនៃរឿងស្នេហារបស់យើង",
        createMemoryButton: "បង្កើតអនុស្សាវរីយ៍ថ្មី",
        
        // Add Memory Section
        addMemoryTitle: "បន្ថែមអនុស្សាវរីយ៍ថ្មី",
        closeSection: "បិទផ្នែកបន្ថែមអនុស្សាវរីយ៍",
        memoryTitleLabel: "ចំណងជើងអនុស្សាវរីយ៍",
        memoryTitlePlaceholder: "ការណាត់ជួបដំបូង, ការធ្វើដំណើរ, ។ល។",
        descriptionLabel: "ការពិពណ៌នា",
        descriptionPlaceholder: "ប្រាប់យើងអំពីពេលវេលាដ៏ស្រស់ស្អាតនេះ...",
        dateLabel: "កាលបរិច្ឆេទ",
        uploadImageLabel: "ផ្ទុកឡើងរូបភាព",
        uploadImageText: "ចុចដើម្បីជ្រើសរើស ឬអូស និងទម្លាក់",
        saveMemoryButton: "រក្សាទុកអនុស្សាវរីយ៍",
        
        // Memories Gallery
        memoriesTitle: "អនុស្សាវរីយ៍ដ៏ស្រស់ស្អាតរបស់យើង",
        noMemoriesText: "មិនទាន់មានអនុស្សាវរីយ៍នៅឡើយទេ។ សូមបង្កើតអនុស្សាវរីយ៍ដ៏ស្រស់ស្អាតដំបូងរបស់អ្នកនៅខាងលើ! 💕",
        
        // Modal Actions
        editButton: "កែប្រែ",
        deleteButton: "លុប",
        cancelButton: "បោះបង់",
        saveChangesButton: "រក្សាទុកការផ្លាស់ប្តូរ",
        
        // Edit Modal
        editMemoryTitle: "កែប្រែអនុស្សាវរីយ៍",
        changeImageText: "ផ្លាស់ប្តូររូបភាព (ជម្រើស)",
        changeImageSubtext: "ចុចដើម្បីជ្រើសរើសរូបភាពថ្មី",
        
        // Confirmation Modal
        confirmDeleteTitle: "បញ្ជាក់ការលុប",
        confirmDeleteMessage: "តើអ្នកប្រាកដថាចង់លុបអនុស្សាវរីយ៍នេះមែនទេ? សកម្មភាពនេះមិនអាចត្រឡប់វិញបានទេ។",
        
        // Notifications
        memorySavedTitle: "អនុស្សាវរីយ៍បានរក្សាទុក!",
        memorySavedMessage: "អនុស្សាវរីយ៍ដ៏ស្រស់ស្អាតរបស់អ្នកត្រូវបានរក្សាទុកដោយជោគជ័យ។",
        memoryUpdatedTitle: "អនុស្សាវរីយ៍បានធ្វើបច្ចុប្បន្នភាព!",
        memoryUpdatedMessage: "អនុស្សាវរីយ៍របស់អ្នកត្រូវបានធ្វើបច្ចុប្បន្នភាពដោយជោគជ័យ។",
        memoryDeletedTitle: "អនុស្សាវរីយ៍បានលុប!",
        memoryDeletedMessage: "អនុស្សាវរីយ៍ត្រូវបានលុបដោយជោគជ័យ។",
        invalidFileTitle: "ឯកសារមិនត្រឹមត្រូវ",
        invalidFileMessage: "សូមជ្រើសរើសឯកសាររូបភាពដែលត្រឹមត្រូវ។",
        
        // Sample Memories (Khmer)
        sampleMemories: [
            {
                title: "ការណាត់ជួបដំបូងរបស់យើង ❤️",
                description: "យប់វេលាដ៏អស្ចារ្យនៅភោជនីយដ្ឋានអ៊ីតាលី ជាកន្លែងដែលយើងបាននិយាយគ្នារាប់ម៉ោង និងបានដឹងថាយើងមានអ្វីរួមគ្នាច្រើន។ របៀបដែលអ្នកសើចចំពោះរឿងកំប្លែងល្ងីល្ងើរបស់ខ្ញុំ បានធ្វើឱ្យបេះដូងខ្ញុំលោតខ្លាំង។"
            },
            {
                title: "ការធ្វើដំណើរចុងសប្តាហ៍ 🏖️",
                description: "ការធ្វើដំណើរដោយមិនបានគ្រោងទុកមុនរបស់យើងទៅឆ្នេរសមុទ្រ ជាកន្លែងដែលយើងបានមើលពេលថ្ងៃលិចជាមួយគ្នា។ ការសាងសាលាលំហ និងការបែងចែកការ៉េមអំឡុងពេលដែលរលកបក់បោកនៅក្បែរ - ភាពសុខដ៏ស្រស់ស្អាត។"
            },
            {
                title: "យប់មើលកុនកំប្លែង 🎬",
                description: "យប់ដ៏កក់ក្តៅក្នុងការមើលកុនកំប្លែងស្នេហាដែលយើងចូលចិត្ត។ អ្នកបានដេកលើស្មារបស់ខ្ញុំកំឡុងពេលក្រេឌីត ហើយខ្ញុំមិនចង់ផ្លាស់ទីនោះទេ ព្រោះអ្នកមើលទៅសុខស្រួលណាស់។"
            },
            {
                title: "ការអបអរសាទរខួបកំណើត 💐",
                description: "ការអបអរសាទរកម្រិតសំខាន់ពិសេសរបស់យើងជាមួយអាហារពេលល្ងាចនៅភោជនីយដ្ឋានដែលយើងចូលចិត្ត។ ផ្កាដែលអ្នកបានធ្វើអោយខ្ញុំភ្ញាក់ផ្អើល មានភាពស្រស់ស្អាតមែនទែន និងបានធ្វើឱ្យយប់នោះកាន់តែល្អឥតខ្ចោះ។"
            },
            {
                title: "ការផ្សងព្រេងជាមួយគ្នា 🌟",
                description: "ការផ្សងព្រេងដ៏រំភើបរបស់យើងក្នុងការស្វែងរកកន្លែងថ្មីៗជាមួយគ្នា។ រាល់ពេលវេលាជាមួយអ្នកមានអារម្មណ៍ដូចជាការរកឃើញថ្មី ហើយខ្ញុំស្រលាញ់របៀបដែលយើងបង្កើតអនុស្សាវរីយ៍ដ៏ស្រស់ស្អាតនៅគ្រប់កន្លែងដែលយើងទៅ។"
            }
        ]
    },
    en: {
        // Navigation and Header
        title: "Our Memory - Love Stories",
        logoText: "Our Memory",
        toggleTheme: "Toggle dark mode",
        language: "Language",
        
        // Hero Section
        heroTitle1: "Our Beautiful",
        heroTitle2: "Journey Together",
        heroSubtitle: "Capturing every precious moment of our love story",
        createMemoryButton: "Create New Memory",
        
        // Add Memory Section
        addMemoryTitle: "Add a New Memory",
        closeSection: "Close add memory section",
        memoryTitleLabel: "Memory Title",
        memoryTitlePlaceholder: "Our first date, vacation, etc...",
        descriptionLabel: "Description",
        descriptionPlaceholder: "Tell us about this beautiful moment...",
        dateLabel: "Date",
        uploadImageLabel: "Upload Image",
        uploadImageText: "Click to select or drag & drop",
        saveMemoryButton: "Save Memory",
        
        // Memories Gallery
        memoriesTitle: "Our Beautiful Memories",
        noMemoriesText: "No memories yet. Create your first beautiful memory above! 💕",
        
        // Modal Actions
        editButton: "Edit",
        deleteButton: "Delete",
        cancelButton: "Cancel",
        saveChangesButton: "Save Changes",
        
        // Edit Modal
        editMemoryTitle: "Edit Memory",
        changeImageText: "Change Image (Optional)",
        changeImageSubtext: "Click to select new image",
        
        // Confirmation Modal
        confirmDeleteTitle: "Confirm Delete",
        confirmDeleteMessage: "Are you sure you want to delete this memory? This action cannot be undone.",
        
        // Notifications
        memorySavedTitle: "Memory Saved!",
        memorySavedMessage: "Your beautiful memory has been saved successfully.",
        memoryUpdatedTitle: "Memory Updated!",
        memoryUpdatedMessage: "Your memory has been successfully updated.",
        memoryDeletedTitle: "Memory Deleted!",
        memoryDeletedMessage: "The memory has been successfully deleted.",
        invalidFileTitle: "Invalid File",
        invalidFileMessage: "Please select a valid image file.",
        
        // Sample Memories (English)
        sampleMemories: [
            {
                title: "Our First Date ❤️",
                description: "That magical evening at the Italian restaurant where we talked for hours and realized we had so much in common. The way you laughed at my silly jokes made my heart skip a beat."
            },
            {
                title: "Weekend Getaway 🏖️",
                description: "Our spontaneous trip to the beach where we watched the sunset together. Building sandcastles and sharing ice cream while the waves crashed nearby - pure bliss."
            },
            {
                title: "Movie Night Cuddles 🎬",
                description: "Cozy evening watching our favorite romantic comedy. You fell asleep on my shoulder during the credits, and I didn't want to move because you looked so peaceful."
            },
            {
                title: "Anniversary Celebration 💐",
                description: "Celebrating our special milestone with dinner at our favorite restaurant. The flowers you surprised me with were absolutely beautiful and made the evening even more perfect."
            },
            {
                title: "Adventure Together 🌟",
                description: "Our exciting adventure exploring new places together. Every moment with you feels like a new discovery, and I love how we create beautiful memories wherever we go."
            }
        ]
    }
};

// Current language (default: Khmer)
let currentLanguage = 'km';

// Get text based on current language
function getText(key) {
    return languages[currentLanguage][key] || languages['en'][key] || key;
}

// Get sample memories based on current language
function getSampleMemories() {
    return languages[currentLanguage].sampleMemories || languages['en'].sampleMemories;
}

// Change language function
function changeLanguage(langCode) {
    if (languages[langCode]) {
        currentLanguage = langCode;
        localStorage.setItem('selectedLanguage', langCode);
        
        // Set lang attribute on html element for better font support
        document.documentElement.setAttribute('lang', langCode);
        
        updatePageLanguage();
        
        // Trigger custom event for language change
        window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: langCode } }));
        
        // Refresh memories with new language if they are sample memories
        const stored = localStorage.getItem('ourMemories');
        if (!stored || JSON.parse(stored).length === 0) {
            loadSampleMemories();
        }
        
        displayMemories();
    }
}

// Update all text on the page
function updatePageLanguage() {
    // Update document title
    document.title = getText('title');
    
    // Update logo text
    const logoText = document.querySelector('.logo span');
    if (logoText) logoText.textContent = getText('logoText');
    
    // Update theme toggle aria-label
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) themeToggle.setAttribute('aria-label', getText('toggleTheme'));
    
    // Update language selector text
    const langText = document.querySelector('.language-selector .lang-text');
    if (langText) langText.textContent = getText('language');
    
    // Update hero section
    const heroTitle1 = document.querySelector('.romantic-text');
    const heroTitle2 = document.querySelector('.memory-text');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const ctaButton = document.querySelector('.cta-button');
    
    if (heroTitle1) heroTitle1.textContent = getText('heroTitle1');
    if (heroTitle2) heroTitle2.textContent = getText('heroTitle2');
    if (heroSubtitle) heroSubtitle.textContent = getText('heroSubtitle');
    if (ctaButton) {
        ctaButton.innerHTML = `
            <i class="fas fa-plus"></i>
            ${getText('createMemoryButton')}
        `;
    }
    
    // Update add memory section
    const addMemoryTitle = document.querySelector('#add-memory .section-title');
    const closeSectionBtn = document.querySelector('.close-section-btn');
    
    if (addMemoryTitle) addMemoryTitle.textContent = getText('addMemoryTitle');
    if (closeSectionBtn) closeSectionBtn.setAttribute('aria-label', getText('closeSection'));
    
    // Update form labels and placeholders
    const memoryTitleLabel = document.querySelector('label[for="memory-title"]');
    const memoryTitleInput = document.getElementById('memory-title');
    const descriptionLabel = document.querySelector('label[for="memory-description"]');
    const descriptionTextarea = document.getElementById('memory-description');
    const dateLabel = document.querySelector('label[for="memory-date"]');
    const uploadLabel = document.querySelector('.file-upload-label span');
    const uploadSubtext = document.querySelector('.file-upload-label small');
    const saveButton = document.querySelector('.submit-btn');
    
    if (memoryTitleLabel) memoryTitleLabel.textContent = getText('memoryTitleLabel');
    if (memoryTitleInput) memoryTitleInput.placeholder = getText('memoryTitlePlaceholder');
    if (descriptionLabel) descriptionLabel.textContent = getText('descriptionLabel');
    if (descriptionTextarea) descriptionTextarea.placeholder = getText('descriptionPlaceholder');
    if (dateLabel) dateLabel.textContent = getText('dateLabel');
    if (uploadLabel) uploadLabel.textContent = getText('uploadImageText');
    if (uploadSubtext) uploadSubtext.textContent = getText('uploadImageText');
    if (saveButton) {
        saveButton.innerHTML = `
            <i class="fas fa-heart"></i>
            ${getText('saveMemoryButton')}
        `;
    }
    
    // Update memories section title
    const memoriesTitle = document.querySelector('#memories .section-title');
    if (memoriesTitle) memoriesTitle.textContent = getText('memoriesTitle');
    
    // Update modal action buttons
    const editBtn = document.querySelector('.edit-btn');
    const deleteBtn = document.querySelector('.delete-btn');
    
    if (editBtn) {
        editBtn.innerHTML = `
            <i class="fas fa-edit"></i>
            ${getText('editButton')}
        `;
    }
    if (deleteBtn) {
        deleteBtn.innerHTML = `
            <i class="fas fa-trash"></i>
            ${getText('deleteButton')}
        `;
    }
    
    // Update edit modal
    const editModalTitle = document.querySelector('#edit-modal .modal-header h2');
    const editImageLabel = document.querySelector('label[for="edit-image"] span');
    const editImageSubtext = document.querySelector('label[for="edit-image"] small');
    const cancelBtn = document.querySelector('.cancel-btn');
    const saveBtn = document.querySelector('.save-btn');
    
    if (editModalTitle) {
        editModalTitle.innerHTML = `
            <i class="fas fa-edit"></i> ${getText('editMemoryTitle')}
        `;
    }
    if (editImageLabel) editImageLabel.textContent = getText('changeImageText');
    if (editImageSubtext) editImageSubtext.textContent = getText('changeImageSubtext');
    if (cancelBtn) {
        cancelBtn.innerHTML = `
            <i class="fas fa-times"></i>
            ${getText('cancelButton')}
        `;
    }
    if (saveBtn) {
        saveBtn.innerHTML = `
            <i class="fas fa-save"></i>
            ${getText('saveChangesButton')}
        `;
    }
    
    // Update edit form labels
    const editTitleLabel = document.querySelector('label[for="edit-title"]');
    const editDescriptionLabel = document.querySelector('label[for="edit-description"]');
    const editDateLabel = document.querySelector('label[for="edit-date"]');
    
    if (editTitleLabel) editTitleLabel.textContent = getText('memoryTitleLabel');
    if (editDescriptionLabel) editDescriptionLabel.textContent = getText('descriptionLabel');
    if (editDateLabel) editDateLabel.textContent = getText('dateLabel');
    
    // Update confirmation modal
    const confirmTitle = document.querySelector('#confirm-modal .confirm-header h3');
    const confirmMessage = document.querySelector('#confirm-modal .confirm-body p');
    const confirmCancelBtn = document.querySelector('#confirm-modal .cancel-btn');
    const confirmDeleteBtn = document.querySelector('.delete-confirm-btn');
    
    if (confirmTitle) confirmTitle.textContent = getText('confirmDeleteTitle');
    if (confirmMessage) confirmMessage.textContent = getText('confirmDeleteMessage');
    if (confirmCancelBtn) {
        confirmCancelBtn.innerHTML = `
            <i class="fas fa-times"></i>
            ${getText('cancelButton')}
        `;
    }
    if (confirmDeleteBtn) {
        confirmDeleteBtn.innerHTML = `
            <i class="fas fa-trash"></i>
            ${getText('deleteButton')}
        `;
    }
}

// Load saved language preference
function loadLanguagePreference() {
    const saved = localStorage.getItem('selectedLanguage');
    if (saved && languages[saved]) {
        currentLanguage = saved;
    }
    
    // Set lang attribute on html element
    document.documentElement.setAttribute('lang', currentLanguage);
    
    updatePageLanguage();
}

// Initialize language system
document.addEventListener('DOMContentLoaded', function() {
    loadLanguagePreference();
});
