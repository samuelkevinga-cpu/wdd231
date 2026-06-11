// weather.js — loads live weather for the Visit & Book page
// Uses the free Open-Meteo so an API key isn't required

const weatherStatus = document.querySelector("#weather-status");

// Numbers from the API are converted to readable weather names
const weatherCodes = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Light drizzle",
  61: "Light rain",
  63: "Rain",
  65: "Heavy rain",
  71: "Light snow",
  73: "Snow",
  75: "Heavy snow",
  95: "Thunderstorm"
};

async function loadWeather() {
  if (!weatherStatus) {
    return;
  }

  try {
    const weatherUrl = "https://api.open-meteo.com/v1/forecast?latitude=43.826&longitude=-111.789&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&temperature_unit=fahrenheit&wind_speed_unit=mph";
    const response = await fetch(weatherUrl);

    if (!response.ok) {
      throw new Error("Weather data could not be loaded.");
    }

    const data = await response.json();
    const current = data.current;
    const description = weatherCodes[current.weather_code] || "Current conditions";

    // Template literal builds the HTML that appears on the page
    weatherStatus.innerHTML = `
      <ul class="weather-list">
        <li><span>Temperature</span>${Math.round(current.temperature_2m)}&deg;F</li>
        <li><span>Description</span>${description}</li>
        <li><span>Humidity</span>${current.relative_humidity_2m}%</li>
        <li><span>Wind Speed</span>${Math.round(current.wind_speed_10m)} mph</li>
      </ul>
    `;
  } catch (error) {
    weatherStatus.innerHTML = `<p class="error-message">Weather information is unavailable right now.</p>`;
  }
}

loadWeather();
