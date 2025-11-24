// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Hamburger menu toggle
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const navLinks = document.getElementById('navLinks');
    
    if (hamburgerMenu && navLinks) {
        hamburgerMenu.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            // Change icon
            const icon = this.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close menu when clicking on a link (but not dropdown toggles)
        const menuLinks = navLinks.querySelectorAll('a:not(.dropdown > a)');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 960) {
                    navLinks.classList.remove('active');
                    navLinks.style.display = 'none';
                    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
                    if (mobileMenuBtn) {
                        const icon = mobileMenuBtn.querySelector('i');
                        if (icon) {
                            icon.classList.remove('fa-times');
                            icon.classList.add('fa-bars');
                        }
                    }
                }
            });
        });
    }
    
    // Mobile dropdown toggle
    const dropdownToggles = document.querySelectorAll('.dropdown > a');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const dropdown = this.parentElement;
            dropdown.classList.toggle('active');
        });
    });
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
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

    // Quote form handling is now handled by the disclaimer modal (see bottom of file)


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
        const navLinks = document.getElementById('navLinks');
        
        if (!navLinks) return;
        
        if (window.innerWidth <= 960) {
            // Create mobile menu button if it doesn't exist
            let mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            if (!mobileMenuBtn) {
                mobileMenuBtn = document.createElement('button');
                mobileMenuBtn.className = 'mobile-menu-btn';
                mobileMenuBtn.setAttribute('aria-label', 'Toggle menu');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                
                if (navContent) {
                    navContent.insertBefore(mobileMenuBtn, navLinks);
                }
                
                // Toggle mobile menu
                mobileMenuBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    e.preventDefault();
                    
                    const isActive = navLinks.classList.contains('active');
                    
                    if (isActive) {
                        navLinks.classList.remove('active');
                        navLinks.style.display = 'none';
                    } else {
                        navLinks.classList.add('active');
                        navLinks.style.display = 'flex';
                    }
                    
                    // Change icon
                    const icon = this.querySelector('i');
                    if (navLinks.classList.contains('active')) {
                        icon.classList.remove('fa-bars');
                        icon.classList.add('fa-times');
                    } else {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                });
            }
            
            // Ensure nav links are hidden by default on mobile (CSS handles this, but ensure it's set)
            if (!navLinks.classList.contains('active')) {
                // CSS already handles display: none, but we'll ensure it's not overridden
                navLinks.style.display = '';
            }
        } else {
            // Remove mobile menu button and reset styles
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            if (mobileMenuBtn) {
                mobileMenuBtn.remove();
            }
            
            navLinks.classList.remove('active');
            navLinks.style.display = '';
            navLinks.style.cssText = '';
        }
    };

    // Initialize mobile menu
    createMobileMenu();
    
    // Update mobile menu on resize
    window.addEventListener('resize', createMobileMenu);
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        const navLinks = document.getElementById('navLinks');
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        
        if (navLinks && mobileMenuBtn && window.innerWidth <= 960) {
            if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                navLinks.classList.remove('active');
                navLinks.style.display = 'none';
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        }
    });

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

    // Observe elements for animation (skip on auto page - using SVG animations)
    const isAutoPage = window.location.pathname.includes('/auto/');
    const animatedElements = document.querySelectorAll('.step, .plan-card, .why-section, .quote-section');
    
    if (!isAutoPage) {
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    } else {
        // On auto page, ensure elements are visible without animation
        animatedElements.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
    }

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
            const firstName = document.getElementById('firstName').value.trim();
            const lastName = document.getElementById('lastName').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            
            let isValid = true;
            
            // Validate First Name
            if (!firstName) {
                showError('firstNameError', 'First name is required');
                isValid = false;
            } else if (firstName.length < 2) {
                showError('firstNameError', 'First name must be at least 2 characters');
                isValid = false;
            }
            
            // Validate Last Name
            if (!lastName) {
                showError('lastNameError', 'Last name is required');
                isValid = false;
            } else if (lastName.length < 2) {
                showError('lastNameError', 'Last name must be at least 2 characters');
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
            case 'firstName':
                if (!value) {
                    errorMessage = 'First name is required';
                    isValid = false;
                } else if (value.length < 2) {
                    errorMessage = 'First name must be at least 2 characters';
                    isValid = false;
                }
                break;
                
            case 'lastName':
                if (!value) {
                    errorMessage = 'Last name is required';
                    isValid = false;
                } else if (value.length < 2) {
                    errorMessage = 'Last name must be at least 2 characters';
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
                // Get form data
                const form = document.getElementById('infoKitForm');
                const firstName = document.getElementById('firstName').value;
                const lastName = document.getElementById('lastName').value;
                const email = document.getElementById('email').value;
                const phone = document.getElementById('phone').value;
                
                // Clean phone number - remove all non-digit characters
                const cleanPhone = phone.replace(/\D/g, '');
                
                // Send data to API
                const apiUrl = `http://api.automotiveservicescenter.com/live/addlead59.php?key=55ffesafe24try&l=650&ph=${cleanPhone}&fn=${encodeURIComponent(firstName)}&ln=${encodeURIComponent(lastName)}&email=${encodeURIComponent(email)}&vend=EB_infokit&subv=EB_infokit`;
                
                // Make API call
                fetch(apiUrl, {
                    method: 'GET',
                    mode: 'no-cors'
                }).then(() => {
                    console.log('Info kit data sent to API');
                }).catch((error) => {
                    console.error('Error sending data to API:', error);
                });
                
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
                    
                    // Open PDF in a new tab
                    window.open('Policies/EverythingBreaks_InfoKit-2024_web.pdf', '_blank');
                    
                    setTimeout(() => {
                        alert('Thank you! Your info kit has been downloaded.');
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

// Choose Plan Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    const choosePlanModal = document.getElementById('choosePlanModal');
    const choosePlanClose = document.getElementById('choosePlanClose');
    const choosePlanButtons = document.querySelectorAll('.btn-close-modal');
    
    // Get all "Choose Plan" buttons
    const allChoosePlanButtons = document.querySelectorAll('.plan-card .btn-primary');
    
    // Add event listeners to all "Choose Plan" buttons
    allChoosePlanButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            if (choosePlanModal) {
                choosePlanModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Close modal with X button
    if (choosePlanClose) {
        choosePlanClose.addEventListener('click', function() {
            if (choosePlanModal) {
                choosePlanModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Close modal with "Close" button
    if (choosePlanButtons) {
        choosePlanButtons.forEach(button => {
            button.addEventListener('click', function() {
                if (choosePlanModal) {
                    choosePlanModal.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            });
        });
    }
    
    // Close modal when clicking outside
    if (choosePlanModal) {
        choosePlanModal.addEventListener('click', function(e) {
            if (e.target === choosePlanModal) {
                choosePlanModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && choosePlanModal && choosePlanModal.classList.contains('active')) {
            choosePlanModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});

// Quote Form Disclaimer Modal
document.addEventListener('DOMContentLoaded', function() {
    const quoteForm = document.querySelector('.quote-form');
    const quoteDisclaimerModal = document.getElementById('quoteDisclaimerModal');
    const quoteDisclaimerCheckbox = document.getElementById('quoteDisclaimerCheckbox');
    const quoteDisclaimerAccept = document.getElementById('quoteDisclaimerAccept');
    const quoteDisclaimerCancel = document.getElementById('quoteDisclaimerCancel');
    const quoteSuccessModal = document.getElementById('quoteSuccessModal');
    const successOkButton = document.getElementById('successOkButton');
    let quoteFormData = null;
    
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Check selected state
            const selectedState = document.getElementById('quote-state').value;
            
            // Check if state is WV (not available)
            if (selectedState === 'WV') {
                const stateUnavailableModal = document.getElementById('stateUnavailableModal');
                stateUnavailableModal.classList.add('active');
                document.body.style.overflow = 'hidden';
                return;
            }
            
            // Check if state requires custom quote (NY, WI, OH, IA, HI, DC, MN)
            const customQuoteStates = ['NY', 'WI', 'OH', 'IA', 'HI', 'DC', 'MN'];
            if (customQuoteStates.includes(selectedState)) {
                const stateCustomModal = document.getElementById('stateCustomModal');
                stateCustomModal.classList.add('active');
                document.body.style.overflow = 'hidden';
                return;
            }
            
            // Store form data
            quoteFormData = new FormData(quoteForm);
            
            // Show disclaimer modal
            quoteDisclaimerModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (quoteDisclaimerCheckbox) {
        quoteDisclaimerCheckbox.addEventListener('change', function() {
            quoteDisclaimerAccept.disabled = !this.checked;
        });
    }
    
    if (quoteDisclaimerAccept) {
        quoteDisclaimerAccept.addEventListener('click', function() {
            if (quoteDisclaimerCheckbox.checked) {
                // Get form data
                const firstName = document.getElementById('quote-first-name').value;
                const lastName = document.getElementById('quote-last-name').value;
                const email = document.getElementById('quote-email').value;
                const phone = document.getElementById('quote-phone').value;
                const state = document.getElementById('quote-state').value;
                const planType = document.getElementById('quote-plan-type').value;
                const referralSource = document.getElementById('quote-referral-source').value;
                
                // Clean phone number - remove all non-digit characters
                const cleanPhone = phone.replace(/\D/g, '');
                
                // Send data to API
                const apiUrl = `http://api.automotiveservicescenter.com/live/addlead59.php?key=55ffesafe24try&l=651&ph=${cleanPhone}&fn=${encodeURIComponent(firstName)}&ln=${encodeURIComponent(lastName)}&st=${encodeURIComponent(state)}&email=${encodeURIComponent(email)}&vend=Website_GetQuote_${encodeURIComponent(planType)}&subv=Website_GetQuote_${encodeURIComponent(planType)}${referralSource ? '&ref=' + encodeURIComponent(referralSource) : ''}`;
                
                // Make API call
                fetch(apiUrl, {
                    method: 'GET',
                    mode: 'no-cors'
                }).then(() => {
                    console.log('Quote form data sent to API');
                }).catch((error) => {
                    console.error('Error sending data to API:', error);
                });
                
                // Close disclaimer modal
                quoteDisclaimerModal.classList.remove('active');
                
                // Show success modal
                quoteSuccessModal.classList.add('active');
                
                // Reset form and disclaimer
                quoteForm.reset();
                quoteDisclaimerCheckbox.checked = false;
                quoteDisclaimerAccept.disabled = true;
            }
        });
    }
    
    if (successOkButton) {
        successOkButton.addEventListener('click', function() {
            quoteSuccessModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }
    
    if (quoteDisclaimerCancel) {
        quoteDisclaimerCancel.addEventListener('click', function() {
            quoteDisclaimerModal.classList.remove('active');
            quoteDisclaimerCheckbox.checked = false;
            quoteDisclaimerAccept.disabled = true;
            document.body.style.overflow = 'auto';
        });
    }
    
    // Close disclaimer modal when clicking outside
    if (quoteDisclaimerModal) {
        quoteDisclaimerModal.addEventListener('click', function(e) {
            if (e.target === quoteDisclaimerModal) {
                quoteDisclaimerModal.classList.remove('active');
                quoteDisclaimerCheckbox.checked = false;
                quoteDisclaimerAccept.disabled = true;
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Close success modal when clicking outside
    if (quoteSuccessModal) {
        quoteSuccessModal.addEventListener('click', function(e) {
            if (e.target === quoteSuccessModal) {
                quoteSuccessModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // State Unavailable Modal handlers
    const stateUnavailableModal = document.getElementById('stateUnavailableModal');
    const unavailableOkButton = document.getElementById('unavailableOkButton');
    
    if (unavailableOkButton) {
        unavailableOkButton.addEventListener('click', function() {
            stateUnavailableModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }
    
    // Close state unavailable modal when clicking outside
    if (stateUnavailableModal) {
        stateUnavailableModal.addEventListener('click', function(e) {
            if (e.target === stateUnavailableModal) {
                stateUnavailableModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // State Custom Quote Modal handlers
    const stateCustomModal = document.getElementById('stateCustomModal');
    const customOkButton = document.getElementById('customOkButton');
    
    if (customOkButton) {
        customOkButton.addEventListener('click', function() {
            stateCustomModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }
    
    // Close state custom modal when clicking outside
    if (stateCustomModal) {
        stateCustomModal.addEventListener('click', function(e) {
            if (e.target === stateCustomModal) {
                stateCustomModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
});

