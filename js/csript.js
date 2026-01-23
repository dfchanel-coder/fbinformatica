// Inicializar animaciones AOS
AOS.init({
    duration: 800, // Duración de la animación en milisegundos
    once: true, // Si true, la animación solo ocurre una vez al bajar
    offset: 100 // Desplazamiento (en px) desde el borde inferior de la pantalla para activar la animación
});

// Funcionalidad Menú Hamburguesa (Móvil)
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Cambiar el icono de hamburguesa a 'X' y viceversa
    const icon = mobileMenu.querySelector('i');
    if (icon.classList.contains('fa-bars')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});


// Funcionalidad Sliders (PC y GPU)
function moveSlide(sliderId, direction) {
    const slider = document.getElementById(sliderId);
    const slides = slider.querySelectorAll('.slide');
    const totalSlides = slides.length;
    
    // Obtenemos el índice actual guardado en un atributo data, o iniciamos en 0
    let currentIndex = parseInt(slider.getAttribute('data-index')) || 0;
    
    currentIndex += direction;

    // Loop infinito
    if (currentIndex >= totalSlides) {
        currentIndex = 0;
    } else if (currentIndex < 0) {
        currentIndex = totalSlides - 1;
    }

    // Guardamos el nuevo índice
    slider.setAttribute('data-index', currentIndex);

    // Movemos el slider
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
}