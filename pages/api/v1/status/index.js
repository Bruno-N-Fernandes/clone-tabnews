import database from "../../../../infra/database";

async function status(request, response) {
	const result = await database.query("SELECT 1 + 1 as soma;");
	console.log(result.rows);
	response.status(200).json({ status: "its ok. Acima da média" });
}

export default status;
