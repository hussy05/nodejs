const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).send({
      message: 'Authorization token is required'
    });
  }

  jwt.verify(token.split(" ")[1], config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: 'Unauthorized!'
      });
    }

    req.userId = decoded.id;
    next();
  });
};

module.exports = verifyToken;
