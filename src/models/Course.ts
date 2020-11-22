import mongoose from "mongoose";
import * as Student from "./Student";
const StudentSchema = Student.default.schema;

const courseSchema = new mongoose.Schema({
	year: { type: Date, default: new Date() },
	duration: { type: Number, required: true },
	subject: { type: String, trim: true, required: true },
	students: { type: [StudentSchema], default: [] },
});

export default mongoose.model("Course", courseSchema);
