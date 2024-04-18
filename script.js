// Slideshow function
function initializeSlideshow() {
  let slideIndex = 1;
  showSlides(slideIndex);

  function plusSlides(n) {
    showSlides(slideIndex += n);
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

// Function to initialize the menu items from JSON
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

// Function to setup the delivery form and load menu items into the dropdown
function setupDeliveryForm(menuItems) {
  const ramenDropdown = document.getElementById('ramenDropdown');
  ramenDropdown.innerHTML = '<option value="">Select a Ramen</option>';

  menuItems.forEach(item => {
      const option = document.createElement('option');
      option.value = item.id;
      option.textContent = `${item.name} - £${item.price}`;
      ramenDropdown.appendChild(option);
  });

  document.getElementById('addItem').addEventListener('click', addItemToOrder);
}

// Adds selected ramen and its quantity to the order summary
function addItemToOrder() {
  const ramenDropdown = document.getElementById('ramenDropdown');
  const quantityInput = document.getElementById('quantity');
  const selectedOption = ramenDropdown.options[ramenDropdown.selectedIndex];
  const orderSummary = document.getElementById('orderSummary');

  if (selectedOption.value && quantityInput.value > 0) {
      const orderItem = document.createElement('li');
      orderItem.textContent = `${selectedOption.text} x ${quantityInput.value}`;
      orderSummary.appendChild(orderItem);
      
      updateOrderSummary();
  }
}

// Order summary based on selected items and quantity
function updateOrderSummary() {
  let subtotal = 0;
  document.querySelectorAll('#orderSummary li').forEach(item => {
      const parts = item.textContent.split(' x ');
      const price = parseFloat(parts[0].split(' - £')[1]);
      const quantity = parseInt(parts[1]);
      subtotal += price * quantity;
  });

  // Calculations for tip and total
  const tipInput = document.getElementById('tip');
  const tipPercentage = parseFloat(tipInput.value) / 100 || 0;
  const tipAmount = subtotal * tipPercentage;
  const total = subtotal + tipAmount;

  // Updates the subtotal and total
  document.getElementById('subtotal').textContent = subtotal.toFixed(2);
  document.getElementById('total').textContent = total.toFixed(2);
}

// DOMContentLoaded event listener
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

  // Fetch and setup delivery form
  fetch('../menu-items.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => setupDeliveryForm(data))
    .catch(error => console.error('Error loading menu items:', error));

    const addItemButton = document.getElementById('addItem');
    const tipInput = document.getElementById('tip');
  
    if (addItemButton && tipInput) {
      addItemButton.addEventListener('click', addItemToOrder);
      tipInput.addEventListener('change', updateOrderSummary);
    }
});