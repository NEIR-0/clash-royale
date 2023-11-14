const errHandlers = async (err, req, res, next) => {
  console.log(err);
  switch (err.name) {
    case "invalidPassword":
      res.status(400).json({ message: "password cant empty" });
      break;
    case "invalidEmail":
      res.status(400).json({ message: "email cant empty" });
      break;

    case "Unauthenticated":
      res.status(400).json({ message: "email/password invalid" });
      break;

    case "SequelizeUniqueConstraintError":
      res.status(400).json({ message: err.errors[0].message });
      break;

    default:
      res.status(500).json({ message: "Internal Server Error" });
      break;
  }
};

module.exports = errHandlers;
