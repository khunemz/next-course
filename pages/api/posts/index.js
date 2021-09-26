// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { mysql_connection } from "../../../utils";

export default function handler(req, res) {
  const db = mysql_connection();
  const sql = "SELECT * FROM posts";
  db.query(sql, function (error, results, fields) {
    if (error) throw error;
    res.status(200).json(results);
  });
}
