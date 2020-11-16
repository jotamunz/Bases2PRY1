const Scheme = require('../models/Scheme');

module.exports = async function validateForm(req, res, next) {
	const scheme = await Scheme.findOne(
		{ name: req.body.schemeName },
		{ _id: 0, fields: 1 }
	);
	if (scheme == null) {
		res.status(400).json({ message: 'Specified scheme not found' });
		return;
	}
	for (let key in req.body.responses) {
		if (
			req.body.responses.hasOwnProperty(key) &&
			scheme.fields.hasOwnProperty(key)
		) {
			value = req.body.responses[key];
			field = scheme.fields[key];
		}
	}
	next();
};
