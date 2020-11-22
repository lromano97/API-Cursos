import { connect } from "mongoose";

(async () => {
	try {
		await connect(process.env.MONGO_ROUTE || "mongodb://localhost/dblandit");
	} catch (e) {
		throw new Error("Cannot connect to mongo database");
	}
})();

export { createUser, findUser } from "./user";
export { findCourse, createCourse, deleteCourse, getCourseStudents } from "./course";
