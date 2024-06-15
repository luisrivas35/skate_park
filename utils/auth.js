// middleware/auth.js
import jwt from "jsonwebtoken";
import "dotenv/config";

export const isAuthenticated = (req, res, next) => {
  const sessionToken = req.session.token;
  if (sessionToken) {
    jwt.verify(sessionToken, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).send("Unauthorized: Invalid token");
      }
      req.user = decoded;
      next();
    });
  } else {
    res.status(401).send("Unauthorized: No token provided");
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.is_admin) {
    next();
  } else {
    res.status(403).send("Forbidden: Admins only");
  }
};
