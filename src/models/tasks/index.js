import { query } from "../../core/database/postgres-service.js";
import format from "pg-format";
const SCHEMA = "public";
const NAME = "tasks";

export async function getTasksByUserId(userId) {
  let sqlQuery, sqlVariables;

  sqlQuery = `SELECT * FROM ${SCHEMA}.${NAME} WHERE user_id = $1`;
  sqlVariables = [userId];
  return (await query(sqlQuery, sqlVariables)).rows;
}

export async function getTaskById(id, userId) {
  let sqlQuery, sqlVariables;

  sqlQuery = `SELECT * FROM ${SCHEMA}.${NAME}
      WHERE id = $1 and user_id = $2`;
  sqlVariables = [id, userId];

  return (await query(sqlQuery, sqlVariables)).rows;
}

export async function createTask(userId, title, description, taskdate) {
  const sqlQuery = `INSERT INTO ${SCHEMA}.${NAME} (user_id ,title, description , taskdate , is_completed)
    VALUES
      ( $1 , $2 , $3 , $4 , false );`;

  const sqlVariables = [userId, title, description, taskdate];
  return query(sqlQuery, sqlVariables);
}

export async function deleteAllTasks(userId) {
  let sqlQuery, sqlVariables;

  sqlQuery = `DELETE FROM ${SCHEMA}.${NAME} WHERE user_id = $1`;
  sqlVariables = [userId];

  return query(sqlQuery, sqlVariables);
}

export async function deleteTaskById(id, userId) {
  const sqlQuery = `DELETE FROM ${SCHEMA}.${NAME}
    WHERE id = $1 and user_id = $2;`;

  const sqlVariables = [id, userId];
  return query(sqlQuery, sqlVariables);
}

//i used pg-format here to
//reformat the query cuz i couldnt use quots of string variable for column name
export async function updateTaskById(userId, id, column, value) {
  const sqlQuery = format(
    `UPDATE %I.%I SET %I = $1 WHERE id = $2 and user_id = $3;`,
    SCHEMA,
    NAME,
    column
  );
  const sqlVariables = [value, id, userId];

  return query(sqlQuery, sqlVariables);
}

export async function updateAllTasks(userId, column, value) {
  const sqlQuery = format(
    `UPDATE %I.%I SET %I = $1 WHERE user_id = $2`,
    SCHEMA,
    NAME,
    column
  );
  const sqlVariables = [value, userId];

  return query(sqlQuery, sqlVariables);
}
