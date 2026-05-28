const url = 'data/members.json';
const cards = document.querySelector('#cards');

async function getCompanyData() {
  const response = await fetch(url);
  const data = await response.json();
  displayCompanies(data);
}

const displayCompanies = (companies) => {
  companies.forEach((company) => {
    let card = document.createElement('section');
    let name = document.createElement('h2');
    let address = document.createElement('p');
    let phone = document.createElement('p');

    let websiteLink = document.createElement('a');
    let image = document.createElement('img');
    let membershipLevel = document.createElement('p');
    let yearEstablished = document.createElement('p');
    let description = document.createElement('p');

    name.textContent = company.name;
    address.textContent = `📍 ${company.address}`;
    phone.textContent = `📞 ${company.phone}`;

    websiteLink.href = company.website;
    websiteLink.textContent = company.website;
    websiteLink.target = '_blank';
    websiteLink.rel = 'noopener';
    websiteLink.style.color = 'white';

    image.setAttribute('src', `images/${company.image}`);
    image.setAttribute('alt', `Logo of ${company.name}`);
    image.setAttribute('loading', 'lazy');
    image.setAttribute('width', '340');
    image.setAttribute('height', '180');

    const levelLabels = { 1: 'Member 🥉', 2: 'Silver 🥈', 3: 'Gold 🥇' };
    membershipLevel.textContent = `🏷️ Membership: ${levelLabels[company.membershipLevel] || company.membershipLevel}`;
    yearEstablished.textContent = `📅 Est. ${company.yearEstablished}`;
    description.textContent = company.description;

    card.appendChild(name);
    card.appendChild(address);
    card.appendChild(phone);
    card.appendChild(websiteLink);
    card.appendChild(membershipLevel);
    card.appendChild(yearEstablished);
    card.appendChild(description);
    card.appendChild(image);

    cards.appendChild(card);
  });
};
const gridBtn = document.getElementById('grid-btn');
const listBtn = document.getElementById('list-btn');

gridBtn.addEventListener('click', () => {
  cards.classList.remove('list-view');
  gridBtn.classList.add('active-btn');
  listBtn.classList.remove('active-btn');
});

listBtn.addEventListener('click', () => {
  cards.classList.add('list-view');
  listBtn.classList.add('active-btn');
  gridBtn.classList.remove('active-btn');
});

getCompanyData();

const hamburger = document.getElementById('hamburger');
const primaryNav = document.getElementById('primary-nav');

if (hamburger && primaryNav) {
  hamburger.addEventListener('click', () => {
    primaryNav.classList.toggle('open');
  });
}
