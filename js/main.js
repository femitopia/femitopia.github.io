document.addEventListener('DOMContentLoaded', function() {
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
    
    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = new FormData(contactForm);
            const formValues = Object.fromEntries(formData.entries());
            
            // Here you would typically send the form data to a server
            console.log('Form submitted:', formValues);
            
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }
    
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
