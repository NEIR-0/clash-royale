const { User } = require("../models");
const { createToken, verifyToken } = require("../helper/jwt");
const authentications = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    // console.log(authorization);
    const rawToken = authorization.split(" ");
    if (rawToken.length < 2) {
      throw { name: "invalidToken" };
    }

    if (rawToken[0] !== "Bearer") {
      throw { name: "invalidToken" };
    }

    const token = rawToken[1];
    const playLoad = verifyToken(token);

    const data = await User.findByPk(playLoad.id);
    if (!data) {
      throw { name: "invalidUser" };
    }

    req.user = data;
    // console.log(req.user);
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = authentications;
