import database from "infra/database.js";
import retry from "async-retry";

async function waitForAllServices() {
	await waitForWebServer();

	async function waitForWebServer() {
		return retry(fetchchStatusPage, {
			retries: 100,
			minTimeout: 350,
			maxTimeout: 350,
			onRetry: (error, attempt) => {
				console.log(
					`Attempt ${attempt} failed. Status: ${error.message}`,
				);
			},
		});

		async function fetchchStatusPage() {
			const response = await fetch("http://localhost:3000/api/v1/status");
			if (!response.ok) {
				throw new Error(`Http error ${response.status}`);
			}
			await response.json();
		}
	}
}

async function clearDatabase() {
	await database.query("drop schema public cascade; create schema public;");
}

const orchestrator = {
	waitForAllServices,
	clearDatabase,
};

export default orchestrator;
