
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


function registerUser() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    fetch('http://localhost:3001/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
    .then(response => response.json())
    .then(data => {
      console.log(data.message);
      // Faça o que desejar com a resposta, como redirecionar ou exibir uma mensagem.
    })
    .catch(error => console.error('Erro ao registrar usuário:', error));
  };
  


// Função para registrar um usuário
const registrarUsuario = async (usuario) => {
  try {
    // Faça a requisição para o endpoint de registro no backend
    const resposta = await fetch('http://localhost:3001/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(usuario),
    });

    // Verifique se a requisição foi bem-sucedida
    if (resposta.ok) {
      const data = await resposta.json();
      console.log(data.message);
      // Faça o que desejar com a resposta, como redirecionar ou exibir uma mensagem.
    } else {
      console.error('Erro ao registrar usuário:', resposta.statusText);
      // Trate os erros, se houver
    }
  } catch (erro) {
    console.error('Erro ao registrar usuário:', erro);
  }
};

// Exemplo de uso da função de registro
const usuarioParaRegistrar = {
  email: 'exemplo@email.com',
  password: 'senha123',
};

registrarUsuario(usuarioParaRegistrar);
