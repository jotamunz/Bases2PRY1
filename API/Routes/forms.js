const express = require('express');
const verifyToken = require('../Middleware/verifyToken');
const Form = require('../models/Form');
const User = require('../models/User');
const Scheme = require('../models/Scheme');

const router = express.Router();

/*GETS*/

// GET PENDNG FORMS BY USERNAME
// I: /userUsername
// O: all pending forms scheme names and dates sorted
// E: 408, 401, 400
router.get('/pending/:userUsername', verifyToken, async (req, res) => {
	try {
		const user = await User.findOne(
			{ username: req.params.userUsername },
			{ _id: 1 }
		);
		if (user == null) {
			res.status(400).json({ message: 'Specified user not found' });
			return;
		}
		const forms = await Form.find(
			{ userId: user._id, status: 0 },
			{ _id: 0, schemeId: 1, creationDate: 1 }
		).sort({ creationDate: 0 });
		let formsWithNames = [];
		for (let key in forms) {
			if (forms.hasOwnProperty(key)) {
				form = forms[key];
				let schemeName = await Scheme.findOne(
					{ _id: form.schemeId },
					{ _id: 0, name: 1 }
				);
				if (schemeName == null) {
					res.status(400).json({ message: 'Specified scheme not found' });
					return;
				}
				formsWithNames.push({
					schemeName: schemeName.name,
					creationDate: form.creationDate
				});
			}
		}
		formsWithNames.sort(function (a, b) {
			return a.schemeName < b.schemeName
				? -1
				: a.schemeName > b.schemeName
				? 1
				: 0;
		});
		res.json(formsWithNames);
	} catch (error) {
		res.status(408).json({ message: error });
	}
});

// GET HISTORY FORMS BY USERNAME
// I: /userUsername
// O: all approved and rejected forms scheme names and dates sorted
// E: 408, 401, 400
router.get('/history/:userUsername', verifyToken, async (req, res) => {
	try {
		const user = await User.findOne(
			{ username: req.params.userUsername },
			{ _id: 1 }
		);
		if (user == null) {
			res.status(400).json({ message: 'Specified user not found' });
			return;
		}
		const forms = await Form.find(
			{ userId: user._id, $or: [{ status: 1 }, { status: 2 }] },
			{ _id: 0, schemeId: 1, creationDate: 1 }
		).sort({ creationDate: 0 });
		let formsWithNames = [];
		for (let key in forms) {
			if (forms.hasOwnProperty(key)) {
				form = forms[key];
				let schemeName = await Scheme.findOne(
					{ _id: form.schemeId },
					{ _id: 0, name: 1 }
				);
				if (schemeName == null) {
					res.status(400).json({ message: 'Specified scheme not found' });
					return;
				}
				formsWithNames.push({
					schemeName: schemeName.name,
					creationDate: form.creationDate
				});
			}
		}
		formsWithNames.sort(function (a, b) {
			return a.schemeName < b.schemeName
				? -1
				: a.schemeName > b.schemeName
				? 1
				: 0;
		});
		res.json(formsWithNames);
	} catch (error) {
		res.status(408).json({ message: error });
	}
});

/*POSTS*/

// CREATE NEW FORM
// I:
/*
	schemeName: String,
	userUsername: String,
	responses: [
		name: String,
        value: String
	]
*/
// O: Saved form creation date
// E: 408, 401, 400
router.post('/', verifyToken, async (req, res) => {
	try {
		const schemeId = await Scheme.findOne(
			{ name: req.body.schemeName },
			{ _id: 1 }
		);
		if (schemeId == null) {
			res.status(400).json({ message: 'Specified scheme not found' });
			return;
		}
		const userId = await User.findOne(
			{ username: req.body.userUsername },
			{ _id: 1 }
		);
		if (userId == null) {
			res.status(400).json({ message: 'Specified user not found' });
			return;
		}
		const form = new Form({
			schemeId: schemeId._id,
			userId: userId._id,
			responses: req.body.responses
		});
		const savedForm = await form.save();
		res.json({ date: savedForm.creationDate });
	} catch (error) {
		res.status(408).json({ message: error });
	}
});

module.exports = router;
