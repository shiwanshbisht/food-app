import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secretKey = process.env.SECRET_KEY;

export const genrateToken = (user) => {
  const payLoad = {
    name: user.name,
    _id: user.id,
    email: user.email,
    role: user.role,
  };
  console.log("this is payload", payLoad);
  return jwt.sign(payLoad, secretKey);
};

export const genrateRefreshToken = (user) => {
  const payLoad = {
    username: user.username,
    _id: user._id,
    email: user.email,
    role: user.role,
  };
  return jwt.sign(payLoad, secretKey, { expiresIn: "15d" });
};

export const verifyToken = (token) => {
  return jwt.verify(token, secretKey);
};

// Middleware: verifies JWT token from Authorization header
export const fetchUser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }
  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token." });
  }
};

// Middleware: only allows users with role === "admin"
export const adminOnly = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ error: "Access denied. Admins only." });
  }
  next();
};
