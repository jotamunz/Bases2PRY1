const express = require('express');
const verifyToken = require('../Middleware/verifyToken');
const Form = require('../models/Form');
const User = require('../models/User');
const Scheme = require('../models/Scheme');

const router = express.Router();

/*GETS*/
// Gets all forms
router.get('/', async (req, res) => {
	try {
		const form = await Form.find();
		res.json(form);
	} catch (error) {
		res.status(408).json({ message: error });
	}
});

// Gets form by Id
router.get('/:formId', async (req, res) => {
	try {
		const form = await Form.findById(req.params.formId);
		res.json(form);
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
		res.json({ name: savedForm.creationDate });
	} catch (error) {
		res.status(408).json({ message: error });
	}
});

module.exports = router;
