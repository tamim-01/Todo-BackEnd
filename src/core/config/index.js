const EXPRESS_APP = {
  port: process.env.MY_PORT,
};
const BCRYPT_CONFIG = {
  rounds: process.env["BCRYPTE_ROUNDS"],
};

export { EXPRESS_APP, BCRYPT_CONFIG };
