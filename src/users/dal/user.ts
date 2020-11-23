import { Document } from "mongoose";

import { UserType } from "../types";

import { UserCollection } from "./models";

type UserDocument = Document & UserType;
type Query = { [key: string]: string };

export const findUser = async (query: Query): Promise<UserDocument | null> => {
	return (await UserCollection.findOne(query).exec()) as UserDocument;
};

export const createUser = async (username: string, password: string): Promise<void> => {
	const newUser = new UserCollection({ username, password });
	await newUser.save();
};
