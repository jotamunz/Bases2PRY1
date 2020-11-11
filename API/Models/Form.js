const mongoose = require('mongoose');

const FieldSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    input: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
},{_id: false});

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
},{_id: false});

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
},{_id: false});


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

module.exports = mongoose.model('Forms', FormSchema);