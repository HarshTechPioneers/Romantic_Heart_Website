// Enhanced Navigation functionality
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// Enhanced navbar background change on scroll
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    navbar.style.boxShadow = '0 4px 30px rgba(244, 194, 194, 0.3)';
    navbar.style.backdropFilter = 'blur(20px)';
  } else {
    navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    navbar.style.boxShadow = 'none';
    navbar.style.backdropFilter = 'blur(10px)';
  }
});

// Create magical particles
function createParticles() {
  const particlesContainer = document.getElementById('particles');
  
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.animationDelay = Math.random() * 15 + 's';
    particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
    particlesContainer.appendChild(particle);
  }
}

// Initialize particles
createParticles();

// Animated counter for hero stats
function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current).toLocaleString();
  }, 16);
}

// Initialize counters when hero section is visible
const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counters = document.querySelectorAll('.stat-number[data-target]');
      counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        animateCounter(counter, target);
      });
      heroObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroSection = document.querySelector('.hero');
if (heroSection) {
  heroObserver.observe(heroSection);
}

// Enhanced timeline animation on scroll
const observerOptions = {
  threshold: 0.2,
  rootMargin: '0px 0px -100px 0px'
};

const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.animation = entry.target.classList.contains('timeline-item') && 
          Array.from(entry.target.parentElement.children).indexOf(entry.target) % 2 === 0 
          ? 'slideInFromLeft 0.8s ease forwards' 
          : 'slideInFromRight 0.8s ease forwards';
      }, index * 300);
    }
  });
}, observerOptions);

// Observe timeline items
document.querySelectorAll('.timeline-item').forEach(item => {
  timelineObserver.observe(item);
});

// Enhanced gallery functionality
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxDescription = document.getElementById('lightbox-description');
const lightboxClose = document.querySelector('.lightbox-close');

let currentImageIndex = 0;
let galleryImages = [];

// Collect all gallery images
galleryItems.forEach((item, index) => {
  const img = item.querySelector('img');
  const title = item.querySelector('.overlay-content h4').textContent;
  const description = item.querySelector('.overlay-content p').textContent;
  
  galleryImages.push({
    src: img.src,
    title: title,
    description: description
  });
  
  item.addEventListener('click', () => {
    currentImageIndex = index;
    openLightbox();
  });
});

function openLightbox() {
  const image = galleryImages[currentImageIndex];
  lightboxImage.src = image.src;
  lightboxTitle.textContent = image.title;
  lightboxDescription.textContent = image.description;
  lightbox.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.style.display = 'none';
  document.body.style.overflow = 'auto';
}

// Navigation buttons
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

prevBtn.addEventListener('click', () => {
  currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
  openLightbox();
});

nextBtn.addEventListener('click', () => {
  currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
  openLightbox();
});

// Close lightbox
lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox || e.target.classList.contains('lightbox-background')) {
    closeLightbox();
  }
});

// Close lightbox with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightbox.style.display === 'block') {
    closeLightbox();
  }
  if (lightbox.style.display === 'block') {
    if (e.key === 'ArrowLeft') {
      prevBtn.click();
    } else if (e.key === 'ArrowRight') {
      nextBtn.click();
    }
  }
});

// Gallery filter functionality
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryGrid = document.querySelector('.gallery-grid');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all buttons
    filterBtns.forEach(b => b.classList.remove('active'));
    // Add active class to clicked button
    btn.classList.add('active');
    
    const filter = btn.getAttribute('data-filter');
    
    galleryItems.forEach(item => {
      if (filter === 'all' || item.getAttribute('data-category') === filter) {
        item.style.display = 'block';
        item.style.animation = 'fadeInUp 0.6s ease';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// Enhanced guestbook functionality
const guestbookForm = document.getElementById('guestbookForm');
const messagesList = document.getElementById('messagesList');
const messagesCount = document.getElementById('messagesCount');

// Load messages from localStorage
let messages = JSON.parse(localStorage.getItem('guestbookMessages')) || [];

// Display existing messages
function displayMessages() {
  messagesList.innerHTML = '';
  
  // Add default messages if none exist
  if (messages.length === 0) {
    messages = [
      {
        name: "Emma & James",
        email: "",
        message: "Congratulations to the most beautiful couple! Your love story gives us all hope and inspiration. Wishing you a lifetime of happiness together! ♡",
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        reactions: { heart: 12, smile: 8, clap: 0 }
      },
      {
        name: "Mom & Dad",
        email: "",
        message: "We're so proud of the love you've built together. Welcome to the family, Michael! Sarah, you've found your perfect match. ♡",
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        reactions: { heart: 25, smile: 15, clap: 10 }
      }
    ];
  }
  
  // Update messages count
  messagesCount.textContent = `${messages.length} beautiful message${messages.length !== 1 ? 's' : ''}`;
  
  messages.forEach((message, index) => {
    const messageCard = document.createElement('div');
    messageCard.className = 'message-card';
    
    // Create avatar from initials
    const initials = message.name.split(' ').map(word => word[0]).join('').toUpperCase();
    
    messageCard.innerHTML = `
      <div class="message-avatar">${initials}</div>
      <div class="message-content">
        <div class="message-header">
          <strong>${message.name}</strong>
          <span class="message-date">${getRelativeTime(message.date)}</span>
        </div>
        <p>"${message.message}"</p>
        <div class="message-reactions">
          <button class="reaction-btn" data-reaction="heart" data-index="${index}">♡ ${message.reactions?.heart || 0}</button>
          <button class="reaction-btn" data-reaction="smile" data-index="${index}">🥰 ${message.reactions?.smile || 0}</button>
          <button class="reaction-btn" data-reaction="clap" data-index="${index}">👏 ${message.reactions?.clap || 0}</button>
        </div>
      </div>
    `;
    messagesList.appendChild(messageCard);
  });
  
  // Add reaction event listeners
  document.querySelectorAll('.reaction-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const reaction = e.target.getAttribute('data-reaction');
      const index = parseInt(e.target.getAttribute('data-index'));
      
      if (!messages[index].reactions) {
        messages[index].reactions = { heart: 0, smile: 0, clap: 0 };
      }
      
      messages[index].reactions[reaction]++;
      localStorage.setItem('guestbookMessages', JSON.stringify(messages));
      
      // Update button text
      e.target.textContent = `${reaction === 'heart' ? '♡' : reaction === 'smile' ? '🥰' : '👏'} ${messages[index].reactions[reaction]}`;
      
      // Add animation
      e.target.style.transform = 'scale(1.2)';
      setTimeout(() => {
        e.target.style.transform = 'scale(1)';
      }, 200);
    });
  });
}

// Get relative time (e.g., "2 days ago")
function getRelativeTime(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    return 'Today';
  } else if (diffDays === 1) {
    return '1 day ago';
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return weeks === 1 ? '1 week ago' : `${weeks} weeks ago`;
  } else {
    const months = Math.floor(diffDays / 30);
    return months === 1 ? '1 month ago' : `${months} months ago`;
  }
}

// Handle form submission
guestbookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const name = document.getElementById('guestName').value.trim();
  const email = document.getElementById('guestEmail').value.trim();
  const message = document.getElementById('guestMessage').value.trim();
  
  if (name && message) {
    const newMessage = {
      name: name,
      email: email,
      message: message,
      date: new Date().toLocaleDateString(),
      reactions: { heart: 0, smile: 0, clap: 0 }
    };
    
    messages.unshift(newMessage); // Add to beginning of array
    localStorage.setItem('guestbookMessages', JSON.stringify(messages));
    
    // Clear form
    guestbookForm.reset();
    
    // Show success message
    showSuccessMessage();
    
    // Update display
    displayMessages();
  }
});

// Show success message with enhanced animation
function showSuccessMessage() {
  const submitBtn = document.querySelector('.submit-btn');
  const originalText = submitBtn.querySelector('.btn-text').textContent;
  const btnText = submitBtn.querySelector('.btn-text');
  const btnIcon = submitBtn.querySelector('.btn-icon');
  
  btnText.textContent = 'Message Sent!';
  btnIcon.textContent = '✓';
  submitBtn.style.background = 'linear-gradient(45deg, #10b981, #34d399)';
  
  // Trigger ripple effect
  const ripple = submitBtn.querySelector('.btn-ripple');
  ripple.style.width = '300px';
  ripple.style.height = '300px';
  
  setTimeout(() => {
    btnText.textContent = originalText;
    btnIcon.textContent = '♡';
    submitBtn.style.background = 'var(--gradient-rose)';
    ripple.style.width = '0';
    ripple.style.height = '0';
  }, 3000);
}

// Initialize messages display
displayMessages();

// Enhanced parallax effect for hero section
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroImage = document.querySelector('.hero-image img');
  const floatingHearts = document.querySelectorAll('.floating-heart');
  
  if (heroImage) {
    heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
  }
  
  // Parallax for floating hearts
  floatingHearts.forEach((heart, index) => {
    const speed = 0.2 + (index * 0.1);
    heart.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// Add enhanced scroll reveal animation for sections
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

// Observe all major sections and cards
document.querySelectorAll('.story-section, .gallery-section, .guestbook-section, .story-card').forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(50px)';
  section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
  revealObserver.observe(section);
});

// Enhanced typing effect for hero subtitle
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.textContent = '';
  
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
  const heroSubtitle = document.querySelector('.hero-subtitle');
  if (heroSubtitle) {
    const originalText = heroSubtitle.textContent;
    
    setTimeout(() => {
      typeWriter(heroSubtitle, originalText, 60);
    }, 2500);
  }
});

// Enhanced floating hearts animation
function createFloatingHeart() {
  const heart = document.createElement('div');
  heart.innerHTML = '♡';
  heart.style.position = 'fixed';
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.top = '100vh';
  heart.style.fontSize = Math.random() * 30 + 20 + 'px';
  heart.style.color = `hsl(${Math.random() * 60 + 320}, 70%, 80%)`;
  heart.style.pointerEvents = 'none';
  heart.style.zIndex = '1';
  heart.style.opacity = Math.random() * 0.7 + 0.3;
  heart.style.animation = `floatUp ${Math.random() * 8 + 12}s linear forwards`;
  
  document.body.appendChild(heart);
  
  setTimeout(() => {
    heart.remove();
  }, 20000);
}

// Add floating hearts animation keyframes
const floatUpKeyframes = `
  @keyframes floatUp {
    0% {
      transform: translateY(0) rotate(0deg);
      opacity: 1;
    }
    100% {
      transform: translateY(-100vh) rotate(360deg);
      opacity: 0;
    }
  }
`;

const style = document.createElement('style');
style.textContent = floatUpKeyframes;
document.head.appendChild(style);

// Create floating hearts periodically
setInterval(createFloatingHeart, 4000);

// Enhanced click effects for interactive elements
document.querySelectorAll('.gallery-item, .story-card, .message-card').forEach(item => {
  item.addEventListener('click', (e) => {
    // Create ripple effect
    const ripple = document.createElement('div');
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(244, 194, 194, 0.6)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.8s linear';
    ripple.style.left = (e.clientX - item.getBoundingClientRect().left - 25) + 'px';
    ripple.style.top = (e.clientY - item.getBoundingClientRect().top - 25) + 'px';
    ripple.style.width = ripple.style.height = '50px';
    ripple.style.pointerEvents = 'none';
    
    item.style.position = 'relative';
    item.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 800);
  });
});

// Add ripple animation
const rippleKeyframes = `
  @keyframes ripple {
    to {
      transform: scale(6);
      opacity: 0;
    }
  }
`;

style.textContent += rippleKeyframes;

// Enhanced form interactions
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

formInputs.forEach(input => {
  input.addEventListener('focus', (e) => {
    const formGroup = e.target.closest('.form-group');
    const label = formGroup.querySelector('label');
    if (label) {
      label.style.color = 'var(--deep-pink)';
      label.style.transform = 'translateY(-5px)';
    }
  });
  
  input.addEventListener('blur', (e) => {
    const formGroup = e.target.closest('.form-group');
    const label = formGroup.querySelector('label');
    if (label) {
      label.style.color = 'var(--text-dark)';
      label.style.transform = 'translateY(0)';
    }
  });
});

// Add smooth page transitions
document.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);
});

// Performance optimization: Lazy loading for images
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.style.opacity = '0';
      img.style.transition = 'opacity 0.5s ease';
      
      img.onload = () => {
        img.style.opacity = '1';
      };
      
      imageObserver.unobserve(img);
    }
  });
});

// Observe all images for lazy loading
document.querySelectorAll('img').forEach(img => {
  imageObserver.observe(img);
});

// Add custom cursor effect for interactive elements
document.addEventListener('mousemove', (e) => {
  const cursor = document.querySelector('.custom-cursor');
  if (!cursor) {
    const newCursor = document.createElement('div');
    newCursor.className = 'custom-cursor';
    newCursor.style.cssText = `
      position: fixed;
      width: 20px;
      height: 20px;
      background: radial-gradient(circle, var(--primary-pink), transparent);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      opacity: 0.6;
      transition: transform 0.1s ease;
    `;
    document.body.appendChild(newCursor);
  }
  
  const customCursor = document.querySelector('.custom-cursor');
  customCursor.style.left = e.clientX - 10 + 'px';
  customCursor.style.top = e.clientY - 10 + 'px';
});

// Enhanced hover effects for interactive elements
document.querySelectorAll('button, .nav-link, .gallery-item, .story-card').forEach(element => {
  element.addEventListener('mouseenter', () => {
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
      cursor.style.transform = 'scale(2)';
      cursor.style.background = 'radial-gradient(circle, var(--deep-pink), transparent)';
    }
  });
  
  element.addEventListener('mouseleave', () => {
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
      cursor.style.transform = 'scale(1)';
      cursor.style.background = 'radial-gradient(circle, var(--primary-pink), transparent)';
    }
  });
});

console.log('🌸 Enhanced Love Story Website Loaded Successfully! 💕✨');
console.log('🎉 Features: Magical particles, animated counters, enhanced lightbox, interactive reactions, and much more!');