const banner = document.getElementById('visit-banner');
const key = 'discoverVisit';
const prev = localStorage.getItem(key);
const now = Date.now();
if (!prev) banner.textContent = 'Welcome! Let us know if you have any questions.';
else if (new Date(+prev).toDateString() === new Date().toDateString())
  banner.textContent = 'Back so soon! Awesome!';
else
  banner.textContent = `You last visited ${Math.floor((now - +prev) / 864e5)} day(s) ago.`;
localStorage.setItem(key, now);

const res = await fetch('data/discover.json');
const places = await res.json();
const grid = document.getElementById('discover-cards');

places.forEach((p, i) => {
  const card = document.createElement('article');
  card.className = `discover-card discover-card-${i + 1}`;
  const h2 = document.createElement('h2');
  h2.textContent = p.name;
  const fig = document.createElement('figure');
  const img = document.createElement('img');
  img.src = p.img;
  img.alt = `${p.name} in Oaxaca`;
  img.width = 300;
  img.height = 200;
  img.loading = 'lazy';
  const cap = document.createElement('figcaption');
  cap.textContent = p.name;
  fig.append(img, cap);
  const addr = document.createElement('address');
  addr.textContent = p.address;
  const desc = document.createElement('p');
  desc.textContent = p.description;
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.textContent = 'Learn More';
  card.append(h2, fig, addr, desc, btn);
  grid.appendChild(card);
});

const nav = document.getElementById('primary-nav');
const menuBtn = document.getElementById('hamburger');
menuBtn?.addEventListener('click', () => {
  nav.classList.toggle('open');
  const open = nav.classList.contains('open');
  menuBtn.setAttribute('aria-expanded', open);
  menuBtn.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
});
