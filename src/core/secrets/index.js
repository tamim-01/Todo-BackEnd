import "dotenv/config";
const PG_SECRETS = {
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  ssl: process.env.PGSSL,
};
const JWT_SECRETS = {
  signKey: process.env["SIGN_KEY"],
};
export { PG_SECRETS, JWT_SECRETS };
