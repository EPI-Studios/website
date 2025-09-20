// ! F.A.Q
const box1 = document.getElementById('box1');
const box2 = document.getElementById('box2');
const box3 = document.getElementById('box3');
const box4 = document.getElementById('box4');
const answer1 = document.getElementById('answer1');
const answer2 = document.getElementById('answer2');
const answer3 = document.getElementById('answer3');
const answer4 = document.getElementById('answer4');
// ! yes I know this could've been much more optimized, but 

let box1Out = false;
let box2Out = false;
let box3Out = false;
let box4Out = false;


document.addEventListener('click', function(event) {

     if ((event.target === box1 || event.target === answer1) && box1Out == false) { // * Box 1 open
          box1Out = true;

          box1.style.backgroundColor = '#bec0bd';
          box1.style.height = '200px';
          answer1.style.visibility = 'visible';
          answer1.style.fontWeight = '400';
          answer1.style.lineHeight ="1.5";
          answer1.innerText = "Evidemment, vous postulez pour rejoindre une association, vous serez donc bénévoles.\n Néanmoins, "
          +" être bénévole signifie que vous n'aurez donc pas d'obligations. Si vous rejoignez ce projet, c'est que vous êtes "
          +"passionné(e)s par le développement ou que le projet vous intéresse !\n Au dela, l'association peut vous fournir du matériel"
          + " afin que vous puissiez exercer dans de bonnes conditions !\n Vos projets serons également crédités, ce qui peut booster"
          + " votre CV si vous débutez dans votre activité !";

     } else if ((event.target === box1 || event.target === answer1) && box1Out == true) { //* Box 1 closing
          box1Out = false; 

          box1.style.backgroundColor = '#DADCD9';
          box1.style.height = '100%';
          answer1.style.visibility = 'hidden';
          answer1.innerText = '';

     }
     
     if ((event.target === box2 || event.target === answer2) && box2Out == false) { // * Box 2 open
          box2Out = true;

          box2.style.backgroundColor = '#bec0bd';
          box2.style.height = '200px';
          answer2.style.visibility = 'visible';
          answer2.style.fontWeight = '400';
          answer2.style.lineHeight ="1.5";
          answer2.innerText = "Nous sommes une association Loi 1901 créée le 24/08/25 ! Toutes les infos sont disponibles dans\n"
          + "les mentions légales et les CGV !";

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
          answer3.style.lineHeight ="1.5";
          answer3.innerText = "Notre but est très clair:\n"
          +"Nous amuser! Nous ne créeons que ce qui nous passionne, sans nous bloquer dans un marché.\n"
          +"Nous produisons des applications PC/mobile, des plugins minecraft, des outils, etc.\n"
          +"Vous pouvez également demander à travailler sur la partie vente au grand public, vous produirez ainsi\n"
          +"des programmes ou logos pour des clients, vous donnant une experience vendeur et producteur!\n"
          +"Cette partie est évidemment optionnelle, notre principale activitée étant bien évidemment la création (open-source)!";

     } else if ((event.target === box3 || event.target === answer3) && box3Out == true) { // * Box 3 closing
          box3Out = false;

          box3.style.backgroundColor = '#DADCD9';
          box3.style.height = '100%';
          answer3.style.visibility = 'hidden';
          answer3.innerText = '';
     }

     if ((event.target === box4 || event.target === answer4) && box4Out == false) { // * Box 4 Open
          box4Out = true;

          box4.style.backgroundColor = '#bec0bd';
          box4.style.height = '200px';
          answer4.style.visibility = 'visible';
          answer4.style.fontWeight = '400';
          answer4.style.lineHeight ="1.5";
          answer4.innerText = "Vous devez être capable de participer aux projets.\n"
          + "Il n'y a pas de \"barème\" à proprement dis, vous devez simplement avoir quelque chose à apporter.\n"
          +"Si vous êtes débutant(e)s, vous êtes le/la bienvenue, tant que vous avez les bases et que vous avez une soif d'apprendre!\n"
          +"Quelque soit votre experience, votre âge, votre genre ou votre nationalité, vous serez les bienvenues du moment que vous êtes prêt(e) à vous investir!";

     } else if ((event.target === box4 || event.target === answer4) && box4Out == true) { // * Box 4 closing
          box4Out = false;

          box4.style.backgroundColor = '#DADCD9';
          box4.style.height = '100%';
          answer4.style.visibility = 'hidden';
          answer4.innerText = '';
     }
});




// ! Form Style 

const faq = document.getElementById('faq');
const preform = document.getElementById('preform');
const radiooption = document.querySelectorAll('input[name="poste"]');
const conditionalQuestions = document.querySelectorAll('.conditional-question');
const endingQuestion = document.getElementById('formfinished');
const firstquestion = document.querySelector('.first-question');

const nextbuttons = document.querySelectorAll('.nextbutton');
const editbutton = document.querySelector('.editbutton');

editbutton.addEventListener('click', function(event){ // ! J'avoue j'ai fait cette partie à l'IA j'ai rien compris
     event.preventDefault();
     endingQuestion.style.display = 'none';

     const selectedRadio = Array.from(radiooption).find(radio => radio.checked);
     if (selectedRadio) {
          const questionMap = {
               'dev': 'devform',
               'gfx': 'gfxform',
               'cm': 'cmform'
          };
          const questionToShow = questionMap[selectedRadio.value];
          ShowConditional(questionToShow);
     };

});

const firstform = [preform, firstquestion, ...conditionalQuestions];

nextbuttons.forEach(button => { //* Prevent default behavior and hide all forms just to display the end
     
     button.addEventListener('click', function(event){
          event.preventDefault();

          let isValid = true;

          firstform.forEach(form => {
               // Only check validity if it's a form or an element with checkValidity
               if (typeof form.checkValidity === 'function') {
                    if (!form.checkValidity()) {
                         isValid = false;
                         form.reportValidity();
                    }
               }
          });

          if (isValid === true) {
               console.log("valid!");
               endingQuestion.style.display = 'block';
               HideAllForms();
               preform.style.display = 'none';
               faq.style.display = 'none';
               endingQuestion.scrollIntoView({
                    behavior: 'auto',
                    block: 'start'
               });  
          } else {
               console.log('Form Is not valid');
          }
     });
});




function HideAllForms() {

     firstquestion.style.display = 'none';
     
     conditionalQuestions.forEach(question => {
          question.style.display = 'none';
          console.log('Forms masqués !');

     });
};

function ShowConditional(questionId) {
     const questionElement = document.getElementById(questionId);
     if (questionElement) {
          firstquestion.style.display = 'block';
          questionElement.style.display = 'block';
     };
};




radiooption.forEach(radio => {
     radio.addEventListener('change', function(){
          HideAllForms();

          if (this.checked) {
               const questionMap = {
                    'dev': 'devform',
                    'gfx': 'gfxform',
                    'cm': 'cmform'
               }

               const questionToShow = questionMap[this.value];
               ShowConditional(questionToShow);
          };
     });
});     

HideAllForms();
endingQuestion.style.display = 'none';

//* File validation: 
// TODO: Make a validation like display a message when there's a file uploaded


 // * Form preventing and check validity :

const finalSubmit = document.getElementById('finalSubmit');
const allForms = [...firstform, endingQuestion];

let allValid = true;

finalSubmit.addEventListener('submit', function() {
     allForms.forEach(form => {
          if (typeof form.checkValidity() === 'function') {
               
               if (!form.checkValidity) {
                    allValid = false;
                    form.reportValidity();
                    return;
               };
          };
     });

     if (allValid === true) {
          console.log('valid!');
     // ! TODO: INSERT BACKEND SEND FORM HERE


     } else {
          console.log('non-Valid');
     };  
});





// * debug mode 
const allText = document.querySelectorAll('input[type="text"]');
const allEmail = document.querySelectorAll('input[type="email"]');
const allNumbers = document.querySelectorAll('input[type="number"]');


function debugMode() {
     conditionalQuestions.forEach(question => {
          question.style.display = 'block';
     });

     endingQuestion.style.display = 'block';
     firstquestion.style.display = 'block';
     

     allText.forEach(input => {
         input.value ="test"; 
     });
     allEmail.forEach(input => {
          input.value = "contact@epistudios.fr";
     });
     allNumbers.forEach(input => {
          input.value = "21";
     });

     const allFiles = document.querySelectorAll('input[type="file"]'); // ! AI, je suis pas capable de faire ça encore !
     allFiles.forEach(input => {
          // Create a dummy File object and set it as the input's files property
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(new File(["dummy content"], "dummy.txt", { type: "text/plain" }));
          input.files = dataTransfer.files;
     });
};
