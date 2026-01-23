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