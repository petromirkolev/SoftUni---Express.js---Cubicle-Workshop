const fs = require('fs');
const productsData = require('../config/products.json');

class Model {
    save() {
        productsData.push(this);

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

module.exports = Model;