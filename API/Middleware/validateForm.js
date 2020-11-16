const Scheme = require('../models/Scheme');
const DateTime = require('luxon');

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
			switch (field.expectType) {
				case 'number':
					if (isNaN(value.value)) {
						res
							.status(400)
							.json({ message: 'Incorrect type: expected number' });
						return;
					}
					break;
				case 'text':
					break;
				case 'date':
					const date = DateTime.fromFormat(value.value, 'DD/MM/YYYY').toISO();
					console.log(date);
					break;
				default:
			}
		}
	}
	//TODO
	//next();
};
