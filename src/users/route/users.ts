import express, { Router } from "express";

import { LoggerType } from "../../utils";

import { setUpMethods } from "./userMethods";
const router = express.Router();

const setUpUserRoutes = (logger: LoggerType): Router => {
	const { signInUser, signUpUser } = setUpMethods(logger);

	router.post("/signup", signUpUser);
	router.post("/signin", signInUser);

	return router;
};

export { setUpUserRoutes };
