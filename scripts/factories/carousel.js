function carouselFactory(data) {
  const { id, photographerId, title, image, video, likes, date, price } = data;

  const imgSrc = `assets/medias/${image}`;
  const videoSrc = `/assets/medias/${video}`;

  function getCarouselSlideDOM() {
    const slide = document.createElement('div');
    slide.classList.add('slide');

    const $title = document.createElement('span');
    $title.classList.add('slide__title');

    const $mediaBox = document.createElement('div');
    $mediaBox.classList.add('image-box');

    const $image = document.createElement('img');
    $image.setAttribute('src', `${imgSrc}`);
    $image.setAttribute('alt', `${title}`);
    $title.textContent = `${title}`;

    if (data.hasOwnProperty('image')) {
      $mediaBox.appendChild($image);
      $mediaBox.appendChild($title);
      slide.appendChild($mediaBox);
    }

    const $video = document.createElement('video');
    $video.setAttribute('controls', '');
    const $source = document.createElement('source');
    $source.setAttribute('src', videoSrc);
    $source.setAttribute('type', 'video/mp4');

    if (data.hasOwnProperty('video')) {
      $mediaBox.appendChild($video);
      $mediaBox.appendChild($title);
      slide.appendChild($mediaBox);
    }

    return slide;
  }

  return { getCarouselSlideDOM };
}
