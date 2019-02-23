const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        console.log(req.headers);
        const token = req.headers['authorization'].split(' ')[1];
        const tokenDecodificado = jwt.verify(token, process.env.JWT_KEY);
        req.datosUser = tokenDecodificado;
        next();
    } catch (error) {
        res.status(401).json({
            error: 'Autenticacion fallida'
        });
        return;
    }
};
