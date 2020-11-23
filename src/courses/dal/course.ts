import { Document } from "mongoose";

import { CourseType, StudentType } from "../types";

import { CourseCollection } from "./models";

type Query = { [key: string]: string | number | Date };

type CourseDocument = Document & CourseType;
type StudentDocument = Document & StudentType;

export const findCourse = async (query: any): Promise<CourseDocument[]> => {
	return (await CourseCollection.find(query).exec()) as CourseDocument[];
};

export const createCourse = async (courseInfo: CourseType): Promise<void> => {
	const newCourse = new CourseCollection(courseInfo);
	await newCourse.save();
};

export const deleteCourse = async (query: Query): Promise<void> => {
	await CourseCollection.findOneAndDelete(query).exec();
};

export const getCourseStudents = async (query: Query): Promise<StudentDocument[]> => {
	return (await CourseCollection.find(query).select("students").exec()) as StudentDocument[];
};
