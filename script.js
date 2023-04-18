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

function displayBooksOnScreen() {
  const cards = document.querySelector(".cards");
  for (let element of myLibrary) {
    const div = document.createElement("div");
    div.classList.add("card");
    cards.appendChild(div);
  }
}
