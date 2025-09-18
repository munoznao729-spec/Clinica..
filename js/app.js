const links = document.querySelectorAll(".navbar a");
const sections = document.querySelectorAll("section");

links.forEach(link => {
  link.addEventListener("click", () => {
    const sectionId = link.dataset.section;

    sections.forEach(sec => sec.classList.remove("active"));
    links.forEach(l => l.classList.remove("active"));

    document.getElementById(sectionId).classList.add("active");
    link.classList.add("active");
  });
});

const formCita = document.getElementById("formCita");
const msgCita = document.getElementById("msgCita");

if(formCita){
  formCita.addEventListener("submit", e => {
    e.preventDefault();
    msgCita.textContent = "✅ Tu cita ha sido registrada (simulado).";
    formCita.reset();
  });
}

const slider = document.querySelector('.carousel-slider');
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
let currentSlide = 0;

function nextSlide() {
    currentSlide++;
    if (currentSlide >= totalSlides) {
        currentSlide = 0; 
    }
    const offset = -currentSlide * 100;
    slider.style.transform = `translateX(${offset}%)`;
}

setInterval(nextSlide, 3000);

document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.carousel-slider');
  const slides = document.querySelectorAll('.slide');
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

  slides.forEach((slide, index) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    dot.addEventListener('click', () => {
      moveToSlide(index);
    });
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

// Navegación entre secciones
document.querySelectorAll('.navbar a[data-section]').forEach(link => {
  link.addEventListener('click', () => {
    // Cambiar clase activa
    document.querySelectorAll('.navbar a').forEach(a => a.classList.remove('active'));
    link.classList.add('active');

    // Mostrar la sección seleccionada
    document.querySelectorAll('section').forEach(sec => sec.classList.remove('active'));
    const target = document.getElementById(link.dataset.section);
    if (target) target.classList.add('active');
  });
});

// Botones de catálogo (demo)
document.querySelectorAll('.btn-comprar, .btn-promo').forEach(btn => {
  btn.addEventListener('click', () => alert('Gracias por tu interés, pronto te contactaremos.'));
});

// Datos de ejemplo: puedes reemplazar con tus productos/promociones reales
const dataItems = [
  "Consulta general",
  "Vacunación",
  "Cirugías",
  "Estética canina",
  "Limpieza dental",
  "Promoción 2x1 en baños",
  "Descuento en alimento premium",
  "Collares personalizados",
  "Juguetes para gatos",
];

const searchInput = document.getElementById('searchInput');
const searchBtn   = document.getElementById('searchBtn');
const resultsBox  = document.getElementById('searchResults');

// Función para mostrar resultados
function searchItems() {
  const query = searchInput.value.toLowerCase().trim();
  resultsBox.innerHTML = ""; // Limpia resultados

  if (!query) {
    resultsBox.style.display = "none";
    return;
  }

  const filtered = dataItems.filter(item => item.toLowerCase().includes(query));

  if (filtered.length === 0) {
    resultsBox.innerHTML = "<p>No se encontraron resultados</p>";
  } else {
    filtered.forEach(match => {
      const p = document.createElement("p");
      p.textContent = match;
      p.onclick = () => {
        alert(`Seleccionaste: ${match}`);
        resultsBox.style.display = "none";
      };
      resultsBox.appendChild(p);
    });
  }
  resultsBox.style.display = "block";
}

// Eventos: click y Enter
searchBtn.addEventListener('click', searchItems);
searchInput.addEventListener('keyup', e => {
  if (e.key === "Enter") searchItems();
});

document.querySelectorAll('.navbar [data-section]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    // Oculta todo
    document.querySelectorAll('section').forEach(sec => sec.classList.remove('active'));
    // Quita la clase activa del menú
    document.querySelectorAll('.navbar a').forEach(a => a.classList.remove('active'));
    // Muestra la sección elegida
    const id = link.getAttribute('data-section');
    const target = document.getElementById(id);
    if (target) target.classList.add('active');
    // Marca el enlace activo
    link.classList.add('active');
  });
});

// Función para mostrar solo la sección elegida
function mostrarSeccion(id) {
  // Oculta todas las secciones
  document.querySelectorAll('section').forEach(sec => sec.classList.remove('active'));

  // Muestra únicamente la sección que coincide con el id
  const target = document.getElementById(id);
  if (target) target.classList.add('active');
}

// Asigna el evento a cada enlace del menú que tenga data-section
document.querySelectorAll('[data-section]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();                 // evita el salto de página
    const id = link.getAttribute('data-section');
    mostrarSeccion(id);                 // muestra solo esa sección
  });
});
searchInput.addEventListener('input', () => {
  const term = searchInput.value.toLowerCase();

  // Seleccionamos todas las secciones con "cards"
  const sections = document.querySelectorAll('.catalog-card, .promo-card, .service-card, .tip-card');

  sections.forEach(card => {
    const text = card.innerText.toLowerCase();
    card.style.display = text.includes(term) ? 'block' : 'none';
  });

  // Opcional: si quieres ocultar secciones completas si no tienen coincidencias
  const allSections = document.querySelectorAll('section');
  allSections.forEach(section => {
    const visibleCards = section.querySelectorAll('.catalog-card, .promo-card, .service-card, .tip-card');
    const anyVisible = Array.from(visibleCards).some(card => card.style.display !== 'none');
    section.style.display = anyVisible ? 'block' : 'none';
  });
});