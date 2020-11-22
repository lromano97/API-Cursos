import { Document } from "mongoose";
import { UserCollection } from "./models";
import { UserType } from "../types";

type UserDocument = Document | UserType;

export const findUser = async (username: string): Promise<UserDocument | null> => {
	return await UserCollection.findOne({ username }).exec();
};

export const createUser = async (username: string, password: string): Promise<void> => {
	const newUser = new UserCollection({ username, password });
	await newUser.save();
};

