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

        if (book.isAvailable) {
            yearElement.textContent = book.year;
        } else {
            yearElement.textContent = "Borrowed";
        }

        bookElement.appendChild(titleElement);
        bookElement.appendChild(authorElement);
        bookElement.appendChild(yearElement);

        parent.appendChild(bookElement);
    });
}

displayBooks();