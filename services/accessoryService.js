const Accessory = require('../models/Accessory');

function create(data) {
    let accessory = new Accessory(data);
    return accessory.save();
};

function getAll() {
    let accessories = Accessory.find({}).lean();
    return accessories;
};

module.exports = {
    create,
    getAll,
}
