const Scheme = require('../models/Scheme');
const dayjs = require('dayjs');
const customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);

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
					const isValid =
						dayjs(value.value, 'DD/MM/YYYY', true).format('DD/MM/YYYY') ===
						value.value;
					if (!isValid) {
						res.status(400).json({ message: 'Incorrect type: expected date' });
						return;
					}
					break;
				default:
					res.status(500).json({ message: 'Incorrect scheme format' });
			}
		}
	}
	next();
};
