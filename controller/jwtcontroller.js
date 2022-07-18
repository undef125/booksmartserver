
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config('../.env');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(!token) {
        return res.status(400).json({ message: 'Token is missing!!'});
    }

    jwt.verify( token, process.env.ACCESS_SECRET_KEY, (error, user) => {
        if(error) return res.status(400).json({ message: "invalid token" });
        req.user = user;
        next();
    })
};

module.exports = authenticateToken;