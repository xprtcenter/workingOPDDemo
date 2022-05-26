const express = require("express");
const router = express.Router();
const slugify = require("slugify");
const db = require("../config/db");
const { v4: uuidV4 } = require("uuid");

router.post("/create", (req, res) => {
	const id = uuidV4();
	const doc_spec_name = req.body.doc_spec_name;

	db.query(
		"INSERT INTO doc_spec (id, doc_spec_name ) VALUES (?,?)",
		[id, doc_spec_name],
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send("Values Inserted");
			}
		},
	);
});

router.get("/", (req, res) => {
	db.query("SELECT * FROM doc_spec", (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
	return db;
});

router.put("/update", (req, res) => {
	const id = req.body.id;
	const doc_spec_name = req.body.doc_spec_name;

	db.query(
		"UPDATE doc_spec SET doc_spec_name = ?,  WHERE id = ?",
		[doc_spec_name, id],
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
	db.query("DELETE FROM doc_spec WHERE id = ?", id, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
});
module.exports = router;
