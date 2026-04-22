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
        borrowButtonElement.textContent = "borrow";
        borrowButtonElement.addEventListener("click", () => loanFunction(customer)); 

        const returnButtonElement = document.createElement("button");
        returnButtonElement.classList.add("returnButton");
        returnButtonElement.textContent = "return";
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
    if (name) {
        const newCustomer = new Customer(Date.now(), name, [], 0);
        allCustomers.push(newCustomer);
        localStorage.setItem("AllCustomers", JSON.stringify(allCustomers));
        displayCustomers();
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

    customer.borrowedBooks.forEach(bookId => {

        const book = allBooks.find(book => book.id === bookId);

        if (book) {
            book.isAvailable = true;
            book.borrowedBy = null;
        }

    });

    customer.borrowedBooks = [];

    const index = allCustomers.indexOf(customer);

    if (index > -1) {
        allCustomers.splice(index, 1);
    }

    saveBooks();
    saveCustomers();
    displayCustomers();
}

function loanFunction(customer) {

    const availableBooks = allBooks.filter(book => book.isAvailable);

    if (availableBooks.length === 0) {
        alert("No books available.");
        return;
    }

    let message = "Choose a book number:\n";

    availableBooks.forEach((book, index) => {
        message += `${index + 1}. ${book.title}\n`;
    });

    const choice = prompt(message);

    const selectedBook = availableBooks[choice - 1];

    if (!selectedBook) {
        alert("Invalid choice.");
        return;
    }

    selectedBook.isAvailable = false;
    selectedBook.borrowedBy = customer.id;

    customer.borrowedBooks.push(selectedBook.id);

    saveBooks();
    saveCustomers();

    alert(`${customer.name} borrowed ${selectedBook.title}`);
}

function returnFunction(customer) {

    if (customer.borrowedBooks.length === 0) {
        alert(`${customer.name} has no borrowed books.`);
        return;
    }

    const borrowedBooks = allBooks.filter(book =>
        customer.borrowedBooks.includes(book.id)
    );

    let message = "Choose a book to return:\n";

    borrowedBooks.forEach((book, index) => {
        message += `${index + 1}. ${book.title}\n`;
    });

    const choice = prompt(message);

    const selectedBook = borrowedBooks[choice - 1];

    if (!selectedBook) {
        alert("Invalid choice.");
        return;
    }

    selectedBook.isAvailable = true;
    selectedBook.borrowedBy = null;

    const index = customer.borrowedBooks.indexOf(selectedBook.id);
    customer.borrowedBooks.splice(index, 1);

    saveBooks();
    saveCustomers();

    alert(`${customer.name} returned ${selectedBook.title}`);
}