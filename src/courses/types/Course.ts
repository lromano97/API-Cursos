import { Student } from "./Student";

export type Course = {
	year: Date;
	duration: number;
	subject: string;
	students: Student[];
};
