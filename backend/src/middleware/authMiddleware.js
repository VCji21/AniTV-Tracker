/* --- Middleware: Protects private routes and authenticate users --- */
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* -------------- Authorize user -------------- */
const authMiddleware = async (req, res, next) => {
  try {
    let token;
 
    // Check Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // Blocks unauthorized access
    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user (without password)
    req.user = await User.findById(decoded.id).select("-password");

    next();
  } catch (error) {
    return res.status(401).json({ 
      message: "Not authorized, token failed" 
    });
  }
};

export default authMiddleware;