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

        const interactButtonElement = document.createElement("button");
        interactButtonElement.classList.add("interactButton");
        interactButtonElement.textContent = "interact!";

        const deleteButtonElement = document.createElement("button");
        deleteButtonElement.classList.add("deleteButton");
        deleteButtonElement.textContent = "delete";
        deleteButtonElement.addEventListener("click", () => deleteCustomer(customer)); // if button is clicked, call the deleteCustomer function


        customerElement.appendChild(nameElement); // add the name to the card
        customerElement.appendChild(editButtonElement); // add the edit button to the card
        customerElement.appendChild(interactButtonElement); // add the interact button to the card
        customerElement.appendChild(deleteButtonElement); // add the delete button to the card
        parent.appendChild(customerElement); //add the card to the container
    });
}

displayCustomers();

function editCustomer(customer) {
    const newName = prompt("Enter new name:", customer.name);
    
    if (newName) {
        customer.name = newName;
        displayCustomers(); // refresh UI
    }
}

function deleteCustomer(customer){
    const index = allCustomers.indexOf(customer);
    if (index > -1) {
        allCustomers.splice(index, 1); // remove customer from array
        displayCustomers(); // refresh UI
    }
}