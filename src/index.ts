import * as bodyParser from "body-parser";
import express from "express";
import { connect } from "mongoose";
import morgan from "morgan";

import { CourseRoutes } from "./courses";
import autenticacion from "./middleware/tokenInterceptor";
import { UserRoutes } from "./users";

(async () => {
	try {
		await connect(process.env.MONGO_ROUTE || "mongodb://localhost/courses", {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
	} catch (e) {
		throw new Error("Cannot connect to mongo database");
	}
})();

const app = express();
const port = process.env.PORT;

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH,OPTIONS");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	next();
});
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use("/users", UserRoutes);
app.use(autenticacion);
app.use("/cursos", CourseRoutes);

app.use((req, res, next) => {
	res.status(404).json({
		error: "Ruta no encontrada",
	});
});

app.listen(port, () => console.log(`Running on port ${port}`));
