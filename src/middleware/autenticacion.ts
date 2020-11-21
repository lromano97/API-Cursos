import { verify } from "jsonwebtoken";
import {Request, Response, NextFunction} from "express";

export default (req: Request, res: Response, next: NextFunction): void => {
	try {
		const token = req.headers["authorization"].split(" ")[1];
		const tokenDecodificado = verify(token, process.env.JWT_KEY);
		req["datosUser"] = tokenDecodificado;
		next();
	} catch (error) {
		res.status(401).json({
			error: "Autenticacion fallida"
		});
		return;
	}
};
