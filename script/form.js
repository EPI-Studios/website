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




nextbuttons.forEach(button => { //* Prevent default behavior and hide all forms just to display the end
     
     button.addEventListener('click', function(event){
          event.preventDefault();
          endingQuestion.style.display = 'block';
          HideAllForms();
          endingQuestion.scrollIntoView({
               behavior: 'auto',
               block: 'start'
          });
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


// ! TODO: INSERT HERE BACKEND SEND FORM