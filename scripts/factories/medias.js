function mediasFactory(data) {
  const { id, photographerId, title, image, video, likes, date, price } = data;

  const imgSrc = `assets/medias/${image}`;
  const videoSrc = `assets/medias/${video}`;

  function getMediaCardDOM() {
    const card = document.createElement('div');
    card.classList.add('medias__card');

    const $mediasCardTop = document.createElement('div');
    $mediasCardTop.classList.add('medias__card__top');
    const $mediasCardBottom = document.createElement('div');
    $mediasCardBottom.classList.add('medias__card__bottom');

    if (data.hasOwnProperty('image')) {
      const $image = document.createElement('img');
      $image.setAttribute('src', `${imgSrc}`);
      $image.setAttribute('alt', `${title}`);

      $mediasCardTop.appendChild($image);
      card.appendChild($mediasCardTop);
    }

    if (data.hasOwnProperty('video')) {
      const $video = document.createElement('video');
      $video.setAttribute('controls', '');
      const $source = document.createElement('source');
      $source.setAttribute('src', videoSrc);
      $source.setAttribute('type', 'video/mp4');

      $video.appendChild($source);
      $mediasCardTop.appendChild($video);
      card.appendChild($mediasCardTop);
    }

    const $title = document.createElement('h2');
    $title.textContent = `${title}`;
    $mediasCardBottom.appendChild($title);
    const $likes = document.createElement('div');
    $likes.classList.add('likes');
    const $nbLikes = document.createElement('span');
    $nbLikes.classList.add('likes__number');
    $nbLikes.textContent = `${likes}`;
    const $heartIcon = document.createElement('img');
    $heartIcon.classList.add('likes__icon');
    $heartIcon.setAttribute('src', 'assets/icons/heart.svg');
    $likes.appendChild($nbLikes);
    $likes.appendChild($heartIcon);
    $mediasCardBottom.appendChild($likes);

    card.appendChild($mediasCardBottom);

    return card;
  }

  return { getMediaCardDOM };
}
