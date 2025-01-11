import retry from "async-retry";

async function waitForAllServices() {
	await waitForWebServer();

	async function waitForWebServer() {
		return retry(getchStatusPage, { retries: 100 });

		async function getchStatusPage() {
			const response = await fetch("http://localhost:3000/api/v1/status");
			const responseBody = await response.json();
		}
	}
}

export default {
	waitForAllServices,
};
