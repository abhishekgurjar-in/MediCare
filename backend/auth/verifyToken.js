import jwt from "jsonwebtoken";
import Doctor from "../models/DoctorSchema.js";
import User from "../models/UserSchema.js";

export const authenticate = async (req, res, next) => {
  // Get token from headers
  const authToken = req.headers.authorization;

  // Check if token exists and is in the correct format
  if (!authToken || !authToken.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "No token, authorization denied",
    });
  }

  try {
    console.log(authToken);
    // Extract the token by removing the "Bearer " prefix
    const token = authToken.split(" ")[1];

    // Verify the token (this assumes a secret is used for verification)
    const decoded = jwt.verify(token, process.env.JWT_SECRET_Key);

    // Attach user information to the request object
    req.userId = decoded.id;
    req.role = decoded.role;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    if (ErrorEvent.name === "TokeExpiredError") {
      return res.status(401).json({
        message: "Token is expired",
      });
    }
    return res.status(401).json({
      success: false,
      message: "Token is not valid",
    });
  }
};

export const restrict = (roles) => async (req, res, next) => {
    const userId = req.userId; // Ensure that req.userId is properly set by the authenticate middleware
    let user;
  
    // Fetch the user by ID from both User and Doctor models
    const patient = await User.findById(userId);
    const doctor = await Doctor.findById(userId);
  
    if (patient) {
      user = patient;
    } else if (doctor) {
      user = doctor;
    } else {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  
    // Check if the user's role is allowed
    if (!roles.includes(user.role)) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to access this resource",
      });
    }
  
    next();
  };
  