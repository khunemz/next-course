const mysql = require("mysql");

export const db_host = "127.0.0.1";
export const db_port = "3306";
export const db_databasename = "sample_api"
export const db_username = "khunemz1";
export const db_password = "password";


export function mysql_connection() {
  var connection = mysql.createConnection({
    host: db_host,
    port: db_port,
    database: db_databasename,
    user: db_username,
    password: db_password,
  });
  connection.connect();
  return connection;
}