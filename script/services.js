// * FAQ of services.html 

const box1 = document.getElementById('box1');
const box2 = document.getElementById('box2');
const box3 = document.getElementById('box3');
const answer = document.getElementById('answer');
const answer2 = document.getElementById('answer2');
const answer3 = document.getElementById('answer3');

let box1Out = false;
let box2Out = false;
let box3Out = false;

answer.style.visibility = 'hidden';

document.addEventListener('click', function(event) {

     if ((event.target === box1 || event.target === answer) && box1Out == false) { // * Box 1 open
          box1Out = true;

          box1.style.backgroundColor = '#bec0bd';
          box1.style.height = '200px';
          answer.style.visibility = 'visible';
          answer.style.fontWeight = '400';
          answer.innerText = "Votre argent est entre de bonnes mains!\nEn effet, en tant qu'association, votre argent ne peut"
          + " être récolté par les membres, même pas par les dirigeants!\n Ce qui veut dire que nous utiliserons votre argent"
          + " pour financer du matériel à nos\n membres,     pour améliorer la qualité de nos projets et faire de nouveaux projets!"
          + "\n Si vous êtes supicieux à propos de nos dépenses, vous êtes conviés à notre assemblée générale\n annuelle ou nous"
          + " exposerons nos comptes, nos dépenses et nos gains !";

     } else if ((event.target === box1 || event.target === answer) && box1Out == true) { //* Box 1 closing
          box1Out = false; 

          box1.style.backgroundColor = '#DADCD9';
          box1.style.height = '100%';
          answer.style.visibility = 'hidden';
          answer.innerText = '';

     }
     
     if ((event.target === box2 || event.target === answer2) && box2Out == false) { // * Box 2 open
          box2Out = true;

          box2.style.backgroundColor = '#bec0bd';
          box2.style.height = '200px';
          answer2.style.visibility = 'visible';
          answer2.style.fontWeight = '400';
          answer2.innerText = "Vous bénéficiez des protections de la loi. Autres ces protections, nous sommes sûr que nous\n ferons du bon travail, et nous ferons"
          + "  tout pour vous satisfaire ! C'est pour cela que nous avons\n rajouté un acompte: cela vous protège, en cas de désaccord, vous ne payez que 50%. \n"
          + "Nous assurons également la maintenance des projets selon le type de projet !\n N'hésitez pas à nous envoyer vos questions concernant cette maintenance ! \n"
          + "Et pour finir, comme nous en sommes au début, du moment que 3h de travail n'ont pas étés effectués, nous vous remboursons complétement en cas d'annulation!";

     } else if ((event.target === box2 || event.target === answer2) && box2Out == true) {  // * Box 2 closing
          box2Out = false;

          box2.style.backgroundColor = '#DADCD9';
          box2.style.height = '100%';
          answer2.style.visibility = 'hidden';
          answer2.innerText = '';
     }
     
     if ((event.target === box3 || event.target === answer3) && box3Out == false) { // * Box 3 open
          box3Out = true;

          box3.style.backgroundColor = '#bec0bd';
          box3.style.height = '200px';
          answer3.style.visibility = 'visible';
          answer3.style.fontWeight = '400';
          answer3.innerText = "Nous commençons par étudier votre cahier des charges et vous rendons un devis. Vous est ensuite\n attribué un développeur qui communiquera avec vous "
          + "durant toute la durée de la commande. Vous parlez donc en continu avec la personne qui développe votre site! Ensuite, une fois que la facture"
          + " est créée et l'acompte\n de 50% payé, le développeur se met à travailler. Il vous rendra une V1, ou vous pourrez faire des ajustements \n"
          + " Et il vous rendra ensuite une version définitive sous watermark en attendant le paiement des 50% restants !\n"
          + " Nous verrons toutes les informations concernant la maintenance durant votre devis !";

     } else if ((event.target === box3 || event.target === answer3) && box3Out == true) { // * Box 3 closing
          box3Out = false;

          box3.style.backgroundColor = '#DADCD9';
          box3.style.height = '100%';
          answer3.style.visibility = 'hidden';
          answer3.innerText = '';
     }
});


// * Form de commande 
const form = document.querySelector('#cmdForm');
const cmdbutton = document.querySelectorAll('.commander-btn');
const toHide = document.querySelectorAll('#tohide');

form.style.display = 'none';

cmdbutton.forEach(btn => {
     btn.addEventListener('click', function(event) {
          event.preventDefault();

          toHide.forEach(hide => {
               hide.style.display = 'none'
          });

          form.style.display = 'block';
          setTimeout(() => {
               form.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
               });
          }, 200);
     });
});


const submitBtn = document.getElementById('submitBtn');
const confirmcmd = document.getElementById('confirmcmd');
const forminputs = document.querySelectorAll('#formito')

form.addEventListener('submit', function(event) {
     event.preventDefault();
     
     if (form.checkValidity === 'function') {
          if (!form.checkValidity()) {
               form.reportValidity();
               return;
          }
     }
     
     // TODO Insert here backend to send the form
     confirmcmd.classList.add('confirmcmd-visible');
     confirmcmd.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
     });
     form.style.opacity = '0.5';
     
     forminputs.forEach(input => {
          input.disabled = true;
     });
     submitBtn.disabled = true;
     submitBtn.style.cursor = 'default';
});