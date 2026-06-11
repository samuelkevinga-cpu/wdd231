// booking.js — form validation on visit-book.html and showing submitted data on thankyou.html

const bookingForm = document.querySelector("#booking-form");
const submittedInfo = document.querySelector("#submitted-info");

// Show an error message under a form field
function showError(id, message) {
  const errorElement = document.querySelector(`#${id}Error`);

  if (errorElement) {
    errorElement.textContent = message;
  }
}

// Clear all error messages before checking the form again
function clearErrors() {
  document.querySelectorAll(".error-message").forEach((message) => {
    message.textContent = "";
  });
}

// Move-in date must be after today
function isFutureDate(dateValue) {
  const selectedDate = new Date(`${dateValue}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return selectedDate > today;
}

// Basic check that the value looks like an email address
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
// Validate the form when the user tries to submit it; show error messages if something is wrong
if (bookingForm) {
  bookingForm.addEventListener("submit", (event) => {
    clearErrors();

    const fullName = document.querySelector("#fullName").value.trim();
    const studentEmail = document.querySelector("#studentEmail").value.trim();
    const phone = document.querySelector("#phone").value.trim();
    const roomType = document.querySelector("#roomType").value;
    const moveInDate = document.querySelector("#moveInDate").value;
    const months = document.querySelector("#months").value;
    const paymentMethod = document.querySelector("input[name='paymentMethod']:checked");
    let isValid = true;

    if (!fullName) {
      showError("fullName", "Please enter your full name.");
      isValid = false;
    }

    if (!studentEmail || !isValidEmail(studentEmail)) {
      showError("studentEmail", "Please enter a valid email address.");
      isValid = false;
    }

    if (!phone) {
      showError("phone", "Please enter your phone number.");
      isValid = false;
    }

    if (!roomType) {
      showError("roomType", "Please choose a room type.");
      isValid = false;
    }

    if (!moveInDate || !isFutureDate(moveInDate)) {
      showError("moveInDate", "Please choose a future move-in date.");
      isValid = false;
    }

    if (!months || Number(months) < 1) {
      showError("months", "Please enter at least one month.");
      isValid = false;
    }

    if (!paymentMethod) {
      showError("paymentMethod", "Please choose a payment method.");
      isValid = false;
    }

    if (!isValid) {
      event.preventDefault();
    }
  });
}

// thankyou.html: read form values from the URL and display them
if (submittedInfo) {
  const params = new URLSearchParams(window.location.search);
  const labels = {
    fullName: "Full Name",
    studentEmail: "Student Email",
    phone: "Phone Number",
    roomType: "Room Type",
    moveInDate: "Move-In Date",
    months: "Number of Months",
    paymentMethod: "Payment Method"
  };

  // map() builds one list item per form field
  const submittedItems = Object.keys(labels).map((key) => {
    const value = params.get(key) || "Not provided";
    return `<li><span>${labels[key]}</span>${value}</li>`;
  });

  submittedInfo.innerHTML = `
    <h2>Submitted Information</h2>
    <ul class="submitted-list">
      ${submittedItems.join("")}
    </ul>
  `;
}
