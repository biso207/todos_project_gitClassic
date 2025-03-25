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
console.log("1) POST\n2) GET\n3) DELETE");

// input tastiera
const read = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// scelta utente
read.question("Operazione: ", (choice) => {
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
        default:
            console.log("WRONG VALUE");
            read.close();
    }
});

// metodo crea azioni
function createAzioni() {
    read.question("Titolo: ", (titolo) => {
        read.question("Descrizione: ", (descrizione) => {
            let id = data.id; // recupero id
            data.actions[id] = { id: id, title: titolo, description: descrizione }; // salvataggio azione

            // incremento id
            data.id++;

            // aggiornamento del file json
            fs.writeFileSync("todos.json", JSON.stringify(data, null, 4), "utf8");
            console.log("Azione salvata con successo!");
            read.close();
        });
    });
}

// metodo leggi azioni
function readAzioni() {
    console.log("Lista delle azioni salvate:");
    console.log(JSON.stringify(data.actions, null, 4));
    read.close();
}

// metodo elimina azioni
function deleteAzioni() {
    read.question("ID da eliminare: ", (deleteId) => {
        if (data.actions[deleteId]) {
            delete data.actions[deleteId];

            // decremento numero id
            data.id--;

            // aggiornamento del file json
            fs.writeFileSync("todos.json", JSON.stringify(data, null, 4), "utf8");
            console.log("Azione eliminata con successo!");
        } else {
            console.log("ID non trovato!");
        }
        read.close();
    });
}
