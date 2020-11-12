const express = require('express');
const verifyToken = require('../Middleware/verifyToken');
const Scheme = require('../models/Scheme');

const router = express.Router();

/*GETS*/

// GET ALL SCHEMES
// I: -
// O: all schemes names sorted
// E: 408, 401
router.get('/', verifyToken, async (req, res) => {
	try {
		const scheme = await Scheme.find({}, { name: 1 }).sort({ name: 1 });
		res.json(scheme);
	} catch (error) {
		res.status(408).json({ message: error });
	}
});

// GET SCHEME BY NAME
// I: /name
// O: all scheme information
// E: 408, 401, 400
router.get('/:name', verifyToken, async (req, res) => {
	var scheme;
	try {
		scheme = await Scheme.findOne({ name: req.params.name });
	} catch (error) {
		res.status(408).json({ message: error });
	}
	if (scheme == null) {
		res.status(400).json({ message: 'No scheme found' });
		return;
	} else {
		res.json(scheme);
	}
});

/*POSTS*/

// CREATE NEW SCHEME
// I:
/*
	name: String,
	fields: []
*/
// O: Saved scheme name
// E: 408, 401, 400
router.post('/', verifyToken, async (req, res) => {
	const scheme = new Scheme({
		name: req.body.name,
		fields: req.body.fields
	});
	try {
		const savedScheme = await scheme.save();
		res.json(savedScheme.name);
	} catch (error) {
		if (error.message == 'Validation failed') {
			res.status(400).json({ message: error });
		} else {
			res.status(408).json({ message: error });
		}
	}
});

module.exports = router;
