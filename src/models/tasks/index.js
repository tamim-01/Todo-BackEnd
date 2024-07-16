import { query } from "../../core/database-manager/postgres-service.js";
import format from "pg-format";
const SCHEMA = "public";
const NAME = "tasks";

export async function getTasks() {
  let sqlQuery, sqlVariables;

  sqlQuery = `SELECT * FROM ${SCHEMA}.${NAME}`;
  sqlVariables = [];

  return (await query(sqlQuery, sqlVariables)).rows;
}

export async function getTasksByUserId(userId) {
  let sqlQuery, sqlVariables;

  sqlQuery = `SELECT * FROM ${SCHEMA}.${NAME} WHERE user_id = $1`;
  sqlVariables = [userId];
  return (await query(sqlQuery, sqlVariables)).rows;
}

export async function getTaskById(id) {
  let sqlQuery, sqlVariables;

  sqlQuery = `SELECT * FROM ${SCHEMA}.${NAME}
      WHERE id = $1`;
  sqlVariables = [id];

  return (await query(sqlQuery, sqlVariables)).rows;
}

export async function createTask(userId, title, description, taskdate) {
  const sqlQuery = `INSERT INTO ${SCHEMA}.${NAME} (user_id ,title, description , taskdate , is_completed)
    VALUES
      ( $1 , $2 , $3 , 4$ , false );`;

  const sqlVariables = [userId, title, description, taskdate];
  return query(sqlQuery, sqlVariables);
}

export async function deleteAllTasks() {
  let sqlQuery, sqlVariables;

  sqlQuery = `DELETE FROM ${SCHEMA}.${NAME}`;
  sqlVariables = [];

  return query(sqlQuery, sqlVariables);
}

export async function deleteTaskById(id) {
  const sqlQuery = `DELETE FROM ${SCHEMA}.${NAME}
    WHERE id = $1;`;

  const sqlVariables = [id];
  return query(sqlQuery, sqlVariables);
}

//i used pg-format here to
//reformat the query cuz i couldnt use quots of string variable for column name
export async function updateTaskById(id, column, value) {
  const sqlQuery = format(
    `UPDATE %I.%I SET %I = $1 WHERE id = $2;`,
    SCHEMA,
    NAME,
    column
  );
  const sqlVariables = [value, id];

  return query(sqlQuery, sqlVariables);
}

export async function updateAllTasks(column, value) {
  const sqlQuery = format(`UPDATE %I.%I SET %I = $1`, SCHEMA, NAME, column);
  const sqlVariables = [value];

  return query(sqlQuery, sqlVariables);
}
