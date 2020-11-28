import { connect } from "mongoose";

export const connectToDb = async (dbConnString: string): Promise<void> => {
	try {
		await connect(dbConnString, { useNewUrlParser: true, useUnifiedTopology: true });
	} catch (e) {
		throw new Error("Cannot connect to mongo database");
	}
};
