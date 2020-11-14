const mongoose = require('mongoose');

const ResponseSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true
		},
		value: {
			type: mongoose.Schema.Types.Mixed,
			required: true
		}
	},
	{ _id: false }
);

const ApproverSchema = mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Users',
			required: true
		},
		decision: {
			type: Number,
			required: true,
			default: 0
		},
		approvalDate: {
			type: Date,
			required: false,
			default: Date.now
		}
	},
	{ _id: false }
);

const ApprovalRouteSchema = mongoose.Schema(
	{
		approvalRouteId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'ApprovalRoutes',
			required: true
		},
		approvers: {
			type: [ApproverSchema],
			required: true
		},
		currentApprovals: {
			type: Number,
			required: true,
			default: 0
		},
		currentRejections: {
			type: Number,
			required: true,
			default: 0
		}
	},
	{ _id: false }
);

const FormSchema = mongoose.Schema({
	schemeId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Schemes',
		required: true
	},
	responses: {
		type: [ResponseSchema],
		required: true
	},
	creationDate: {
		type: Date,
		required: true,
		default: Date.now
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Users',
		required: true
	},
	status: {
		type: Number,
		required: true,
		default: 0
	},
	routes: {
		type: [ApprovalRouteSchema],
		required: false,
		default: []
	}
});

module.exports = mongoose.model('Forms', FormSchema);
