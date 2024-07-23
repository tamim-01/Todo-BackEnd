import jwt from "jsonwebtoken";
import { JWT_SECRETS } from "../secrets/index.js";

function jwtSign(data) {
  return jwt.sign(data, JWT_SECRETS.signKey);
}

function jwtValidate(jwt) {
  try {
    return jwt.verify(jwt, JWT_SECRETS.signKey);
  } catch (err) {
    console.log(err);
    return null;
  }
}

export { jwtSign, jwtValidate };
