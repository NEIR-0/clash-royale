const { User } = require("../models");
const authentications = async (req, res, next) => {
  try {
    const { Authorization } = req.header;
    console.log(Authorization);
  } catch (error) {
    console.log(error);
  }
};

module.exports = authentications;
