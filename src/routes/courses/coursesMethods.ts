import { Request, Response } from "express";
import { findCourse, createCourse, getCourseStudents, deleteCourse } from "../../dao";

export const getCoursesMethod = async (req: Request, res: Response): Promise<void> => {
	try {
		const courses = await findCourse(req.query);
		if (courses.length === 0) {
			res.sendStatus(204);
			return;
		}
		res.status(200).send(courses);
	} catch (e) {
		res.send(500).send({ message: `Cannot get any courses - Detail ${e}` });
	}
};

export const getCoursesByIdMethod = async (req: Request, res: Response): Promise<void> => {
	try {
		const matchedCourses = await findCourse({ _id: req.params.idCourse });
		res.status(200).send(matchedCourses);
	} catch (err) {
		res.status(500).send(err);
	}
};

export const createCourseMethod = async (req: Request, res: Response): Promise<void> => {
	try {
		await createCourse(req.body);
		res.sendStatus(201);
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	}
};

export const getStudentsFromCourseMethod = async (req: Request, res: Response): Promise<void> => {
	try {
		const studentsOfTheCourse = await getCourseStudents({ _id: req.params.idCourse });
		res.status(200).send(studentsOfTheCourse);
	} catch (err) {
		res.status(500).send(err);
	}
};

export const deleteCourseByIdMethod = async (req: Request, res: Response): Promise<void> => {
	try {
		await deleteCourse({ _id: req.params.idCourse });
		res.sendStatus(200);
	} catch (err) {
		res.status(500).send(err);
	}
};
