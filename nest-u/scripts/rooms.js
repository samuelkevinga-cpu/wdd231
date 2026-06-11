// rooms.js — loads room data from rooms.json and builds the room cards
// Used on index.html (featured rooms) and rooms.html (full list, filters, modal)

import { getItem, saveItem } from "./storage.js";

const roomsList = document.querySelector("#rooms-list");
const featuredRooms = document.querySelector("#featured-rooms");
const roomCount = document.querySelector("#room-count");
const filterButtons = document.querySelectorAll(".filter-button");
const modal = document.querySelector("#room-modal");
const modalBody = document.querySelector("#modal-body");
const closeModalButton = document.querySelector("#close-modal");

let allRooms = [];

//fetch room data from the local JSON file
async function getRooms() {
  try {
    const response = await fetch("data/rooms.json");

    if (!response.ok) {
      throw new Error("Room data could not be loaded.");
    }

    allRooms = await response.json();

    if (featuredRooms) {
      displayFeaturedRooms(allRooms);
    }

    if (roomsList) {
      const savedFilter = getItem("preferredFilter", "all");
      updateActiveFilter(savedFilter);
      displayRooms(getFilteredRooms(savedFilter));
    }
  } catch (error) {
    const message = `<p class="error-message">Sorry, room information is unavailable right now.</p>`;

    if (featuredRooms) {
      featuredRooms.innerHTML = message;
    }

    if (roomsList) {
      roomsList.innerHTML = message;
    }
  }
}

//one template literal = one room card
function roomCardTemplate(room) {
  return `
    <article class="room-card" tabindex="0" data-room-id="${room.id}">
      <img src="${room.image}" alt="${room.alt}" loading="lazy">
      <div>
        <h3>${room.name}</h3>
        <p class="room-price">$${room.price} / month</p>
      </div>
      <div class="room-meta">
        <span class="pill">${room.type}</span>
        <span class="pill blue">${room.capacity} student${room.capacity > 1 ? "s" : ""}</span>
        <span class="pill">${room.availability}</span>
      </div>
      <p>${room.amenities.slice(0, 3).join(", ")}</p>
    </article>
  `;
}

// Home page: show only rooms marked as featured
function displayFeaturedRooms(rooms) {
  featuredRooms.innerHTML = rooms
    .filter((room) => room.featured)
    .slice(0, 3)
    .map(roomCardTemplate)
    .join("");

  addRoomCardListeners(featuredRooms);
}

// Rooms page: show the filtered list and update the count
function displayRooms(rooms) {
  roomsList.innerHTML = rooms.map(roomCardTemplate).join("");

  if (roomCount) {
    roomCount.textContent = `${rooms.length} room option${rooms.length === 1 ? "" : "s"} shown`;
  }

  addRoomCardListeners(roomsList);
}

// filter() and sort() change which rooms appear when a filter button is clicked
function getFilteredRooms(filterValue) {
  let rooms = [...allRooms];

  if (filterValue === "shared") {
    rooms = rooms.filter((room) => room.type === "Shared Room");
  }

  if (filterValue === "private") {
    rooms = rooms.filter((room) => room.type === "Private Room");
  }

  if (filterValue === "lowest") {
    rooms.sort((a, b) => a.price - b.price);
  }

  if (filterValue === "highest") {
    rooms.sort((a, b) => b.price - a.price);
  }

  return rooms;
}

function updateActiveFilter(filterValue) {
  filterButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.filter === filterValue);
  });
}

// Save the user's filter choice in localStorage
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filterValue = button.dataset.filter;
    saveItem("preferredFilter", filterValue);
    updateActiveFilter(filterValue);
    displayRooms(getFilteredRooms(filterValue));
  });
});

// Click or press Enter/Space on a card to open the modal
function addRoomCardListeners(container) {
  container.querySelectorAll(".room-card").forEach((card) => {
    card.addEventListener("click", () => openRoomModal(card.dataset.roomId));
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openRoomModal(card.dataset.roomId);
      }
    });
  });
}

// Modal: show full room details when a card is clicked
function openRoomModal(roomId) {
  const room = allRooms.find((item) => item.id === roomId);

  if (!room || !modal || !modalBody) {
    return;
  }

  saveItem("lastViewedRoom", room.name);

  modalBody.innerHTML = `
    <img src="${room.image}" alt="${room.alt}">
    <h2 id="modal-title">${room.name}</h2>
    <p class="room-price">$${room.price} / month</p>
    <div class="room-meta">
      <span class="pill">${room.type}</span>
      <span class="pill blue">Capacity: ${room.capacity}</span>
      <span class="pill">${room.availability}</span>
    </div>
    <p>${room.description}</p>
    <h3>Amenities</h3>
    <ul>
      ${room.amenities.map((amenity) => `<li>${amenity}</li>`).join("")}
    </ul>
    <a class="button" href="visit-book.html">Book This Room</a>
  `;

  modal.hidden = false;
  closeModalButton.focus();
}

function closeRoomModal() {
  if (modal) {
    modal.hidden = true;
  }
}

if (closeModalButton) {
  closeModalButton.addEventListener("click", closeRoomModal);
}

if (modal) {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeRoomModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) {
      closeRoomModal();
    }
  });
}

getRooms();
