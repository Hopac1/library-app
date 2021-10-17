const libraryContainer = document.querySelector(".library-container");
const modalContainer = document.querySelector(".modal-container");
const closeModalX = document.querySelector(".close-modal");
const newBookBtn = document.querySelector(".new-book-btn");
const bookTitleInput = document.getElementById("book-title");
const bookAuthorInput = document.getElementById("book-author");
const bookPagesInput = document.getElementById("book-pages");
const readOrNotInput = document.getElementById("read-or-not");
const addBookBtn = document.getElementById("submit-btn");
const newBookForm = document.getElementById("new-book-form");
const radioYes = document.getElementById("read");
const radioNo = document.getElementById("not-read");
let myLibrary = [];

class Book {
    constructor (
        title = "",
        author = "",
        pages = "",
        isRead = false
    ){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
    }
}

function addBookToLibrary(newBook) {
    if (!inLibrary(newBook)) {
        myLibrary.push(newBook);
        displayBooks()
    }
}

function inLibrary(newBook) {
    return myLibrary.some(book => book.title === newBook.title);
}

function displayBooks() {
    clearLibraryDisplay()
    myLibrary.forEach(book => {
        let currentBook = document.createElement("div");
        currentBook.classList = "book";
        currentBook.textContent = `${book.title} by ${book.author}, ${book.pages} pages, ${book.isRead}`;
        libraryContainer.appendChild(currentBook);
    })
}

function clearLibraryDisplay() {
    libraryContainer.textContent = "";
}

function storeBookInfo() {
    const title = bookTitleInput.value;
    const author = bookAuthorInput.value;
    const pages = bookPagesInput.value;
    let read = radioYes.checked;

    if (read === true) {
        read = "read";
    } else {
        read = "not read";
    }

    return new Book(title, author, pages, read);
}

// Event Listeners
newBookBtn.addEventListener("click", () => {
    modalContainer.style.display = "flex";
});

addBookBtn.addEventListener("click", () => {
    addBookToLibrary(storeBookInfo());
    modalContainer.style.display = "none";
});

closeModalX.addEventListener("click", () => {
    modalContainer.style.display = "none";
});
