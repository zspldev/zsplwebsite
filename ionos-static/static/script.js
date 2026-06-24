/**
 * Zapurzaa Systems - Website Interactions
 * Custom JavaScript
 */

document.addEventListener("DOMContentLoaded", function() {
    // Navigation scroll effect
    const navbar = document.getElementById("mainNav");
    const backToTopButton = document.querySelector(".back-to-top");
    
    // Handle navbar background change on scroll
    function handleScroll() {
        if (window.scrollY > 50) {
            if (navbar) navbar.classList.add("scrolled");
            if (backToTopButton) backToTopButton.classList.add("active");
        } else {
            if (navbar) navbar.classList.remove("scrolled");
            if (backToTopButton) backToTopButton.classList.remove("active");
        }
    }
    
    window.addEventListener("scroll", handleScroll);
    
    // Handle dropdown menu functionality
    const mediaQuery = window.matchMedia('(min-width: 992px)');
    
    // Define the event handler functions outside to be able to properly remove them
    function showDropdown() {
        const menu = this.querySelector('.dropdown-menu');
        if (menu) menu.classList.add('show');
    }
    
    function hideDropdown() {
        const menu = this.querySelector('.dropdown-menu');
        if (menu) menu.classList.remove('show');
    }
    
    function handleDropdownHover(e) {
        const dropdowns = document.querySelectorAll('.nav-item.dropdown');
        
        // First remove all event listeners
        dropdowns.forEach(dropdown => {
            dropdown.removeEventListener('mouseenter', showDropdown);
            dropdown.removeEventListener('mouseleave', hideDropdown);
        });
        
        if (e.matches) {
            // Desktop behavior - add hover effect
            dropdowns.forEach(dropdown => {
                dropdown.addEventListener('mouseenter', showDropdown);
                dropdown.addEventListener('mouseleave', hideDropdown);
            });
        }
        // For mobile, Bootstrap's data attributes will handle the toggling
    }
    
    // Initial check
    handleDropdownHover(mediaQuery);
    
    // Add listener for screen size changes
    mediaQuery.addEventListener('change', handleDropdownHover);
    
    // Smooth scrolling for navbar links and back to top button
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === "#") return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Calculate offset based on navbar height
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = targetPosition - navbarHeight;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    const toggler = document.querySelector('.navbar-toggler');
                    if (toggler) toggler.click();
                }
            }
        });
    });
    
    // Add animation to elements when they come into view
    const animatedElements = document.querySelectorAll('.image-container, .culture-card, .contact-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
});
