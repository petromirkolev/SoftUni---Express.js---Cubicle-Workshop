const express = require('express');
const config = require('./config/config.js'); 
const app = express();
const handlebars = require('express-handlebars');

app.engine('hbs', handlebars({
    extname: 'hbs', 
}));
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('home', {layout: false});
})

app.listen(config.PORT, () => {
    console.log(`Server is running on port ${config.PORT}...`);
})
