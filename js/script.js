document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    document.getElementById('current-year').textContent = new Date().getFullYear();    

    const reachOutBtn = document.getElementById('reach-out-btn');
    if (reachOutBtn) {
        reachOutBtn.addEventListener('click', () => {
            window.location.href = 'mailto:secharank@gmail.com';
        });
    }

    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';

            setTheme(newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    // Smooth scroll functionality for the arrow indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
        });

        // Add observer to fade the arrow when About Me section is in viewport
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            const arrowObserver = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        // Fade out when About Me is visible, fade in when it's not
                        if (entry.isIntersecting) {
                            scrollIndicator.classList.add('fade-out');
                        } else {
                            scrollIndicator.classList.remove('fade-out');
                        }
                    });
                },
                { threshold: 0.1 } // Trigger when 10% of the about section is visible
            );
            
            arrowObserver.observe(aboutSection);
        }
    }

    // Add subtle fade-in animation for sections when they come into view
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.style.opacity = 0;
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(section);
    });
});

/**
 * Initialize theme based on saved preference or system preference
 */
function initTheme() {
    // Check if user has a saved preference
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        // Check system preference
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

        if (prefersDarkScheme.matches) {
            setTheme('dark');
        } else {
            setTheme('light');
        }

        // Listen for system theme changes
        prefersDarkScheme.addEventListener('change', (e) => {
            const newTheme = e.matches ? 'dark' : 'light';
            setTheme(newTheme);
        });
    }
}

/**
 * Set theme to light or dark
 * @param {string} theme - 'light' or 'dark'
 */
function setTheme(theme) {
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }
}
