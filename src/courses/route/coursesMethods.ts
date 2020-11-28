import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";

import { LoggerType } from "../../utils";
import { findCourse, createCourse, getCourseStudents, deleteCourse } from "../dal";

type Methods = {
	getCoursesMethod: (req: Request, res: Response, next: NextFunction) => void;
	getCoursesByIdMethod: (req: Request, res: Response, next: NextFunction) => void;
	createCourseMethod: (req: Request, res: Response, next: NextFunction) => void;
	getStudentsFromCourseMethod: (req: Request, res: Response, next: NextFunction) => void;
	deleteCourseByIdMethod: (req: Request, res: Response, next: NextFunction) => void;
};

export const courseValidator = [
	body("year").isDate(),
	body("duration").isNumeric(),
	body("subject").isString().isLength({ min: 2 }),
];

export const setUpMethods = (logger: LoggerType): Methods => {
	const getCoursesMethod = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		try {
			const courses = await findCourse(req.query);
			if (courses.length === 0) {
				logger.info("No courses were found. Returning 204.");
				res.sendStatus(204);
				return;
			}
			logger.info(`${courses.length} courses were found. Returning 200`);
			res.status(200).send(courses);
		} catch (e) {
			next(new Error(`Cannot get any courses - Detail ${e}`));
		}
	};

	const getCoursesByIdMethod = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		try {
			const { idCourse } = req.params;
			const matchedCourses = await findCourse({ _id: idCourse });
			if (matchedCourses.length === 0) {
				logger.info("No courses were found. Returning 204.");
				res.sendStatus(204);
				return;
			}
			logger.info(`Course with _id = ${idCourse} was found`);
			res.status(200).send(matchedCourses);
		} catch (err) {
			next(err);
		}
	};

	const createCourseMethod = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		try {
			await createCourse(req.body);
			res.sendStatus(201);
		} catch (err) {
			next(err);
		}
	};

	const getStudentsFromCourseMethod = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		try {
			const studentsOfTheCourse = await getCourseStudents({ _id: req.params.idCourse });
			if (studentsOfTheCourse.length === 0) {
				res.status(204).send({ message: "No students were available for the requested course" });
				return;
			}
			res.status(200).send(studentsOfTheCourse);
		} catch (err) {
			next(err);
		}
	};

	const deleteCourseByIdMethod = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		try {
			if (!req.params.idCourse) {
				res.status(400).send({ message: "Missing course id" });
			}
			await deleteCourse({ _id: req.params.idCourse });
			res.sendStatus(200);
		} catch (err) {
			next(err);
		}
	};

	return {
		getCoursesMethod,
		getCoursesByIdMethod,
		createCourseMethod,
		getStudentsFromCourseMethod,
		deleteCourseByIdMethod,
	};
};
