import express, { Router } from "express";

import { LoggerType } from "../../utils";

import { setUpMethods, courseValidator } from "./coursesMethods";

const router = express.Router();

export const setUpCourseRoutes = (logger: LoggerType): Router => {
	const {
		createCourseMethod,
		deleteCourseByIdMethod,
		getCoursesByIdMethod,
		getCoursesMethod,
		getStudentsFromCourseMethod,
	} = setUpMethods(logger);

	// TODO: Check requested query
	router.get("/", getCoursesMethod);
	// TODO: Check requested body parameters
	router.post("/", courseValidator, createCourseMethod);
	// TODO: Check retrieved documents
	router.get("/:idCourse", getCoursesByIdMethod);
	// TODO: Check if the course does not exist
	router.delete("/:idCourse", deleteCourseByIdMethod);
	// TODO: Check course existance
	router.get("/:idCourse/alumnos", getStudentsFromCourseMethod);

	return router;
};
