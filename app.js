// ===================== Navegación entre secciones =====================
const links = document.querySelectorAll(".navbar a[data-section]");
const sections = document.querySelectorAll("section");

links.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const sectionId = link.dataset.section;

    // Quita clase activa
    links.forEach(l => l.classList.remove("active"));
    sections.forEach(sec => sec.classList.remove("active"));

    // Activa enlace y sección
    link.classList.add("active");
    const target = document.getElementById(sectionId);
    if (target) target.classList.add("active");
  });
});

// ===================== Formulario de cita =====================
const formCita = document.getElementById("formCita");
const msgCita = document.getElementById("msgCita");

if (formCita) {
  formCita.addEventListener("submit", e => {
    e.preventDefault();
    msgCita.textContent = "✅ Tu cita ha sido registrada (simulado).";
    formCita.reset();
  });
}

// ===================== Carrusel automático =====================
const slider = document.querySelector('.carousel-slider');
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
let currentSlide = 0;

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  slider.style.transform = `translateX(${-currentSlide * 100}%)`;
}
setInterval(nextSlide, 3000);

// ===================== Carrusel con puntos y descripciones =====================
document.addEventListener('DOMContentLoaded', () => {
  const dotsContainer = document.querySelector('.carousel-dots-container');
  const descriptionElement = document.getElementById('carousel-description');
  let currentIndex = 0;

  const descriptions = [
    "Servicio de peluquería y baño para mascotas. ¡Tu perro o gato saldrá luciendo espectacular!",
    "Consulta veterinaria general para diagnósticos y chequeos. Mantén a tu mascota sana y feliz.",
    "Vacunación y desparasitación para cachorros y adultos. Previene enfermedades comunes.",
    "Cuidado dental y limpieza bucal. Una sonrisa sana es clave para la salud de tu mascota.",
    "Cirugías menores y esterilizaciones. Contamos con equipo de última generación.",
    "Nutrición y dietas especializadas. Te ayudamos a elegir el mejor alimento para tu animal.",
    "Servicio de urgencias 24 horas. Estamos listos para atender cualquier emergencia de tu mascota.",
    "Venta de accesorios y productos para mascotas. Todo lo que necesitas en un solo lugar.",
    "Adopción de mascotas. Dale un hogar a un animal que lo necesita.",
    "Hotel canino y felino. Deja a tu mascota en buenas manos mientras viajas."
  ];

  slides.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    dot.addEventListener('click', () => moveToSlide(index));
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll('.dot');

  function updateCarousel() {
    slider.style.transform = `translateX(${-currentIndex * 100}%)`;
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentIndex].classList.add('active');
    descriptionElement.textContent = descriptions[currentIndex];
  }

  function moveToSlide(index) {
    currentIndex = index;
    updateCarousel();
  }

  updateCarousel();
});

// ===================== Botones de catálogo (demo) =====================
document.querySelectorAll('.btn-comprar, .btn-promo').forEach(btn => {
  btn.addEventListener('click', () => alert('Gracias por tu interés, pronto te contactaremos.'));
});

// ===================== Búsqueda y filtrado de catálogos =====================
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const searchBtn   = document.getElementById('searchBtn');
  const resultsBox  = document.getElementById('searchResults');

  // Tarjetas a filtrar
  const cardSelector = '.catalog-card, .promo-card, .service-card, .tip-card';

  function filterCards() {
    const term = searchInput.value.toLowerCase().trim();

    // Filtrar tarjetas
    document.querySelectorAll(cardSelector).forEach(card => {
      const text = card.innerText.toLowerCase();
      card.style.display = text.includes(term) ? '' : 'none';
    });

    // Ocultar secciones vacías
    sections.forEach(section => {
      const visible = Array.from(section.querySelectorAll(cardSelector))
                           .some(c => c.style.display !== 'none');
      section.style.display = visible ? '' : 'none';
    });

    // Resultados rápidos (sugerencias)
    if (resultsBox) {
      resultsBox.innerHTML = '';
      if (term) {
        document.querySelectorAll(cardSelector).forEach(card => {
          if (card.innerText.toLowerCase().includes(term)) {
            const p = document.createElement('p');
            p.textContent = card.innerText.trim().slice(0, 60);
            p.addEventListener('click', () => {
              searchInput.value = p.textContent;
              filterCards();
              resultsBox.style.display = 'none';
            });
            resultsBox.appendChild(p);
          }
        });
        resultsBox.style.display = resultsBox.children.length ? 'block' : 'none';
      } else {
        resultsBox.style.display = 'none';
      }
    }
  }

  if (searchBtn) searchBtn.addEventListener('click', filterCards);
  searchInput.addEventListener('input', filterCards);
});

// JavaScript para controlar la apertura y cierre de las secciones del menú
document.addEventListener('DOMContentLoaded', function() {
  // Selección de los elementos de menú
  const eventsToggle = document.getElementById('events-toggle');
  const newsToggle = document.getElementById('news-toggle');
  const callToggle = document.getElementById('call-toggle');
  const dataToggle = document.getElementById('data-toggle');

  // Selección de los contenidos que serán ocultados o mostrados
  const eventsContent = document.getElementById('events-content');
  const newsContent = document.getElementById('news-content');
  const callContent = document.getElementById('call-content');
  const dataContent = document.getElementById('data-content');

  // Función para alternar la visibilidad de un contenido
  function toggleContent(content) {
    // Si el contenido está visible, lo ocultamos
    if (content.classList.contains('open')) {
      content.classList.remove('open');
    } else {
      // Si el contenido está oculto, lo mostramos
      content.classList.add('open');
    }
  }

  // Asignar eventos de clic a cada item de menú
  eventsToggle.addEventListener('click', function() {
    toggleContent(eventsContent);
  });

  newsToggle.addEventListener('click', function() {
    toggleContent(newsContent);
  });

  callToggle.addEventListener('click', function() {
    toggleContent(callContent);
  });

  dataToggle.addEventListener('click', function() {
    toggleContent(dataContent);
  });
});

function searchProducts() {
  // Obtiene el texto ingresado en el buscador
  const query = document.getElementById('product-search').value.toLowerCase();

  // Obtiene todas las tarjetas de producto
  const products = document.querySelectorAll('.catalog-card');

  // Filtra las tarjetas según la búsqueda
  products.forEach(product => {
    const productName = product.getAttribute('data-name').toLowerCase();
    const productDescription = product.getAttribute('data-description').toLowerCase();

    // Si el nombre o la descripción contiene el texto buscado, muestra el producto, de lo contrario, lo oculta
    if (productName.includes(query) || productDescription.includes(query)) {
      product.style.display = 'block';
    } else {
      product.style.display = 'none';
    }
  });
}

function searchPromotions() {
  // Obtiene el texto ingresado en el buscador
  const query = document.getElementById('promo-search').value.toLowerCase();

  // Obtiene todas las tarjetas de promoción
  const promotions = document.querySelectorAll('.promo-card');

  // Filtra las promociones según la búsqueda
  promotions.forEach(promotion => {
    const promoName = promotion.getAttribute('data-name').toLowerCase();
    const promoDescription = promotion.getAttribute('data-description').toLowerCase();

    // Si el nombre o la descripción contiene el texto buscado, muestra la promoción, de lo contrario, la oculta
    if (promoName.includes(query) || promoDescription.includes(query)) {
      promotion.style.display = 'block';
    } else {
      promotion.style.display = 'none';
    }
  });
}

const chatBtn = document.getElementById("chat-btn");
const chatBox = document.getElementById("chat-box");
const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const chatMessages = document.getElementById("chat-messages");

// Mostrar/ocultar chat
chatBtn.addEventListener("click", () => {
  chatBox.style.display = chatBox.style.display === "none" ? "flex" : "none";
});

// Enviar mensaje
sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", function(e) {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const message = userInput.value.trim();
  if (message === "") return;

  addMessage(message, "user");
  userInput.value = "";

  setTimeout(() => {
    botResponse(message);
  }, 600);
}

function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.classList.add("message", sender);
  msg.innerText = text;
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function botResponse(userMsg) {
  let response = "Lo siento, no entendí tu consulta.";
  
  // Respuestas simples (personaliza aquí)
  if (userMsg.toLowerCase().includes("hola")) {
    response = "¡Hola! Soy tu asesora virtual. ¿En qué puedo ayudarte?";
  } else if (userMsg.toLowerCase().includes("precio")) {
    response = "Nuestros precios dependen del producto. ¿Quieres que te muestre la lista?";
  } else if (userMsg.toLowerCase().includes("contacto")) {
    response = "Puedes contactarnos al WhatsApp: +503 0000-0000 📲";
  }

  addMessage(response, "bot");
}

const carrusel = document.querySelector(".carrusel-contenedor");
const prevBtn = document.querySelector(".carrusel-btn.prev");
const nextBtn = document.querySelector(".carrusel-btn.next");

const scrollStep = 170; // ancho de cada aliado + espacio

nextBtn.addEventListener("click", () => {
  carrusel.scrollBy({ left: scrollStep, behavior: "smooth" });
});

prevBtn.addEventListener("click", () => {
  carrusel.scrollBy({ left: -scrollStep, behavior: "smooth" });
});