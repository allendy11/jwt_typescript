import mysql from "mysql";
import config from "./config";

const params = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
};

export const Connect = () => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(params);
    connection.connect((error) => {
      if (error) {
        reject(error);
      } else {
        resolve(connection);
      }
    });
  });
};

export const Query = (connection: mysql.Connection, query: string) => {
  return new Promise((resolve, reject) => {
    connection.query(query, connection, (error, result) => {
      if (error) {
        reject(error);
        return;
      } else {
        resolve(result);
        connection.end();
      }
    });
  });
};
