const errHandlers = async (err, req, res, next) => {
  console.log(err);
  switch (err.name) {
    case "invalidPassword":
      res.status(400).json({ message: "password cant empty" });
      break;
    case "invalidEmail":
      res.status(400).json({ message: "email cant empty" });
      break;
    case "duplicateCard":
      res.status(400).json({ message: "you already have one" });
      break;
    case "Unauthenticated":
      res.status(400).json({ message: "email/password invalid" });
      break;
    case "notEnough":
      res.status(400).json({ message: "your coin its not enough. Please top up now!" });
      break;

    case "SequelizeUniqueConstraintError":
      res.status(400).json({ message: err.errors[0].message });
      break;
    case "invalidToken":
    case "JsonWebTokenError":
      res.status(401).json({ message: "invalid token" });
      break;
    case "invalidUser":
      res.status(401).json({ message: "user not found" });
      break;
    case "forbidden":
      res.status(403).json({ message: "forbidden" });
      break;

    case "notFound":
      res.status(404).json({ message: "Not Found" });
      break;
    default:
      res.status(500).json({ message: "Internal Server Error" });
      break;
  }
};

module.exports = errHandlers;
