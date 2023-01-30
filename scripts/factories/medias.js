// TODO: Créer une fonction factory mediasFactory (cf. photographer.js)
// Vérifier si chaque média est img ou video et créer balise img ou video (hasProperty)
// Pour le tri, faut-il utiliser 'option' ou 'checkbox' en input ? Et voir comment changer l'apparence de ces inputs avec le CSS
// Aucun des 2, il vaut mieux faire un input custom (avec div, DOM manip etc)

function mediasFactory(data) {
  const { id, photographerId, title, image, video, likes, date, price } = data;

  const imgSrc = `assets/medias/${image}`;
  const videoSrc = `/assets/medias/${video}`;

  function getMediaCardDOM() {
    const card = document.createElement('div');
    card.classList.add('medias__card');

    const $mediasCardTop = document.createElement('div');
    $mediasCardTop.classList.add('medias__card__top');
    const $mediasCardBottom = document.createElement('div');
    $mediasCardBottom.classList.add('medias__card__bottom');

    const $image = document.createElement('img');
    $image.setAttribute('src', `${imgSrc}`);
    $image.setAttribute('alt', `${title}`);

    if (data.hasOwnProperty('image')) {
      $mediasCardTop.appendChild($image);
      card.appendChild($mediasCardTop);
    }

    const $video = document.createElement('video');
    $video.setAttribute('controls', '');
    const $source = document.createElement('source');
    $source.setAttribute('src', videoSrc);
    $source.setAttribute('type', 'video/mp4');

    if (data.hasOwnProperty('video')) {
      $video.appendChild($source);
      $mediasCardTop.appendChild($video);
      card.appendChild($mediasCardTop);
    }

    const $title = document.createElement('h2');
    $title.textContent = `${title}`;
    $mediasCardBottom.appendChild($title);

    const $likes = document.createElement('span');
    $likes.textContent = `${likes}`;
    const $heartIcon = document.createElement('img');
    $heartIcon.setAttribute('src', 'assets/icons/heart.svg');
    $likes.appendChild($heartIcon);
    $mediasCardBottom.appendChild($likes);

    card.appendChild($mediasCardBottom);

    return card;
  }

  return { getMediaCardDOM };
}
