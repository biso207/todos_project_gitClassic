class Task {
    #id;
    #title;
    #description;
    #isCompleted;

    // costruttore
    constructor(id, title, description, isCompleted) {
        this.#id = id;  // Variabile interna privata
        this.#title = title;
        this.#description = description;
        this.#isCompleted = isCompleted;
    }

    // GETTER
    get id() { return this.#id; }
    get title() { return this.#title; }
    get description() { return this.#description; }
    get isCompleted() { return this.#isCompleted; }

    // SETTER
    set id(data) { this.#id = data; }
    set title(title) { this.#title = title; }
    set description(description) { this.#description = description; }
    set isCompleted(completed) { this.#isCompleted = completed; }

    // funzione per stampare le task
    toJSON() {
        return {
            id: this.#id,
            title: this.#title,
            description: this.#description,
            isCompleted: this.#isCompleted
        };
    }
}

module.exports = Task;
