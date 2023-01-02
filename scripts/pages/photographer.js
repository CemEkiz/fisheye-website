//Mettre le code JavaScript lié à la page photographer.html
let params = new URL(document.location).searchParams;
let id = +params.get('id');
// console.log(id);

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

  // console.log(photographerDatas[0]);
  // console.log(photographerDatas[0].name);
  // console.log(photographerDatas[0].country);

  // TODO: Afficher l'UI ici
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

async function getPhotographerMedias() {
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

  // console.log(photographerMedias);
  // console.log(photographerMedias[0]);
  // console.log(photographerMedias[0].image);
  // console.log(photographerMedias[0].date);
}

getPhotographerMedias();

// TODO: Créer une fonction displayData (cf. index.js)

// TODO: Créer une fonction init (cf. index.js)
