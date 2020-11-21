import mongoose from "mongoose";
import * as Alumno from "./Alumnos";
const AlumnoSchema = Alumno.default.schema;

const cursoSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	anioDictado: { type: Date, default: new Date() },
	duracion: { type: Number, required: true },
	tema: { type: String, trim: true, required: true },
	alumnos: { type: [AlumnoSchema], default: [] }
});

export default mongoose.model("Curso", cursoSchema);
