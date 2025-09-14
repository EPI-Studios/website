// * FAQ of services.html 

const box1 = document.getElementById('box1');
const box2 = document.getElementById('box2');
const box3 = document.getElementById('box3');
const answer = document.getElementById('answer');

let box1Out = false;
let box2Out = false;
let box3Out = false;

answer.style.visibility = 'hidden';

document.addEventListener('click', function(event) {

     if (event.target === box1 && box1Out == false) { // Text out
          console.log("DIV1 Clicked!");
          box1Out = true;

          box1.style.backgroundColor = '#bec0bd';
          box1.style.height = '1000px';
          answer.style.visibility = 'visible';
          answer.innerText = "Votre argent est entre de bonnes mains!\nEn effet, en tant qu'association, votre argent ne peut"
          + "être récolté par les membres, même pas par les dirigeants!\n Ce qui veut dire que nous utiliserons votre argent"
          + "pour financer du matériel à nos membres, pour améliorer la qualité de nos projets et faire de nouveaux projets!"
          + "\n Si vous êtes supicieux à propos de nos dépenses, vous êtes conviés à notre assemblée générale annuelle ou nous"
          + "exposerons nos comptes, nos dépenses et nos gains !";
          

     } else if (event.target === box1 && box1Out == true) {
          box1Out = false; 

          box1.style.backgroundColor = '#DADCD9';
          box1.style.height = '100%';
          answer.style.visibility = 'hidden';
          answer.innerText = '';
     
     } else if (event.target === box2) {


     } else if (event.target === box2 && box2Out == true){



     } else if (event.target === box3) {


          console.log('DIV3 clicked!');
     } else if (event.target === box3 && box3Out == true) {

     }
});
