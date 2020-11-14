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
		const scheme = await Scheme.find(
			{ isActive: true },
			{ _id: 0, name: 1 }
		).sort({ name: 1 });
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
	try {
		const scheme = await Scheme.findOne(
			{ name: req.params.name },
			{ _id: 0, isActive: 0 }
		);
		if (scheme == null) {
			res.status(400).json({ message: 'Specified scheme not found' });
			return;
		}
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
	fields: [
		name: String
		expectType: String
		component: String
		displayables: Mixed
	]
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
		res.json({ name: savedScheme.name });
	} catch (error) {
		if (error.message == 'Validation failed') {
			res.status(400).json({ message: 'Scheme name is unavailable' });
		} else {
			res.status(408).json({ message: error });
		}
	}
});

module.exports = router;
