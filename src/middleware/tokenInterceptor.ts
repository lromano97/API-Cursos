import { verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export default (req: Request, res: Response, next: NextFunction): void => {
	try {
		if (!req.headers.authorization) throw new Error("Missing token");
		const token = req.headers["authorization"].split(" ")[1];
		const decodedToken = verify(token, process.env.JWT_KEY || "secret");
		req.token = decodedToken as string;
		next();
	} catch (error) {
		res.status(401).json({
			error: "Authentication failed",
		});
		return;
	}
};
