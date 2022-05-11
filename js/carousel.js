const slider = document.getElementById('slider');
const leftBtn = document.getElementById('left-arrow');  
const rightBtn = document.getElementById('right-arrow');
const carousel = document.getElementById('carousel')
let distance = 0;
let move = 0;

let desktop = window.matchMedia('(min-width: 768px)');
desktop.matches ? move = 33 : move = 100;

/* Right */
rightBtn.onclick = (e) => {
    distance > -99 ?  distance -= 33 : distance;
    console.log(distance);
    slider.style.transform = `translateX(${distance}%)`;
}
/* Left */
leftBtn.onclick = (e) => {
    distance <= -1 ? distance += 33 : distance;
    console.log(distance);
    slider.style.transform = `translateX(${distance}%)`;
}


