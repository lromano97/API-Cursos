const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const User = require("../models/User");

router.post("/signup", function (req, res) {
    User.find({ username: req.body.username })
        .exec()
        .then((user) => {
            if (user.length != 0) {
                res.status(409).json({
                    mensaje: 'Nombre de usuario existente.'
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        res.status(500).json({
                            error: err
                        });
                        return;
                    }
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        username: req.body.username,
                        password: hash
                    });
                    user.save()
                        .then((result) => {
                            res.status(201).json({
                                mensaje: 'Usuario creado correctamente',
                                usuario: user.username
                            });
                        }).catch((err) => {
                            res.status(500).json({
                                error: err
                            })
                        });
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                error: err
            });
        });
});

router.post('/login', function (req, res) {
    User.findOne({username: req.body.username})
    .exec()
    .then((user) => {
        if(user == null){
            res.status(401).json({
                mensaje: 'Autenticacion fallida'
            });
            return;
        }
        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if(err){
                res.status(401).json({
                    mensaje: 'Autenticacion fallida'
                });
                return;
            }
            if (result) {
                const token = jwt.sign({
                    username: user.username,
                    id: user._id
                },
                process.env.JWT_KEY,
                {
                    expiresIn: '1h'
                });
                res.status(200).json({
                    mensaje: 'Autenticacion exitosa',
                    token: token
                });
                return;
            }
            res.status(401).json({
                mensaje: 'Autenticacion fallida'
            });
        });
    })
    .catch((err) => {
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;