import bodyParser from "body-parser";
import express from "express";
import morgan from "morgan";
import "./dao";
import { CursosRoute } from "./routes";

const app = express();
// const usersRoutes = require("./routes/users.js");
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
app.use("/cursos", CursosRoute);
// app.use("/users", usersRoutes);
app.use((req, res, next) => {
	res.status(404).json({
		error: "Ruta no encontrada",
	});
});

app.listen(port, () => console.log(`Running on port ${port}`));

// mongoose.connect(process.env.MONGO_ROUTE, { useNewUrlParser: true });
// var db = mongoose.connection;

// db.on("error", console.error.bind(console, "connection error:"));

// db.once("open", function () {
// 	app.listen(port, () => console.log("Corriendo en " + port));
// });
