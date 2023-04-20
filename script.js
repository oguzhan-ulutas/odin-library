let myLibrary = [
  {
    title: "Notes From Underground",
    author: "Fyodor Dostoevsky",
    pages: 124,
    isRead: "on",
  },
];

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

  if (myLibrary[cardNumber].isRead == "on") {
    buttonIsRead.classList.add("read");
  }
}

function displayBooksOnScreen() {
  for (let i in myLibrary) {
    createCard(i);
    addCardElements(i);
  }
}

displayBooksOnScreen();

// Add new book button functions

const addNewBook = document.querySelector(".add-button");
const overlay = document.querySelector("#overlay");
const form = document.querySelector(".form-container");
const submit = document.querySelector("[type=submit]");

addNewBook.addEventListener("click", () => {
  openForm();
});

overlay.addEventListener("click", () => {
  closeForm();
});

submit.addEventListener("click", () => {
  closeForm();
});

function openForm() {
  overlay.classList.add("active");
  form.classList.add("active");
}

function closeForm() {
  overlay.classList.remove("active");
  form.classList.remove("active");
}

//Remove book

function removeBooks() {
  const removeBook = document.querySelectorAll("[class^=buttonDelete-]");
  removeBook.forEach((button) => {
    button.addEventListener("click", (e) => {
      const index = e.target.classList.value.split("-")[1];
      const cards = document.querySelectorAll("[class^=card-]");

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
  const buttonRead = document.querySelectorAll("[class*=buttonIs]");
  buttonRead.forEach((button) => {
    button.addEventListener("click", (e) => {
      const index = Number(e.target.classList.value.split("-")[1][0]);

      button.classList.toggle("read");
      changeReadStatus(index);
    });
  });
}

function changeReadStatus(index) {
  if (myLibrary[index].isRead == "on") {
    delete myLibrary[index].isRead;
  } else {
    myLibrary[index].isRead = "on";
  }
}

readButtonToggle();

const formTake = document.querySelector(".form");

formTake.addEventListener("submit", (e) => {
  e.preventDefault();
  const myFormData = new FormData(e.target);

  const formDataObj = {};
  myFormData.forEach((value, key) => (formDataObj[key] = value));
  addBookToLibrary(formDataObj);

  const cards = document.querySelectorAll("[class^=card-]");
  cards.forEach((card) => {
    card.remove();
  });

  displayBooksOnScreen();
  removeBooks();
  readButtonToggle();
  clearForm();
});

function clearForm() {
  const form = document.querySelectorAll(".form input");
  form.forEach((input) => {
    input.value = "";
  });
}
