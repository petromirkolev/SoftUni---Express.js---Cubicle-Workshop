const uniqid = require('uniqid');
const Cube = require('../models/cube');
const fs = require('fs');
let productsData = require('../config/products.json');

function create(data) {
    let cube = new Cube(
        uniqid(),
        data.name,
        data.description,
        data.imageUrl,
        data.difficultyLevel
    );

    productsData.push(cube);

    fs.writeFile(__dirname + '/../config/products.json', JSON.stringify(productsData), (err) => {

        if (err) {
            console.log(err);
            return;
        }
    })
};


module.exports = {
    create,
}