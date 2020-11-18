const express = require('express');
const verifyToken = require('../Middleware/verifyToken');
const ApprovalRoute = require('../models/ApprovalRoute');
const Scheme = require('../models/Scheme');
const User = require('../models/User');

const router = express.Router();

/*GETS*/
// Gets all approval routes
router.get('/', verifyToken, async (req, res) => {
	try {
		const approvalRoute = await ApprovalRoute.find();
		res.json(approvalRoute);
	} catch (error) {
		res.status(408).json({ message: error });
	}
});

// Gets approval route by Id
router.get('/:approvalRouteId', verifyToken, async (req, res) => {
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

// CREATE NEW APPROVAL ROUTE
// I:
/*
	name: String,
	schemeName: String,
	authors: [ username: String ],
	approvers: [ username: String ],
	requiredApprovals: Number,
	requiredRejections: Number
*/
// O: Saved approval route name
// E: 408, 401, 400
router.post('/', verifyToken, async (req, res) => {
	try {
		const schemeId = await Scheme.findOne(
			{ name: req.body.schemeName, isActive: true },
			{ _id: 1 }
		);
		if (schemeId == null) {
			res.status(400).json({ message: 'Specified scheme not found' });
			return;
		}
		if (
			req.body.requiredApprovals > req.body.approvers.length ||
			req.body.requiredRejections > req.body.approvers.length
		) {
			res.status(400).json({
				message: 'Invalid amount of required approvals or rejections'
			});
			return;
		}
		let authorIds = [];
		for (let key in req.body.authors) {
			if (req.body.authors.hasOwnProperty(key)) {
				author = req.body.authors[key];
				let authorId = await User.findOne(
					{ username: author.username },
					{ _id: 1 }
				);
				if (authorId == null) {
					res.status(400).json({ message: 'Specified author not found' });
					return;
				}
				authorIds.push({ userId: authorId._id });
			}
		}
		let approverIds = [];
		for (let key in req.body.approvers) {
			if (req.body.approvers.hasOwnProperty(key)) {
				approver = req.body.approvers[key];
				let approverId = await User.findOne(
					{ username: approver.username },
					{ _id: 1 }
				);
				if (approverId == null) {
					res.status(400).json({ message: 'Specified approver not found' });
					return;
				}
				approverIds.push({ userId: approverId._id });
			}
		}
		const approvalRoute = new ApprovalRoute({
			name: req.body.name,
			schemeId: schemeId._id,
			authors: authorIds,
			approvers: approverIds,
			requiredApprovals: req.body.requiredApprovals,
			requiredRejections: req.body.requiredRejections
		});
		const savedApprovalRoute = await approvalRoute.save();
		res.json({ name: savedApprovalRoute.name });
	} catch (error) {
		if (error.message == 'Validation failed') {
			res.status(400).json({ message: 'Approval route name is unavailable' });
		} else {
			res.status(408).json({ message: error });
		}
	}
});

module.exports = router;
