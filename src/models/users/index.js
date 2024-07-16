import { query } from "../../core/database-manager/postgres-service.js";
import format from "pg-format";
const SCHEMA = "public";
const NAME = "users";

export async function getUserById(id) {
  let sqlQuery, sqlVariables;

  sqlQuery = `SELECT * FROM ${SCHEMA}.${NAME}
      WHERE user_id = $1`;
  sqlVariables = [id];

  return (await query(sqlQuery, sqlVariables)).rows;
}
export async function createUser(userName, password) {
  const sqlQuery = `INSERT INTO ${SCHEMA}.${NAME} (username , password)
    VALUES
      ( $1 , $2 );`;

  const sqlVariables = [userName, password];
  return query(sqlQuery, sqlVariables);
}
export async function updateUserDataById(id, column, value) {
  const sqlQuery = format(
    `UPDATE %I.%I SET %I = $1 WHERE user_id = $2;`,
    SCHEMA,
    NAME,
    column
  );
  const sqlVariables = [value, id];

  return query(sqlQuery, sqlVariables);
}
