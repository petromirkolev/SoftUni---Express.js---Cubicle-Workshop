const mongoose = require('mongoose');

module.exports = () => {

    mongoose.connect('mongodb://localhost/cubicle', {useNewUrlParser: true, useUnifiedTopology: true}); 
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Connection error:')); 
    db.once('open', () => console.log('Database Connected')); 
}