import { jwtValidate } from "../auth/jwt-auth.js";

const authValidationMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new Error("Authorization header is missing!");
    }

    const jwtToken = authHeader.split(" ")[1];
    if (!jwtToken) {
      throw new Error("JWT Token is missing!");
    }

    const tokenData = jwtValidate(jwtToken);
    req.user = tokenData;
    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export { authValidationMiddleware };
