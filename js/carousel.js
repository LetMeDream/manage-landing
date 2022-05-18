const slider = document.getElementById('slider');
const leftBtn = document.getElementById('left-arrow');  
const rightBtn = document.getElementById('right-arrow');
const progressBar = document.getElementById('progress-bar');
const progressBtns = document.getElementsByClassName('progress-bar__item');
let distance = 0;
let move = 100; // Always move 100% of the screen
let currentSlide = 0;


/* Here we will just be changing how far out scroll goes when we move the carousel */
/* let desktop = window.matchMedia('(min-width: 768px)');
desktop.matches ? move = 100 : move = 100; */
/* On desktop, you should move 33% of the carousel(1 our of 3 cards), on mobile, you should  move 100% (1 out of 1) */
/* const calculateMove = () => {
    desktop.matches ? move = 33 : move = 100;
    console.log('Move is: ',move);
} */


/* Calculate progress btns */
const calculateProgressBtns = () => {
    /* Accessing our CSS variables (cards to show) */
    let cardsToShow = getComputedStyle(document.getElementsByClassName('carousel__slider')[0]).getPropertyValue('--cards-to-show');
    /* How many card are there? */
    let cardsTotal = document.getElementById('slider').children.length;
    /* How many buttons then? */
    let btnsTotal = Math.ceil(cardsTotal/cardsToShow);
    return btnsTotal;
}
/* Creating bar */
const createProgressBar = () => {
    btnsTotal = calculateProgressBtns();
    /* Now we need to create and insert our buttons */
    for (let i = 0; i < btnsTotal; i++) {
        let div = document.createElement('div');
        div.className = "progress-bar__item bg-slate-800 hover:bg-slate-500 px-3 py-1 rounded-sm cursor-pointer";
        i == 0 ? div.classList.add('active') : '';
        progressBar.appendChild(div);
        
    }

    /* Event listeners for our progress buttons */
    for (let i = 0; i < progressBtns.length; i++) {
        const btn = progressBtns[i];
        /* Active state */
        btn.addEventListener('click', function(){
            let active = this.classList.contains('active');
            /* Go into each button in order to see if there's any of them with the 'active' class already */
            for(let btn2 of progressBtns){
                /* If so, remove it */
                btn2.classList.contains('active') ? btn2.classList.remove('active') : '';
            }
            /* And then toggle your active class on the actual clicked button */
        /*  if(active){
                this.classList.remove('active');
            }else{
                this.classList.add('active');
            } 
        */
            this.classList.add('active');
        });

        btn.addEventListener('click', function(){
            /* Move the slider to the btn clicked */
            moveNCarousel(i);
        });
        
    }


}
createProgressBar();


/* On every window's resizing, it should calculate again. */
window.onresize = () => {
    if(progressBar.firstChild){
        while (progressBar.firstChild) {
            progressBar.removeChild(progressBar.firstChild);
        }
    }

    createProgressBar();
    console.log('resized')
};

/* Right */
function moveRight(e, num = 1){
    btnsTotal = calculateProgressBtns();
    distance > -(move*btnsTotal) ?  distance -= num*move : distance;
    if((currentSlide >= 0) && (currentSlide < btnsTotal-1) ){
        slider.style.transform = `translateX(${distance}%)`;
        currentSlide++;
        moveNProgressBar(currentSlide)
    }

}
/* Left */
function moveLeft(e, num = 1){
    btnsTotal = calculateProgressBtns();
    distance <= -1 ? distance += num*move : distance;
    console.log(distance);
    if((currentSlide > 0) && (currentSlide <= btnsTotal) ){
        slider.style.transform = `translateX(${distance}%)`;
        currentSlide--;
        moveNProgressBar(currentSlide);
        console.log('LEFT')
    }
}
/* Move N (from the progress bar, modify our carousel) */
function moveNCarousel(num){
    distance = -num*100;
    slider.style.transform = `translateX(${distance}%)`;
    console.log(num);
    currentSlide = num;
}
/* Move N (from the carousel, modify our progress bar) */
function moveNProgressBar(n){
    /* Go into each button in order to see if there's any of them with the 'active' class already */
    for(let btn2 of progressBtns){
        /* If so, remove it */
        btn2.classList.contains('active') ? btn2.classList.remove('active') : '';
    }
    console.log(n);
    console.log(progressBtns[n]);
    progressBtns[n].classList.add('active');


}


/* Carousel controlling arrows */
/* Right */
rightBtn.onclick = moveRight
/* Left */
leftBtn.onclick = moveLeft


