const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const yearSpan = document.getElementById('currentyear');
if (yearSpan) {
  yearSpan.textContent = currentYear;
}

//Last Modified Date
const lastModifiedEl = document.getElementById('lastModified');
if (lastModifiedEl) {
  lastModifiedEl.textContent = `Last Modification: ${document.lastModified}`;
}
