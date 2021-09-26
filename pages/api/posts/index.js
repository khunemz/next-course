// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { mysql_connection , CURRENT_TIMESTAMP } from "../../../utils";

export default function handler(req, res) {
  const {
    query: { id, name },
    method,
    body
  } = req;
  const db = mysql_connection();
  let sql = '';
  switch (method) {
    case "GET":
      sql = "SELECT * FROM posts";
      db.query(sql, function (error, results, fields) {
        if (error) throw error;
        res.status(200).json(results);
      });
      break;
    case "POST":
        const post = {
          title: body.title,
          description: body.description,
          slug: body.slug,
          created_at: CURRENT_TIMESTAMP,
          created_by: -1,
          updated_at: CURRENT_TIMESTAMP,
          updated_By: -1
        }
        sql = "INSERT INTO posts SET ?";
        db.query(sql, post, function (error, results, fields) {
          if (error) throw error;
          res.status(200).json(results);
        });
        break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      break;
  }
}
