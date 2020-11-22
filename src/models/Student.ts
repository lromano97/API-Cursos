import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
	name: { type: String, trim: true, required: true },
	lastname: { type: String, trim: true, required: true },
	dni: { type: Number, default: 0, required: true },
	address: { type: String, trim: true, required: true },
	score: Number
});

export default mongoose.model("Student", studentSchema);
