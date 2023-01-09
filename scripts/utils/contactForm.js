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

// Form Validation
const firstName = document.getElementById('first-name');
const lastName = document.getElementById('last-name');
const email = document.getElementById('email');
const message = document.getElementById('message');

const checkFirstName = () => {
  const firstNameValue = firstName.value.trim();

  if (firstNameValue === '') {
    return false;
  } else {
    console.log(firstNameValue);
    return true;
  }
};

const checkLastName = () => {
  const lastNameValue = lastName.value.trim();

  if (lastNameValue === '') {
    return false;
  } else {
    console.log(lastNameValue);
    return true;
  }
};

//
const checkEmail = () => {
  const emailValue = email.value.trim();

  if (emailValue === '') {
    return false;
  } else {
    console.log(emailValue);
    return true;
  }
};

//
const checkMessage = () => {
  const messageValue = message.value.trim();

  if (messageValue === '') {
    return false;
  } else {
    console.log(messageValue);
    return true;
  }
};

form.addEventListener('submit', e => {
  if (
    checkFirstName() == false ||
    checkLastName() == false ||
    checkEmail() == false ||
    checkMessage() == false
  ) {
    e.preventDefault();
    console.log('Un ou plusieurs champs sont vides !');
  } else {
    e.preventDefault();
  }
});
