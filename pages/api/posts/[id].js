// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { mysql_connection } from "../../../utils";

export default function handler(req, res) {
  const {
    query: { id, name },
    method,
  } = req;
  const db = mysql_connection();

  switch (method) {
    case "GET":
      const sql = `SELECT * FROM posts WHERE id = ${id}`;
      db.query(sql, function (error, results, fields) {
        if (error) throw error;
        res.status(200).json(results);
      });
      break;
    case "PUT":
      // Update or create data in your database
      console.log('updating');
      res.status(200).json({ id, name: name || `User ${id}` });
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
