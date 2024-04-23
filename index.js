let arrCarrusel = [
    'Recursos/Carrusel/pexels-fauxels-3184418.jpg',
    'Recursos/Carrusel/pexels-picjumbo-com-55570-196650.jpg',
    'Recursos/Carrusel/pexels-vojtech-okenka-127162-392018.jpg'
];

function Slider() {
    let cont = 0;
    let imgSlider = document.getElementById("imgSlider");

    function nextSlide() {
        cont = (cont + 1) % arrCarrusel.length;
        let imageUrl = arrCarrusel[cont];
        imgSlider.src = imageUrl;
    }

    setInterval(nextSlide, 3000);
}

Slider();
