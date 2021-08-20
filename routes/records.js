const router = global.express.Router();
const records = global.mocks.records;

//멤버스 api
router.post("/", function (request, response) {
	records.push(request.body);
	console.log("Done records post", records);
	response.status(200).send({
		result: "Created",
	});
});

router.get("/", function (request, response) {
	console.log("Done records get", records);
	//요청하고 200(정상)응답
	response.status(200).send({
		result: "Readed",
		records: records,
	});
});

router.patch("/", function (request, response) {
	records[request.body.index] = request.body.record;
	console.log("Done records patch", records);
	response.status(200).send({
		result: "Updated",
	});
});

router.delete("/:index", function (request, response) {
	const index = Number(request.params.index);
	records.splice(index, 1);
	console.log("Done records delete", records);
	response.status(200).send({
		result: "Deleted",
	});
});

module.exports = router;
