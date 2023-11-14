const { User } = require("../models");
const authorize = async (req, res, next) => {
  try {
    // console.log(req.user);
    if (req.user.role === "admin") next();
    else {
      throw { name: "forbidden" };
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = authorize;
