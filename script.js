const libraryContainer = document.querySelector(".library-container");
const modalContainer = document.querySelector(".modal-container");
const closeModalX = document.querySelector(".close-modal");
const newBookBtn = document.querySelector(".new-book-btn");
const bookTitleInput = document.getElementById("book-title");
const bookAuthorInput = document.getElementById("book-author");
const bookPagesInput = document.getElementById("book-pages");
const addBookBtn = document.getElementById("submit-btn");
const radioYes = document.getElementById("read");

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
        const titleP = document.createElement("h2");
        const authorP = document.createElement("h4");
        const pagesP = document.createElement("h4");

        let bookTitle = document.createTextNode(book.title);
        let bookAuthor = document.createTextNode(`by ${book.author}`);
        let bookPages = document.createTextNode(`${book.pages} pages`);

        titleP.classList = "book-info";
        authorP.classList = "book-info";
        pagesP.classList = "book-info";
        currentBook.classList = "book";
        changeReadStatusButton.classList = "book-button read-status-btn";
        removeButton.classList = "book-button remove"

        titleP.appendChild(bookTitle);
        authorP.appendChild(bookAuthor);
        pagesP.appendChild(bookPages);

        currentBook.appendChild(titleP);
        currentBook.appendChild(authorP);
        currentBook.appendChild(pagesP);
        currentBook.appendChild(changeReadStatusButton);
        currentBook.appendChild(removeButton);

        removeButton = removeButton.textContent = "Remove";
        changeReadStatusButton = changeReadStatusButton.textContent = `${book.isRead}`;

        libraryContainer.appendChild(currentBook);
    })
    const removeBookBtn = document.querySelectorAll(".remove");
    removeBookBtn.forEach(button => button.addEventListener("click", (e) => {
        let bookCardTitle = e.target.parentNode.firstChild.textContent;
        let obj = myLibrary.find(aBook => aBook.title === bookCardTitle);
        myLibrary.splice(myLibrary.indexOf(obj),1);
        return e.target.parentNode.remove();
    }));

    const changeReadStatusBtn = document.querySelectorAll(".read-status-btn");
    changeReadStatusBtn.forEach(button => button.addEventListener("click", (e) => {
        let bookCardIsRead = e.target.parentNode.children[3].textContent;
        let obj = myLibrary.find(aBook => aBook.isRead === bookCardIsRead);
        console.log(bookCardIsRead);
        console.log(obj);
        if (obj.isRead === "read") {
            obj.isRead = "not read";
            e.target.parentNode.children[3].textContent = obj.isRead;

        } else if (obj.isRead === "not read") {
            obj.isRead = "read";
            e.target.parentNode.children[3].textContent = obj.isRead;
        }
    }))
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

