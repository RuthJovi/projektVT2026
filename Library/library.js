class Customer {

    constructor(id, name, borrowedBooks, fines){
        this.id = id;
        this.name = name;
        this.borrowedBooks = borrowedBooks;
        this.fines = fines;
    }
}

class Loan {
    constructor(bookId, customerId, loanDate, dueDate){
        this.bookId = bookId;
        this.customerId = customerId;
        this.loanDate = loanDate;
        this.dueDate = dueDate;
    }
}

class Book {

    constructor(id, title, author, year, isAvailable, borrowedBy, dueDate){
        this.id = id;
        this.title = title;
        this.author = author;
        this.year = year;
        this.isAvailable = isAvailable;
        this.borrowedBy = borrowedBy;
        this.dueDate = dueDate;
    }
}

let allBooks = JSON.parse(localStorage.getItem("AllBooks"));

if (!allBooks || allBooks.length === 0) {
    allBooks = [
        new Book(1, "The Great Gatsby", "F. Scott Fitzgerald", 1925, true, null, null),
        new Book(2, "To Kill a Mockingbird", "Harper Lee", 1960, true, null, null),
        new Book(3, "1984", "George Orwell", 1949, true, null, null),
        new Book(4, "Pride and Prejudice", "Jane Austen", 1813, true, null, null),
        new Book(5, "The Catcher in the Rye", "J.D. Salinger", 1951, true, null, null),
        new Book(6, "The Lord of the Rings", "J.R.R. Tolkien", 1954, true, null, null),
        new Book(7, "The Hobbit", "J.R.R. Tolkien", 1937, true, null, null),
        new Book(8, "Fahrenheit 451", "Ray Bradbury", 1953, true, null, null)
    ];

    saveBooks();
}

function saveBooks() {
    localStorage.setItem("AllBooks", JSON.stringify(allBooks));
}



let allCustomers = JSON.parse( localStorage.getItem("AllCustomers") ); 
if (!allCustomers) {
    allCustomers = [
        new Customer(1, "Alice", [], 0),
        new Customer(2, "Thomas", [], 0),
        new Customer(3, "Maria", [], 0),
        new Customer(4, "David", [], 0),
        new Customer(5, "José", [], 0)
    ];
    saveCustomers();
}

function saveCustomers() {
    localStorage.setItem("AllCustomers", JSON.stringify(allCustomers));
}

