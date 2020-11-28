import * as bodyParser from "body-parser";
import express from "express";
import morgan from "morgan";

import { setUpCourseRoutes } from "./courses";
import { authenticate } from "./middlewares";
import { setUpUserRoutes } from "./users";
import { LoggerType } from "./utils";

export const app = async (logger: LoggerType): Promise<void> => {
	const CourseRoutes = setUpCourseRoutes(logger);
	const UserRoutes = setUpUserRoutes(logger);

	const app = express();
	const port = process.env.PORT;

	app.use(function (req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH,OPTIONS");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
		next();
	});
	app.use(morgan("dev"));
	app.use(bodyParser.urlencoded({ extended: false }));

	app.use(bodyParser.json());

	app.use("/users", UserRoutes);
	app.use(authenticate);
	app.use("/cursos", CourseRoutes);

	app.use((req, res, next) => res.status(404).json({ error: "Not found" }));

	app.listen(port, () => logger.info(`Running on port ${port}`));
};
