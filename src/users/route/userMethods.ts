import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { Request, Response } from "express";

import { createUser, findUser } from "../dal";

export const signUpUser = async (req: Request, res: Response): Promise<void> => {
	const { username, password } = req.body;
	try {
		const existingUser = await findUser({ username });
		if (existingUser) {
			res.status(400).send({ message: "The specified username already exists" });
			return;
		}
		const encryptedPassword = await bcrypt.hash(password, 10);
		await createUser(username, encryptedPassword);
		res.status(200).send({ message: `User ${username} created successfully` });
	} catch (err) {
		res.status(500).send(err);
	}
};

export const signInUser = async (req: Request, res: Response): Promise<void> => {
	const { username, password } = req.body;
	try {
		const existingUser = await findUser({ username });
		if (!existingUser) {
			res.status(401).send({ message: "Authentication failed" });
			return;
		}
		const passwordCompareResult = await bcrypt.compare(password, existingUser.password);
		if (passwordCompareResult) {
			const token = jwt.sign({ username, password }, process.env.JWT_KEY || "secret", { expiresIn: "1h" });
			res.status(200).send({ token });
			return;
		}
		res.status(401).send({ message: "Authentication failed" });
	} catch (err) {
		res.status(500).send(err);
	}
};