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

    // Tabs functionality
    function initTabs() {
        const tabButtons = document.querySelectorAll('.tab-button');
        const tabContents = document.querySelectorAll('.tab-content');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));

                // Add active class to clicked button and corresponding content
                button.classList.add('active');
                const tabId = button.getAttribute('data-tab');
                document.querySelector(`#${tabId}`).classList.add('active');
            });
        });
    }

    // Products sorting functionality
    function initProductSorting() {
        const sortSelect = document.querySelector('.sort-select');
        if (!sortSelect) return;

        sortSelect.addEventListener('change', (e) => {
            const sortValue = e.target.value;
            const productsGrid = document.querySelector('.products__grid');
            const products = Array.from(productsGrid.children);

            products.sort((a, b) => {
                // Получаем актуальную цену (со скидкой, если есть)
                const getPriceValue = (element) => {
                    const newPrice = element.querySelector('.price--new');
                    const regularPrice = element.querySelector('.price');
                    if (newPrice) {
                        return parseFloat(newPrice.dataset.price);
                    }
                    return parseFloat(regularPrice.dataset.price);
                };

                const priceA = getPriceValue(a);
                const priceB = getPriceValue(b);
                const popularityA = parseInt(a.dataset.popularity) || 0;
                const popularityB = parseInt(b.dataset.popularity) || 0;

                switch(sortValue) {
                    case 'price-low-high':
                        return priceA - priceB;
                    case 'price-high-low':
                        return priceB - priceA;
                    case 'popularity':
                        return popularityB - popularityA;
                    default:
                        return 0;
                }
            });

            // Анимация исчезновения
            productsGrid.style.opacity = '0';
            
            setTimeout(() => {
                // Очищаем и добавляем отсортированные продукты
                productsGrid.innerHTML = '';
                products.forEach(product => productsGrid.appendChild(product));
                
                // Анимация появления
                productsGrid.style.opacity = '1';
            }, 300);
        });
    }

    // Products filtering functionality
    function initProductFiltering() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        if (!filterButtons.length) return;

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const category = button.getAttribute('data-category');
                const products = document.querySelectorAll('.product-card');

                products.forEach(product => {
                    const productElement = product;
                    if (category === 'all' || product.getAttribute('data-category') === category) {
                        productElement.style.opacity = '0';
                        setTimeout(() => {
                            productElement.style.display = '';
                            setTimeout(() => {
                                productElement.style.opacity = '1';
                            }, 50);
                        }, 300);
                    } else {
                        productElement.style.opacity = '0';
                        setTimeout(() => {
                            productElement.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // Добавляем плавные переходы для продуктов
    const productsGrid = document.querySelector('.products__grid');
    if (productsGrid) {
        productsGrid.style.transition = 'opacity 0.3s ease';
        const products = productsGrid.querySelectorAll('.product-card');
        products.forEach(product => {
            product.style.transition = 'opacity 0.3s ease';
        });
    }

    // Initialize all functionality when DOM is loaded
    initTabs();
    initProductSorting();
    initProductFiltering();

    // Функция для анимации чисел
    function animateNumbers() {
        const stats = document.querySelectorAll('.stat-card__number');
        
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const targetNumber = parseFloat(target.getAttribute('data-number'));
                    const duration = 2000; // 2 секунды
                    const steps = 60;
                    const stepValue = targetNumber / steps;
                    let currentValue = 0;
                    
                    const interval = setInterval(() => {
                        currentValue += stepValue;
                        if (currentValue >= targetNumber) {
                            target.textContent = target.hasAttribute('data-plus') ? 
                                Math.round(targetNumber) + '+' : 
                                target.hasAttribute('data-percentage') ? 
                                    Math.round(targetNumber) + '%' : 
                                    Math.round(targetNumber).toLocaleString();
                            clearInterval(interval);
                        } else {
                            target.textContent = target.hasAttribute('data-plus') ? 
                                Math.round(currentValue) + '+' : 
                                target.hasAttribute('data-percentage') ? 
                                    Math.round(currentValue) + '%' : 
                                    Math.round(currentValue).toLocaleString();
                        }
                    }, duration / steps);
                    
                    observer.unobserve(target);
                }
            });
        }, options);

        stats.forEach(stat => observer.observe(stat));
    }

    // Запускаем анимацию при загрузке страницы
    animateNumbers();
}); 