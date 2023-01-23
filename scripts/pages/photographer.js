// Mettre le code JavaScript lié à la page photographer.html
let params = new URL(document.location).searchParams;
let id = +params.get('id');

async function getPhotographerDatas() {
  const photographers = await fetch('data/photographers.json')
    .then(response => {
      return response.json();
    })
    .then(data => {
      return data.photographers;
    });

  const photographerDatas = photographers.filter(photographer => {
    return photographer.id === id;
  });

  // Display the photographer info in his own page
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
}

getPhotographerDatas();

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

async function displayData(medias) {
  const mediasSection = document.querySelector('.medias');

  // Tri

  medias.forEach(media => {
    const mediaModel = mediasFactory(media);
    const mediaCardDOM = mediaModel.getMediaCardDOM();
    mediasSection.appendChild(mediaCardDOM);
  });
}

async function slideCarousel() {
  // Logic
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');

  // To work with a better overview
  // document.querySelector('.slider').style.transform = 'scale(0.5)';
  // document.querySelector('.slider').style.overflow = 'visible';

  // For Changing Slide
  let curSlide = 0;

  // For stop at the last slide
  const maxSlide = slides.length;

  const slider = function () {
    // For translate the X position of the slide
    const goToSlide = function (slide) {
      slides.forEach((s, i) => {
        s.style.transform = `translateX(${100 * (i - slide)}%)`;
      });
    };

    // Init when the page is open or refresh
    const init = function () {
      // TranslateX chacune des slides : le 1er à 0%, le 2ème à 100%, le 3ème à 200%, etc. */
      goToSlide(0);
    };
    init();

    // Move to next side
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
        // curSlide = slides.length - 1;
        curSlide = maxSlide - 1;
      } else {
        curSlide--;
      }

      goToSlide(curSlide);
    };

    // Calling nextSlide and prevSlide on click
    btnRight.addEventListener('click', nextSlide);
    btnLeft.addEventListener('click', prevSlide);

    // Calling nextSlide and prevSlide with Keyboard Shortcut
    document.addEventListener('keydown', function (e) {
      // console.log(e);
      if (e.key === 'ArrowLeft') {
        prevSlide();
      }

      if (e.key === 'ArrowRight') {
        nextSlide();
      }

      // with Short-Circuiting
      // e.key === 'ArrowRight' && nextSlide();
    });
  };

  slider();
}

async function displayCarousel(medias) {
  const carousel = document.querySelector('.carousel');

  // Buttons
  const btnSliderRight = document.createElement('button');
  btnSliderRight.classList.add('slider__btn', 'slider__btn--right');
  const iconRight = document.createElement('i');
  iconRight.classList.add('uil', 'uil-angle-right-b', 'arrow-icon');
  btnSliderRight.appendChild(iconRight);
  carousel.appendChild(btnSliderRight);

  const btnSliderLeft = document.createElement('button');
  btnSliderLeft.classList.add('slider__btn', 'slider__btn--left');
  const iconLeft = document.createElement('i');
  iconLeft.classList.add('uil', 'uil-angle-left-b', 'arrow-icon');
  btnSliderLeft.appendChild(iconLeft);
  carousel.appendChild(btnSliderLeft);

  // TODO: Use this function with a close button
  const closeLightbox = () => {
    const lightbox = document.querySelector('.lightbox');
    lightbox.style.display = 'none';
  };

  medias.forEach(media => {
    const carouselModel = carouselFactory(media);
    const carouselSlideDOM = carouselModel.getCarouselSlideDOM();
    carousel.appendChild(carouselSlideDOM);
  });

  slideCarousel();
}

const openLightbox = () => {
  const lightbox = document.querySelector('.lightbox');
  lightbox.style.display = 'grid';
};

const init = async () => {
  const medias = await getPhotographerMedias();
  displayData(medias);

  const mediaCards = document.querySelectorAll('.medias__card__top');

  // TODO: Attribuer un nombre à chaque slide et faire en sorte que au clic
  // d'une slide, ce soit la slide cliqué qui soit affiché
  mediaCards.forEach(mediaCard => {
    mediaCard.addEventListener('click', openLightbox);
  });

  displayCarousel(medias);
};

init();
