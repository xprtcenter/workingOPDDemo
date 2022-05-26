const express = require("express");
const router = express.Router();
const slugify = require("slugify");
const db = require("../config/db");
const { v4: uuidV4 } = require("uuid");

router.post("/create", (req, res) => {
	const id = uuidV4();
	const patientname = req.body.patientname;
	const address = req.body.address;
	const age = req.body.age;
	const guardianname = req.body.guardianname;
	const mobileno = req.body.mobileno;
	const regDate = req.body.regDate;

	db.query(
		"INSERT INTO pat_reg (id, patientname, address, age, guardianname, mobileno, regDate ) VALUES (?,?,?,?,?,?,?)",
		[id, patientname, address, age, guardianname, mobileno, regDate],
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send("Values Inserted");
			}
		},
	);
});
router.get("/count", (req, res) => {
	db.query("SELECT COUNT(id) as count FROM pat_reg", (err, result) => {
		if (err) {
			console.log(err);
		} else {
			console.log(result);
			res.send(result);
		}
	});
	return db;
});
router.get("/:id", (req, res) => {
	const id = req.params.id;
	db.query("SELECT * FROM pat_reg WHERE id = ?", [id], (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
	return db;
});

router.get("/", (req, res) => {
	db.query("SELECT * FROM pat_reg ORDER BY regDate DESC", (err, result) => {
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
	const patientname = req.body.patientname;
	const age = req.body.age;
	const guardianname = req.body.guardianname;
	const mobileno = req.body.mobileno;
	const regDate = req.body.regDate;
	const address = req.body.address;

	db.query(
		"UPDATE pat_reg SET patientname = ?, address = ?, age = ?, guardianname = ?, mobileno = ?, regDate = ? WHERE id = ?",
		[patientname, address, age, guardianname, mobileno, regDate, id],
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
	db.query("DELETE FROM pat_reg WHERE id = ?", id, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
});
module.exports = router;
