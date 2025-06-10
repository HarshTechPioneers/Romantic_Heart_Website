// Application State
const AppState = {
    currentQuoteIndex: 0,
    mobileMenuOpen: false,
    currentFilter: 'all',
    guestbookEntries: [
        {
            id: 1,
            name: 'Sarah & Mike',
            message: 'Congratulations on your beautiful love story! Wishing you both a lifetime of happiness and endless adventures together. ❤️',
            date: 'June 8, 2024'
        },
        {
            id: 2,
            name: 'The Johnson Family',
            message: 'What a wonderful couple you make! Your love shines so brightly and inspires us all. Here\'s to many more years of joy and laughter!',
            date: 'June 7, 2024'
        },
        {
            id: 3,
            name: 'Emma\'s College Roommate',
            message: 'I\'ve watched Emma grow and change over the years, but I\'ve never seen her as happy as she is with James. You two are perfect together!',
            date: 'June 6, 2024'
        }
    ]
};

// Love quotes for hero section
const loveQuotes = [
    "Every love story is beautiful, but ours is my favorite",
    "Together is a wonderful place to be",
    "You are my today and all of my tomorrows",
    "In all the world, there is no heart for me like yours"
];

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function formatDate(date) {
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

// Toast System
class ToastManager {
    constructor() {
        this.container = document.getElementById('toast-container');
        this.toasts = [];
    }

    show(message, type = 'success', duration = 3000) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        
        this.container.appendChild(toast);
        
        // Trigger animation
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        // Auto remove
        setTimeout(() => {
            this.remove(toast);
        }, duration);
        
        return toast;
    }
    
    remove(toast) {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }
}

const toast = new ToastManager();

// Navigation functionality
class Navigation {
    constructor() {
        this.nav = document.getElementById('navigation');
        this.progressBar = this.nav.querySelector('.nav-progress');
        this.mobileMenuBtn = document.getElementById('mobile-menu-btn');
        this.mobileMenu = document.getElementById('mobile-menu');
        this.navItems = document.querySelectorAll('.nav-item');
        
        this.init();
    }
    
    init() {
        // Scroll progress
        window.addEventListener('scroll', debounce(() => {
            this.updateScrollProgress();
        }, 10));
        
        // Mobile menu toggle
        this.mobileMenuBtn.addEventListener('click', () => {
            this.toggleMobileMenu();
        });
        
        // Navigation items
        this.navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                const href = e.target.getAttribute('data-href');
                if (href) {
                    this.scrollToSection(href);
                    this.closeMobileMenu();
                }
            });
        });
    }
    
    updateScrollProgress() {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / totalHeight) * 100;
        this.progressBar.style.width = `${Math.min(progress, 100)}%`;
    }
    
    toggleMobileMenu() {
        AppState.mobileMenuOpen = !AppState.mobileMenuOpen;
        this.mobileMenu.classList.toggle('active', AppState.mobileMenuOpen);
        
        const menuIcon = this.mobileMenuBtn.querySelector('.menu-icon');
        const closeIcon = this.mobileMenuBtn.querySelector('.close-icon');
        
        if (AppState.mobileMenuOpen) {
            menuIcon.style.display = 'none';
            closeIcon.style.display = 'block';
        } else {
            menuIcon.style.display = 'block';
            closeIcon.style.display = 'none';
        }
    }
    
    closeMobileMenu() {
        AppState.mobileMenuOpen = false;
        this.mobileMenu.classList.remove('active');
        
        const menuIcon = this.mobileMenuBtn.querySelector('.menu-icon');
        const closeIcon = this.mobileMenuBtn.querySelector('.close-icon');
        menuIcon.style.display = 'block';
        closeIcon.style.display = 'none';
    }
    
    scrollToSection(href) {
        const element = document.querySelector(href);
        if (element) {
            const navHeight = this.nav.offsetHeight;
            const elementPosition = element.offsetTop - navHeight;
            
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
        }
    }
}

// Hero Section functionality
class HeroSection {
    constructor() {
        this.quoteElement = document.getElementById('rotating-quote');
        this.heroButtons = document.querySelectorAll('.hero-buttons .btn');
        this.floatingHeartsContainer = document.querySelector('.floating-hearts');
        
        this.init();
    }
    
    init() {
        this.startQuoteRotation();
        this.addFloatingHearts();
        
        // Hero button navigation
        this.heroButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const href = e.currentTarget.getAttribute('data-href');
                if (href) {
                    this.scrollToSection(href);
                }
            });
        });
    }
    
    startQuoteRotation() {
        setInterval(() => {
            AppState.currentQuoteIndex = (AppState.currentQuoteIndex + 1) % loveQuotes.length;
            this.quoteElement.style.opacity = '0';
            
            setTimeout(() => {
                this.quoteElement.textContent = loveQuotes[AppState.currentQuoteIndex];
                this.quoteElement.style.opacity = '1';
            }, 250);
        }, 4000);
    }
    
    addFloatingHearts() {
        // Add more floating hearts dynamically
        for (let i = 0; i < 10; i++) {
            const heart = document.createElement('div');
            heart.textContent = '❤';
            heart.style.position = 'absolute';
            heart.style.color = 'var(--romantic-pink-dark)';
            heart.style.opacity = '0.2';
            heart.style.fontSize = `${16 + Math.random() * 16}px`;
            heart.style.top = `${10 + Math.random() * 80}%`;
            heart.style.left = `${5 + Math.random() * 90}%`;
            heart.style.animation = `float ${3 + Math.random() * 2}s ease-in-out infinite`;
            heart.style.animationDelay = `${Math.random() * 3}s`;
            heart.style.pointerEvents = 'none';
            
            this.floatingHeartsContainer.appendChild(heart);
        }
    }
    
    scrollToSection(href) {
        const element = document.querySelector(href);
        if (element) {
            const navHeight = document.getElementById('navigation').offsetHeight;
            const elementPosition = element.offsetTop - navHeight;
            
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
        }
    }
}

// Statistics Counter Animation
class StatisticsCounter {
    constructor() {
        this.statCards = document.querySelectorAll('.stat-count');
        this.hasAnimated = false;
        
        this.init();
    }
    
    init() {
        // Intersection Observer for triggering animation
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.hasAnimated) {
                    this.animateCounters();
                    this.hasAnimated = true;
                }
            });
        }, { threshold: 0.5 });
        
        const statisticsSection = document.getElementById('statistics');
        if (statisticsSection) {
            observer.observe(statisticsSection);
        }
    }
    
    animateCounters() {
        const duration = 2000; // 2 seconds
        const steps = 60;
        const stepDuration = duration / steps;
        
        this.statCards.forEach(card => {
            const target = parseInt(card.getAttribute('data-target'));
            let current = 0;
            let step = 0;
            
            const timer = setInterval(() => {
                step++;
                const progress = step / steps;
                current = Math.floor(target * progress);
                
                card.textContent = current.toLocaleString();
                
                if (step >= steps) {
                    clearInterval(timer);
                    card.textContent = target.toLocaleString();
                }
            }, stepDuration);
        });
    }
}

// Gallery functionality
class Gallery {
    constructor() {
        this.filterBtns = document.querySelectorAll('.filter-btn');
        this.galleryItems = document.querySelectorAll('.gallery-item');
        this.lightbox = document.getElementById('lightbox');
        this.lightboxImage = document.getElementById('lightbox-image');
        this.lightboxClose = document.getElementById('lightbox-close');
        
        this.init();
    }
    
    init() {
        // Filter buttons
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const filter = e.currentTarget.getAttribute('data-filter');
                this.setActiveFilter(filter);
                this.filterGallery(filter);
            });
        });
        
        // Gallery items click (lightbox)
        this.galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                this.openLightbox(img.src, img.alt);
            });
        });
        
        // Lightbox close
        this.lightboxClose.addEventListener('click', () => {
            this.closeLightbox();
        });
        
        this.lightbox.addEventListener('click', (e) => {
            if (e.target === this.lightbox) {
                this.closeLightbox();
            }
        });
        
        // Escape key to close lightbox
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.lightbox.classList.contains('active')) {
                this.closeLightbox();
            }
        });
    }
    
    setActiveFilter(filter) {
        AppState.currentFilter = filter;
        
        this.filterBtns.forEach(btn => {
            btn.classList.remove('active');
        });
        
        const activeBtn = document.querySelector(`[data-filter="${filter}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }
    }
    
    filterGallery(filter) {
        this.galleryItems.forEach(item => {
            const category = item.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                item.classList.remove('hidden');
                item.style.display = 'block';
            } else {
                item.classList.add('hidden');
                item.style.display = 'none';
            }
        });
    }
    
    openLightbox(src, alt) {
        this.lightboxImage.src = src;
        this.lightboxImage.alt = alt;
        this.lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    closeLightbox() {
        this.lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Guestbook functionality
class Guestbook {
    constructor() {
        this.form = document.getElementById('guestbook-form');
        this.nameInput = document.getElementById('guest-name');
        this.messageInput = document.getElementById('guest-message');
        this.entriesContainer = document.getElementById('guestbook-entries');
        
        this.init();
    }
    
    init() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });
        
        this.renderEntries();
    }
    
    handleSubmit() {
        const name = this.nameInput.value.trim();
        const message = this.messageInput.value.trim();
        
        if (!name || !message) {
            toast.show('Please fill in both your name and message', 'error');
            return;
        }
        
        const newEntry = {
            id: AppState.guestbookEntries.length + 1,
            name: name,
            message: message,
            date: formatDate(new Date())
        };
        
        AppState.guestbookEntries.unshift(newEntry);
        this.renderEntries();
        
        // Clear form
        this.nameInput.value = '';
        this.messageInput.value = '';
        
        toast.show('Your message has been added to our guestbook! ❤️', 'success');
    }
    
    renderEntries() {
        this.entriesContainer.innerHTML = AppState.guestbookEntries.map(entry => `
            <div class="guestbook-entry animate-fade-in">
                <div class="entry-header">
                    <h4 class="entry-name">${this.escapeHtml(entry.name)}</h4>
                    <span class="entry-date">${entry.date}</span>
                </div>
                <p class="entry-message">${this.escapeHtml(entry.message)}</p>
            </div>
        `).join('');
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Intersection Observer for fade-in animations
class AnimationObserver {
    constructor() {
        this.init();
    }
    
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Observe sections for fade-in animation
        const sections = document.querySelectorAll('section');
        const cards = document.querySelectorAll('.story-card, .timeline-card, .stat-card, .testimonial-card');
        
        [...sections, ...cards].forEach(el => {
            observer.observe(el);
        });
    }
}

// Smooth scrolling for all navigation
function initSmoothScrolling() {
    const buttons = document.querySelectorAll('[data-href]');
    
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            const href = e.currentTarget.getAttribute('data-href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                
                const element = document.querySelector(href);
                if (element) {
                    const navHeight = document.getElementById('navigation').offsetHeight;
                    const elementPosition = element.offsetTop - navHeight;
                    
                    window.scrollTo({
                        top: elementPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    new Navigation();
    new HeroSection();
    new StatisticsCounter();
    new Gallery();
    new Guestbook();
    new AnimationObserver();
    
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Add loading animation to images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
        
        // Set initial opacity
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        
        // If image is already loaded
        if (img.complete) {
            img.style.opacity = '1';
        }
    });
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('.story-card, .timeline-card, .stat-card, .testimonial-card, .guestbook-entry');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
    
    console.log('Emma & James - Love Story Website Loaded Successfully! ❤️');
});

// Handle window resize
window.addEventListener('resize', debounce(() => {
    // Close mobile menu on resize to desktop
    if (window.innerWidth >= 768 && AppState.mobileMenuOpen) {
        const nav = new Navigation();
        nav.closeMobileMenu();
    }
}, 250));

// Prevent right-click on images (optional)
document.addEventListener('contextmenu', (e) => {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
    }
});
