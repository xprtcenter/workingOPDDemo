const express = require("express");
const router = express.Router();
const slugify = require("slugify");
const db = require("../config/db");
const { v4: uuidV4 } = require("uuid");

router.post("/create", (req, res) => {
	const id = uuidV4();
	const doc_name = req.body.doc_name;
	const spec_id = req.body.spec_id;

	db.query(
		"INSERT INTO doc_master (id, doc_name, spec_id) VALUES (?,?,?)",
		[id, doc_name, spec_id],
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send("Values Inserted");
			}
		},
	);
});

router.put("/update", (req, res) => {
	const id = req.body.id;
	const company_name = req.body.company_name;
	const company_address = req.body.company_address;
	const company_email = req.body.company_email;
	const company_mobile = req.body.company_mobile;

	db.query(
		"UPDATE app_master SET company_name = ?, company_address = ?, company_email = ?, company_mobile = ? WHERE id = ?",
		[company_name, company_address, company_email, company_mobile, id],
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send(result);
			}
		},
	);
});

router.get("/companyinfo", (req, res) => {
	db.query("SELECT * FROM employeesystem.app_master;", (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
	return db;
});

module.exports = router;
