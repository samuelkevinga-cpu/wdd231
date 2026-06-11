// storage.js — saves and reads data in the browser's localStorage
// Other files import these functions so filter choices are remembered between visits

const storagePrefix = "nestu-";

// Save a text value
export function saveItem(key, value) {
  localStorage.setItem(`${storagePrefix}${key}`, value);
}

// Read a saved value; returns fallbackValue if nothing was saved yet
export function getItem(key, fallbackValue = "") {
  return localStorage.getItem(`${storagePrefix}${key}`) || fallbackValue;
}
