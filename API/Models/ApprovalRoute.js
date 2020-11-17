const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');

mongoose.set('useCreateIndex', true);

const UserSchema = mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Users',
			required: true
		}
	},
	{ _id: false }
);

const ApprovalRouteSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	schemeId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Schemes',
		required: true
	},
	authors: {
		type: [UserSchema],
		required: true
	},
	approvers: {
		type: [UserSchema],
		required: true
	},
	requiredApprovals: {
		type: Number,
		required: true
	},
	requiredRejections: {
		type: Number,
		required: true
	}
});

ApprovalRouteSchema.plugin(beautifyUnique);

module.exports = mongoose.model('ApprovalRoutes', ApprovalRouteSchema);
