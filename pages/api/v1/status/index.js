import database from "infra/database";

async function status(request, response) {
	const databaseName = process.env.POSTGRES_DB;
	const updatedAt = new Date().toISOString();
	const resultVersion = await database.query("SHOW server_version;");
	const resultMaxConnections = await database.query("SHOW max_connections;");
	const resultAcitiveConnections = await database.query({
		text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1",
		values: [databaseName],
	});

	const status = {
		updated_at: updatedAt,
		dependencies: {
			database: {
				type: "postgres",
				version: resultVersion.rows[0].server_version,
				max_connections: parseInt(
					resultMaxConnections.rows[0].max_connections
				),
				opened_connections: resultAcitiveConnections.rows[0].count,
			},
		},
	};

	response.status(200).json(status);
}

export default status;
