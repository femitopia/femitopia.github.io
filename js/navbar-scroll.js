document.addEventListener('DOMContentLoaded', function() {
  const navbar = document.querySelector('.navbar');
  let lastScroll = 0;
  const scrollThreshold = 100; // How far to scroll before hiding the navbar
  
  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    // Always add scrolled class when not at top
    if (currentScroll > 0) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
      navbar.classList.remove('nav-up');
      navbar.classList.remove('nav-down');
      return;
    }
    
    // Hide navbar when scrolling down, show when scrolling up
    if (currentScroll > lastScroll && currentScroll > scrollThreshold) {
      // Scrolling down
      navbar.classList.add('nav-up');
      navbar.classList.remove('nav-down');
    } else {
      // Scrolling up
      navbar.classList.remove('nav-up');
      navbar.classList.add('nav-down');
    }
    
    lastScroll = currentScroll;
  });
});
