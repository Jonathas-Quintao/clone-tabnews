test("GET to api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  expect(responseBody.update_at).toBeDefined();

  const parsedUpdatedAt = new Date(responseBody.update_at).toISOString();
  expect(responseBody.update_at).toEqual(parsedUpdatedAt);
  expect(responseBody.dependencies.database.version.startsWith("16")).toBe(
    true,
  );
  expect(typeof responseBody.dependencies.database.max_connections).toBe(
    "number",
  );
  expect(typeof responseBody.dependencies.database.opened_connections).toBe(
    "number",
  );
});
