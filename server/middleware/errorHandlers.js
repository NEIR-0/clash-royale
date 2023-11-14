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
      res.status(500).json({ message: "jwt malformed" });
      break;
  }
};

module.exports = errHandlers;
