const express = require('express');
const jwt = require('jsonwebtoken');
const verifyToken = require('../Middleware/verifyToken');
require('dotenv/config');
const User = require('../models/User');

const router = express.Router();

/*GETS*/

// GET ALL USERS
// I: -
// O: all users without password sorted
// E: 408, 401
router.get('/', verifyToken, async (req, res) => {
	try {
		const users = await User.find({}, { password: 0 }).sort({ name: 1 });
		res.json(users);
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
// E: 400, 408, 401
router.post('/register', verifyToken, async (req, res) => {
	const user = new User({
		username: req.body.username,
		name: req.body.name,
		password: req.body.password,
		isAdmin: req.body.isAdmin
	});
	try {
		const savedUser = await user.save();
		res.json(savedUser.username);
	} catch (error) {
		if (error.message == 'Validation failed') {
			res.status(400).json({ message: error });
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
// E: 400, 408, 500
router.post('/login', async (req, res) => {
	var user;
	try {
		user = await User.findOne({
			username: req.body.username,
			password: req.body.password
		});
	} catch (error) {
		res.status(408).json({ message: error });
		return;
	}
	if (user == null) {
		res.status(400).json({ message: 'Incorrect user or password' });
		return;
	} else {
		jwt.sign(
			{ user: user },
			process.env.KEY,
			{ expiresIn: '2h' },
			(error, token) => {
				if (error) {
					res.status(500).json({ message: error });
				} else {
					res.json({ token: token });
				}
			}
		);
	}
});

module.exports = router;
