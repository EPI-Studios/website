// * FAQ of services.html

const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const toggle = item.querySelector('.faq-toggle');
    const answer = item.querySelector('.faq-answer');

    if (!toggle || !answer) {
        return;
    }

    answer.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');

    toggle.addEventListener('click', () => {
        const isOpen = item.classList.toggle('faq-open');
        toggle.setAttribute('aria-expanded', String(isOpen));
        answer.hidden = !isOpen;
    });
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

