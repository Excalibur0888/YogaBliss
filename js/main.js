document.addEventListener('DOMContentLoaded', () => {
    // Burger Menu
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav');
    const body = document.body;
    const navLinks = document.querySelectorAll('.nav__link');

    if (burger && nav) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('active');
            body.classList.toggle('menu-open');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && !burger.contains(e.target) && nav.classList.contains('active')) {
                nav.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });
    }

    // Hero Slider
    const heroSlider = {
        wrapper: document.querySelector('.hero__slider-wrapper'),
        slides: document.querySelectorAll('.hero__slide'),
        prevBtn: document.querySelector('.hero__prev'),
        nextBtn: document.querySelector('.hero__next'),
        dotsContainer: document.querySelector('.hero__dots'),
        currentSlide: 0,
        interval: null,

        init() {
            if (!this.wrapper || !this.slides.length) return;

            // Create dots
            this.slides.forEach((_, index) => {
                const dot = document.createElement('button');
                dot.classList.add('hero__dot');
                dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
                dot.addEventListener('click', () => this.goToSlide(index));
                this.dotsContainer.appendChild(dot);
            });

            this.dots = this.dotsContainer.querySelectorAll('.hero__dot');
            this.updateDots();

            // Add event listeners
            this.prevBtn.addEventListener('click', () => this.prev());
            this.nextBtn.addEventListener('click', () => this.next());

            // Touch events
            let startX = 0;
            let currentX = 0;

            this.wrapper.addEventListener('touchstart', (e) => {
                clearInterval(this.interval);
                startX = e.touches[0].clientX;
                currentX = -this.currentSlide * 100;
            });

            this.wrapper.addEventListener('touchmove', (e) => {
                const touch = e.touches[0];
                const diff = (touch.clientX - startX) / this.wrapper.offsetWidth * 100;
                const newPosition = currentX + diff;

                if (newPosition <= 0 && newPosition >= -((this.slides.length - 1) * 100)) {
                    this.wrapper.style.transform = `translateX(${newPosition}%)`;
                }
            });

            this.wrapper.addEventListener('touchend', (e) => {
                const diff = e.changedTouches[0].clientX - startX;
                if (Math.abs(diff) > 50) {
                    this.goToSlide(this.currentSlide + (diff > 0 ? -1 : 1));
                } else {
                    this.goToSlide(this.currentSlide);
                }
                this.startAutoplay();
            });

            this.startAutoplay();
        },

        startAutoplay() {
            clearInterval(this.interval);
            this.interval = setInterval(() => this.next(), 5000);
        },

        updateDots() {
            this.dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === this.currentSlide);
            });
        },

        goToSlide(index) {
            if (index < 0) index = this.slides.length - 1;
            if (index >= this.slides.length) index = 0;

            this.currentSlide = index;
            this.wrapper.style.transform = `translateX(-${index * 100}%)`;
            this.updateDots();
        },

        prev() {
            this.goToSlide(this.currentSlide - 1);
            this.startAutoplay();
        },

        next() {
            this.goToSlide(this.currentSlide + 1);
            this.startAutoplay();
        }
    };

    // Tabs
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');

    if (tabs.length && tabContents.length) {
        // Show initial tab
        const initialTab = document.querySelector('.tab.active');
        if (initialTab) {
            const target = initialTab.dataset.tab;
            document.querySelector(`.tab-content[data-tab="${target}"]`).style.display = 'block';
        }

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const target = tab.dataset.tab;

                // Remove active class from all tabs and hide contents
                tabs.forEach(t => t.classList.remove('active'));
                tabContents.forEach(c => {
                    c.classList.remove('active');
                    c.style.display = 'none';
                });

                // Add active class to clicked tab and show content
                tab.classList.add('active');
                const activeContent = document.querySelector(`.tab-content[data-tab="${target}"]`);
                activeContent.classList.add('active');
                activeContent.style.display = 'block';
            });
        });
    }

    // Accordion
    const accordionItems = document.querySelectorAll('.accordion__item');

    if (accordionItems.length) {
        accordionItems.forEach(item => {
            const header = item.querySelector('.accordion__header');
            header.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                // Close all items
                accordionItems.forEach(i => i.classList.remove('active'));

                // Open clicked item if it wasn't active
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
    }

    // Testimonials Slider
    const testimonialsSlider = {
        wrapper: document.querySelector('.testimonials__wrapper'),
        slides: document.querySelectorAll('.testimonial-card'),
        prevBtn: document.querySelector('.testimonials__prev'),
        nextBtn: document.querySelector('.testimonials__next'),
        currentSlide: 0,

        init() {
            if (!this.wrapper || !this.slides.length) return;

            this.prevBtn.addEventListener('click', () => this.prev());
            this.nextBtn.addEventListener('click', () => this.next());

            // Touch events
            let startX = 0;
            let currentX = 0;

            this.wrapper.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
                currentX = -this.currentSlide * 100;
            });

            this.wrapper.addEventListener('touchmove', (e) => {
                const touch = e.touches[0];
                const diff = (touch.clientX - startX) / this.wrapper.offsetWidth * 100;
                const newPosition = currentX + diff;

                if (newPosition <= 0 && newPosition >= -((this.slides.length - 1) * 100)) {
                    this.wrapper.style.transform = `translateX(${newPosition}%)`;
                }
            });

            this.wrapper.addEventListener('touchend', (e) => {
                const diff = e.changedTouches[0].clientX - startX;
                if (Math.abs(diff) > 50) {
                    this.goToSlide(this.currentSlide + (diff > 0 ? -1 : 1));
                } else {
                    this.goToSlide(this.currentSlide);
                }
            });
        },

        goToSlide(index) {
            if (index < 0) index = this.slides.length - 1;
            if (index >= this.slides.length) index = 0;

            this.currentSlide = index;
            this.wrapper.style.transform = `translateX(-${index * 100}%)`;
        },

        prev() {
            this.goToSlide(this.currentSlide - 1);
        },

        next() {
            this.goToSlide(this.currentSlide + 1);
        }
    };

    // Initialize sliders
    heroSlider.init();
    testimonialsSlider.init();

    // Close mobile menu when clicking on a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
        });
    });
}); 