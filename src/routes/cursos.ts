import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
const router = express.Router();
import { checkSchema, validationResult } from "express-validator/check";
import autenticacion from "../middleware/autenticacion";

import Curso from "../models/Cursos";

router.use(bodyParser.urlencoded({ extended: true }));

router.use(autenticacion);

router.get("/", function(req, res) {
	Curso.find(req.query)
		.exec()
		.then(doc => {
			if (doc.length == 0) {
				res.status(404).json({
					mensaje:
                        "No se encontraron cursos para los parametros ingresados"
				});
				return;
			}
			res.status(200).json(doc);
		})
		.catch(err => {
			res.status(500).json({ error: err });
		});
});

router.post(
	"/",
	checkSchema({
		anioDictado: {
			in: ["body"],
			errorMessage: "El campo anioDictado es incorrecto"
		},
		duracion: {
			in: ["body"],
			errorMessage: "El campo duracion es incorrecto",
			isString: true
		},
		tema: {
			in: ["body"],
			errorMessage: "El campo tema es incorrecto",
			isString: true
		}
	}),
	function(req, res) {
		const validation = validationResult(req).array();
		if (validation.length > 0) {
			res.status(400).json({ validation });
			return;
		}
		const curso = new Curso({
			_id: new mongoose.Types.ObjectId(),
			anioDictado: req.body.anioDictado,
			duracion: req.body.duracion,
			tema: req.body.tema,
			alumnos: req.body.alumnos
		});

		curso
			.save()
			.then(doc => {
				res.status(201).json(doc);
			})
			.catch(err => {
				res.status(500).json(err);
			});
	}
);

router.get("/:idCurso", function(req, res) {
	Curso.find({ _id: req.params.idCurso })
		.exec()
		.then(doc => {
			if (doc.length === 0) {
				res.status(404).json({
					mensaje: "No se encontro ningun curso para el Id provisto"
				});
			} else if (doc) {
				res.status(200).json(doc);
			}
		})
		.catch(err => {
			res.status(500).json({
				error: err
			});
		});
});

router.delete("/:idCurso", function(req, res) {
	Curso.findOneAndDelete({ _id: req.params.idCurso })
		.exec()
		.then(function(curso) {
			if (curso == null) {
				res.status(404).json({
					mensaje: "No se encontro ningun curso con el id provisto"
				});
				return;
			}
			res.status(200).json(curso);
		})
		.catch(err => {
			res.status(500).json({ error: err });
		});
});

router.get("/:idCurso/alumnos", function(req, res) {
	Curso.find({ _id: req.params.idCurso })
		.select("alumnos")
		.exec()
		.then(doc => {
			if (doc.length === 0) {
				res.status(404).json({
					mensaje: "No se encontro ningun curso para el Id provisto"
				});
			} else if (doc[0].alumnos.length === 0) {
				res.status(404).json({
					mensaje: "No hay alumnos para el curso seleccionado"
				});
			} else if (doc) {
				res.status(200).json(doc);
			}
		})
		.catch(err => {
			res.status(500).json({ error: err });
		});
});

router.get("/:idCurso/alumnoDestacado", function(req, res) {
	Curso.aggregate([
		{
			$unwind: "$alumnos"
		},
		{
			$match: {
				_id: new mongoose.Types.ObjectId(req.params.idCurso)
			}
		},
		{
			$project: {
				alumnos: 1,
				_id: 0
			}
		},
		{
			$sort: {
				"alumnos.nota": -1
			}
		},
		{
			$limit: 1
		}
	])
		.exec()
		.then(doc => {
			if (doc.length === 0) {
				res.status(404).json({
					mensaje:
                        "No se encontraron alumnos destacados para el curso elegido"
				});
			} else if (doc) {
				res.status(200).json(doc);
			}
		})
		.catch(err => {
			res.status(500).json({ error: err });
		});
});

router.patch(
	"/:idCurso",
	checkSchema({
		anioDictado: {
			in: ["body"],
			errorMessage: "El campo anioDictado es incorrecto"
		},
		duracion: {
			in: ["body"],
			errorMessage: "El campo duracion es incorrecto",
			isString: true
		},
		tema: {
			in: ["body"],
			errorMessage: "El campo tema es incorrecto",
			isString: true
		}
	}),
	function(req, res) {
		Curso.findOneAndUpdate(
			{ _id: req.params.idCurso },
			{
				$set: {
					tema: req.body.tema,
					anioDictado: req.body.anioDictado,
					duracion: req.body.duracion,
					alumnos: req.body.alumnos
				}
			},
			{
				new: true
			}
		)
			.exec()
			.then(doc => {
				if (doc === null) {
					res.status(404).json({
						mensaje: "Documento no encontrado"
					});
				} else {
					res.status(201).json(doc);
				}
			})
			.catch(err => {
				res.status(500).json({
					error: err
				});
			});
	}
);

router.patch(
	"/:idCurso/:dniAlumno/nota",
	checkSchema({
		nota: {
			in: ["body"],
			errorMessage: "El campo nota es incorrecto",
			isInt: true,
			toInt: true
		}
	}),
	function(req, res) {
		Curso.findOneAndUpdate(
			{
				_id: req.params.idCurso,
				"alumnos.dni": req.params.dniAlumno
			},
			{
				$set: { "alumnos.$.nota": req.body.nota }
			},
			{
				new: true
			}
		)
			.exec()
			.then(doc => {
				if (doc == null) {
					res.status(404).json({
						mensaje:
                            "No se encontro ninguna entrada con el id de curso y dni provisto"
					});
					return;
				}
				res.status(200).json(doc);
			})
			.catch(err => {
				res.status(500).json({ error: err });
			});
	}
);

export {router};
