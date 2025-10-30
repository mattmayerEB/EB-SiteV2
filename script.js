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

    // Info Kit Form Validation
    const infoKitForm = document.getElementById('infoKitForm');
    
    if (infoKitForm) {
        infoKitForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Clear previous errors
            clearErrors();
            
            // Get form data
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            
            let isValid = true;
            
            // Validate Name
            if (!name) {
                showError('nameError', 'Name is required');
                isValid = false;
            } else if (name.length < 2) {
                showError('nameError', 'Name must be at least 2 characters');
                isValid = false;
            }
            
            // Validate Email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email) {
                showError('emailError', 'Email is required');
                isValid = false;
            } else if (!emailRegex.test(email)) {
                showError('emailError', 'Please enter a valid email address');
                isValid = false;
            }
            
            // Validate Phone
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
            if (!phone) {
                showError('phoneError', 'Phone number is required');
                isValid = false;
            } else if (!phoneRegex.test(cleanPhone) || cleanPhone.length < 10) {
                showError('phoneError', 'Please enter a valid phone number');
                isValid = false;
            }
            
            if (isValid) {
                // Show disclaimer modal
                const disclaimerModal = document.getElementById('disclaimerModal');
                disclaimerModal.classList.add('active');
            }
        });
        
        // Real-time validation
        const inputs = infoKitForm.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                // Clear error when user starts typing
                const errorId = this.id + 'Error';
                const errorElement = document.getElementById(errorId);
                if (errorElement) {
                    errorElement.textContent = '';
                }
                this.classList.remove('error');
            });
        });
    }
    
    function validateField(field) {
        const value = field.value.trim();
        const fieldId = field.id;
        const errorId = fieldId + 'Error';
        const errorElement = document.getElementById(errorId);
        
        let isValid = true;
        let errorMessage = '';
        
        switch (fieldId) {
            case 'name':
                if (!value) {
                    errorMessage = 'Name is required';
                    isValid = false;
                } else if (value.length < 2) {
                    errorMessage = 'Name must be at least 2 characters';
                    isValid = false;
                }
                break;
                
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!value) {
                    errorMessage = 'Email is required';
                    isValid = false;
                } else if (!emailRegex.test(value)) {
                    errorMessage = 'Please enter a valid email address';
                    isValid = false;
                }
                break;
                
            case 'phone':
                const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
                const cleanPhone = value.replace(/[\s\-\(\)]/g, '');
                if (!value) {
                    errorMessage = 'Phone number is required';
                    isValid = false;
                } else if (!phoneRegex.test(cleanPhone) || cleanPhone.length < 10) {
                    errorMessage = 'Please enter a valid phone number';
                    isValid = false;
                }
                break;
        }
        
        if (!isValid) {
            field.classList.add('error');
            if (errorElement) {
                errorElement.textContent = errorMessage;
            }
        } else {
            field.classList.remove('error');
            if (errorElement) {
                errorElement.textContent = '';
            }
        }
    }
    
    function showError(errorId, message) {
        const errorElement = document.getElementById(errorId);
        if (errorElement) {
            errorElement.textContent = message;
        }
        
        // Add error class to corresponding input
        const fieldId = errorId.replace('Error', '');
        const field = document.getElementById(fieldId);
        if (field) {
            field.classList.add('error');
        }
    }
    
    function clearErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(element => {
            element.textContent = '';
        });
        
        const errorInputs = document.querySelectorAll('.info-kit-form input.error');
        errorInputs.forEach(input => {
            input.classList.remove('error');
        });
    }
    
    // Disclaimer modal functionality
    const disclaimerModal = document.getElementById('disclaimerModal');
    const disclaimerCheckbox = document.getElementById('disclaimerCheckbox');
    const disclaimerAccept = document.getElementById('disclaimerAccept');
    const disclaimerCancel = document.getElementById('disclaimerCancel');
    
    if (disclaimerModal && disclaimerCheckbox && disclaimerAccept && disclaimerCancel) {
        // Enable/disable accept button based on checkbox
        disclaimerCheckbox.addEventListener('change', function() {
            disclaimerAccept.disabled = !this.checked;
        });
        
        // Accept button - proceed with download
        disclaimerAccept.addEventListener('click', function() {
            if (disclaimerCheckbox.checked) {
                // Close modal
                disclaimerModal.classList.remove('active');
                disclaimerCheckbox.checked = false;
                disclaimerAccept.disabled = true;
                
                // Download the PDF
                const downloadBtn = document.querySelector('.info-kit-form .btn-download');
                if (downloadBtn) {
                    const originalText = downloadBtn.textContent;
                    downloadBtn.textContent = 'Downloading...';
                    downloadBtn.disabled = true;
                    
                    // Create a temporary link to download the PDF
                    const link = document.createElement('a');
                    link.href = 'Policies/EverythingBreaks_InfoKit-2024_web.pdf';
                    link.download = 'EverythingBreaks_InfoKit.pdf';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    
                    setTimeout(() => {
                        alert('Thank you! Your info kit has been downloaded.');
                        const form = document.getElementById('infoKitForm');
                        if (form) {
                            form.reset();
                        }
                        downloadBtn.textContent = originalText;
                        downloadBtn.disabled = false;
                    }, 1000);
                }
            }
        });
        
        // Cancel button - close modal and reset checkbox
        disclaimerCancel.addEventListener('click', function() {
            disclaimerModal.classList.remove('active');
            disclaimerCheckbox.checked = false;
            disclaimerAccept.disabled = true;
        });
        
        // Close modal when clicking outside
        disclaimerModal.addEventListener('click', function(e) {
            if (e.target === disclaimerModal) {
                disclaimerModal.classList.remove('active');
                disclaimerCheckbox.checked = false;
                disclaimerAccept.disabled = true;
            }
        });
        
        // Close modal on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && disclaimerModal.classList.contains('active')) {
                disclaimerModal.classList.remove('active');
                disclaimerCheckbox.checked = false;
                disclaimerAccept.disabled = true;
            }
        });
    }

});

// Testimonial Pagination
function showTestimonialPage(page) {
    const grid = document.querySelector('.testimonials-grid');
    const cards = grid.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    
    if (cards.length === 0) return;
    
    // Calculate which card to scroll to (show 3 cards per page)
    const cardsPerPage = 3;
    const cardWidth = cards[0].offsetWidth;
    const gap = 30;
    const scrollPosition = page * cardsPerPage * (cardWidth + gap);
    
    grid.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
    });
    
    // Update active dot
    dots.forEach((dot, index) => {
        if (index === page) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Auto-update dots based on scroll position
document.addEventListener('DOMContentLoaded', function() {
    const grid = document.querySelector('.testimonials-grid');
    const dots = document.querySelectorAll('.dot');
    
    if (grid && dots.length > 0) {
        grid.addEventListener('scroll', function() {
            const cards = grid.querySelectorAll('.testimonial-card');
            if (cards.length === 0) return;
            
            const cardWidth = cards[0].offsetWidth;
            const gap = 30;
            const scrollPosition = grid.scrollLeft;
            const cardsPerPage = 3;
            const currentPage = Math.round(scrollPosition / (cardsPerPage * (cardWidth + gap)));
            
            // Update active dot
            dots.forEach((dot, index) => {
                if (index === currentPage) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        });
    }
});

// FAQ Expand/Collapse Functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.auto-faq .faq-item.expandable');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-question i');
        
        question.addEventListener('click', function() {
            const isOpen = answer.style.display !== 'none';
            
            if (isOpen) {
                // Close
                answer.style.display = 'none';
                icon.classList.remove('fa-minus');
                icon.classList.add('fa-plus');
            } else {
                // Open
                answer.style.display = 'block';
                icon.classList.remove('fa-plus');
                icon.classList.add('fa-minus');
            }
        });
    });
});

// Back to Top Button
document.addEventListener('DOMContentLoaded', function() {
    const backToTopBtn = document.getElementById('backToTop');
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.display = 'flex';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
    
    // Scroll to top when button is clicked
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Video Modal Functions
function openVideo() {
    const modal = document.getElementById('videoModal');
    const iframe = document.getElementById('videoFrame');
    
    // Set the video source with autoplay
    iframe.src = 'https://www.youtube.com/embed/PMinafYHUX4?autoplay=1';
    
    // Show the modal
    modal.classList.add('active');
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

function closeVideo() {
    const modal = document.getElementById('videoModal');
    const iframe = document.getElementById('videoFrame');
    
    // Hide the modal
    modal.classList.remove('active');
    
    // Remove the iframe source to stop the video
    iframe.src = '';
    
    // Restore body scroll
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside or pressing Escape
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeVideo();
    }
});


