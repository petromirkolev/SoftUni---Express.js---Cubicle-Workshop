const Accessory = require('../models/Accessory');
const Cube = require('../models/Cube');

async function getAll(query) {
    let products = await Cube.find({}).lean();

    if (query.search) {
        result = result.filter(x => x.name.toLowerCase().includes(query.search));
    }
    if (query.from) {
        result = result.filter(x => Number(x.level) >= query.from);
    }
    if (query.to) {
        result = result.filter(x => Number(x.level) <= query.to);
    }
    return products;
}

async function getOne(id) {
    let cube = await Cube.findById(id).lean();
    return cube;
}

function create(data) {
    let cube = new Cube(data);
    return cube.save();
};

async function attachAccessory(productId, accessoryId) {
    let product = await Cube.findById(productId);
    let accessory = await Accessory.findById(accessoryId);
    product.accessories.push(accessory);
    return product.save();
}

function getOneWithAccessories(id) {
    return Cube
        .findById(id)
        .populate('accessories')
        .lean();
}

module.exports = {
    create,
    getAll,
    getOne,
    attachAccessory,
    getOneWithAccessories, 
}
