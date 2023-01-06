const modal = document.querySelector('.modal');
const form = document.querySelector('.form');
const overlay = document.querySelector('.overlay');

function displayModal() {
  modal.style.display = 'flex';
  overlay.style.display = 'block';
}

function closeModal() {
  modal.style.display = 'none';
  overlay.style.display = 'none';
  form.reset();
}
