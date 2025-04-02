const fs = require("fs");
const readline = require("readline");

let data = { id: 0, actions: {} };

// lettura file json
try {
    const rawData = fs.readFileSync("todos.json", "utf8"); // Legge il file sincronicamente
    data = JSON.parse(rawData);
} catch (error) {
    console.error("Errore nella lettura del file JSON, creando un nuovo file...");
}

// stampa menù
console.log("1) CREA\n2) VISUALIZZA\n3) ELIMINA\n0) ESCI\n");

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
    read.question("Titolo: ", (titolo) => {
        read.question("Descrizione: ", (descrizione) => {
            let id = data.id; // recupero id
            data.actions[id] = { id: id, title: titolo, description: descrizione }; // salvataggio azione

            // incremento id
            data.id++;
            console.log("ID assegnato: " + id);

            // aggiornamento del file json
            updateJson();

            console.log("Azione salvata con successo!");
            menu(); // ritorna al menu principale
        });
    });
}

// metodo leggi azioni
function readAzioni() {
    console.log("Lista delle azioni salvate:");
    console.log(JSON.stringify(data.actions, null, 4));
    menu();
}

// metodo elimina azioni
function deleteAzioni() {
    read.question("ID da eliminare: ", (deleteId) => {
        if (data.actions[deleteId]) {
            delete data.actions[deleteId];

            // decremento numero id
            data.id--;

            // aggiornamento del file json
            updateJson();

            console.log("Azione eliminata con successo!");
        } else {
            console.log("ID non trovato!");
        }
        menu();
    });
}

// funzione per aggiornare il ToDo json
function updateJson() {
    fs.writeFileSync("todos.json", JSON.stringify(data, null, 4), "utf8");
}

menu(); // chiamata alla funzione menu per avviare il programma
