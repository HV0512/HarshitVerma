// Enhanced clock functionality
function updateClock() {
    const clock = document.getElementById('clock');
    const time = new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });
    clock.textContent = time;
}
setInterval(updateClock, 1000);
updateClock();

// Typing animation
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

// Start typing animation when page loads
window.addEventListener('load', () => {
    const heading = document.querySelector('.typing');
    typeWriter(heading, "Hi I'm Harshit Verma");
});

// Enhanced navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrollTop = document.querySelector('.scroll-to-top');

    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
        scrollTop.classList.add('visible');
    } else {
        navbar.classList.remove('scrolled');
        scrollTop.classList.remove('visible');
    }
});

// Smooth scroll to top
document.querySelector('.scroll-to-top').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Theme toggle with enhanced animation and transitions
const themeToggle = document.getElementById('themeToggle');

// Function to update theme-specific elements
function updateTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    // Navbar background
    const navbar = document.querySelector('.navbar');
    navbar.style.transition = 'background-color 0.5s ease';

    // Any theme-specific animations
    const pattern = document.querySelector('.pattern-background');
    pattern.style.animation = 'none';
    pattern.offsetHeight; // Trigger reflow
    pattern.style.animation = 'moveBackground 15s linear infinite';
}

// Initialize theme from localStorage or system preference
const savedTheme = localStorage.getItem('theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
updateTheme(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    updateTheme(newTheme);
});

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) {
        updateTheme(e.matches ? 'dark' : 'light');
    }
});

// Scroll animations with Intersection Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.scroll-animation').forEach(element => {
    observer.observe(element);
});

// Parallax scrolling effect for hero section
window.addEventListener('scroll', () => {
    const heroImage = document.querySelector('.hero-image');
    const scrolled = window.pageYOffset;
    heroImage.style.transform = `translate3d(0, ${scrolled * 0.5}px, 0)`;
});

// Enhanced form handling with validation and feedback
document.getElementById('contactForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Simulate form submission
    const button = form.querySelector('button[type="submit"]');
    const originalText = button.innerHTML;
    button.disabled = true;
    button.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';

    setTimeout(() => {
        alert('Thank you for your message! I will get back to you soon.');
        const modal = bootstrap.Modal.getInstance(document.getElementById('contactModal'));
        modal.hide();
        form.reset();
        button.disabled = false;
        button.innerHTML = originalText;
    }, 1500);
});

// Preload hero image
const img = new Image();
img.src = document.querySelector('.hero-image').src;
