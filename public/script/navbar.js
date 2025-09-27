const navBar = document.getElementById('backNav'); 
const dropMenu = document.getElementById('dropMenu');
const dropNav = document.querySelector('.dropnav');

let dropOut = false;
//* Drop Menu

if (window.innerWidth <= 580) {
     navBar.style.display = 'none';
     
     
     dropMenu.addEventListener('click', function() {

          if (dropOut === false) {
               dropNav.classList.toggle('dropnav-show');
               dropMenu.classList.toggle('dropmenu-show');
          }
     });

};
