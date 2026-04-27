function displayCustomers(){
    const parent = document.getElementById("customerContainer");
    parent.innerHTML = ""; // clear old content

    allCustomers.forEach(customer => { // loop through all customers and create a card for each
        const customerElement = document.createElement("div");
        customerElement.classList.add("customerCard"); 

        const nameElement = document.createElement("p"); 
        nameElement.classList.add("customerName");
        nameElement.textContent = customer.name;

        const editButtonElement = document.createElement("button");
        editButtonElement.classList.add("editButton");
        editButtonElement.textContent = "edit";
        editButtonElement.addEventListener("click", () => editCustomer(customer)); // if button is clicked, call the editCustomer function

        const borrowButtonElement = document.createElement("button");
        borrowButtonElement.classList.add("borrowButton");
        borrowButtonElement.textContent = "borrow book";
        borrowButtonElement.addEventListener("click", () => loanFunction(customer)); 

        const returnButtonElement = document.createElement("button");
        returnButtonElement.classList.add("returnButton");
        returnButtonElement.textContent = "return book";
        returnButtonElement.addEventListener("click", () => returnFunction(customer)); 

        const deleteButtonElement = document.createElement("button");
        deleteButtonElement.classList.add("deleteButton");
        deleteButtonElement.textContent = "delete";
        deleteButtonElement.addEventListener("click", () => deleteCustomer(customer)); // if button is clicked, call the deleteCustomer function


        customerElement.appendChild(nameElement); // add the name to the card
        customerElement.appendChild(editButtonElement); // add the edit button to the card
        customerElement.appendChild(borrowButtonElement); // add the borrow button to the card
        customerElement.appendChild(returnButtonElement); // add the return button to the card
        customerElement.appendChild(deleteButtonElement); // add the delete button to the card
        parent.appendChild(customerElement); //add the card to the container
    });
    
}

displayCustomers();

function addCustomer(){
    const name = prompt("Enter customer name:"); 
    if (name) { //only valid input if a name is entered
        const newCustomer = new Customer(Date.now(), name, [], 0); //make a new customer with id (date), name = input, empty borrowedBooks and 0 fines
        allCustomers.push(newCustomer); //add the new customer to the array
        localStorage.setItem("AllCustomers", JSON.stringify(allCustomers)); //save the updated array to local storage
        displayCustomers(); //refresh UI to show the new customer
    }
}

function editCustomer(customer) {
    const newName = prompt("Enter new name:", customer.name); 
    
    if (newName) {
        customer.name = newName;
        saveCustomers(); // update local storage
        displayCustomers(); // refresh UI
    }
}

function deleteCustomer(customer) {

    customer.borrowedBooks.forEach(function(bookId) { // for each book in the customers borrowedBooks array
        const book = allBooks.find(function(book) { 
        return book.id === bookId; // find the book in allBooks
        });

        if (book) {
        book.isAvailable = true; // mark book as available
        book.borrowedBy = null; // remove id of borrower
        }
    });

    customer.borrowedBooks = []; // clear the customers borrowedBooks array
    const index = allCustomers.indexOf(customer); // find the index of the customer in allCustomers

    if (index > -1) { //remove the customer from allCustomers
        allCustomers.splice(index, 1);
    }

    saveBooks(); // update local storage for books
    saveCustomers(); // update local storage for customers
    displayCustomers(); //refresh UI
}


function loanFunction(customer) {

    const availableBooks = allBooks.filter(book => book.isAvailable); //.filter creates a new array with only available books in allBooks
    if (availableBooks.length === 0) { //if no available books, show alert and return
        alert("No books available.");
        return;
    }

    let message = "Choose a book number:\n"; // create a message string to show in the prompt
    availableBooks.forEach((book, index) => { 
        message += `${index + 1}. ${book.title}\n`; // print out each available book on a new line in the message string
    });

    const choice = prompt(message); // saves the user input in "choice"
    const selectedBook = availableBooks[choice - 1]; // find the book in availableBooks using the user input

    if (!selectedBook) { // if the choice is invalid, return
        alert("Invalid choice.");
        return;
    }

    // update things
    selectedBook.isAvailable = false; // change the book to not be available
    selectedBook.borrowedBy = customer.id; // set borrowedBy to the id of the customer
    customer.borrowedBooks.push(selectedBook.id); // add the id of the borrowed book to the customers list of borrowedBooks

    saveBooks();
    saveCustomers();

    alert(`${customer.name} borrowed ${selectedBook.title}`);
}


function returnFunction(customer) {

    if (customer.borrowedBooks.length === 0) { // first check if the customer has any borrowed books
        alert(`${customer.name} has no borrowed books.`); // alert if none
        return;
    }

    const borrowedBooks = allBooks.filter(book =>
        customer.borrowedBooks.includes(book.id) // .filter creates a new array with the books that the customer has borrowed
    ); // "includes(book.id)" checks if the book is in the customers borrowedBooks array

    let message = "Choose a book to return:\n"; 
    borrowedBooks.forEach((book, index) => {
        message += `${index + 1}. ${book.title}\n`;
    });

    const choice = prompt(message); // saves the user input (the chosen book to return)
    const selectedBook = borrowedBooks[choice - 1]; // find the chosen book in the borrowedBooks array using the user input

    if (!selectedBook) { // if the choice is invalid, return
        alert("Invalid choice.");
        return;
    }

    // update stuff
    selectedBook.isAvailable = true; // book is now available again
    selectedBook.borrowedBy = null; // remove the id of the borrower from the book
    const index = customer.borrowedBooks.indexOf(selectedBook.id); // find the index of the returned book
    customer.borrowedBooks.splice(index, 1); // remove it

    saveBooks();
    saveCustomers();

    alert(`${customer.name} returned ${selectedBook.title}`);
}