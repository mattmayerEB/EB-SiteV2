// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Quote form handling
    const quoteForm = document.querySelector('.quote-form');
    
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                zipcode: formData.get('zipcode'),
                planType: formData.get('plan-type')
            };
            
            // Basic validation
            if (!data.name || !data.email || !data.zipcode || !data.planType) {
                alert('Please fill in all fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Zip code validation (US format)
            const zipRegex = /^\d{5}(-\d{4})?$/;
            if (!zipRegex.test(data.zipcode)) {
                alert('Please enter a valid US zip code.');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Submitting...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Thank you for your interest! We will contact you within 24 hours with your personalized quote.');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    // Button click handlers
    const ctaButtons = document.querySelectorAll('.cta-button, .btn-primary');
    
    ctaButtons.forEach(button => {
        if (!button.closest('.quote-form')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Scroll to quote form
                const quoteSection = document.querySelector('.quote-section');
                if (quoteSection) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = quoteSection.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        }
    });

    // Contact Us and Call Now buttons
    const contactBtn = document.querySelector('.help-buttons .btn-primary');
    const callBtn = document.querySelector('.help-buttons .btn-secondary');
    
    if (contactBtn) {
        contactBtn.addEventListener('click', function() {
            // Scroll to quote form
            const quoteSection = document.querySelector('.quote-section');
            if (quoteSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = quoteSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    if (callBtn) {
        callBtn.addEventListener('click', function() {
            // Open phone dialer
            window.location.href = 'tel:300-535-6789';
        });
    }

    // Mobile menu toggle (if needed for smaller screens)
    const createMobileMenu = () => {
        const nav = document.querySelector('.main-nav');
        const navContent = document.querySelector('.nav-content');
        const navLinks = document.querySelector('.nav-links');
        
        if (window.innerWidth <= 768) {
            // Create mobile menu button
            if (!document.querySelector('.mobile-menu-btn')) {
                const mobileMenuBtn = document.createElement('button');
                mobileMenuBtn.className = 'mobile-menu-btn';
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                mobileMenuBtn.style.cssText = `
                    display: block;
                    background: none;
                    border: none;
                    font-size: 24px;
                    color: #333;
                    cursor: pointer;
                    padding: 10px;
                `;
                
                navContent.insertBefore(mobileMenuBtn, navLinks);
                
                // Toggle mobile menu
                mobileMenuBtn.addEventListener('click', function() {
                    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
                });
                
                // Hide nav links by default on mobile
                navLinks.style.display = 'none';
                navLinks.style.cssText += `
                    flex-direction: column;
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background: white;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                    padding: 20px;
                    z-index: 1000;
                `;
            }
        } else {
            // Remove mobile menu button and reset styles
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            if (mobileMenuBtn) {
                mobileMenuBtn.remove();
            }
            
            navLinks.style.display = 'flex';
            navLinks.style.cssText = '';
        }
    };

    // Initialize mobile menu
    createMobileMenu();
    
    // Update mobile menu on resize
    window.addEventListener('resize', createMobileMenu);

    // Add scroll effect to header
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Add animation classes on scroll
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

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.step, .plan-card, .why-section, .quote-section');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add hover effects for plan cards
    const planCards = document.querySelectorAll('.plan-card');
    
    planCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Form field focus effects
    const formInputs = document.querySelectorAll('.quote-form input, .quote-form select');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
            this.parentElement.style.transition = 'transform 0.2s ease';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });

});

