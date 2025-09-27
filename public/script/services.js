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
const form = document.querySelector('#cmdForm form');
const cmdButtons = document.querySelectorAll('.commander-btn');
const toHide = document.querySelectorAll('#tohide');
const cmdFormSection = document.getElementById('cmdForm');
const submitBtn = document.getElementById('submitBtn');
const confirmcmd = document.getElementById('confirmcmd');
const forminputs = document.querySelectorAll('#formito');

cmdFormSection.style.display = 'none';

cmdButtons.forEach(btn => {
    btn.addEventListener('click', function (event) {
        event.preventDefault();
        toHide.forEach(hide => {
            hide.style.display = 'none';
        });
        cmdFormSection.style.display = 'block';
        setTimeout(() => {
            cmdFormSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }, 200);
    });
});

form.addEventListener('submit', async function (event) {
    event.preventDefault();

    if (typeof form.checkValidity === 'function' && !form.checkValidity()) {
        form.reportValidity();
        return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Envoi en cours...';
    const formData = new FormData(form);

    try {
        const response = await fetch('/api/services', {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();

        if (result.success) {
            confirmcmd.classList.add('confirmcmd-visible');
            confirmcmd.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
            form.style.opacity = '0.5';
            forminputs.forEach(input => {
                input.disabled = true;
            });
            submitBtn.style.cursor = 'default';
        } else {
            alert('Erreur lors de l\'envoi : ' + result.message);
            submitBtn.disabled = false;
            submitBtn.textContent = 'Envoyer';
        }
    } catch (error) {
        console.error('Erreur:', error);
        alert('Une erreur est survenue. Veuillez réessayer.');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Envoyer';
    }
});