// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Loading Screen Animation
    const loadingScreen = document.querySelector('.loading-screen');
    const mainContent = document.querySelector('.main-content');
    const loadingLetters = document.querySelectorAll('.loading-letter');

    // Add active class to each letter after its animation completes
    loadingLetters.forEach(letter => {
        const delay = parseFloat(getComputedStyle(letter).animationDelay) * 1000;
        setTimeout(() => {
            letter.classList.add('active');
        }, delay + 600); // Add active class after the letter animation completes
    });

    // Hide loading screen after all animations complete
    setTimeout(() => {
        loadingScreen.classList.add('slide-out');
        setTimeout(() => {
            mainContent.classList.add('show');
        }, 800);
    }, 4000); // 4 seconds for loading animation (increased to accommodate all letter animations)
    // Side Navigation Toggle
    const menuBtn = document.querySelector('.menu-btn');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('.nav-links li');

    menuBtn.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');

        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.classList.contains('fade-in')) {
                link.classList.remove('fade-in');
            } else {
                setTimeout(() => {
                    link.classList.add('fade-in');
                }, index * 100);
            }
        });

        // Menu Button Animation
        menuBtn.classList.toggle('toggle');
    });

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // Close side menu if open
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                menuBtn.classList.remove('toggle');
                navLinks.forEach(link => {
                    link.classList.remove('fade-in');
                });
            }

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Typing Animation
    const typedTextSpan = document.querySelector('.typed-text');
    const cursorSpan = document.querySelector('.cursor');

    const textArray = ['Frontend Developer', 'Designer', 'Problem Solver', 'Creative Thinker'];
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000; // Delay between current and next text
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            if (!cursorSpan.classList.contains('typing')) cursorSpan.classList.add('typing');
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            cursorSpan.classList.remove('typing');
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            if (!cursorSpan.classList.contains('typing')) cursorSpan.classList.add('typing');
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            cursorSpan.classList.remove('typing');
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 1100);
        }
    }

    if (textArray.length) setTimeout(type, newTextDelay + 250);

    // Project Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 200);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 500);
                }
            });
        });
    });

    // Scroll Animation
    const scrollElements = document.querySelectorAll('.about-content, .skills-content, .project-card, .contact-content');

    const elementInView = (el, percentageScroll = 100) => {
        const elementTop = el.getBoundingClientRect().top;
        const elementHeight = el.getBoundingClientRect().height;

        return (
            elementTop <=
            ((window.innerHeight || document.documentElement.clientHeight) * (percentageScroll/100))
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add('fade-in');
    };

    const hideScrollElement = (element) => {
        element.classList.remove('fade-in');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 80)) {
                displayScrollElement(el);
            } else {
                hideScrollElement(el);
            }
        });
    };

    // Initialize animation on load
    setTimeout(handleScrollAnimation, 100);

    // Add scroll event listener
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });

    // Menu Button Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            menuBtn.style.opacity = '0.8';
            menuBtn.style.transform = 'scale(0.9)';
        } else {
            menuBtn.style.opacity = '1';
            menuBtn.style.transform = 'scale(1)';
        }
    });

    // Enhanced Skill Cards Hover Effect
    const skillCards = document.querySelectorAll('.skill-card');

    skillCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const skillImage = card.querySelector('.skill-image img');
            skillImage.style.transform = 'scale(1.1)';
            setTimeout(() => {
                skillImage.style.transform = 'scale(1)';
            }, 200);
        });
    });

    // Form Submission (for demonstration)
    const contactForm = document.querySelector('.contact-form form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // In a real application, you would send the form data to a server
            // For this demo, we'll just show an alert
            alert('Thank you for your message! This is a demo form, so no message was actually sent.');
            contactForm.reset();
        });
    }
});
