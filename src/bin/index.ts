import { app } from "../app";
import { connectToDb, setUpLogger } from "../utils";

const server = async (): Promise<void> => {
	const logPath = process.env.LOG_PATH || "./tmp";
	const logger = await setUpLogger(logPath);
	await connectToDb(process.env.MONGO_ROUTE || "mongodb://localhost/courses");
	await app(logger);
	process.on("SIGINT", () => {
		logger.info("The process received a SIGINT signal");
		process.exit(0);
	});
	process.on("unhandledRejection", (err) => {
		logger.error(`Unhandled rejection - ${err}`);
		process.exit(0);
	});
	process.on("uncaughtException", (err) => {
		logger.error(`Uncaught exception - ${err}`);
		process.exit(0);
	});
};

if (module.children) {
	(async () => {
		await server();
	})();
}

export default server;
