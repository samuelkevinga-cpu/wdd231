const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('primary-nav');
if (hamburger && nav) {

  hamburger.addEventListener('click', () => {

    nav.classList.toggle('open');
    const isOpen = nav.classList.contains('open');
    hamburger.setAttribute('aria-expanded', isOpen);
  });

}