

const navMenu = document.getElementById('nav-menu'),
navToggle = document.getElementById('nav-toggle'),
navClose = document.getElementById('nav-close')

/* ===== SHOW MENU ===== */
if (navToggle) {
navToggle.addEventListener('click', () => {
navMenu.classList.add('show-menu')
})
}

/* ===== HIDDEN MENU ===== */
if (navClose) {
navClose.addEventListener('click', () => {
navMenu.classList.remove('show-menu')
})
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () =>{
const navMenu = document.getElementById('nav-menu')
// When we click on each nav__link, we remove the show-menu class
navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))



let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
/*let thumbnail = document.getSelectorAll('thumbnail .item')*/
let thumbnail = document.querySelectorAll('.thumbnail .item');



let countItem = items.length;
let itemActive = 0;

next.onclick = function(){
itemActive = itemActive +1;
if(itemActive >= countItem){
  itemActive = 0;
}

showSlider();
}
/*prev click event*/

prev.onclick = function(){
itemActive = itemActive -1;
if (itemActive < 0){
  itemActive = countItem -1;
}

showSlider();
}


//auto run slider //

let refreshInterval = setInterval(() => {
next.click();
}, 3000);



function showSlider(){
let itemActiveOld = document.querySelector('.slider .list .item.active');
let thumbnailActiveOld = document.querySelector('.thumbnail .item.active');
itemActiveOld.classList.remove('active');
thumbnailActiveOld.classList.remove('active');



items[itemActive].classList.add('active');
thumbnail[itemActive].classList.add('active');

// clear auto time//

clearInterval(refreshInterval);
refreshInterval = setInterval(() => {
  next.click();
}, 5000);

}

// click thumbail//

thumbnail.forEach((thumb, index) => {
thumb.addEventListener('click', () => {
  itemActive = index;
  showSlider();
});
});

// scroll bar hidden//

const socialBar = document.querySelector('.social-bar');
const slider = document.querySelector('.slider');

window.addEventListener('scroll', () => {
const sliderBottom = slider.offsetTop + slider.offsetHeight;
const scrollPosition = window.scrollY + window.innerHeight / 2;

if (scrollPosition > sliderBottom) {
socialBar.classList.add('hidden');
} else {
socialBar.classList.remove('hidden');
}
});

/* ===== RESERVATION SECTION SCROLL ANIMATION ===== */
const reservationSection = document.querySelector('.reservation-section');
const formElements = document.querySelectorAll(
'.reservation-form .form-group, .reserve-btn'
);

if (reservationSection) {
const observer = new IntersectionObserver(
(entries) => {
entries.forEach((entry) => {
  if (entry.isIntersecting) {
    // показваме секцията
    reservationSection.classList.add('show');

    // динамика на полетата – излизат едно след друго
    formElements.forEach((el, index) => {
      el.style.transitionDelay = `${0.2 + index * 0.08}s`;
    });

    // спираме да наблюдаваме – да не се анимира всеки път
    observer.unobserve(reservationSection);
  }
});
},
{
threshold: 0.25, // когато ~25% от секцията е на екрана
}
);

observer.observe(reservationSection);
}
// ============ RESERVATION FORM SUCCESS MESSAGE ============

const reservationForm = document.querySelector('.reservation-form');
const successMessage = document.getElementById('reservationSuccess');

if (reservationForm) {
reservationForm.addEventListener('submit', function(e) {
e.preventDefault(); // спира презареждането на страницата

// Проверка дали формата е валидна
if (reservationForm.checkValidity()) {

// Скриване на формата
reservationForm.style.display = "none";

// Показване на съобщението
successMessage.style.display = "block";
} else {
reservationForm.reportValidity(); // показва стандартните браузърни грешки
}
});
}


// ================== SERVICES POPUP CAROUSEL ==================
const servicesData = {
pool: {
title: 'Безплатен частен паркинг',
text:
'На разположение на гостите е безплатен частен паркинг, разположен непосредствено до къщата. ' +
'Не се изисква предварителна резервация на място – просто пристигате и паркирате спокойно.\n\n' +
'Паркингът е удобен за семейства с деца, гости с повече багаж и хора, които пътуват с автомобил. ' +
'Локацията му осигурява бърз достъп до входа и допълнително спокойствие по време на престоя.',
images: []
},

bbq: {
title: 'Напълно оборудвана кухня',
text:
'Кухнята е напълно оборудвана и подходяща както за кратък, така и за по-дълъг престой. ' +
'На разположение са печка с фурна, котлони, микровълнова фурна, миялна машина, хладилник, ' +
'кафе машина, тостер и електрическа кана.\n\n' +
'Осигурени са всички необходими кухненски съдове и прибори, както и маса за хранене. ' +
'Кухнята е идеална за приготвяне на домашна закуска, обяд или вечеря в уютна обстановка.',
images: [
'images/kitchen-extras.webp',
'images/kitchen2.webp',
'images/kitchen.webp'
]
},

bikes: {
title: 'Комфортни бани',
text:

'Баните са модерно оборудвани и включват душ или вана, кърпи, чехли, сешоар и тоалетни принадлежности. ' +
'Всичко необходимо за пълноценен и спокоен престой е осигурено.',
images: [
'images/bathroom.webp',
'images/bathroom2.webp',
'images/bathroom3.jpeg'
]
},

horses: {
title: 'Всекидневна и кът за отдих',
text:
'Всекидневната предлага просторна и комфортна зона за почивка и събиране на семейството или приятели. ' +
'Оборудвана е с удобен диван, маса за хранене и плоскоекранен телевизор с кабелни канали.\n\n' +
'Това е идеалното място за спокойни вечери, гледане на телевизия или просто релакс след активен ден.',
images: [
'images/living-room.webp',
'images/table-photo.webp',
'images/table-with-mouse.webp'
]
},

wifi: {
title: 'Wi-Fi, климатизация и удобства',
text:
'В цялата къща е осигурен безплатен Wi-Fi, подходящ както за ежедневно ползване, така и за работа от разстояние. ' +
'Сигналът е стабилен и достъпен във всички помещения.\n\n' +
'За комфорт през всички сезони са осигурени климатизация и отопление. ' +
'Допълнителните удобства включват мрежи против комари, контакт до леглото, сушилка за дрехи и ютия.\n\n' +
'Имотът е подходящ за непушачи и гости, търсещи спокойна и уютна атмосфера.',
images: []
},

views: {
title: 'Тераса, барбекю и планински гледки',
text:
'На разположение е просторен двор с градина, външни мебели и кът за хранене на открито. ' +
'Гостите могат да използват барбекю и да се насладят на приятни моменти на чист въздух.\n\n' +
'Терасата и балконите предлагат красива гледка към планината и зеленината, ' +
'подходящи за сутрешно кафе или вечерна напитка в спокойна обстановка.',
images: [
'images/flowers.webp',
'images/horse-riding3.webp'
]
},

bedrooms2: {
title: '2 отделни спални',
text:
'Къщата разполага с две отделни спални, което осигурява повече лично пространство и комфорт за гостите. ' +
'Подходящо решение за семейства, приятели или двойки, които предпочитат самостоятелни помещения.\n\n' +
'Спалните са тихи и уютни, обзаведени с удобни легла и място за багаж, ' +
'осигурявайки спокойна и пълноценна почивка по време на престоя.',
images: [

'images/bedroom-photo.webp',
'images/bedroom-branding.webp',
'images/kingsize-bedroom.webp',
'images/kingsize-bedroom2.webp'
]
}
};


const serviceCards = document.querySelectorAll('.service-card');
const serviceModal = document.getElementById('serviceModal');
const serviceModalTitle = serviceModal?.querySelector('.service-modal__title');
const serviceModalText = serviceModal?.querySelector('.service-modal__text');
const serviceModalImg = serviceModal?.querySelector('.service-modal__image');

const serviceCarousel = serviceModal?.querySelector('.service-modal__carousel'); // ✅
const servicePrevBtn = document.getElementById('servicePrev');
const serviceNextBtn = document.getElementById('serviceNext');

const serviceModalClose = document.getElementById('serviceModalClose');
const serviceModalOverlay = serviceModal?.querySelector('.service-modal__overlay');

let currentServiceKey = null;
let currentServiceIndex = 0;

function updateServiceImage() {
if (!currentServiceKey) return;
const data = servicesData[currentServiceKey];
if (!data) return;

const imgs = data.images;
if (!imgs || !imgs.length) return;

serviceModalImg.src = imgs[currentServiceIndex];
serviceModalImg.alt = data.title;
}

function openServiceModal(key) {
const data = servicesData[key];
if (!data || !serviceModal) return;

currentServiceKey = key;
currentServiceIndex = 0;

serviceModalTitle.textContent = data.title;
serviceModalText.textContent = data.text;

const hasImages = Array.isArray(data.images) && data.images.length > 0;

// ✅ Ако няма снимки: скрий carousel (и няма да има < >)
if (serviceCarousel) {
serviceCarousel.style.display = hasImages ? '' : 'none';
}

// (по желание) чистим src, за да не стои стара снимка “на заден план”
if (!hasImages && serviceModalImg) {
serviceModalImg.removeAttribute('src');
serviceModalImg.alt = '';
}

if (hasImages) {
updateServiceImage();
}

serviceModal.classList.add('open');
}

function closeServiceModal() {
if (!serviceModal) return;
serviceModal.classList.remove('open');
currentServiceKey = null;
currentServiceIndex = 0;
}

serviceCards.forEach((card) => {
card.addEventListener('click', () => {
openServiceModal(card.dataset.service);
});
});

if (servicePrevBtn) {
servicePrevBtn.addEventListener('click', (e) => {
e.stopPropagation();
if (!currentServiceKey) return;

const imgs = servicesData[currentServiceKey].images || [];
if (!imgs.length) return;

currentServiceIndex = (currentServiceIndex - 1 + imgs.length) % imgs.length;
updateServiceImage();
});
}

if (serviceNextBtn) {
serviceNextBtn.addEventListener('click', (e) => {
e.stopPropagation();
if (!currentServiceKey) return;

const imgs = servicesData[currentServiceKey].images || [];
if (!imgs.length) return;

currentServiceIndex = (currentServiceIndex + 1) % imgs.length;
updateServiceImage();
});
}

serviceModalClose?.addEventListener('click', closeServiceModal);
serviceModalOverlay?.addEventListener('click', closeServiceModal);

document.addEventListener('keydown', (e) => {
if (e.key === 'Escape' && serviceModal?.classList.contains('open')) {
closeServiceModal();
}
});




// ================== PRICES SECTION SCROLL EFFECT ==================
const pricesSection = document.getElementById('prices');
const priceCards = document.querySelectorAll('.price-card');

if (pricesSection && priceCards.length) {
const pricesObserver = new IntersectionObserver(
(entries) => {
entries.forEach((entry) => {
  if (entry.isIntersecting) {
    // при скрол – светват картите
    priceCards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('is-visible');
      }, index * 120); // леко закъснение между тях
    });

    pricesObserver.unobserve(pricesSection); // само веднъж
  }
});
},
{
threshold: 0.25, // когато ~25% от секцията е влезнала
}
);

pricesObserver.observe(pricesSection);
}

// ================== GALLERY CAROUSEL & LIGHTBOX ==================
const galleryItems = document.querySelectorAll('.gallery__item');
const galleryPrev = document.getElementById('galleryPrev');
const galleryNext = document.getElementById('galleryNext');
const galleryDotsContainer = document.getElementById('galleryDots');

const lightbox = document.getElementById('galleryLightbox');
const lightboxImg = document.getElementById('galleryLightboxImg');
const lightboxCaption = document.getElementById('galleryLightboxCaption');
const lightboxClose = document.getElementById('galleryLightboxClose');
const lightboxOverlay = lightbox?.querySelector('.gallery-lightbox__overlay');

let galleryIndex = 0;

// създаваме точки според броя снимки
let galleryDots = [];
if (galleryItems.length) {
galleryItems.forEach((_, idx) => {
const dot = document.createElement('button');
dot.classList.add('gallery__dot');
if (idx === 0) dot.classList.add('active');
dot.dataset.index = idx;
galleryDotsContainer.appendChild(dot);
galleryDots.push(dot);
});
}

function updateGallery() {
galleryItems.forEach((item, idx) => {
item.classList.toggle('active', idx === galleryIndex);
});
galleryDots.forEach((dot, idx) => {
dot.classList.toggle('active', idx === galleryIndex);
});
}

function nextGallery() {
galleryIndex = (galleryIndex + 1) % galleryItems.length;
updateGallery();
}

function prevGallery() {
galleryIndex = (galleryIndex - 1 + galleryItems.length) % galleryItems.length;
updateGallery();
}

if (galleryNext) galleryNext.addEventListener('click', nextGallery);
if (galleryPrev) galleryPrev.addEventListener('click', prevGallery);

// клик по точките
galleryDots.forEach(dot => {
dot.addEventListener('click', () => {
galleryIndex = Number(dot.dataset.index);
updateGallery();
});
});

// AUTO run (по желание: ~5 секунди)
let galleryAuto = null;
if (galleryItems.length > 1) {
galleryAuto = setInterval(nextGallery, 5000);
}

function stopGalleryAuto() {
if (galleryAuto) {
clearInterval(galleryAuto);
galleryAuto = null;
}
}

if (galleryNext) galleryNext.addEventListener('click', stopGalleryAuto);
if (galleryPrev) galleryPrev.addEventListener('click', stopGalleryAuto);
galleryDots.forEach(dot => dot.addEventListener('click', stopGalleryAuto));

// ===== LIGHTBOX (уголемяване) =====
function openLightbox(imgEl) {
if (!lightbox) return;
lightboxImg.src = imgEl.src;
lightboxCaption.textContent = imgEl.alt || '';
lightbox.classList.add('open');
lightboxImg.classList.remove('zoomed');
}

function closeLightbox() {
if (!lightbox) return;
lightbox.classList.remove('open');
}

galleryItems.forEach(item => {
const img = item.querySelector('img');
if (!img) return;
img.addEventListener('click', () => openLightbox(img));
});

// затваряне
if (lightboxClose) {
lightboxClose.addEventListener('click', closeLightbox);
}
if (lightboxOverlay) {
lightboxOverlay.addEventListener('click', closeLightbox);
}

document.addEventListener('keydown', (e) => {
if (e.key === 'Escape' && lightbox?.classList.contains('open')) {
closeLightbox();
}
});

// zoom с клик върху голямата снимка
if (lightboxImg) {
lightboxImg.addEventListener('click', () => {
lightboxImg.classList.toggle('zoomed');
});
}

//PRICE CARD///


//footer button to top//



const scrollTopBtn = document.getElementById("scrollTopBtn");
if (scrollTopBtn) {
scrollTopBtn.addEventListener("click", () => {
window.scrollTo({ top: 0, behavior: "smooth" });
});
}



///////// CAROUSEL ABOUT SECTION ////////////

const aboutSlides = [
  {
    src: 'images/festivals1.webp',
    caption: 'Фестивал на овцевъдството – традиции и фолклор',
    link: '#festival'
  },
  {
    src: 'images/pametnik (1).webp',
    caption: 'Паметникът на Христо Ботев в Калофер.',
    link: '#botev'
  },
  {
    src: 'images/peak-botev.webp',
    caption: 'Връх Ботев – най-високият връх в Стара планина',
    link: '#botev'
  },
  {
    src: 'images/city-view.webp',
    caption: 'Градски разходки и планински гледки',
    link: '#kalofer'
  }
];

let aboutIndex = 0;

const aboutImg = document.querySelector('.about__car-img');
const aboutCaption = document.getElementById('aboutCarCaption');
const aboutMore = document.getElementById('aboutCarMore');

function updateAboutCarousel() {
  const slide = aboutSlides[aboutIndex];

  aboutImg.src = slide.src;
  aboutImg.alt = slide.caption;

  // 👇 надписът се сменя
  aboutCaption.textContent = slide.caption;

  // 👇 и линкът (ако искаш)
  aboutMore.href = slide.link;
}

document.querySelector('.about__car-btn--next')
  .addEventListener('click', () => {
    aboutIndex = (aboutIndex + 1) % aboutSlides.length;
    updateAboutCarousel();
  });

document.querySelector('.about__car-btn--prev')
  .addEventListener('click', () => {
    aboutIndex = (aboutIndex - 1 + aboutSlides.length) % aboutSlides.length;
    updateAboutCarousel();
  });

// първоначално зареждане
updateAboutCarousel();
