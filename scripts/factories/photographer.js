function photographerFactory(data) {
  const { name, id, city, country, tagline, price, portrait } = data;

  const picture = `assets/photographers/${portrait}`;

  // modalPhotographer.textContent = `test`;

  function getUserCardDOM() {
    const article = document.createElement('article');

    const $link = document.createElement('a');
    $link.setAttribute('href', `photographer.html?id=${id}`);

    const $avatar = document.createElement('img');
    $avatar.setAttribute('src', picture);
    $avatar.setAttribute('alt', `${name}`);

    const $name = document.createElement('h2');
    $name.textContent = name;

    const $photographerDatas = document.createElement('div');
    $photographerDatas.classList.add('home__photographer-data');
    $photographerDatas.setAttribute('tabindex', '0');

    const $location = document.createElement('h3');
    $location.textContent = `${city}, ${country}`;

    const $bio = document.createElement('p');
    $bio.textContent = tagline;

    const $price = document.createElement('p');
    $price.textContent = `${price}€/jour`;

    $photographerDatas.appendChild($location);
    $photographerDatas.appendChild($bio);
    $photographerDatas.appendChild($price);

    $link.appendChild($avatar);
    $link.appendChild($name);

    article.appendChild($link);
    article.appendChild($photographerDatas);
    return article;
  }

  return { getUserCardDOM };
}
