import "dotenv/config";
const PG_SECRETS = {
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  ssl: process.env.PGSSL,
};
export { PG_SECRETS, My_PORT };
const My_PORT = process.env.MY_PORT;
