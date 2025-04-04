// import moduli esterni
const ToDoList = require('./ToDoList');
const readline = require("readline");
const fs = require("fs");


// init vettore data
let data = { id: 0, tasks: {} };
// lettura file json
try {
    const rawData = fs.readFileSync("todos.json", "utf8");
    data = JSON.parse(rawData);
} catch (error) {
    console.error("Errore nella lettura del file JSON, creando un nuovo file...");
}

// input tastiera
const read = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// oggetto ToDoList per le azioni sulle task
const list = new ToDoList(data, read, menu);

// stampa menù
console.log("1) CREA\n2) STAMPA AZIONI\n3) VISUALIZZA AZIONE\n4) ELIMINA\n0) ESCI\n");

// scelta utente
function menu() {
    read.question("\nOperazione: ", (choice) => {
        switch (choice) {
            case "1":
                list.createAzioni();
                break;
            case "2":
                list.readAzioni();
                break;
            case "3":
                list.printToDo();
                break;
            case "4":
                list.deleteAzioni();
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

// chiamata alla funzione menu per avviare il programma
menu();
