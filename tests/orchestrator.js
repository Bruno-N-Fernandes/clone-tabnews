import retry from "async-retry";

async function waitForAllServices() {
	await waitForWebServer();

	async function waitForWebServer() {
		return retry(fetchchStatusPage, {
			retries: 100,
			minTimeout: 250,
			maxTimeout: 250,
		});

		async function fetchchStatusPage(bail, tryNumber) {
			const response = await fetch("http://localhost:3000/api/v1/status");
			const responseBody = await response.json();
		}
	}
}

export default {
	waitForAllServices,
};
