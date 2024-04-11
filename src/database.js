const mongoose = require("mongoose");
const configObject = require("./config/config.js");
const {MONGODB_URI} = configObject;

class BaseDatos {
    static #instancia; 

    constructor(){
        mongoose.connect(MONGODB_URI);
    }

    static getInstancia() {
        if(this.#instancia) {
            console.log("Conexión previa");
            return this.#instancia;
        }

        this.#instancia = new BaseDatos();
        console.log("Conexión exitosa a Atlas.com");
        return this.#instancia;
    }
}

module.exports = BaseDatos.getInstancia();