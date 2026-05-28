const params = new URLSearchParams(window.location.search);
const summary = document.querySelector('#application-summary');

const fields = [
  ['First Name', 'first'],
  ['Last Name', 'last'],
  ['Email', 'email'],
  ['Mobile Phone', 'phone'],
  ['Business Name', 'organization'],
  ['Submitted', 'timestamp']
];

if (summary) {
  fields.forEach(([label, name]) => {
    const paragraph = document.createElement('p');
    const strong = document.createElement('strong');
    strong.textContent = `${label}: `;
    paragraph.appendChild(strong);
    paragraph.append(params.get(name) || 'Not provided');
    summary.appendChild(paragraph);
  });
}

const hamburger = document.getElementById('hamburger');
const primaryNav = document.getElementById('primary-nav');

if (hamburger && primaryNav) {
  hamburger.addEventListener('click', () => {
    primaryNav.classList.toggle('open');
  });
}
