document.addEventListener('DOMContentLoaded', () => {

    // Global: Carrito y Toast
    let cartCount = 0;
    const cartCountEl = document.getElementById('cartCount');
    const toast = document.getElementById('toast');

    function showToast(message) {
        if (!toast) return;
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const productName = e.target.getAttribute('data-product') || 'Producto';
            cartCount++;
            if (cartCountEl) cartCountEl.textContent = cartCount;
            showToast(`Añadido: ${productName}`);
        });
    });

    // Módulo: Ficha de Producto Individual
    const addToCartSingleBtn = document.getElementById('addToCartSingleBtn');
    if (addToCartSingleBtn) {
        addToCartSingleBtn.addEventListener('click', () => {
            const activeSize = document.querySelector('.size-pill.active')?.textContent || '37';
            const activeColor = document.querySelector('.color-pill.active')?.textContent || 'Camel';
            cartCount++;
            if (cartCountEl) cartCountEl.textContent = cartCount;
            showToast(`Botín Chelsea Carmel (${activeColor}, Talla ${activeSize}) añadido.`);
        });
    }

    // Módulo: Filtro de Categorías (Tienda)
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('#productGrid .product-card');

    if (filterBtns.length > 0 && productCards.length > 0) {
        function filterCategory(category) {
            filterBtns.forEach(b => b.classList.remove('active'));
            const targetBtn = document.querySelector(`.filter-btn[data-category="${category}"]`) || document.querySelector('.filter-btn[data-category="todos"]');
            if (targetBtn) targetBtn.classList.add('active');

            productCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (category === 'todos' || cardCategory === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        }

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterCategory(btn.getAttribute('data-category'));
            });
        });

        const urlParams = new URLSearchParams(window.location.search);
        const categoryParam = urlParams.get('cat');
        if (categoryParam) {
            filterCategory(categoryParam);
        }
    }

    // Módulo: Pestañas y Acordeón (Soporte)
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    if (tabBtns.length > 0) {
        function switchTab(tabTarget) {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            const activeBtn = document.querySelector(`.tab-btn[data-tab="${tabTarget}"]`);
            const targetContent = document.getElementById(`tab-${tabTarget}`);

            if (activeBtn) activeBtn.classList.add('active');
            if (targetContent) targetContent.classList.add('active');
        }

        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                switchTab(btn.getAttribute('data-tab'));
            });
        });

        const accordionHeaders = document.querySelectorAll('.accordion-header');
        accordionHeaders.forEach(header => {
            header.addEventListener('click', () => {
                header.parentElement.classList.toggle('active');
            });
        });

        const urlParams = new URLSearchParams(window.location.search);
        const tabParam = urlParams.get('tab');
        if (tabParam) switchTab(tabParam);

        const topicParam = urlParams.get('topic');
        if (topicParam === 'devoluciones') {
            switchTab('faq');
            const devolucionesItem = document.getElementById('item-devoluciones');
            if (devolucionesItem) {
                devolucionesItem.classList.add('active');
                devolucionesItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }

    // Módulo: Selectores de Color y Talla
    const colorPills = document.querySelectorAll('.color-pill');
    const selectedColorLabel = document.getElementById('selectedColor');
    colorPills.forEach(pill => {
        pill.addEventListener('click', () => {
            colorPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            if (selectedColorLabel) selectedColorLabel.textContent = pill.getAttribute('data-color');
        });
    });

    const sizePills = document.querySelectorAll('.size-pill');
    const selectedSizeLabel = document.getElementById('selectedSize');
    sizePills.forEach(pill => {
        pill.addEventListener('click', () => {
            sizePills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            if (selectedSizeLabel) selectedSizeLabel.textContent = pill.getAttribute('data-size');
        });
    });

    // Módulo: Hero Slider
    const dots = document.querySelectorAll('.dot');
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const slide = document.querySelector('.slide');

    if (slide && dots.length > 0) {
        const slideData = [
            {
                title: "Nueva Colección Otoño",
                subtitle: "Piezas atemporales para combinar la moda",
                image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&q=80"
            },
            {
                title: "Básicos Esenciales",
                subtitle: "Texturas de lino y acabados artesanales",
                image: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1600&q=80"
            },
            {
                title: "Accesorios de Autor",
                subtitle: "Detalles que transforman tu look diario",
                image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1600&q=80"
            }
        ];

        let currentSlide = 0;

        function updateSlide(index) {
            dots.forEach(d => d.classList.remove('active'));
            dots[index].classList.add('active');
            slide.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.15), rgba(0,0,0,0.15)), url('${slideData[index].image}')`;
            if (heroTitle) heroTitle.textContent = slideData[index].title;
            if (heroSubtitle) heroSubtitle.textContent = slideData[index].subtitle;
            currentSlide = index;
        }

        const nextBtn = document.getElementById('nextSlide');
        const prevBtn = document.getElementById('prevSlide');

        if (nextBtn) nextBtn.addEventListener('click', () => updateSlide((currentSlide + 1) % slideData.length));
        if (prevBtn) prevBtn.addEventListener('click', () => updateSlide((currentSlide - 1 + slideData.length) % slideData.length));
        dots.forEach((dot, index) => dot.addEventListener('click', () => updateSlide(index)));
    }

    // Módulo: Newsletter
    const newsletterForm = document.getElementById('newsletterForm');
    const newsletterFeedback = document.getElementById('newsletterFeedback');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (newsletterFeedback) {
                newsletterFeedback.textContent = "¡Gracias por suscribirte! Te hemos enviado un correo de bienvenida.";
            }
            newsletterForm.reset();
        });
    }

    // Módulo: Menú Móvil
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', () => {
            mainNav.classList.toggle('active');
        });
    }
});