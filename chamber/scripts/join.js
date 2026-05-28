const timestamp = document.querySelector('#timestamp');

if (timestamp) {
  timestamp.value = new Date().toISOString();
}
document.querySelectorAll('[data-modal]').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    document.getElementById(link.dataset.modal).showModal();
  });
});
document.querySelectorAll('.close-modal').forEach((button) => {
  button.addEventListener('click', () => {
    button.closest('dialog').close();
  });
});
const hamburger = document.getElementById('hamburger');
const primaryNav = document.getElementById('primary-nav');
if (hamburger && primaryNav) {
  hamburger.addEventListener('click', () => {
    primaryNav.classList.toggle('open');
  });
}
