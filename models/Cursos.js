const mongoose = require('mongoose');
const Alumno = require('./Alumnos.js').schema;

const cursoSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    anioDictado: { type: Date, default: new Date() },
    duracion: { type: Number, required: true },
    tema: { type: String, trim: true, required: true },
    alumnos: { type: [Alumno], default: [] }
});

module.exports = mongoose.model('Curso', cursoSchema);
