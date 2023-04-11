import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuid } from "uuid";
const mysql = require("mysql2");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const connection = await mysql.createConnection(process.env.DATABASE_URL);
    const query = "SELECT email FROM `studentInfo`";
    const values: any[] = [];
    connection.execute(
      query,
      values,
      function (err: any, results: any, fields: any) {
        connection.end();
        res.status(200).json({ forms: results });
      }
    );
  } else {
    res.status(500).json({ error: "Only get requests accepted" });
  }
}
