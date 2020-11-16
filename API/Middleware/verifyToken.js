const jwt = require('jsonwebtoken');
require('dotenv/config');

module.exports = function verifyToken(req, res, next) {
	const bearerHeader = req.headers['authorization'];
	if (typeof bearerHeader !== 'undefined') {
		const bearer = bearerHeader.split(' ');
		const bearerToken = bearer[1];
		jwt.verify(bearerToken, process.env.KEY, (error, authData) => {
			if (error) {
				res.status(401).json({ message: 'Unauthorized' });
			} else {
				req.authData = authData;
				next();
			}
		});
	} else {
		res.status(401).json({ message: 'Unauthorized' });
	}
};
