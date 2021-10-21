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



const myBr = document.createElement("br");
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
        let removeButton = document.createElement("button");
        let changeReadStatusButton = document.createElement("button");
        const titleP = document.createElement("h3");
        const authorP = document.createElement("h3");
        const pagesP = document.createElement("h3");
        const readP = document.createElement("h3");

        
        // let bookInfo = document.createTextNode(`${book.title}\r\n ${book.author}\r\n ${book.pages} pages\r\n ${book.isRead}`); OLD
        let bookTitle = document.createTextNode(book.title);
        let bookAuthor = document.createTextNode(book.author);
        let bookPages = document.createTextNode(book.pages);
        let bookRead = document.createTextNode(book.isRead);

        // pTag.classList = "book-info";
        titleP.classList = "book-info";
        authorP.classList = "book-info";
        pagesP.classList = "book-info";
        readP.classList = "book-info";
        currentBook.classList = "book";
        removeButton.classList = "book-button remove"
        changeReadStatusButton.classList = "book-button";
        
        // currentBook.textContent = `${book.title}\r\n ${book.author}\r\n ${book.pages} pages\r\n ${book.isRead}`; OLD OLD 
        
        // pTag.appendChild(bookInfo)
        titleP.appendChild(bookTitle);
        authorP.appendChild(bookAuthor);
        pagesP.appendChild(bookPages);
        readP.appendChild(bookRead);

        currentBook.appendChild(titleP);
        currentBook.appendChild(authorP);
        currentBook.appendChild(pagesP);
        currentBook.appendChild(readP);
        currentBook.appendChild(removeButton);
        removeButton = removeButton.textContent = "Remove";
        currentBook.appendChild(changeReadStatusButton);

        changeReadStatusButton = changeReadStatusButton.textContent = "Change Read Status";
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
