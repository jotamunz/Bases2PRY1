const mongoose = require('mongoose');

const FormSchema = mongoose.Schema({
    schemeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Schemes',
        required: true 
    },
    fields: {
        type: [FieldSchema],
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
        required: true
    },
    routes: {
        type: [ApprovalRouteSchema],
        required: false
    },
});

const FieldSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    input: {
        type: Mixed,
        required: true
    },
});

const ApprovalRouteSchema = mongoose.Schema({
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
        required: true 
    }, 
    currentRejections: {
        type: Number,
        required: true 
    },    
});

const ApproverSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true 
    },
    decision: {
        type: Number,
        required: true
    },
    approvalDate: {
        type: Date,
        required: false,
        default: Date.now
    },
});

module.exports = mongoose.model('Forms', FormSchema);