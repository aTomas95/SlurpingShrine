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

function toggleMenu() {
  const navbar = document.querySelector('.navbar');
  navbar.classList.toggle('show');
}

document.addEventListener('DOMContentLoaded', () => {
  fetch('menu-items.json')  // Make sure the path is correct
      .then(response => response.json())
      .then(menuItems => {
          const menuContainer = document.querySelector('.menu-items');
          menuItems.forEach(item => {
              menuContainer.innerHTML += `
                  <div class="menu-item">
                      <img src="${item.image}" alt="${item.name}" style="width: 100%;">
                      <h3>${item.name}</h3>
                      <p>${item.description}</p>
                      <p class="price">$${item.price}</p>
                  </div>
              `;
          });
      })
      .catch(error => console.error('Error loading menu items:', error));
});

const testItem = document.createElement('div');
testItem.textContent = 'This is a test item.';
menuContainer.appendChild(testItem);