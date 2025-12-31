const index = document.getElementById('index');
const presepi = document.getElementById('presepi');
const stats = document.getElementById('stats');
const textstats = document.getElementById('textstats');
const partners = document.getElementById('partners');

const elementsToShow = [presepi, stats, textstats, partners];

elementsToShow.forEach(element => {
     element.style.opacity = '0';
     element.style.transform = 'translateY(50px)';
     element.style.transition = 'opacity 0.5s ease-in, transform 0.5s ease-in';
});

function checkIfVisible() {
     elementsToShow.forEach(element => {
          const rect = element.getBoundingClientRect(); //This tag gets the viewport and convert it to number
          const elementTop = rect.top; 
          const windowHeight = window.innerHeight;

          if (elementTop < windowHeight / 1.25){ // If the element position in the viewport is inferior than the window Height
               element.style.opacity = '1'; // Divided by the number, then set the opacity to 1 and return to the the position
               element.style.transform ='translateY(0)';
          }
     });
};

window.addEventListener('scroll', checkIfVisible);
checkIfVisible();


// * Animation for the main text in index.html: 
const string = "EPI STUDIO";

let array = string.split("")
let timer; 

function typeAnimation() {
     if (array.length > 0) {
          document.getElementById('titlepres').innerHTML += array.shift();
     }
     else {
          clearTimeout(timer);
     }
     timer = setTimeout('typeAnimation()' ,120);
}

typeAnimation();
// * End of animations
