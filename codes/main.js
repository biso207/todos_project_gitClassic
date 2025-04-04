const fs = require("fs");
const readline = require("readline");
const ToDo = require("./ToDo.js");

let data = { id: 0, actions: {} };

// lettura file json
try {
    const rawData = fs.readFileSync("todos.json", "utf8"); // Legge il file sincronicamente
    data = JSON.parse(rawData);
} catch (error) {
    console.error("Errore nella lettura del file JSON, creando un nuovo file...");
}

// stampa menù
console.log("1) CREA\n2) STAMPA AZIONI\n3) VISUALIZZA AZIONE\n4) ELIMINA\n0) ESCI\n");

// input tastiera
const read = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// scelta utente
function menu() {
    read.question("\nOperazione: ", (choice) => {
        switch (choice) {
            case "1":
                createAzioni();
                break;
            case "2":
                readAzioni();
                break;
            case "3":
                printToDo();
                break;
            case "4":
                deleteAzioni();
                break;
            case "0":
                console.log("Arrivederci!");
                read.close();
                return;
            default:
                console.log("Scelta non valida, riprova.");
                menu(); //fa da while dove quando choice è != da tutti i numeri continua a chiedere
                return;
        }
    });
}

// metodo crea azioni
function createAzioni() {
    read.question("Titolo: ", (title) => {
        read.question("Descrizione: ", (description) => {
            // incremento id
            data.id++; // globale

            // creazione oggetto classe ToDo
            let task = new ToDo(data.id, title, description);

            // salvataggio in data.actions con ID come chiave
            data.actions[data.id] = task.toJSON();

            // aggiornamento JSON
            updateJson();

            console.log("Azione salvata con successo! ID assegnato: " + data.id);

            // ritorno al menù
            menu();
        });
    });
}

// funzione per stampare una singola azione dal JSON recuperata con l'ID
function printToDo() {
    read.question("ID del ToDo da visualizzare: ", (id) => {
        let todo = data.actions[id]; // Recupera il ToDo dalla lista

        if (todo) {
            // creazione oggetto ToDO con valori recuperati
            let todoObj = new ToDo(todo.id, todo.title, todo.description, todo.isCompleted);
            console.log(JSON.stringify(todoObj.toJSON(), null, 4)); // stampa come JSON
        } else {
            console.log("ToDo non trovato!");
        }

        // ritorno al menù
        menu();
    });
}

// funzione per stampare tutte le azioni dal file JSON
function readAzioni() {
    console.log("Lista delle azioni salvate:");
    console.log(JSON.stringify(data.actions, null, 4));

    // ritorno al menù
    menu();
}

// metodo elimina azioni
function deleteAzioni() {
    read.question("ID da eliminare: ", (deleteId) => {
        if (data.actions[deleteId]) {
            delete data.actions[deleteId]; // elimina il todo

            // decremento id
            data.id--;

            // aggiornamento JSON
            updateJson();

            console.log("Azione eliminata con successo!");
        } else {
            console.log("ID non trovato!");
        }

        // ritorno al menù
        menu();
    });
}

// funzione per aggiornare il json
function updateJson() {
    fs.writeFileSync("todos.json", JSON.stringify(data, null, 4), "utf8");
}

// chiamata alla funzione menu per avviare il programma
menu();
