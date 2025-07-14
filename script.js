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
            document.querySelector('#about').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }

    // --- Contador Animado para los kw (función mejorada) ---
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

    // Animar solo los kW
    const stats = document.querySelectorAll('.stat');
    stats.forEach(stat => {
        const h4 = stat.querySelector('h4');
        const p = stat.querySelector('p');
        if (p && p.textContent.trim() === 'kW') {
            // Solo animar los kW
            const observer = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const el = entry.target;
                        const finalValue = parseNumber(el.textContent);
                        if (!el.classList.contains('counted') && !isNaN(finalValue)) {
                            animateCounter(el, finalValue, 3000);
                            el.classList.add('counted');
                        }
                        obs.unobserve(el);
                    }
                });
            }, { threshold: 0.5 });
            observer.observe(h4);
        }
    });


    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.fa-chevron-down');
        
        if (question && answer && icon) {
            question.addEventListener('click', () => {
                const isOpen = item.classList.contains('active');
                
                // Cerrar todos los items
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    const otherIcon = otherItem.querySelector('.fa-chevron-down');
                    if (otherAnswer) otherAnswer.style.maxHeight = null;
                    if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
                });
                
                // Si no estaba abierto, abrirlo
                if (!isOpen) {
                    item.classList.add('active');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    icon.style.transform = 'rotate(180deg)';
                }
            });
        }
    });
});

// --- Funciones de la Calculadora de Energía Renovable ---
function calculateSavings() {
    const monthlyBill = parseFloat(document.getElementById('monthlyBill').value);
    const energyType = document.getElementById('energyType').value;
    const propertySize = parseFloat(document.getElementById('propertySize').value);
    const region = document.getElementById('region').value;

    if (!monthlyBill || !propertySize || monthlyBill < 50000 || propertySize < 50) {
        alert('Por favor, completa todos los campos con valores válidos. La factura mínima debe ser de $50,000 COP.');
        return;
    }

    // Factores de cálculo basados en promedios de la industria para Colombia
    let efficiencyFactor = 0.75; // Factor base de eficiencia
    let regionMultiplier = 1;
    let energyMultiplier = 1;

    switch(region) {
        case 'tropical':
            regionMultiplier = 1.3; // Colombia tiene excelente radiación solar
            break;
        case 'templado':
            regionMultiplier = 1.1;
            break;
        case 'montano':
            regionMultiplier = 0.9;
            break;
    }

    // Ajustar por tipo de energía
    switch(energyType) {
        case 'solar':
            energyMultiplier = 1.0;
            break;
        case 'eolica':
            energyMultiplier = 0.9;
            break;
        case 'hibrido':
            energyMultiplier = 1.15;
            break;
    }

    // Cálculos ajustados para Colombia (COP)
    const systemSize = Math.min(propertySize / 10, monthlyBill / 80000); // kW estimado (ajustado para COP)
    const monthlySavings = monthlyBill * efficiencyFactor * regionMultiplier * energyMultiplier * 0.8;
    const yearlySavings = monthlySavings * 12;
    const estimatedCost = systemSize * 6500000; // Aproximadamente $6,500,000 COP por kW instalado
    const roi = estimatedCost / yearlySavings;
    const co2Reduction = systemSize * 1.5; // Toneladas de CO2 por kW por año

    // Mostrar resultados en formato colombiano
    document.getElementById('monthlyaSavings').textContent = `$${Math.round(monthlySavings).toLocaleString('es-CO')} COP`;
    document.getElementById('yearllySavings').textContent = `$${Math.round(yearlySavings).toLocaleString('es-CO')} COP`;
    document.getElementById('roi').textContent = `${roi.toFixed(1)} años`;
    document.getElementById('co2Reduction').textContent = `${co2Reduction.toFixed(1)} t`;

    document.getElementById('calculatorResults').style.display = 'block';
    document.getElementById('calculatorResults').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function resetCalculator() {
    document.getElementById('monthlyBill').value = '';
    document.getElementById('propertySize').value = '';
    document.getElementById('energyType').value = 'solar';
    document.getElementById('region').value = 'tropical';
    document.getElementById('calculatorResults').style.display = 'none';
}
