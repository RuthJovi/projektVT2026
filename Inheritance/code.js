class Animal {
    constructor(id, name, img){
        this.id = id;
        this.name = name;
        this.img = img;
    }
    interact(){
        console.log(`You interacted with animal ${this.id}`);
    }
}

class RedPanda extends Animal {
    constructor(id){
        super(id, "Red panda", "https://i.pinimg.com/736x/3f/34/0a/3f340a10fef16719122cf1376d355f59.jpg");
    }
    interact(card){
        console.log(`You interacted with red panda ${this.id}`);
        document.body.style.backgroundColor = "var(--red)"; 
    }
}

class Dolphin extends Animal {
    constructor(id){
        super(id, "Dolphin", "https://i.pinimg.com/1200x/d6/65/98/d66598c6c8aa96244ba673116f3646a6.jpg"); 
    }
    interact(card){
        console.log(`You interacted with dolphin ${this.id}`);
        document.body.style.backgroundColor = "var(--blue)";
    }   
}

class Giraffe extends Animal {
    constructor(id){
        super(id, "Giraffe", "https://i.pinimg.com/736x/17/16/bf/1716bf38dedac61543ea43a1964a041b.jpg"); 
    }
    interact(card){
        console.log(`You interacted with giraffe ${this.id}`);
        document.body.style.backgroundColor = "var(--yellow)";
    }
}

let allBlocks = [];

function addAnimal(type){
    if (type === "redPanda") {
        const newRedPanda = new RedPanda(allBlocks.length + 1);
        allBlocks.push(newRedPanda);
    } else if (type === "dolphin") {
        const newDolphin = new Dolphin(allBlocks.length + 1);
        allBlocks.push(newDolphin);
    } else if (type === "giraffe") {
        const newGiraffe = new Giraffe(allBlocks.length + 1);
        allBlocks.push(newGiraffe);
    }
    
}

const addRedPandaButton = document.getElementById("addRedPanda");
addRedPandaButton.addEventListener("click", () => {
    const newRedPanda = new RedPanda(allBlocks.length + 1);
    allBlocks.push(newRedPanda);
    displayAnimals();
});

const addDolphinButton = document.getElementById("addDolphin");
addDolphinButton.addEventListener("click", () => {
    const newDolphin = new Dolphin(allBlocks.length + 1);
    allBlocks.push(newDolphin);
    displayAnimals();
});

const addGiraffeButton = document.getElementById("addGiraffe");
addGiraffeButton.addEventListener("click", () => {
    const newGiraffe = new Giraffe(allBlocks.length + 1);
    allBlocks.push(newGiraffe);
    displayAnimals();
});

function displayAnimals(){
    const parent = document.getElementById("animalsContainer");
    parent.innerHTML = ""; // clear old cards first
    
    allBlocks.forEach(animal => {
        const card = document.createElement("div");
        card.classList.add("animalCard");
        
        card.innerHTML = `<h3> Animal ${animal.id} </h3> 
        <p> It's a ${animal.name}!</p>`; 

        // add a class to the card based on the animal type, each type has a different bg color and image
        if (animal instanceof RedPanda) {
            card.classList.add("redPanda");

            const img = document.createElement("img");
            img.src = animal.img;
            img.alt = animal.name;
            img.classList.add("blockImage");
            card.appendChild(img);

        } else if (animal instanceof Dolphin) {
            card.classList.add("Dolphin");

            const img = document.createElement("img");
            img.src = animal.img;
            img.alt = animal.name;
            img.classList.add("blockImage");
            card.appendChild(img);

        } else if (animal instanceof Giraffe) {
            card.classList.add("Giraffe");

            const img = document.createElement("img");
            img.src = animal.img;
            img.alt = animal.name;
            img.classList.add("blockImage");
            card.appendChild(img);
        }

        // add the button, exists in all blocks
        const button = document.createElement("button");
        button.classList.add("interact-button");
        button.textContent = "Interact";

        button.addEventListener("click", () => {
            animal.interact(card);
        });

        card.appendChild(button);
        parent.appendChild(card);
    })

}

displayAnimals();


const resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click", () => {
    window.location.reload(); // reload the page to reset changes
});
