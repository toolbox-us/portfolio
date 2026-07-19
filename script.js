const navMenu = document.querySelector('.nav-menu');
const hamburger = document.querySelector('.hamburger');

// Experience Section Accordion
document.querySelectorAll('.experience-header-toggle').forEach(toggle => {
    toggle.addEventListener('click', function() {
        const content = this.nextElementSibling;
        const icon = this.querySelector('.experience-toggle-icon');

        // Close other open experiences
        document.querySelectorAll('.experience-content').forEach(item => {
            if (item !== content) {
                item.style.display = 'none';
                const otherIcon = item.previousElementSibling.querySelector('.experience-toggle-icon');
                if (otherIcon) {
                    otherIcon.classList.remove('open');
                }
            }
        });

        // Toggle current experience
        if (content.style.display === 'none' || content.style.display === '') {
            content.style.display = 'block';
            icon.classList.add('open');
        } else {
            content.style.display = 'none';
            icon.classList.remove('open');
        }
    });
});

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        hamburger.classList.toggle('active');
    });
}

// Close menu when a link is clicked
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu) {
            navMenu.classList.remove('open');
            if (hamburger) hamburger.classList.remove('active');
        }
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections for animation
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Add scroll event listener for navbar shadow on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    }
});

// Counter animation for stats
function animateCounters() {
    const stats = document.querySelectorAll('.stat h3');
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        let current = 0;
        const increment = target / 30;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target + '+';
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current) + '+';
            }
        }, 30);
    });
}

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                animateCounters();
                entry.target.classList.add('animated');
                statsObserver.unobserve(entry.target);
            }
        });
    });
    statsObserver.observe(statsSection);
}

// Auto-hide mobile menu on resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navMenu) {
        navMenu.style.display = 'flex';
        if (hamburger) hamburger.classList.remove('active');
    }
});

console.log('Portfolio loaded successfully!');

