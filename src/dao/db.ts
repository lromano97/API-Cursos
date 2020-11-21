import { Mongoose, connect } from "mongoose";
import User from "../models/User";

const connect = async (mongoRoute: string): Mongoose => {
	return connect(mongoRoute);
};

const findUser = async (username: string) => {
	return await User.findOne({username});
};


const createUser = async (username: string, password: string) => {
	const newUser = new User({ username, password });
	await newUser.save();
};
const findCourse = () => {};