function initializeSlideshow() {
  let slideIndex = 1;
  showSlides(slideIndex);

  function plusSlides(n) {
    showSlides(slideIndex += n);
  }

  function currentSlide(n) {
    showSlides(slideIndex = n);
  }

  function showSlides(n) {
    let i;
    const slides = document.getElementsByClassName("mySlides");
    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
  }

  const nextButton = document.querySelector('.next');
  const prevButton = document.querySelector('.prev');
  if (nextButton && prevButton) {
    nextButton.addEventListener('click', () => plusSlides(1));
    prevButton.addEventListener('click', () => plusSlides(-1));
  }
}

function initializeMenu() {
  fetch('../menu-items.json')
    .then(response => response.json())
    .then(menuItems => {
        const menuContainer = document.querySelector('.menu-items');
        menuItems.forEach(item => {
            menuContainer.innerHTML += `
                <div class="menu-item">
                    <img src="${item.image}" alt="${item.name}" style="width: 100%;">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <p class="price">£${item.price}</p>
                </div>
            `;
        });
    })
    .catch(error => console.error('Error loading menu items:', error));
}

// Functions to handle form submissions for both booking and delivery forms
function handleBookingFormSubmission(event) {
  event.preventDefault();
  alert('Your table booking request has been submitted!');
}

function handleDeliveryFormSubmission(event) {
  event.preventDefault();
  alert('Your delivery order has been submitted!');
}

function setupDeliveryForm(menuItems) {
  const ramenSelect = document.getElementById('ramenSelect');
  ramenSelect.innerHTML = '<option value="">Select a Ramen</option>'; // Default option

  menuItems.forEach(item => {
      const option = document.createElement('option');
      option.value = item.id;
      option.textContent = `${item.name} - £${item.price}`;
      option.dataset.price = item.price; // Store price in data attribute for access later
      ramenSelect.appendChild(option);
  });

  document.getElementById('addItem').addEventListener('click', addItemToOrder); // Assuming you have an Add button with id="addItem"
}

// This function will handle adding selected ramen and its quantity to the order summary
function addItemToOrder() {
  const ramenSelect = document.getElementById('ramenSelect');
  const quantityInput = document.getElementById('ramenQuantity');
  const selectedOption = ramenSelect.options[ramenSelect.selectedIndex];
  const orderSummary = document.getElementById('orderSummary'); // Assuming an <ul> or <div> for order summary

  if (selectedOption.value && quantityInput.value > 0) {
      // Create a list item or div for the selected ramen and quantity
      const orderItem = document.createElement('li');
      orderItem.textContent = `${selectedOption.text} x ${quantityInput.value}`;
      orderSummary.appendChild(orderItem);

      updateOrderSummary();
  }
}

// Function to update the order summary based on the selection and quantity
function updateOrderSummary() {
  let subtotal = 0;
  document.querySelectorAll('#orderSummary li').forEach(item => {
      const [name, quantity] = item.textContent.split(' x ');
      const price = parseFloat(name.split(' - £')[1]);
      subtotal += price * parseInt(quantity, 10);
  });

  const deliveryCharge = 5; // Set your delivery charge here
  let tipPercentage = parseInt(document.getElementById('tipInput').value, 10) || 0; // Assuming an input for tips with id="tipInput"
  tipPercentage = tipPercentage / 100;

  const total = subtotal + (subtotal * tipPercentage) + deliveryCharge;
  document.getElementById('subtotal').textContent = `£${subtotal.toFixed(2)}`;
  document.getElementById('total').textContent = `£${total.toFixed(2)}`;
}

// Single DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.hamburger');
  if (navbar && hamburger) {
    hamburger.addEventListener('click', () => {
      navbar.classList.toggle('show');
    });
  }

  const slideshowContainer = document.querySelector('.mySlides');
  if (slideshowContainer) {
    initializeSlideshow();
  }

  const menuContainer = document.querySelector('.menu-items');
  if (menuContainer) {
    initializeMenu();
  }

  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', handleBookingFormSubmission);
  }

  const deliveryForm = document.getElementById('deliveryForm');
  if (deliveryForm) {
    deliveryForm.addEventListener('submit', handleDeliveryFormSubmission);
  }
  if (document.getElementById('deliveryForm')) {
    fetch('../menu-items.json')
      .then(response => response.json())
      .then(setupDeliveryForm)
      .catch(error => console.error('Error loading menu items:', error));
  }
});