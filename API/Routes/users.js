const express = require('express');
const jwt = require('jsonwebtoken');
const verifyToken = require('../Middleware/verifyToken');
require('dotenv/config');
const User = require('../models/User');
const Scheme = require('../models/Scheme');

const router = express.Router();

/*GETS*/

// GET ALL USERS
// I: -
// O: all users name and username sorted
// E: 408, 401
router.get('/', verifyToken, async (req, res) => {
	try {
		const users = await User.find(
			{},
			{
				_id: 0,
				name: 1,
				username: 1
			}
		).sort({ name: 1 });
		res.json(users);
	} catch (error) {
		res.status(408).json({ message: error });
	}
});

// GET USER BY USERNAME
// I: /username
// O: all user information, with scheme object ID translated to scheme name
// E: 408, 401, 400
router.get('/:username', verifyToken, async (req, res) => {
	try {
		var user = await User.findOne(
			{ username: req.params.username },
			{ _id: 0 }
		);
		if (user == null) {
			res.status(400).json({ message: 'Specified user not found' });
			return;
		}
		res.json(user);
	} catch (error) {
		res.status(408).json({ message: error });
	}
});

/*POSTS*/

// REGISTER NEW USER
// I:
/*
	username: String,
	name: String,
	password: String,
	isAdmin: Boolean
*/
// O: Saved user username
// E: 408, 401, 400
router.post('/register', verifyToken, async (req, res) => {
	const user = new User({
		username: req.body.username,
		name: req.body.name,
		password: req.body.password,
		isAdmin: req.body.isAdmin
	});
	try {
		const savedUser = await user.save();
		res.json({ username: savedUser.username });
	} catch (error) {
		if (error.message == 'Validation failed') {
			res.status(400).json({ message: 'Username is unavailable' });
		} else {
			res.status(408).json({ message: error });
		}
	}
});

// LOGIN USER
// I:
/*
	username: String,
	password: String
*/
// O: Json Web Token
// E: 408, 400, 500
router.post('/login', async (req, res) => {
	try {
		const user = await User.findOne({
			username: req.body.username,
			password: req.body.password
		});
		if (user == null) {
			res.status(400).json({ message: 'Incorrect user or password' });
			return;
		}
		jwt.sign(
			{ user: user },
			process.env.KEY,
			{ expiresIn: '3h' },
			(error, token) => {
				if (error) {
					res.status(500).json({ message: error });
					return;
				}
				res.json({ token: token });
			}
		);
	} catch (error) {
		res.status(408).json({ message: error });
	}
});

/*PATCHES*/

// ASSIGN SCHEMAS TO USER
// I:
/*
	username: String,
	accessibleSchemes: [
		name: String
	]
*/
// O: Updated total of accessible schemes for the user
// E: 408, 401, 400
router.patch('/addSchemes', verifyToken, async (req, res) => {
	try {
		const user = await User.findOne({ username: req.body.username });
		if (user == null) {
			res.status(400).json({ message: 'Specified user not found' });
			return;
		}
		let newAccessibleSchemes = [];
		for (let key in req.body.accessibleSchemes) {
			if (req.body.accessibleSchemes.hasOwnProperty(key)) {
				schemeName = req.body.accessibleSchemes[key];
				let scheme = await Scheme.findOne({ name: schemeName.name });
				if (scheme == null || scheme.isActive == false) {
					res.status(400).json({ message: 'Specified scheme not found' });
					return;
				}
				newAccessibleSchemes.push({ schemeId: scheme._id });
			}
		}
		user.accessibleSchemes = newAccessibleSchemes;
		const updatedUser = await user.save();
		res.json({ accessibleSchemesTotal: updatedUser.accessibleSchemes.length });
	} catch (error) {
		res.status(408).json({ message: error });
	}
});

// UPDATE USER
// I:
/*
	oldUsername: String,
	newUsername: String, (same as oldUsername if username wasnt modified)
	name: String,
	password: String,
	isAdmin: Boolean
*/
// O: Updated user username
// E: 408, 401, 400
router.patch('/', verifyToken, async (req, res) => {
	try {
		const user = await User.findOne({ username: req.body.oldUsername });
		if (user == null) {
			res.status(400).json({ message: 'Specified user not found' });
			return;
		}
		user.username = req.body.newUsername;
		user.name = req.body.name;
		user.password = req.body.password;
		user.isAdmin = req.body.isAdmin;
		const updatedUser = await user.save();
		res.json({ username: updatedUser.username });
	} catch (error) {
		if (error.message == 'Validation failed') {
			res.status(400).json({ message: 'Username is unavailable' });
		} else {
			res.status(408).json({ message: error });
		}
	}
});

module.exports = router;
