const libraryContainer = document.querySelector(".library-container");
const modalContainer = document.querySelector(".modal-container");
const closeModalX = document.querySelector(".close-modal");
const newBookBtn = document.querySelector(".new-book-btn");
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
        currentBook.textContent = `${book.title} by ${book.author}, ${book.pages} pages`;
        libraryContainer.appendChild(currentBook);
    })
}

function clearLibraryDisplay() {
    libraryContainer.textContent = "";
}


// Event Listeners
newBookBtn.addEventListener("click", () => {
    const newBook = new Book("Three-Ring Circus", "Jeff Pearlman", "409", false); // replace with user input for book title, author, pages, read
    modalContainer.style.display = "flex";

    addBookToLibrary(newBook);
});

modalContainer.addEventListener("click", () => {
    modalContainer.style.display = "none";
}) 

closeModalX.addEventListener("click", () => {
    modalContainer.style.display = "none";
}) 