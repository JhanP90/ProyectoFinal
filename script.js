document.addEventListener('DOMContentLoaded', () => {
    // --- Header Scroll ---
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });

    // --- Menú Hamburguesa ---
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        body.classList.toggle('nav-open');
    });

    navMenu.querySelectorAll('.nav-menu-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            body.classList.remove('nav-open');
        });
    });

    body.addEventListener('click', (e) => {
        if (body.classList.contains('nav-open') && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            body.classList.remove('nav-open');
        }
    });

    // --- Gráfico Chart.js Mejorado ---
    const ctx = document.getElementById('benefitsChart');

    if (ctx) {
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Reducción de Huella', 'Independencia Energética', 'Creación de Empleos', 'Menor Contaminación'],
                datasets: [{
                    label: 'Impacto de la Energía Renovable',
                    data: [35, 25, 20, 20],
                    backgroundColor: [
                        '#4CAF50',  // Verde fuerte
                        '#FFC107',  // Amarillo solar
                        '#37474F',  // Gris azulado
                        '#66BB6A'   // Verde claro
                    ],
                    hoverOffset: 15,
                    borderColor: '#ffffff',
                    borderWidth: 2,
                    spacing: 3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '60%',
                animation: {
                    animateRotate: true,
                    animateScale: true,
                    duration: 1500,
                    easing: 'easeOutBounce'
                },
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            font: {
                                size: 14,
                                family: 'Poppins'
                            },
                            color: '#333',
                            padding: 20
                        }
                    },
                    tooltip: {
                        backgroundColor: '#ffffff',
                        borderColor: '#ccc',
                        borderWidth: 1,
                        titleColor: '#000',
                        bodyColor: '#000',
                        cornerRadius: 4,
                        padding: 10,
                        bodyFont: {
                            family: 'Poppins'
                        },
                        callbacks: {
                            label: function (context) {
                                let label = context.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed !== null) {
                                    label += context.parsed + '%';
                                }
                                return label;
                            }
                        }
                    }
                }
            }
        });
    }

    // --- Smooth Scroll Flecha ---
    const scrollDownIndicator = document.querySelector('.scroll-down-indicator');
    if (scrollDownIndicator) {
        scrollDownIndicator.addEventListener('click', () => {
            document.querySelector('#energy-types').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }

    // --- Contador Animado para los kw ---
    function animateCounter(element, endValue, duration = 3000) {
        let start = 0;
        const isInt = Number.isInteger(endValue);
        const startTime = performance.now();
        // Easing para suavidad
        function easeOutCubic(t) {
            return 1 - Math.pow(1 - t, 3);
        }
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = easeOutCubic(progress);
            const value = Math.floor(eased * (endValue - start) + start);
            element.textContent = isInt ? value.toLocaleString('es-ES') : value;
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = isInt ? endValue.toLocaleString('es-ES') : endValue;
            }
        }
        requestAnimationFrame(update);
    }

    function parseNumber(str) {
        // Quita puntos, comas y signos no numéricos
        return parseInt(str.replace(/[^\d]/g, ''));
    }

    // Instancia el contador solo para los kW
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // --- Inicializar AOS ---
    AOS.init();

});
