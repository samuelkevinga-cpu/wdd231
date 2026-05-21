const WEATHER_API_KEY = '29860c73fa44385317eeae9832e9d367';
const LAT = 17.0669;
const LON = -96.7203;
const UNITS = 'metric';
async function getCurrentWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather`
    + `?lat=${LAT}&lon=${LON}&units=${UNITS}&appid=${WEATHER_API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }

    const data = await response.json();
    displayCurrentWeather(data);

  } catch (error) {
    console.error('Failed to fetch current weather:', error);
    document.getElementById('weather-temp').textContent = 'N/A';
    document.getElementById('weather-desc').textContent = 'Weather unavailable';
  }
}
function displayCurrentWeather(data) {
  const temp = Math.round(data.main.temp);
  document.getElementById('weather-temp').textContent = `${temp} °C`;
  document.getElementById('weather-desc').textContent = data.weather[0].description;
  const iconCode = data.weather[0].icon;
}
async function getForecast() {
  const url = `https://api.openweathermap.org/data/2.5/forecast`
    + `?lat=${LAT}&lon=${LON}&units=${UNITS}&appid=${WEATHER_API_KEY}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Forecast API error: ${response.status}`);
    }

    const data = await response.json();
    displayForecast(data.list);

  } catch (error) {
    console.error('Failed to fetch forecast:', error);
  }
}
function displayForecast(forecastList) {
  const today = new Date().toISOString().split('T')[0];
  const seenDays = new Set();
  let dayIndex = 0;

  for (const item of forecastList) {
    const date = item.dt_txt.split(' ')[0];
    const time = item.dt_txt.split(' ')[1];
    if (date === today) continue;
    if (time === '12:00:00' && !seenDays.has(date)) {
      seenDays.add(date);

      const temp = Math.round(item.main.temp);
      const label = formatDayLabel(date);
      const dayEl = document.getElementById(`forecast-${dayIndex}`);
      if (dayEl) {
        dayEl.querySelector('.forecast-label').textContent = label;
        dayEl.querySelector('.forecast-temp').textContent = `${temp} °C`;
      }

      dayIndex++;
      if (dayIndex >= 3) break;
    }
  }
}
function formatDayLabel(dateStr) {
  const date = new Date(dateStr + 'T12:00:00');
  return date.toLocaleDateString('en-US', { weekday: 'short' });
}
const MEMBERS_URL = 'data/members.json';

async function loadSpotlights() {
  try {
    const response = await fetch(MEMBERS_URL);

    if (!response.ok) {
      throw new Error(`Could not load members.json: ${response.status}`);
    }

    const members = await response.json();
    displaySpotlights(members);

  } catch (error) {
    console.error('Failed to load spotlights:', error);
    document.getElementById('spotlight-cards').innerHTML =
      '<p style="color:#555">Spotlight members unavailable right now.</p>';
  }
}
function displaySpotlights(members) {
  const eligible = members.filter(m => m.membershipLevel >= 2);
  const shuffled = shuffleArray(eligible);
  const count = Math.random() < 0.5 ? 2 : 3;
  const chosen = shuffled.slice(0, count);

  const container = document.getElementById('spotlight-cards');
  chosen.forEach(member => {
    const card = createSpotlightCard(member);
    container.appendChild(card);
  });
}

function createSpotlightCard(member) {
  const card = document.createElement('article');
  card.classList.add('spotlight-card');

  const name = document.createElement('h3');
  name.textContent = member.name;


  const address = document.createElement('p');
  address.textContent = `📍 ${member.address}`;

  const phone = document.createElement('p');
  phone.textContent = `📞 ${member.phone}`;

  const website = document.createElement('a');
  website.href = member.website;
  website.textContent = member.website;
  website.target = '_blank';
  website.rel = 'noopener';

  const badge = document.createElement('span');
  badge.classList.add('spotlight-badge');

  if (member.membershipLevel === 3) {
    badge.textContent = '🏆 Gold Member';
    badge.classList.add('badge-gold');
  } else {
    badge.textContent = '🥈 Silver Member';
    badge.classList.add('badge-silver');
  }


  const img = document.createElement('img');
  img.src = `images/${member.image}`;
  img.alt = `Logo of ${member.name}`;
  img.loading = 'lazy';
  img.width = 340;
  img.height = 140;
  card.appendChild(name);
  card.appendChild(address);
  card.appendChild(phone);
  card.appendChild(website);
  card.appendChild(badge);
  card.appendChild(img);
  return card;
}
function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

const hamburger = document.getElementById('hamburger');
const primaryNav = document.getElementById('primary-nav');

if (hamburger && primaryNav) {
  hamburger.addEventListener('click', () => {
    primaryNav.classList.toggle('open');
    const isOpen = primaryNav.classList.contains('open');
    hamburger.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
  });
}
getCurrentWeather();
getForecast();
loadSpotlights();
