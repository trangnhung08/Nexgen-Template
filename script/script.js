document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Toggle (Light/Dark Mode)
    const themeBtn = document.getElementById('theme-toggle');
    const root = document.documentElement;
    
    // Check local storage or system prefer color scheme
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
        root.setAttribute('data-theme', 'dark');
        updateThemeIcon('dark');
    } else {
        root.setAttribute('data-theme', 'light');
        updateThemeIcon('light');
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            let current = root.getAttribute('data-theme');
            let next = current === 'dark' ? 'light' : 'dark';
            
            root.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
            updateThemeIcon(next);
        });
    }

    function updateThemeIcon(theme) {
        const icon = document.querySelector('#theme-toggle i');
        if (!icon) return;
        
        if (theme === 'dark') {
            icon.classList.remove('ph-moon');
            icon.classList.add('ph-sun');
        } else {
            icon.classList.remove('ph-sun');
            icon.classList.add('ph-moon');
        }
    }

    // 2. Sticky Navbar & Shadow
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // 3. Scroll Animations (Intersection Observer)
    const animElements = document.querySelectorAll('.animate-on-scroll');
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                obs.unobserve(entry.target); // Trigger only once
            }
        });
    }, observerOptions);

    animElements.forEach(el => observer.observe(el));
    
    // 4. Bootstrap Form Validation globally if needed
    const forms = document.querySelectorAll('.needs-validation');
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });

    // 5. Back to Top Button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="ph ph-arrow-up"></i>';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTopBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 6. Navbar Dropdown Hover via Native Bootstrap 5 JS API
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('mouseenter', function() {
            if (window.innerWidth >= 992) {
                const toggle = this.querySelector('[data-bs-toggle="dropdown"]');
                const instance = bootstrap.Dropdown.getOrCreateInstance(toggle);
                instance.show();
            }
        });
        
        dropdown.addEventListener('mouseleave', function() {
            if (window.innerWidth >= 992) {
                const toggle = this.querySelector('[data-bs-toggle="dropdown"]');
                const instance = bootstrap.Dropdown.getOrCreateInstance(toggle);
                instance.hide();
            }
        });
    });
});
