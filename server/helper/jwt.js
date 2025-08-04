require("dotenv").config({ path: "../.env" });
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_JWT;

const createToken = (playLoad) => {
  return jwt.sign(playLoad, secret);
};

const verifyToken = (playLoad) => {
  return jwt.verify(playLoad, secret);
};

module.exports = { createToken, verifyToken };
