document.addEventListener('DOMContentLoaded', function() {
    // Menu toggle para móviles
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
    
    // Cerrar menú al hacer clic en un enlace
    const navLinks = document.querySelectorAll('.nav-menu-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });
    
    // Efecto de scroll para el header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        header.classList.toggle('scrolled', window.scrollY > 50);
    });
    
    // Cargar dinámicamente los tipos de energía
    const energyGrid = document.querySelector('.energy-grid');
    
    const energyTypes = [
        {
            title: "Energía Solar",
            description: "Obtenida del aprovechamiento de la radiación electromagnética procedente del Sol.",
            image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            stats: {
                capacity: "1.5",
                efficiency: "22",
                growth: "35"
            }
        },
        {
            title: "Energía Eólica",
            description: "Obtenida del viento, es decir, la energía cinética generada por efecto de las corrientes de aire.",
            image: "https://images.unsplash.com/photo-1508512916988-7f1d4280db09?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            stats: {
                capacity: "2.8",
                efficiency: "45",
                growth: "25"
            }
        },
        {
            title: "Energía Hidroeléctrica",
            description: "Se obtiene del aprovechamiento de la energía cinética y potencial de la corriente del agua.",
            image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            stats: {
                capacity: "4.2",
                efficiency: "90",
                growth: "15"
            }
        },
        {
            title: "Biomasa",
            description: "Utiliza la materia orgánica como fuente de energía, tanto de origen animal como vegetal.",
            image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            stats: {
                capacity: "0.8",
                efficiency: "30",
                growth: "20"
            }
        },
        {
            title: "Energía Geotérmica",
            description: "Aprovecha el calor del subsuelo para climatizar y obtener agua caliente de forma ecológica.",
            image: "https://images.unsplash.com/photo-1519683109079-d5f539e1542f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            stats: {
                capacity: "0.5",
                efficiency: "75",
                growth: "10"
            }
        },
        {
            title: "Energía Marina",
            description: "Se obtiene del aprovechamiento de la energía de los mares y océanos.",
            image: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            stats: {
                capacity: "0.3",
                efficiency: "65",
                growth: "40"
            }
        }
    ];
    
    energyTypes.forEach(type => {
        const energyCard = document.createElement('div');
        energyCard.className = 'energy-card';
        
        energyCard.innerHTML = `
            <div class="energy-img">
                <img src="${type.image}" alt="${type.title}">
            </div>
            <div class="energy-content">
                <h3>${type.title}</h3>
                <p>${type.description}</p>
                <div class="energy-stats">
                    <div class="stat">
                        <h4>${type.stats.capacity} TW</h4>
                        <p>Capacidad</p>
                    </div>
                    <div class="stat">
                        <h4>${type.stats.efficiency}%</h4>
                        <p>Eficiencia</p>
                    </div>
                    <div class="stat">
                        <h4>${type.stats.growth}%</h4>
                        <p>Crecimiento</p>
                    </div>
                </div>
            </div>
        `;
        
        energyGrid.appendChild(energyCard);
    });
    
    // Gráfico de beneficios
    const benefitsCtx = document.getElementById('benefitsChart').getContext('2d');
    const benefitsChart = new Chart(benefitsCtx, {
        type: 'doughnut',
        data: {
            labels: ['Reducción de CO2', 'Ahorro económico', 'Creación de empleo', 'Independencia energética'],
            datasets: [{
                data: [40, 25, 20, 15],
                backgroundColor: [
                    '#4CAF50',
                    '#8BC34A',
                    '#CDDC39',
                    '#2E7D32'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        font: {
                            size: 14
                        },
                        padding: 20
                    }
                }
            },
            cutout: '70%'
        }
    });
    
    // Slider de proyectos
    const projectsSlider = document.querySelector('.projects-slider');
    
    const projects = [
        {
            title: "Parque Solar Andino",
            description: "El mayor parque solar de Sudamérica, con capacidad para abastecer a 1 millón de hogares.",
            image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            location: "Chile"
        },
        {
            title: "Granja Eólica Marina",
            description: "Proyecto offshore que aprovecha los fuertes vientos del Mar del Norte para generar energía limpia.",
            image: "https://images.unsplash.com/photo-1508512916988-7f1d4280db09?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            location: "Reino Unido"
        },
        {
            title: "Central Hidroeléctrica",
            description: "Modernización de una central hidroeléctrica para aumentar su eficiencia en un 30%.",
            image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            location: "Noruega"
        }
    ];
    
    projects.forEach(project => {
        const projectSlide = document.createElement('div');
        projectSlide.className = 'project-slide';
        
        projectSlide.innerHTML = `
            <div class="project-img">
                <img src="${project.image}" alt="${project.title}">
            </div>
            <div class="project-info">
                <h3>${project.title}</h3>
                <p><i class="fas fa-map-marker-alt"></i> ${project.location}</p>
                <p>${project.description}</p>
                <a href="#" class="btn">Más información</a>
            </div>
        `;
        
        projectsSlider.appendChild(projectSlide);
    });
    
    // Formulario de contacto
    document.getElementById('contactForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };
        
        try {
            const response = await fetch('https://script.google.com/macros/s/AKfycbxbwk6052TuDYRjaMfR2n7Jze2I6VFCRITtb8Und8S3CC92ksEzw4NbjdRwlt78sXxasw/exec', {
                method: 'POST',
                mode: 'cors', // Especificar modo CORS
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
            this.reset();
            
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un error al enviar el mensaje. Por favor intenta nuevamente más tarde.');
        } finally {
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
        }
    });
    
    // Animación al hacer scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.energy-card, .benefits-content, .project-slide');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Establecer opacidad inicial para los elementos a animar
    document.querySelectorAll('.energy-card, .benefits-content, .project-slide').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Ejecutar al cargar la página
});