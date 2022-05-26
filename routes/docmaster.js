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
	const doc_name = req.body.doc_name;
	const spec_id = req.body.spec_id;
	db.query(
		"UPDATE doc_master SET doc_name = ?, spec_id = ? WHERE id = ?",
		[doc_name, spec_id, id],
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send(result);
			}
		},
	);
});

router.delete("/delete/:id", (req, res) => {
	const id = req.params.id;
	db.query("DELETE FROM doc_master WHERE id = ?", id, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
});

router.get("/", (req, res) => {
	db.query(
		"SELECT d.id, d.doc_name, d.spec_id, a.doc_spec_name, d.doc_fees FROM employeesystem.doc_master d INNER JOIN employeesystem.doc_spec a ON a.id = d.spec_id;",
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send(result);
			}
		},
	);
	return db;
});

module.exports = router;
