const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');

mongoose.set('useCreateIndex', true);

const FieldSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true
		},
		expectType: {
			type: String,
			required: true
		},
		component: {
			type: String,
			required: true
		},
		displayables: {
			type: mongoose.Schema.Types.Mixed,
			required: true
		}
	},
	{ _id: false }
);

const SchemeSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	fields: {
		type: [FieldSchema],
		required: true
	}
});

SchemeSchema.plugin(beautifyUnique);

module.exports = mongoose.model('Schemes', SchemeSchema);
