const express = require('express');
const verifyToken = require('../Middleware/verifyToken');
const ApprovalRoute = require('../models/ApprovalRoute');
const Scheme = require('../models/Scheme');
const User = require('../models/User');
const Form = require('../models/Form');

const router = express.Router();

/*GETS*/

// GET ALL APPROVAL ROUTES
// I: -
// O: all approval routes information
// E: 408, 401, 400
router.get('/', verifyToken, async (req, res) => {
	try {
		const approvalRoute = await ApprovalRoute.find({}, { _id: 0 });
		let approvalRoutesWithNames = [];
		for (let key in approvalRoute) {
			if (approvalRoute.hasOwnProperty(key)) {
				appRoute = approvalRoute[key];
				let schemeName = await Scheme.findOne(
					{ _id: appRoute.schemeId },
					{ _id: 0, name: 1 }
				);
				if (schemeName == null) {
					res.status(400).json({ message: 'Specified scheme not found' });
					return;
				}
				let authorNames = [];
				for (let key in appRoute.authors) {
					if (appRoute.authors.hasOwnProperty(key)) {
						authorId = appRoute.authors[key];
						let authorName = await User.findOne(
							{ _id: authorId.userId },
							{ _id: 0, name: 1 }
						);
						if (authorName == null) {
							res.status(400).json({ message: 'Specified author not found' });
							return;
						}
						authorNames.push({ name: authorName.name });
					}
				}
				let approverNames = [];
				for (let key in appRoute.approvers) {
					if (appRoute.approvers.hasOwnProperty(key)) {
						approverId = appRoute.approvers[key];
						let approverName = await User.findOne(
							{ _id: approverId.userId },
							{ _id: 0, name: 1 }
						);
						if (approverName == null) {
							res.status(400).json({ message: 'Specified approver not found' });
							return;
						}
						approverNames.push({ name: approverName.name });
					}
				}
				approvalRoutesWithNames.push({
					name: appRoute.name,
					isActive: appRoute.isActive,
					schemeName: schemeName.name,
					authors: authorNames,
					approvers: approverNames,
					requiredApprovals: appRoute.requiredApprovals,
					requiredRejections: appRoute.requiredRejections
				});
			}
		}
		res.json(approvalRoutesWithNames);
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
			!isInteger(req.body.requiredApprovals) ||
			!isInteger(req.body.requiredRejections)
		) {
			res.status(400).json({
				message: 'Incorrect type: expected whole number'
			});
			return;
		}
		const approverAmount = req.body.approvers.length;
		const authorAmount = req.body.authors.length;
		if (approverAmount == 0 || authorAmount == 0) {
			res.status(400).json({
				message: 'Invalid amount of authors or approvers'
			});
			return;
		}
		if (
			req.body.requiredApprovals > approverAmount ||
			req.body.requiredRejections > approverAmount
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

/*PATCHES*/

// TOGGLE ACTIVATE APPROVAL ROUTE BY NAME
// I: /name
// O: Modified active value
// E: 408, 401, 400
router.patch('/toggle/:name', verifyToken, async (req, res) => {
	try {
		const approvalRoute = await ApprovalRoute.findOne({
			name: req.params.name
		});
		if (approvalRoute == null) {
			res.status(400).json({ message: 'Specified approval route not found' });
			return;
		}
		if (approvalRoute.isActive) {
			approvalRoute.isActive = false;
		} else {
			approvalRoute.isActive = true;
		}
		await approvalRoute.save();
		res.json({ isActive: approvalRoute.isActive });
	} catch (error) {
		res.status(408).json({ message: error });
	}
});

/*DELETES*/

// DELETE APPROVAL ROUTE BY NAME
// I: /name
// O: Deleted approval route name
// E: 408, 401, 400
router.delete('/:name', verifyToken, async (req, res) => {
	try {
		const approvalRoute = await ApprovalRoute.findOne({
			name: req.params.name
		});
		if (approvalRoute == null) {
			res.status(400).json({ message: 'Specified approval route not found' });
			return;
		}
		const anyForm = await Form.findOne({
			routes: { $elemMatch: { approvalRouteId: approvalRoute._id } }
		});
		if (anyForm != null) {
			res.status(400).json({
				message:
					'Specified approval route can´t be deleted because it has submitions'
			});
			return;
		}
		await ApprovalRoute.deleteOne({ _id: approvalRoute._id });
		res.json({ name: approvalRoute.name });
	} catch (error) {
		res.status(408).json({ message: error });
	}
});

module.exports = router;
