function status(request, response) {
	response.status(200).json({ status: "its ok. Acima da média" });
}

export default status;
