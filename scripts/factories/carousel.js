function carouselFactory(data) {
  const { id, photographerId, title, image, video, likes, date, price } = data;

  const imgSrc = `assets/medias/${image}`;
  const videoSrc = `/assets/medias/${video}`;

  function getCarouselSlideDOM() {
    const carousel = document.querySelector('.carousel');
    const slide = document.createElement('div');
    slide.classList.add('slide');

    const $image = document.createElement('img');
    $image.setAttribute('src', `${imgSrc}`);
    $image.setAttribute('alt', `${title}`);

    if (data.hasOwnProperty('image')) {
      slide.appendChild($image);
    }

    const $video = document.createElement('video');
    $video.setAttribute('controls', '');
    const $source = document.createElement('source');
    $source.setAttribute('src', videoSrc);
    $source.setAttribute('type', 'video/mp4');

    if (data.hasOwnProperty('video')) {
      slide.appendChild($video);
    }

    return slide;
  }

  return { getCarouselSlideDOM };
}
