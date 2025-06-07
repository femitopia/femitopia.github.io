document.addEventListener('DOMContentLoaded', function() {
    // Lightbox functionality
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const captionText = document.getElementById('caption');
    const closeBtn = document.querySelector('.close-lightbox');

    // Open lightbox when clicking on gallery images
    document.querySelectorAll('.gallery-item img').forEach(img => {
        img.addEventListener('click', function() {
            lightbox.classList.add('show');
            lightboxImg.src = this.getAttribute('data-large') || this.src;
            lightboxImg.alt = this.alt;
            captionText.innerHTML = this.alt;
            document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
        });
    });

    // Close lightbox when clicking the close button
    closeBtn.addEventListener('click', closeLightbox);

    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Close lightbox with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox && lightbox.classList.contains('show')) {
            closeLightbox();
        }
    });

    function closeLightbox() {
        if (lightbox) {
            lightbox.classList.remove('show');
            document.body.style.overflow = 'auto'; // Re-enable scrolling
            // Reset the image source to empty when closing
            setTimeout(() => {
                if (lightboxImg) lightboxImg.src = '';
            }, 300); // Wait for the fade-out animation to complete
        }
    }
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
            document.body.classList.toggle('nav-open');
        });
    }
    
    // Close mobile menu when clicking on a nav link
    navLinksItems.forEach(link => {
        link.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.classList.remove('nav-open');
            }
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80; // Height of your fixed header
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            navbar.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
            // Scroll Down
            navbar.classList.remove('scroll-up');
            navbar.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
            // Scroll Up
            navbar.classList.remove('scroll-down');
            navbar.classList.add('scroll-up');
        }
        
        lastScroll = currentScroll;
        
        // Add/remove scrolled class to navbar
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Form submission is now handled by the browser's default mailto: action
    
    // Add animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('active');
            }
        });
    };
    
    // Initial check
    animateOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Set current year in footer
    const currentYear = new Date().getFullYear();
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        yearElement.textContent = `© ${currentYear} Femitopia. All Rights Reserved.`;
    }
});
