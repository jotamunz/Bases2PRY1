const express = require('express');
const mongoose = require('mongoose');
const verifyToken = require('../Middleware/verifyToken');
const ApprovalRoute = require('../models/ApprovalRoute');

const router = express.Router();

/*GETS*/
// Gets all approval routes
router.get('/', async (req, res) => {
	try {
		const approvalRoute = await ApprovalRoute.find();
		res.json(approvalRoute);
	} catch (error) {
		res.status(408).json({ message: error });
	}
});

// Gets approval route by Id
router.get('/:approvalRouteId', async (req, res) => {
	try {
		const approvalRoute = await ApprovalRoute.findById(
			req.params.approvalRouteId
		);
		res.json(approvalRoute);
	} catch (error) {
		res.status(408).json({ message: error });
	}
});

/*POSTS*/
//Creates a new approval route
router.post('/', async (req, res) => {
	for (var i = 0; i < req.body.authors.length; i++) {
		req.body.authors[i].userId = new mongoose.Types.ObjectId(
			req.body.authors[i].userId
		);
	}
	for (var i = 0; i < req.body.approvers.length; i++) {
		req.body.approvers[i].userId = new mongoose.Types.ObjectId(
			req.body.approvers[i].userId
		);
	}
	const approvalRoute = new ApprovalRoute({
		schemeId: new mongoose.Types.ObjectId(req.body.schemeId),
		authors: req.body.authors,
		approvers: req.body.approvers,
		requiredApprovals: req.body.requiredApprovals,
		requiredRejections: req.body.requiredRejections
	});
	try {
		const savedApprovalRoute = await approvalRoute.save();
		res.json(savedApprovalRoute);
	} catch (error) {
		res.status(408).json({ message: error });
	}
});

module.exports = router;
