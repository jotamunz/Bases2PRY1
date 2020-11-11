const express = require('express');
const jwt = require('jsonwebtoken');
const verifyToken = require('../Middleware/verifyToken');
require('dotenv/config');
const User = require('../models/User');

const router = express.Router();

/*GETS*/
// Find all users
router.get('/', verifyToken, async (req, res) => {
	try {
		const users = await User.find();
		res.json(users);
	} catch (error) {
		res.status(408).json({ message: error });
	}
});

/*POSTS*/
// Register new user
router.post('/register', async (req, res) => {
	const user = new User({
		username: req.body.username,
		name: req.body.name,
		password: req.body.password,
		isAdmin: req.body.isAdmin
		// TODO: missing arguments
	});
	try {
		const savedUser = await user.save();
		res.json(savedUser);
	} catch (error) {
		res.status(408).json({ message: error });
	}
});

// Log in user
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
