const box1 = document.getElementById('box1');
const box2 = document.getElementById('box2');
const box3 = document.getElementById('box3');
const box4 = document.getElementById('box4');
const answer1 = document.getElementById('answer1');
const answer2 = document.getElementById('answer2');
const answer3 = document.getElementById('answer3');
const answer4 = document.getElementById('answer4');

let box1Out = false;
let box2Out = false;
let box3Out = false;
let box4Out = false;

document.addEventListener('click', function(event) {

     if ((event.target === box1 || event.target === answer1) && box1Out == false) {
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
          
          if (window.innerWidth >= 380 && window.innerWidth <= 580) {
               box1.style.height = '500px';
          } else if (window.innerWidth < 380) {
               box1.style.height = '600px';
          }

     } else if ((event.target === box1 || event.target === answer1) && box1Out == true) {
          box1Out = false; 

          box1.style.backgroundColor = '#DADCD9';
          box1.style.height = '100%';
          answer1.style.visibility = 'hidden';
          answer1.innerText = '';

     }
     
     if ((event.target === box2 || event.target === answer2) && box2Out == false) {
          box2Out = true;

          box2.style.backgroundColor = '#bec0bd';
          box2.style.height = '200px';
          answer2.style.visibility = 'visible';
          answer2.style.fontWeight = '400';
          answer2.style.lineHeight ="1.5";
          answer2.innerText = "Nous sommes une association Loi 1901 créée le 24/08/25 ! Toutes les infos sont disponibles dans\n"
          + "les mentions légales et les CGV !";
          
          if (window.innerWidth <= 580) {
               box2.style.height = '150px';
          }

     } else if ((event.target === box2 || event.target === answer2) && box2Out == true) {
          box2Out = false;

          box2.style.backgroundColor = '#DADCD9';
          box2.style.height = '100%';
          answer2.style.visibility = 'hidden';
          answer2.innerText = '';
     }
     
     if ((event.target === box3 || event.target === answer3) && box3Out == false) {
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

          if (window.innerWidth >= 380 && window.innerWidth <= 580) {
               box3.style.height = '500px';
          } else if (window.innerWidth < 380) {
               box3.style.height = '600px';
          }
     } else if ((event.target === box3 || event.target === answer3) && box3Out == true) {
          box3Out = false;

          box3.style.backgroundColor = '#DADCD9';
          box3.style.height = '100%';
          answer3.style.visibility = 'hidden';
          answer3.innerText = '';
     }

     if ((event.target === box4 || event.target === answer4) && box4Out == false) {
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

          if (window.innerWidth >= 380 && window.innerWidth <= 580) {
               box4.style.height = '450px';
          } else if (window.innerWidth < 380) {
               box4.style.height = '500px';
          }
     } else if ((event.target === box4 || event.target === answer4) && box4Out == true) {
          box4Out = false;

          box4.style.backgroundColor = '#DADCD9';
          box4.style.height = '100%';
          answer4.style.visibility = 'hidden';
          answer4.innerText = '';
     }
});

const faq = document.getElementById('faq');
const preform = document.getElementById('preform');
const radiooption = document.querySelectorAll('input[name="poste"]');
const conditionalQuestions = document.querySelectorAll('.conditional-question');
const endingQuestion = document.getElementById('formfinished');
const firstquestion = document.querySelector('.first-question');

const nextbuttons = document.querySelectorAll('.nextbutton');
const editbutton = document.querySelector('.editbutton');

editbutton.addEventListener('click', function(event){
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

nextbuttons.forEach(button => {
     
     button.addEventListener('click', function(event){
          event.preventDefault();

          let isValid = true;

          firstform.forEach(form => {
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

const fileInput = document.querySelector('input[type="file"]');
const fileIcon = document.querySelector('.upload-img');

if (fileInput && fileIcon) {
     fileInput.addEventListener('change', function(event) {
          if (event.target.files && event.target.files.length > 0) {
               fileIcon.src = '../SEO/check-logo.png';
               fileIcon.alt = 'File uploaded';
          } else {
               fileIcon.src = '../SEO/upload-icone.png';
               fileIcon.alt = 'Upload file';
          }
     });
}

const finalSubmitForm = document.getElementById('formfinished');
const allForms = [...firstform, endingQuestion];

finalSubmitForm.addEventListener('submit', async function(event) {
     event.preventDefault();
     console.log('Form submit triggered');

     let allValid = true;

     allForms.forEach(form => {
          if (typeof form.checkValidity === 'function') {
               if (!form.checkValidity()) {
                    allValid = false;
                    form.reportValidity();
                    return;
               };
          };
     });

     if (allValid) {
          console.log('All forms valid, preparing FormData');
          const formData = new FormData();
          
          const selectedRadio = Array.from(radiooption).find(radio => radio.checked);
          if (selectedRadio) {
               formData.append('poste', selectedRadio.value);
               console.log('Poste:', selectedRadio.value);
          }

          const textInputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="number"], textarea');
          textInputs.forEach(input => {
               if (input.name && input.value) {
                    formData.append(input.name, input.value);
               }
          });

          const fileInput = document.querySelector('input[type="file"]');
          if (fileInput && fileInput.files[0]) {
               formData.append('cv', fileInput.files[0]);
               console.log('CV file attached');
          }

          const ratingValue = document.querySelector('input[name="rating"]');
          if (ratingValue) {
               formData.append('rating', ratingValue.value);
          } else {
               formData.append('rating', selectedRating.toString());
          }

          console.log('Sending request to /api/recruitment');
          
          try {
               const response = await fetch('/api/recruitment', {
                    method: 'POST',
                    body: formData
               });

               console.log('Response received:', response.status);
               const result = await response.json();
               console.log('Result:', result);

               if (result.success) {
                    alert('Candidature envoyée avec succès!');
                    window.location.href = '/';
               } else {
                    alert('Erreur lors de l\'envoi: ' + result.message);
               }
          } catch (error) {
               console.error('Erreur:', error);
               alert('Erreur lors de l\'envoi de la candidature');
          }
     } else {
          console.log('Form non valide');
     }
});

const stars = document.querySelectorAll('.star');
let selectedRating = 0;

stars.forEach((star, index) => {
     star.addEventListener('mouseover', function() {
          highlightStars(index + 1);
     });

     star.addEventListener('mouseout', function() {
          highlightStars(selectedRating);
     });

     star.addEventListener('click', function() {
          selectedRating = index + 1;
          highlightStars(selectedRating);
     });
});

function highlightStars(rating) {
     stars.forEach((star, index) => {
          if (index < rating) {
               star.style.color = '#ffd700';
          } else {
               star.style.color = '#c5c5c5';
          }
     });
}

highlightStars(0);

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

     const allFiles = document.querySelectorAll('input[type="file"]');
     allFiles.forEach(input => {
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(new File(["dummy content"], "dummy.txt", { type: "text/plain" }));
          input.files = dataTransfer.files;
     });
};