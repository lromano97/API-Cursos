const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();
const cursosRoutes = require('./routes/cursos.js');
const port = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/cursos', cursosRoutes);

mongoose.connect('mongodb://localhost/dblandit', {useNewUrlParser: true});
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
    app.listen(port, () => console.log('Corriendo en ' + port));
})