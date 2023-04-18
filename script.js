let myLibrary = [
  { title: "asd", author: "sdf", pages: 123, isRead: false },
  { title: "asd", author: "sdf", pages: 123, isRead: false },
  { title: "asd", author: "sdf", pages: 123, isRead: false },
];

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = false;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function createCard(cardNumber) {
  const cards = document.querySelector(".cards");
  const div = document.createElement("div");
  div.classList.add(`card-${cardNumber}`);
  cards.appendChild(div);
}

function addCardElements(cardNumber) {
  const card = document.querySelector(`.card-${cardNumber}`);
  const pTitle = document.createElement("p");
  const pAuthor = document.createElement("p");
  const pPages = document.createElement("p");
  const buttonIsRead = document.createElement("button");
  const buttonDelete = document.createElement("button");

  pTitle.classList.add(`title-${cardNumber}`);
  pAuthor.classList.add(`author-${cardNumber}`);
  pPages.classList.add(`pages-${cardNumber}`);
  buttonIsRead.classList.add(`buttonIsRead-${cardNumber}`);
  buttonDelete.classList.add(`buttonDelete-${cardNumber}`);

  pTitle.textContent = myLibrary[cardNumber].title;
  pAuthor.textContent = myLibrary[cardNumber].author;
  pPages.textContent = myLibrary[cardNumber].pages;
  buttonIsRead.textContent = "Read";
  buttonDelete.textContent = "Remove";

  card.appendChild(pTitle);
  card.appendChild(pAuthor);
  card.appendChild(pPages);
  card.appendChild(buttonIsRead);
  card.appendChild(buttonDelete);
}

function displayBooksOnScreen() {
  for (let i in myLibrary) {
    createCard(i);
    addCardElements(i);
  }
}

displayBooksOnScreen();
