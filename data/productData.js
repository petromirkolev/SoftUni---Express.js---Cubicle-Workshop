const productsData = require('../config/products.json');

module.exports = {
    getAll() {
        return productsData;
    },
    getOne(id) {
        return productsData.find(x => x.id == id);
    },
}