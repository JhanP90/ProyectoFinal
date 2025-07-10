document.addEventListener('DOMContentLoaded', () => {
    // --- Lógica del Header Scroll ---
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) { // Si el scroll es mayor a 50px
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Lógica del Menú de Navegación (Hamburguesa) ---
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        body.classList.toggle('nav-open'); // Agrega/quita clase al body para deshabilitar scroll y mostrar overlay
    });

    // Cerrar el menú al hacer clic en un enlace (para móviles)
    navMenu.querySelectorAll('.nav-menu-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            body.classList.remove('nav-open');
        });
    });

    // Cerrar el menú si se hace clic fuera de él (en el overlay)
    // Esto se maneja mejor con el click en el body directamente si nav-open está activo
    body.addEventListener('click', (e) => {
        if (body.classList.contains('nav-open') && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            body.classList.remove('nav-open');
        }
    });


    // --- Lógica del Gráfico Chart.js para Beneficios ---
    const ctx = document.getElementById('benefitsChart');

    if (ctx) { // Asegurarse de que el canvas existe
        new Chart(ctx, {
            type: 'doughnut', // Tipo de gráfico: rosquilla
            data: {
                labels: ['Reducción de Huella', 'Independencia Energética', 'Creación de Empleos', 'Menor Contaminación'],
                datasets: [{
                    label: 'Impacto de la Energía Renovable',
                    data: [35, 25, 20, 20], // Porcentajes de ejemplo
                    backgroundColor: [
                        'rgba(56, 176, 0, 0.9)',   // var(--primary-color)
                        'rgba(255, 193, 7, 0.9)', // var(--accent-color)
                        'rgba(44, 62, 80, 0.9)',  // var(--dark-color)
                        'rgba(43, 139, 0, 0.9)'   // var(--secondary-color)
                    ],
                    borderColor: [
                        '#ffffff',
                        '#ffffff',
                        '#ffffff',
                        '#ffffff'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false, // Permite que el gráfico se adapte mejor al contenedor
                plugins: {
                    legend: {
                        position: 'bottom', // Leyenda en la parte inferior
                        labels: {
                            font: {
                                size: 14,
                                family: 'Open Sans'
                            },
                            color: 'var(--text-color)'
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed !== null) {
                                    label += context.parsed + '%';
                                }
                                return label;
                            }
                        },
                        titleFont: {
                            family: 'Montserrat'
                        },
                        bodyFont: {
                            family: 'Open Sans'
                        }
                    }
                }
            }
        });
    }
});