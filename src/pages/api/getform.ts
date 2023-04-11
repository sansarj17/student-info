import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuid } from "uuid";
const mysql = require("mysql2");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const formEmail = req.query.formEmail;
    if (formEmail) {
      const connection = await mysql.createConnection(process.env.DATABASE_URL);
      const query = "SELECT * FROM `studentInfo` where email = ?";
      const values = [formEmail];
      connection.execute(
        query,
        values,
        function (err: any, results: any, fields: any) {
          connection.end();
          res.status(200).json({ form: results[0] });
        }
      );
    } else {
      res.status(300).json({ error: "Invalid Info" });
    }
  } else {
    res.status(500).json({ error: "Only get requests accepted" });
  }
}
