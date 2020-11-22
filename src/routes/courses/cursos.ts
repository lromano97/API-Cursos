import express from "express";
const router = express.Router();

import {
	createCourseMethod,
	deleteCourseByIdMethod,
	getCoursesByIdMethod,
	getCoursesMethod,
	getStudentsFromCourseMethod,
} from "./coursesMethods";

// TODO: Check requested query
router.get("/", getCoursesMethod);

// TODO: Check requested body parameters
router.post("/", createCourseMethod);

// TODO: Check retrieved documents
router.get("/:idCourse", getCoursesByIdMethod);

// TODO: Check if the course does not exist
router.delete("/:idCourse", deleteCourseByIdMethod);

// TODO: Check course existance
router.get("/:idCourse/alumnos", getStudentsFromCourseMethod);

// router.get("/:idCurso/alumnoDestacado", function (req, res) {
// 	Curso.aggregate([
// 		{
// 			$unwind: "$alumnos",
// 		},
// 		{
// 			$match: {
// 				_id: new mongoose.Types.ObjectId(req.params.idCurso),
// 			},
// 		},
// 		{
// 			$project: {
// 				alumnos: 1,
// 				_id: 0,
// 			},
// 		},
// 		{
// 			$sort: {
// 				"alumnos.nota": -1,
// 			},
// 		},
// 		{
// 			$limit: 1,
// 		},
// 	])
// 		.exec()
// 		.then((doc) => {
// 			if (doc.length === 0) {
// 				res.status(404).json({
// 					mensaje: "No se encontraron alumnos destacados para el curso elegido",
// 				});
// 			} else if (doc) {
// 				res.status(200).json(doc);
// 			}
// 		})
// 		.catch((err) => {
// 			res.status(500).json({ error: err });
// 		});
// });

// router.patch(
// 	"/:idCurso",
// 	checkSchema({
// 		anioDictado: {
// 			in: ["body"],
// 			errorMessage: "El campo anioDictado es incorrecto",
// 		},
// 		duracion: {
// 			in: ["body"],
// 			errorMessage: "El campo duracion es incorrecto",
// 			isString: true,
// 		},
// 		tema: {
// 			in: ["body"],
// 			errorMessage: "El campo tema es incorrecto",
// 			isString: true,
// 		},
// 	}),
// 	function (req, res) {
// 		Curso.findOneAndUpdate(
// 			{ _id: req.params.idCurso },
// 			{
// 				$set: {
// 					tema: req.body.tema,
// 					anioDictado: req.body.anioDictado,
// 					duracion: req.body.duracion,
// 					alumnos: req.body.alumnos,
// 				},
// 			},
// 			{
// 				new: true,
// 			}
// 		)
// 			.exec()
// 			.then((doc) => {
// 				if (doc === null) {
// 					res.status(404).json({
// 						mensaje: "Documento no encontrado",
// 					});
// 				} else {
// 					res.status(201).json(doc);
// 				}
// 			})
// 			.catch((err) => {
// 				res.status(500).json({
// 					error: err,
// 				});
// 			});
// 	}
// );

// router.patch(
// 	"/:idCurso/:dniAlumno/nota",
// 	checkSchema({
// 		nota: {
// 			in: ["body"],
// 			errorMessage: "El campo nota es incorrecto",
// 			isInt: true,
// 			toInt: true,
// 		},
// 	}),
// 	function (req, res) {
// 		Curso.findOneAndUpdate(
// 			{
// 				_id: req.params.idCurso,
// 				"alumnos.dni": req.params.dniAlumno,
// 			},
// 			{
// 				$set: { "alumnos.$.nota": req.body.nota },
// 			},
// 			{
// 				new: true,
// 			}
// 		)
// 			.exec()
// 			.then((doc) => {
// 				if (doc == null) {
// 					res.status(404).json({
// 						mensaje: "No se encontro ninguna entrada con el id de curso y dni provisto",
// 					});
// 					return;
// 				}
// 				res.status(200).json(doc);
// 			})
// 			.catch((err) => {
// 				res.status(500).json({ error: err });
// 			});
// 	}
// );

export { router };
