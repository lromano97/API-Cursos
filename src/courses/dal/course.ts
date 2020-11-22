import { Document } from "mongoose";
import { CourseCollection } from "./models";
import {CourseType, StudentType} from "../types";

type Query = { [key: string]: string | number | Date };

type CourseDocument = Document | CourseType;
type StudentDocument = Document | StudentType;

export const findCourse = async (query: any): Promise<CourseDocument[]> => {
	return await CourseCollection.find(query).exec();
};

export const createCourse = async (courseInfo: CourseType): Promise<void> => {
	const newCourse = new CourseCollection(courseInfo);
	await newCourse.save();
};

export const deleteCourse = async (query: Query): Promise<void> => {
	await CourseCollection.findOneAndDelete(query).exec();
};

export const getCourseStudents = async (query: Query): Promise<StudentDocument[]> => {
	return await CourseCollection.find(query).select("students").exec();
};
