// TODO: Créer une fonction factory mediasFactory (cf. photographer.js)
// Vérifier si chaque média est img ou video et créer balise img ou video (hasProperty)
// Pour le tri, faut-il utiliser 'option' ou 'checkbox' en input ? Et voir comment changer l'apparence de ces inputs avec le CSS
// Aucun des 2, il vaut mieux faire un input custom (avec div, DOM manip etc)

function mediasFactory(data) {
  const { id, photographerId, title, image, video, likes, date, price } = data;

  const imgSrc = `assets/medias/${image}`;
  const videoSrc = `assets/medias/${video}`;

  function getMediaCardDOM() {
    const article = document.createElement('article');

    if (data.hasOwnProperty('image')) {
      const $picture = document.createElement('picture');
      const $image = document.createElement('img');
      $image.setAttribute('src', imgSrc);
      $image.setAttribute('alt', `${title}`);
      $picture.appendChild($image);
      article.appendChild($picture);
    }

    if (data.hasOwnProperty('video')) {
      const $video = document.createElement('video');
      $video.setAttribute('controls', '');
      const $source = document.createElement('source');
      $source.setAttribute('src', videoSrc);
      $source.setAttribute('type', 'video/mp4');
      $video.appendChild($source);
      article.appendChild($video);
    }

    const $mediaInfos = document.createElement('div');
    $mediaInfos.classList.add('medias-infos');

    const $title = document.createElement('h2');
    $title.textContent = `${title}`;
    $mediaInfos.appendChild($title);

    const $likes = document.createElement('span');
    $likes.textContent = `${likes} ❤`;
    $mediaInfos.appendChild($likes);

    article.appendChild($mediaInfos);

    return article;
  }

  return { getMediaCardDOM };
}
