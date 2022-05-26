const express = require("express");
const router = express.Router();
const slugify = require("slugify");
const db = require("../config/db");
const { v4: uuidV4 } = require("uuid");

router.post("/create", (req, res) => {
	const id = uuidV4();
	const pat_id = req.body.pat_id;
	const visitDate = req.body.visitDate;
	const doc_id = req.body.doc_id;
	const user_name = req.body.user_name;

	db.query(
		"INSERT INTO pat_visit (id, pat_id, visitDate, doc_id, user_name ) VALUES (?,?,?,?,?)",
		[id, pat_id, visitDate, doc_id, user_name],
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
	const pat_id = req.body.pat_id;
	const visitDate = req.body.visitDate;
	const doc_id = req.body.doc_id;
	const user_name = req.body.user_name;
	db.query(
		"UPDATE pat_visit SET pat_id = ?, visitDate = ? doc_id = ? user_name = ? WHERE id = ?",
		[pat_id, visitDate, doc_id, user_name, id],
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
	db.query("DELETE FROM pat_visit WHERE id = ?", id, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
});
router.get("/patientvisitdata/:visitid", (req, res) => {
	const visitid = req.params.visitid;
	db.query(
		"SELECT p.id,  p.visitDate, p.doc_id, p.pat_id, r.patientname, r.address, r.age, r.address ,d.doc_name FROM employeesystem.pat_visit p INNER JOIN employeesystem.pat_reg r ON r.id = p.pat_id INNER JOIN employeesystem.doc_master d ON d.id = p.doc_id WHERE p.id = ?;",
		visitid,
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
router.get("/:patid", (req, res) => {
	const patid = req.params.patid;
	db.query(
		"SELECT p.id,  p.visitDate, p.doc_id, p.pat_id, r.patientname, r.address, r.age, r.address ,d.doc_name FROM employeesystem.pat_visit p INNER JOIN employeesystem.pat_reg r ON r.id = p.pat_id INNER JOIN employeesystem.doc_master d ON d.id = p.doc_id WHERE p.pat_id = ?;",
		patid,
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
