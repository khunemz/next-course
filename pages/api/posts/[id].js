// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { CURRENT_TIMESTAMP, mysql_connection } from "../../../utils";

export default function handler(req, res) {
  const {
    query: { id, slug },
    body,
    method,
  } = req;
  const db = mysql_connection();

  let sql = "";
  switch (method) {
    case "GET":
      sql = `SELECT * FROM posts WHERE id = ${id};`;
      db.query(sql, function (error, results, fields) {
        if (error) throw error;
        res.status(200).json(results);
      });
      break;
    case "PUT":
      sql = `
        UPDATE posts SET title=?, description=?, slug=?, updated_at=?, updated_by=-1 WHERE id=?;
      `;
      const { title, description, slug } = body;
      const timestamp = CURRENT_TIMESTAMP;
      db.query(sql,[title, description, slug, timestamp, id], function (error, results, fields) {
        if (error) throw error;
        res.status(200).json();
      });
      break;
    case "DELETE":
      sql = `DELETE FROM posts WHERE id= ${id};`;
      db.query(sql, function (error, results, fields) {
        if (error) throw error;
        res.status(200).json(results);
      });
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
