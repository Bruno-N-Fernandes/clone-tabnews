import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
	await orchestrator.waitForAllServices();
	await orchestrator.clearDatabase();
});

describe("GET /api/v1/migrations", () => {
	describe("Anonumous User", () => {
		describe("Running pending Migrations", () => {
			test("For the first time", async () => {
				const response = await fetch(
					"http://localhost:3000/api/v1/migrations",
					{
						method: "GET",
					},
				);

				expect(response.status).toBe(200);
				const responseBody = await response.json();

				expect(Array.isArray(responseBody)).toBe(true);
				expect(responseBody.length).toBeGreaterThan(0);
			});

			test("For the second time", async () => {
				const response = await fetch(
					"http://localhost:3000/api/v1/migrations",
					{
						method: "GET",
					},
				);

				expect(response.status).toBe(200);
				const responseBody = await response.json();

				expect(Array.isArray(responseBody)).toBe(true);
				expect(responseBody.length).toBeGreaterThan(0);
			});
		});
	});
});
