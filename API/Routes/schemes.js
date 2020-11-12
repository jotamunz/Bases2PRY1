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

// Gets schemes by Id
router.get('/:schemeId', async (req, res) => {
	try {
		const scheme = await Scheme.findById(req.params.schemeId);
		res.json(scheme);
	} catch (error) {
		res.status(408).json({ message: error });
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
// E: 400, 408, 401
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
