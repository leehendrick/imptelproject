
let currentIndex = 0;
  
function showSlide(index) {
  const slides = document.querySelectorAll('.slide');
  slides.forEach(slide => slide.classList.remove('show', 'next', 'prev'));

  if (index < 0) {
    currentIndex = slides.length - 1;
  } else if (index >= slides.length) {
    currentIndex = 0;
  } else {
    currentIndex = index;
  }

  slides[currentIndex].classList.add('show');
  slides[(currentIndex + 1) % slides.length].classList.add('next');
  slides[(currentIndex - 1 + slides.length) % slides.length].classList.add('prev');

  updateIndicators();
}

function nextSlide() {
  showSlide(currentIndex + 1);
}

function prevSlide() {
  showSlide(currentIndex - 1);
}

function createIndicators() {
    const slides = document.querySelectorAll('.slide');
    const indicatorsContainer = document.querySelector('.indicators');

    slides.forEach((_, index) => {
      const indicator = document.createElement('div');
      indicator.classList.add('indicator');
      indicator.addEventListener('click', () => showSlide(index));
      indicatorsContainer.appendChild(indicator);
    });

    updateIndicators();
  }

  function updateIndicators() {
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
      if (index === currentIndex) {
        indicator.classList.add('active');
      } else {
        indicator.classList.remove('active');
      }
    });
  }

// Show the first slide on page load
document.addEventListener('DOMContentLoaded', () => {
    showSlide(currentIndex);
    createIndicators();
})

  // Adiciona transição automática a cada 5 segundos
  setInterval(() => {
    nextSlide();
  }, 5000);


  function toggleNavbar(collapseID){
      document.getElementById(collapseID).className = '';
      document.getElementById(collapseID).classList.toggle("lg:hidden");
  }

  function toggleNav(collapseID){
    document.getElementById(collapseID).className = '';
    document.getElementById(collapseID).classList.toggle("hidden");
}

