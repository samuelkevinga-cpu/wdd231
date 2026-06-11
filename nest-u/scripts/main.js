// Handles the mobile menu, current year in the footer, and active nav link (wayfinding)

const menuButton = document.querySelector(".menu-button");
const primaryNav = document.querySelector(".primary-nav");
const year = document.querySelector("#year");
const currentPage = document.body.dataset.page;

// Show the current year in the footer
if (year) {
  year.textContent = new Date().getFullYear();
}

function closeMenu() {
  primaryNav.classList.remove("open");
  menuButton.classList.remove("open");
  document.body.classList.remove("menu-open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open navigation menu");

  if (navOverlay) {
    navOverlay.hidden = true;
  }
}

function openMenu() {
  primaryNav.classList.add("open");
  menuButton.classList.add("open");
  document.body.classList.add("menu-open");
  menuButton.setAttribute("aria-expanded", "true");
  menuButton.setAttribute("aria-label", "Close navigation menu");

  if (navOverlay) {
    navOverlay.hidden = false;
  }
}

let navOverlay = document.querySelector(".nav-overlay");

// Dark overlay behind the left drawer on small screens
if (!navOverlay && menuButton && primaryNav) {
  navOverlay = document.createElement("button");
  navOverlay.className = "nav-overlay";
  navOverlay.type = "button";
  navOverlay.hidden = true;
  navOverlay.setAttribute("aria-label", "Close navigation menu");
  document.body.appendChild(navOverlay);
}

// Hamburger opens the drawer; the icon turns into an X when open
if (menuButton && primaryNav) {
  menuButton.addEventListener("click", () => {
    if (primaryNav.classList.contains("open")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  if (navOverlay) {
    navOverlay.addEventListener("click", closeMenu);
  }

  primaryNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth < 850) {
        closeMenu();
      }
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && primaryNav.classList.contains("open")) {
      closeMenu();
    }
  });
}

// Wayfinding: highlight the link for the page the user is on
document.querySelectorAll("[data-nav]").forEach((link) => {
  if (link.dataset.nav === currentPage) {
    link.classList.add("active");
    link.setAttribute("aria-current", "page");
  }
});
