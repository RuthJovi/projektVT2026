function displayBooks(){
    const parent = document.getElementById("booksContainer");

    allBooks.forEach(book => { // loop through all books and create a card for each book

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

        bookElement.appendChild(titleElement); // add the books title to the card
        bookElement.appendChild(authorElement); // add the books author
        bookElement.appendChild(yearElement); // add the books year 
        parent.appendChild(bookElement) // add the book card to the container
    })    
}

displayBooks();