const navBar = document.getElementById('backNav'); 
const dropMenu = document.getElementById('dropMenu');
const dropNav = document.querySelector('.dropnav');

let isMenuOpen = false;

function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    dropNav.classList.toggle('dropnav-show');
    dropMenu.classList.toggle('dropmenu-show');
}

function closeMenu() {
    if (isMenuOpen) {
        isMenuOpen = false;
        dropNav.classList.remove('dropnav-show');
        dropMenu.classList.remove('dropmenu-show');
    }
}

dropMenu.addEventListener('click', toggleMenu);
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav') && isMenuOpen) {
        closeMenu();
    }
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 576) {
        closeMenu();
    }
});
