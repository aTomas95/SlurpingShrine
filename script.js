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

document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.hamburger');
  if (navbar && hamburger) {
    hamburger.addEventListener('click', () => {
      navbar.classList.toggle('show');
    });
  }

  if (document.querySelector('.mySlides')) {
    initializeSlideshow();
  }

  if (document.querySelector('.menu-items')) {
    initializeMenu();
  }
});