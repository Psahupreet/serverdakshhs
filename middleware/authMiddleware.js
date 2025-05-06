import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { config } from "../config/keys.js";

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, config.jwtSecret );
      //  console.log(decoded, "decode details ")
      req.user = await User.findById(decoded.userId).select("-password");
      req.userId = decoded.userId || decoded.id; // ✅ Fixed here
      // console.log(decoded.userId, "comment")
    // console.log(decoded,"hello ")
      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expired" });
      } else {
        return res.status(401).json({ message: "Invalid token" });
      }
      // console.error("Token validation failed:", error);
      // return res.status(401).json({ message: "Not authorized" });
    }
  } else {
    return res.status(401).json({ message: "No token, not authorized" });
  }
};
