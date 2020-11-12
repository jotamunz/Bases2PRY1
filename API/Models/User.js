const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');

mongoose.set('useCreateIndex', true);

const AccessibleSchemeSchema = mongoose.Schema(
	{
		schemeId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Schemes',
			required: true
		}
	},
	{ _id: false }
);

const UserSchema = mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	name: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	isAdmin: {
		type: Boolean,
		required: true
	},
	accessibleSchemes: {
		type: [AccessibleSchemeSchema],
		required: false,
		default: []
	}
});

UserSchema.plugin(beautifyUnique);

module.exports = mongoose.model('Users', UserSchema);
