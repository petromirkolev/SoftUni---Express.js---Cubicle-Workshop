const fs = require('fs');
const productsData = require('../config/products.json');
const path = require('path');

class Cube {
    constructor(id, name, description, imageUrl, level) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.level = level;
    }

    save() {
        productsData.push(this );

        return fs.writeFile(__dirname + '/../config/products.json',
            JSON.stringify(productsData),
            (err) => {
                if (err) {
                    console.log(err);
                }
            }
        )
    }

    static getAll() {
        return productsData;
    }
    static getOne(id) {
        return productsData.find(x => x.id == id); 
    }
}

module.exports = Cube;