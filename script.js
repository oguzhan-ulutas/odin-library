const myLibrary = [
  {
    title: 'Notes From Underground',
    author: 'Fyodor Dostoevsky',
    pages: 124,
    isRead: true,
  },
];

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

function clearAllCards() {
  const cards = document.querySelectorAll('[class^=card-]');
  cards.forEach((card) => {
    card.remove();
  });
}

function createCard(cardNumber) {
  const cards = document.querySelector('.cards');
  const div = document.createElement('div');

  div.classList.add(`card-${cardNumber}`);
  cards.appendChild(div);
}

function addCardElements(cardNumber) {
  const card = document.querySelector(`.card-${cardNumber}`);
  const pTitle = document.createElement('p');
  const pAuthor = document.createElement('p');
  const pPages = document.createElement('p');
  const buttonIsRead = document.createElement('button');
  const buttonDelete = document.createElement('button');

  pTitle.classList.add(`title-${cardNumber}`);
  pAuthor.classList.add(`author-${cardNumber}`);
  pPages.classList.add(`pages-${cardNumber}`);
  buttonIsRead.classList.add(`buttonIsRead-${cardNumber}`);
  buttonDelete.classList.add(`buttonDelete-${cardNumber}`);

  pTitle.textContent = myLibrary[cardNumber].title;
  pAuthor.textContent = myLibrary[cardNumber].author;
  pPages.textContent = myLibrary[cardNumber].pages;
  if (myLibrary[cardNumber].isRead) {
    buttonIsRead.textContent = 'Read';
  } else {
    buttonIsRead.textContent = 'Not Read';
  }
  buttonDelete.textContent = 'Remove';

  card.appendChild(pTitle);
  card.appendChild(pAuthor);
  card.appendChild(pPages);
  card.appendChild(buttonIsRead);
  card.appendChild(buttonDelete);

  if (myLibrary[cardNumber].isRead) {
    buttonIsRead.classList.add('read');
  }
}

function displayBooksOnScreen() {
  for (const i in myLibrary) {
    createCard(i);
    addCardElements(i);
  }
}

displayBooksOnScreen();

// Add new book button functions

const addNewBook = document.querySelector('.add-button');
const overlay = document.querySelector('#overlay');
const form = document.querySelector('.form-container');
const submit = document.querySelector('[type=submit]');

addNewBook.addEventListener('click', openForm);

function openForm() {
  overlay.classList.add('active');
  form.classList.add('active');
}

function closeForm() {
  overlay.classList.remove('active');
  form.classList.remove('active');
}

overlay.addEventListener('click', closeForm);

submit.addEventListener('click', closeForm);

// Remove book

function removeBooks() {
  const removeBook = document.querySelectorAll('[class^=buttonDelete-]');
  removeBook.forEach((button) => {
    button.addEventListener('click', (e) => {
      const index = e.target.classList.value.split('-')[1];
      const cards = document.querySelectorAll('[class^=card-]');

      myLibrary.splice(Number(index), 1);
      cards.forEach((card) => {
        card.remove();
      });
      displayBooksOnScreen();
      removeBooks();
      readButtonToggle();
    });
  });
}

removeBooks();

// Read button toggle

function readButtonToggle() {
  const buttonRead = document.querySelectorAll('[class*=buttonIs]');
  buttonRead.forEach((button) => {
    button.addEventListener('click', (e) => {
      const index = Number(e.target.classList.value.split('-')[1][0]);

      button.classList.toggle('read');
      if (button.textContent === 'Read') {
        button.textContent = 'Not Read';
      } else {
        button.textContent = 'Read';
      }
      changeReadStatus(index);
    });
  });
}

function changeReadStatus(index) {
  if (myLibrary[index].isRead) {
    myLibrary[index].isRead = false;
  } else {
    myLibrary[index].isRead = true;
  }
}

readButtonToggle();

function clearForm() {
  const formInput = document.querySelectorAll('.form input');
  formInput.forEach((input) => {
    input.value = '';
  });
}

const getFormData = document.querySelector('.form');

getFormData.addEventListener('submit', (e) => {
  e.preventDefault();

  const book = new Book(
    e.target[1].value,
    e.target[2].value,
    e.target[3].value,
    e.target[4].checked,
  );

  addBookToLibrary(book);
  clearAllCards();
  displayBooksOnScreen();
  removeBooks();
  readButtonToggle();
  clearForm();
});
