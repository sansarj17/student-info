import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuid } from "uuid";
const mysql = require("mysql2");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const formData = req.body.form;
    if (formData) {
      const connection = await mysql.createConnection(process.env.DATABASE_URL);
      const data = {
        id: formData.id || uuid(),
        name: formData.name,
        email: formData.email,
        number: formData.number,
      };
      const queryInsert = "INSERT INTO `studentInfo` VALUES (?,?,?,?)";
      const queryUpdate =
        "UPDATE `studentInfo` SET name = ?, email = ?, number = ? where id = ?";
      const valuesInsert = [data.id, data.name, data.email, data.number];
      const valuesUpdate = [data.name, data.email, data.number, data.id];
      if (formData.id) {
        console.log("Updated");
        connection.execute(
          queryUpdate,
          valuesUpdate,
          function (err: any, results: any, fields: any) {
            connection.end();
            console.log(results);
            res.status(200).json({ form: data });
          }
        );
      } else {
        console.log("Inserted");
        connection.execute(
          queryInsert,
          valuesInsert,
          function (err: any, results: any, fields: any) {
            connection.end();
            res.status(200).json({ form: data });
          }
        );
      }
    } else {
      res.status(300).json({ error: "Insufficient info" });
    }
  } else {
    res.status(500).json({ error: "Only post requests accepted" });
  }
}
