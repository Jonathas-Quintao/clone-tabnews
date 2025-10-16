import database from "infra/database";

export default async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const databaseName = process.env.POSTGRES_DB;
  const databaseVersionResult = await database.query("SELECT version();");
  const maxConnections = await database.query("SHOW max_connections;");
  const openedConnections = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });

  const parseDatabaseVersionResult =
    databaseVersionResult.rows[0].version.split(" ")[1];

  const parseMaxConnections =
    maxConnections.rows[0].max_connections.split(" ")[0];

  const parseOpenedConnections = openedConnections.rows[0].count;

  response.status(200).json({
    update_at: updatedAt,
    dependencies: {
      database: {
        version: parseDatabaseVersionResult,
        max_connections: parseInt(parseMaxConnections),
        opened_connections: parseInt(parseOpenedConnections),
      },
    },
  });
}
