// * Easter egg

const gaelphoto = document.getElementById('gaelphoto');

let clickCount = 0;

gaelphoto.addEventListener('click', function() {
     clickCount++;

     if (clickCount === 10) {
          window.location.href = '/easteregg';
     };
});