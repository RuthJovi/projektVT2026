function displayBooks() {
    const parent = document.getElementById("booksContainer");

    parent.innerHTML = ""; // clear old cards first

    allBooks.forEach(book => {

        const bookElement = document.createElement("div");
        bookElement.classList.add("bookCard");

        const titleElement = document.createElement("p");
        titleElement.classList.add("bookTitle");
        titleElement.textContent = book.title;

        const authorElement = document.createElement("p");
        authorElement.classList.add("bookAuthor");
        authorElement.textContent = book.author;

        const yearElement = document.createElement("p");
        yearElement.classList.add("bookYear");
        yearElement.textContent = book.year;

        const isAvailableElement = document.createElement("p");
        isAvailableElement.classList.add("isAvailableTitle");

        if (book.isAvailable) { // if book is available, text content = "yes", otherwise "no"
            isAvailableElement.textContent = "Yes";
            isAvailableElement.classList.add("availableYes");
        } else {
            isAvailableElement.textContent = "No";
            isAvailableElement.classList.add("availableNo");
        }

        bookElement.appendChild(titleElement);
        bookElement.appendChild(authorElement);
        bookElement.appendChild(yearElement);
        bookElement.appendChild(isAvailableElement);

        parent.appendChild(bookElement);
    });
}

displayBooks();