import mongoose from "mongoose";

const alumnoSchema = new mongoose.Schema({
	nombre: { type: String, trim: true, required: true },
	apellido: { type: String, trim: true, required: true },
	dni: { type: Number, default: 0, required: true },
	direccion: { type: String, trim: true, required: true },
	nota: Number
});

export default mongoose.model("Alumno", alumnoSchema);
