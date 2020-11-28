import { mkdir, existsSync } from "fs";
import { promisify } from "util";

import { configure, getLogger } from "log4js";

export type Logger = {
	info: (message: string) => void;
	debug: (message: string) => void;
	error: (message: string) => void;
	warn: (message: string) => void;
};

const mkdirAsync = promisify(mkdir);

export const setUpLogger = async (logPath: string): Promise<Logger> => {
	if (!existsSync(logPath)) {
		await mkdirAsync(logPath);
	}
	configure({
		appenders: { app: { type: "file", filename: `${logPath}/coursesApi.log` } },
		categories: { default: { appenders: ["app"], level: "debug" } },
	});
	const logger = getLogger();
	logger.info("Logger ready");
	return logger;
};
