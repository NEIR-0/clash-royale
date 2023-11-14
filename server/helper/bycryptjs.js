const bycryptjs = require("bcryptjs");

const hashing = (planText) => {
  return bycryptjs.hashSync(planText, bycryptjs.genSaltSync(10));
};

const compare = (planText, password) => {
  return bycryptjs.compareSync(planText, password);
};

module.exports = { hashing, compare };
