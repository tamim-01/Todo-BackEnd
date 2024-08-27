import bcrypt from "bcryptjs";
import { BCRYPT_CONFIG } from "../../config/index.js";

async function hash(input) {
  try {
    const salt = await bcrypt.genSaltSync(BCRYPT_CONFIG.rounds);
    const hash = await bcrypt.hashSync(input, salt);

    return hash;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

async function validateHash(input, hash) {
  try {
    const compare = await bcrypt.compareSync(input, hash);

    return compare;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

export { hash, validateHash };
