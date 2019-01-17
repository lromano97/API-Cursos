const mongoose = require('mongoose');

const alumnoSchema = mongoose.Schema({
        _id: false,
        nombre: {type: String, trim: true, required: true},
        apellido: {type: String, trim: true, required: true},
        dni: {type: Number, default: 0, required: true},
        direccion: {type: String, trim: true, required: true},
        nota: Number
});

module.exports = mongoose.model('Alumno', alumnoSchema);
