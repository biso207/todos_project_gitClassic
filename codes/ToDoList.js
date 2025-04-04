// import moduli esterni
const ToDo = require("./Task.js");
const fs = require("fs");

// classe ToDoList per gestire le azioni per le task
class ToDoList {
    #data;
    #read;
    #menu;

    constructor(data, read, menu) {
        this.#data = data;
        this.#read = read;
        this.#menu = menu;
    }

    // metodo crea azioni
    createAzioni() {
        this.#read.question("Titolo: ", (title) => {
            this.#read.question("Descrizione: ", (description) => {
                // incremento id
                this.#data.id++; // globale

                // creazione oggetto classe ToDo
                let task = new ToDo(this.#data.id, title, description);

                // salvataggio in this.data.actions con ID come chiave
                this.#data.tasks[this.#data.id] = task.toJSON();

                // aggiornamento JSON
                this.updateJson();

                console.log("Azione salvata con successo! ID assegnato: " + this.#data.id);

                // ritorno al menù
                this.#menu();
            });
        });
    }

    // funzione per stampare una singola azione dal JSON recuperata con l'ID
    printToDo() {
        this.#read.question("ID del ToDo da visualizzare: ", (id) => {
            let todo = this.#data.tasks[id]; // Recupera il ToDo dalla lista

            if (todo) {
                // creazione oggetto ToDO con valori recuperati
                let todoObj = new ToDo(todo.id, todo.title, todo.description, todo.isCompleted);
                console.log(JSON.stringify(todoObj.toJSON(), null, 4)); // stampa come JSON
            } else {
                console.log("ToDo non trovato!");
            }

            // ritorno al menù
            this.#menu();
        });
    }

    // funzione per stampare tutte le azioni dal file JSON
    readAzioni() {
        console.log("Lista delle azioni salvate:");
        console.log(JSON.stringify(this.#data.tasks, null, 4));

        // ritorno al menù
        this.#menu();
    }

    // metodo elimina azioni
    deleteAzioni() {
        this.#read.question("ID da eliminare: ", (deleteId) => {
            if (this.#data.tasks[deleteId]) {
                delete this.#data.tasks[deleteId]; // elimina il todo

                // decremento id
                this.#data.id--;

                // aggiornamento JSON
                this.updateJson();

                console.log("Azione eliminata con successo!");
            } else {
                console.log("ID non trovato!");
            }

            // ritorno al menù
            this.#menu();
        });
    }

    // funzione per aggiornare il json
    updateJson() {
        fs.writeFileSync("todos.json", JSON.stringify(this.#data, null, 4), "utf8");
    }
}

module.exports = ToDoList;