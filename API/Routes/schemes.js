const express = require('express');
const verifyToken = require('../Middleware/verifyToken');
const Scheme = require('../models/Scheme');
const User = require('../models/User');
const Form = require('../models/Form');

const router = express.Router();

/*GETS*/

// GET ALL SCHEMES
// I: -
// O: all active schemes names sorted
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

// GET ALL SCHEMES BY USERNAME
// I: /userUsername
// O: all active schemes names sorted
// E: 408, 401, 400
router.get('/user/:userUsername', verifyToken, async (req, res) => {
	try {
		const userSchemes = await User.findOne(
			{ username: req.params.userUsername },
			{ _id: 0, accessibleSchemes: 1 }
		);
		if (userSchemes == null) {
			res.status(400).json({ message: 'Specified user not found' });
			return;
		}
		let accessibleSchemesNames = [];
		for (let key in userSchemes.accessibleSchemes) {
			if (userSchemes.accessibleSchemes.hasOwnProperty(key)) {
				schemeId = userSchemes.accessibleSchemes[key];
				let schemeName = await Scheme.findOne(
					{ _id: schemeId.schemeId, isActive: true },
					{ _id: 0, name: 1 }
				);
				if (schemeName == null) {
					res.status(400).json({ message: 'Specified scheme not found' });
					return;
				}
				accessibleSchemesNames.push({ schemeName: schemeName.name });
			}
		}
		accessibleSchemesNames.sort(function (a, b) {
			return a.schemeName < b.schemeName
				? -1
				: a.schemeName > b.schemeName
				? 1
				: 0;
		});
		res.json(accessibleSchemesNames);
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
			{ name: req.params.name, isActive: true },
			{ _id: 0, isActive: 0, modification: 0 }
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
		name: String,
		label: String,
		expectType: String,
		component: String,
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

/*PATCHES*/

// UPDATE SCHEME BY NAME
// I:
/*
	oldName: String,
	name: String, (same as oldName if name wasn´t modified) *****NEW NAME
	fields: [
		name: String,
		label: String,
		expectType: String,
		component: String,
		displayables: Mixed
	]	
*/
// O: Updated scheme name
// E: 408, 401, 400
router.patch('/', verifyToken, async (req, res) => {
	try {
		const oldScheme = await Scheme.findOne({
			name: req.body.oldName,
			isActive: true
		});
		if (oldScheme == null) {
			res.status(400).json({ message: 'Specified scheme not found' });
			return;
		}
		const anyForm = await Form.findOne({ schemeId: oldScheme._id });
		if (anyForm != null) {
			const newScheme = new Scheme({
				name: req.body.name,
				fields: req.body.fields,
				modification: oldScheme.modification + 1
			});
			oldScheme.isActive = false;
			oldScheme.name = oldScheme.name.concat(
				' (mod ' + oldScheme.modification.toString() + ')'
			);
			await oldScheme.save();
			await newScheme.save();
			res.json({ name: newScheme.name });
		} else {
			oldScheme.name = req.body.name;
			oldScheme.fields = req.body.fields;
			await oldScheme.save();
			res.json({ name: oldScheme.name });
		}
	} catch (error) {
		if (error.message == 'Validation failed') {
			res.status(400).json({ message: 'Scheme name is unavailable' });
		} else {
			res.status(408).json({ message: error });
		}
	}
});

/*DELETES*/

// DELETE SCHEME BY NAME
// I: /name
// O: Deleted scheme name
// E: 408, 401, 400
router.delete('/:name', verifyToken, async (req, res) => {
	try {
		const scheme = await Scheme.findOne({ name: req.params.name });
		if (scheme == null) {
			res.status(400).json({ message: 'Specified scheme not found' });
			return;
		}
		const anyForm = await Form.findOne({ schemeId: scheme._id });
		if (anyForm != null) {
			res.status(400).json({
				message: 'Specified scheme can´t be deleted because it has submitions'
			});
			return;
		}
		await Scheme.deleteOne({ _id: scheme._id });
		res.json({ name: scheme.name });
	} catch (error) {
		res.status(408).json({ message: error });
	}
});

module.exports = router;
