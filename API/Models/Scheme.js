const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');

mongoose.set('useCreateIndex', true);

const FieldSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true
		},
		label: {
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
			required: true,
			default: []
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
	},
	isActive: {
		type: Boolean,
		required: true,
		default: true
	},
	modification: {
		type: Number,
		required: true,
		default: 1
	},
	previousVersionId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Schemes',
	}
});

SchemeSchema.plugin(beautifyUnique);

module.exports = mongoose.model('Schemes', SchemeSchema);
