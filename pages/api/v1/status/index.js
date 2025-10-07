import database from "../../../../infra/database";

export default async function status(req, res) {
  const result = await database.query("SELECT 1 + 1 as SUM;");
  console.log(result.rows);
  return res.status(200).json({ chave: "toma esse json" });
}
