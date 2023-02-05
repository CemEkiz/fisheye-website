/* -------------- PHOTOGRAPHER INFOS SECTION -------------- */

// Get the id of the photographer from the URL
let params = new URL(document.location).searchParams;
let id = +params.get('id');

async function createPhotographerSection() {
  // Get the photographers datas
  const photographers = await fetch('data/photographers.json')
    .then(response => {
      return response.json();
    })
    .then(data => {
      return data.photographers;
    });

  // Filter the photographer data corresponding to the page id
  const photographerDatas = photographers.filter(photographer => {
    return photographer.id === id;
  });

  // Display the photographer header in his own page
  const photographHeader = document.querySelector('.photograph-header');
  const $photographerInfos = document.createElement('div');
  $photographerInfos.classList.add('photograph-infos');
  const $name = document.createElement('h2');
  $name.textContent = `${photographerDatas[0].name}`;
  const $location = document.createElement('h3');
  $location.textContent = `${photographerDatas[0].city}, ${photographerDatas[0].country}`;
  const $bio = document.createElement('p');
  $bio.textContent = `${photographerDatas[0].tagline}`;
  $photographerInfos.appendChild($name);
  $photographerInfos.appendChild($location);
  $photographerInfos.appendChild($bio);
  const picture = `assets/photographers/${photographerDatas[0].portrait}`;
  const $avatar = document.createElement('img');
  $avatar.setAttribute('src', picture);
  $avatar.setAttribute('alt', 'Profile picture of the photographer');
  photographHeader.prepend($photographerInfos);
  photographHeader.appendChild($avatar);

  // Display the photographer price/likes bar
  const $infobar = document.createElement('div');
  $infobar.classList.add('infobar');
  const $likesContainer = document.createElement('div');
  $likesContainer.classList.add('infobar__likes-container');
  const $infobarLikes = document.createElement('span');
  $infobarLikes.classList.add('infobar__nb-likes');
  $infobarLikes.textContent = '1200';
  const $infobarIcon = document.createElement('img');
  $infobarIcon.setAttribute('src', 'assets/icons/heart-black.svg');
  $infobarIcon.classList.add('infobar__icon');
  $likesContainer.appendChild($infobarLikes);
  $likesContainer.appendChild($infobarIcon);
  const $infobarPrice = document.createElement('span');
  $infobarPrice.classList.add('infobar__price');
  $infobarPrice.textContent = `${photographerDatas[0].price}€ / jour`;
  $infobar.appendChild($likesContainer);
  $infobar.appendChild($infobarPrice);
  const $main = document.getElementById('main');
  $main.appendChild($infobar);
}

createPhotographerSection();

/* -------------- MEDIAS GRID -------------- */

// Get the medias datas
const getPhotographerMedias = async () => {
  const medias = await fetch('data/photographers.json')
    .then(response => {
      return response.json();
    })
    .then(data => {
      return data.media;
    });

  const photographerMedias = medias.filter(media => {
    return media.photographerId === id;
  });

  return photographerMedias;
};

// Display the medias in the UI
async function displayData(medias) {
  const mediasSection = document.querySelector('.medias');

  // TODO: Make the sort here : delete everything (in the media grid & in the carousel),
  // sort the medias datas then re-render

  medias.forEach(media => {
    const mediaModel = mediasFactory(media);
    const mediaCardDOM = mediaModel.getMediaCardDOM();
    mediasSection.appendChild(mediaCardDOM);
  });
}

/* -------------- SLIDER -------------- */

async function slideCarousel(slideNumber) {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');

  // Index of the current slide
  let curSlide = slideNumber;

  // Index of the last slide
  const maxSlide = slides.length;

  const slider = function () {
    // For translate the X position of the slide
    const goToSlide = function (slide) {
      slides.forEach((s, i) => {
        s.style.transform = `translateX(${100 * (i - slide)}%)`;
      });
    };
    goToSlide(slideNumber);

    // Move to next slide
    const nextSlide = function () {
      if (curSlide === maxSlide - 1) {
        curSlide = 0;
      } else {
        curSlide++;
      }
      goToSlide(curSlide);
    };

    // Move to previous slide
    const prevSlide = function () {
      if (curSlide === 0) {
        curSlide = maxSlide - 1;
      } else {
        curSlide--;
      }
      goToSlide(curSlide);
    };

    // Call nextSlide and prevSlide on button click
    btnRight.addEventListener('click', nextSlide);
    btnLeft.addEventListener('click', prevSlide);

    // Call nextSlide and prevSlide with Keyboard Shortcut
    document.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      }

      if (e.key === 'ArrowRight') {
        nextSlide();
      }
    });
  };
  slider();
}

/* -------------- LIGHTBOX -------------- */

async function createCarousel(medias) {
  const carousel = document.querySelector('.carousel');
  const slideWrapper = document.createElement('div');
  slideWrapper.classList.add('slide-wrapper');

  // Button Right
  const btnSliderRight = document.createElement('button');
  btnSliderRight.classList.add('slider__btn', 'slider__btn--right');
  const iconRight = document.createElement('img');
  iconRight.setAttribute('src', 'assets/icons/chevron-right.svg');
  iconRight.classList.add('carousel-icon');
  btnSliderRight.appendChild(iconRight);
  carousel.appendChild(btnSliderRight);

  // Button Left
  const btnSliderLeft = document.createElement('button');
  btnSliderLeft.classList.add('slider__btn', 'slider__btn--left');
  const iconLeft = document.createElement('img');
  iconLeft.setAttribute('src', 'assets/icons/chevron-left.svg');
  iconLeft.classList.add('carousel-icon');
  btnSliderLeft.appendChild(iconLeft);
  carousel.appendChild(btnSliderLeft);

  // Close Button
  const btnSliderClose = document.createElement('button');
  btnSliderClose.classList.add('slider__btn', 'slider__btn--close');
  const iconClose = document.createElement('img');
  iconClose.setAttribute('src', 'assets/icons/close-lightbox.svg');
  iconClose.classList.add('carousel-icon', 'carousel-icon--close');
  btnSliderClose.appendChild(iconClose);
  carousel.appendChild(btnSliderClose);

  // Close the lightbox when the close button is clicked
  const closeLightbox = () => {
    const lightbox = document.querySelector('.lightbox');
    lightbox.style.display = 'none';
  };
  btnSliderClose.addEventListener('click', closeLightbox);

  // Create a slide in the carousel for each media
  medias.forEach(media => {
    const carouselModel = carouselFactory(media);
    const carouselSlideDOM = carouselModel.getCarouselSlideDOM();
    slideWrapper.appendChild(carouselSlideDOM);
    carousel.appendChild(slideWrapper);
  });
}

/* -------------- LIKES BAR -------------- */

/* -------------- INIT -------------- */

const init = async () => {
  // Open the lightbox
  const openLightbox = () => {
    const lightbox = document.querySelector('.lightbox');
    lightbox.style.display = 'grid';
  };

  // Init the creation of the medias grid in the UI
  const medias = await getPhotographerMedias();
  displayData(medias);

  let totalLikes = 0;

  medias.forEach(photographerMedia => {
    totalLikes += photographerMedia.likes;
  });

  document.querySelector('.infobar__nb-likes').textContent = `${totalLikes}`;

  // If a media is clicked, then open the lightbox
  // and at the corresponding slide
  const mediaCards = document.querySelectorAll('.medias__card__top');
  mediaCards.forEach((mediaCard, i) => {
    mediaCard.addEventListener('click', () => {
      openLightbox();
      slideCarousel(i);
    });
  });

  // Init the creation of the carousel in the lightbox
  createCarousel(medias);
};
init();
