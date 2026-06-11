// Handles the mobile menu, current year in the footer, and active nav link (wayfinding)

const menuButton = document.querySelector(".menu-button");
const primaryNav = document.querySelector(".primary-nav");
const year = document.querySelector("#year");
const currentPage = document.body.dataset.page;

// Show the current year in the footer
if (year) {
  year.textContent = new Date().getFullYear();
}

// Hamburger menu: click to show or hide navigation on small screens
if (menuButton && primaryNav) {
  menuButton.addEventListener("click", () => {
    const isOpen = primaryNav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", isOpen);
    menuButton.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  });
}

// Wayfinding: highlight the link for the page the user is on
document.querySelectorAll("[data-nav]").forEach((link) => {
  if (link.dataset.nav === currentPage) {
    link.classList.add("active");
    link.setAttribute("aria-current", "page");
  }
});
