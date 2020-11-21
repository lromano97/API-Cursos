import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	username: { type: String, required: true },
	password: { type: String, required: true }
});

const UserModel = mongoose.model("User", userSchema);

export default mongoose.model("User", userSchema);