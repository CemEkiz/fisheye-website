// Get data of photographers from the JSON file "photographers.json" and return an array of these photographers
async function getPhotographers() {
  const photographers = await fetch('data/photographers.json')
    .then(response => {
      return response.json();
    })
    .then(data => {
      return data.photographers;
    });

  console.log(photographers);
  return photographers;
}

async function displayData(photographers) {
  const photographersSection = document.querySelector('.photographer_section');

  photographers.forEach(photographer => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const photographers = await getPhotographers();
  displayData(photographers);
}

init();
