// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
const mysql = require("mysql2");
type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const connection = mysql.createConnection(process.env.DATABASE_URL);
  
  connection.end();
  res.status(200).json({ name: "John Doe" });
}
