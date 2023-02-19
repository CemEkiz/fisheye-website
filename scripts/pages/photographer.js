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

/* -------------- LIKE & LIGHTBOX -------------- */

// Increase the number of likes by 1 if the heart icon is clicked
const handleLike = async () => {
  const medias = await getPhotographerMedias();

  // Put the sum of likes from the data in the totalLikes variable
  let totalLikes = 0;
  medias.forEach(photographerMedia => {
    totalLikes += photographerMedia.likes;
  });

  // Display the total of likes in the UI from the totalLikes variable
  const infoBarLikes = document.querySelector('.infobar__nb-likes');
  infoBarLikes.textContent = `${totalLikes}`;

  const mediaLikesIcon = document.querySelectorAll('.likes__icon');
  mediaLikesIcon.forEach(mediaLikeIcon => {
    mediaLikeIcon.addEventListener('click', function () {
      mediaLikeIcon.previousElementSibling.textContent++;
      infoBarLikes.textContent++;
    });
  });
};

// If a media is clicked, then open the lightbox
// and at the corresponding slide
const handleLightbox = () => {
  // Open the lightbox
  const openLightbox = () => {
    const lightbox = document.querySelector('.lightbox');
    lightbox.style.display = 'grid';
  };

  const mediaCards = document.querySelectorAll('.medias__card__top');
  mediaCards.forEach((mediaCard, i) => {
    mediaCard.addEventListener('click', () => {
      openLightbox();
      slideCarousel(i);
    });
  });
};

/* -------------- SORT -------------- */
const createSortUI = () => {
  const mediasSection = document.querySelector('.medias');

  const selectUI = `
    <div class="dropdown-section">
      <div>Trier par</div>
      <div class="dropdown">
        <div class="dropdown__btn">
          <span class="dropdown__selected">Popularité</span>
          <span class="material-icons arrow-icon">expand_more</span>
        </div>

        <ul class="dropdown__options" >
          <li class="dropdown__option option--active"  data-popularite>
            <span class="dropdown__option-content">Popularité</span>
          </li>
          <li class="dropdown__option" data-titre>
            <span class="dropdown__option-content">Titre</span>
          </li>
          <li class="dropdown__option" data-date>
            <span class="dropdown__option-content">Date</span>
          </li>
        </ul>
      </div>
    </div>
  `;

  mediasSection.insertAdjacentHTML('beforebegin', selectUI);

  // Make the sort work
  const dropdown = document.querySelector('.dropdown');
  const dropdownBtn = dropdown.querySelector('.dropdown__btn');
  const options = dropdown.querySelectorAll('.dropdown__option');
  const selected = dropdown.querySelector('.dropdown__selected');
  const arrowIcon = document.querySelector('.arrow-icon');

  // Open & Close the Dropdown Menu
  dropdownBtn.addEventListener('click', () => {
    dropdown.classList.toggle('active');

    if (dropdown.classList.contains('active')) {
      dropdownBtn.style.borderRadius = '8px 8px 0 0';
      arrowIcon.style.transform = 'rotate(180deg)';
    } else {
      dropdownBtn.style.borderRadius = '8px';
      arrowIcon.style.transform = 'rotate(0deg)';
    }
  });

  options.forEach(option => {
    option.addEventListener('click', () => {
      // Clean all active state
      options.forEach(option => {
        option.classList.remove('option--active');
      });

      // Add active state to the clicked option
      option.classList.add('option--active');

      dropdownBtn.style.borderRadius = '8px';

      // Add the name of the clicked option to the selected option
      if (option.classList.contains('option--active')) {
        let selectedOption = option.querySelector(
          '.dropdown__option-content'
        ).innerText;
        selected.innerText = selectedOption;
      }

      // Close the Dropdown Menu
      dropdown.classList.remove('active');
    });
  });
};

createSortUI();

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
  const options = document.querySelectorAll('.dropdown__option');
  const carousel = document.querySelector('.carousel');

  // Sort and render the medias
  const renderMedia = () => {
    medias.forEach(media => {
      const mediaModel = mediasFactory(media);
      const mediaCardDOM = mediaModel.getMediaCardDOM();
      mediasSection.appendChild(mediaCardDOM);
    });
  };

  // Clear HTML
  const clearHTML = () => {
    mediasSection.innerHTML = '';
    carousel.innerHTML = '';
  };

  // Sort by popularity
  const sortPopularity = () => {
    medias.sort(function (a, b) {
      return b.likes - a.likes;
    });
  };

  // Sort by title
  const sortTitle = () => {
    medias.sort(function (a, b) {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.firstname) {
        return 1;
      }
    });
  };

  // Sort by date
  const sortDate = () => {
    medias.sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
    });
  };

  options.forEach(option => {
    option.addEventListener('click', () => {
      if (option.hasAttribute('data-titre')) {
        clearHTML();
        sortTitle();
      } else if (option.hasAttribute('data-popularite')) {
        clearHTML();
        sortPopularity();
      } else if (option.hasAttribute('data-date')) {
        clearHTML();
        sortDate();
      }
      // console.table(medias);
      renderMedia();
      createCarousel(medias);
      handleLightbox();
      handleLike(medias);
    });
  });

  // Render medias by default (popularity)
  medias.sort(function (a, b) {
    return b.likes - a.likes;
  });
  // console.table(medias);
  renderMedia();
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

/* -------------- INIT -------------- */

const init = async () => {
  // Init the creation of the medias grid in the UI
  const medias = await getPhotographerMedias();
  displayData(medias);

  // Init the creation of the carousel in the lightbox
  createCarousel(medias);

  handleLike();
  handleLightbox();
};
init();
