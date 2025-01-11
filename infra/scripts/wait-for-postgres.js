const { exec } = require("node:child_process");
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function checkPostgres() {
	exec("docker exec postgres-dev pg_isready --host localhost", handleReturn);

	async function handleReturn(error, stdout, stderr) {
		if (stdout.search("accepting connections") < 0) {
			process.stdout.cursorTo(0);
			process.stdout.write("🟡  Postgres ainda não está pronto  ");
			await delay(250);
			process.stdout.cursorTo(0);
			process.stdout.write("🟠  Postgres ainda não está pronto  ");
			await delay(250);
			checkPostgres();
			return;
		}

		process.stdout.cursorTo(0);
		console.log("🟢  Postgres está pronto e aceitando conexões! \n\n");
	}
}

console.log("\n\n🔴  Aguardando Postgres aceitar conexões ...");
checkPostgres();
