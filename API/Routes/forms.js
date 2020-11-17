const express = require('express');
const verifyToken = require('../Middleware/verifyToken');
const validateForm = require('../Middleware/validateForm');
const Form = require('../models/Form');
const User = require('../models/User');
const Scheme = require('../models/Scheme');
const ApprovalRoute = require('../models/ApprovalRoute');
const { Router } = require('express');
const { route } = require('./approvalRoutes');

const router = express.Router();

/*GETS*/

// GET ALL PENDNG FORMS BY USERNAME FOR USER
// I: /userUsername
// O: all pending forms scheme names, dates, status and progress sorted
// E: 408, 401, 400
router.get('/pending/:userUsername', verifyToken, async (req, res) => {
	try {
		const userId = await User.findOne(
			{ username: req.params.userUsername },
			{ _id: 1 }
		);
		if (userId == null) {
			res.status(400).json({ message: 'Specified user not found' });
			return;
		}
		const forms = await Form.find(
			{ userId: userId._id, status: 0 },
			{ _id: 0, schemeId: 1, creationDate: 1, status: 1, routes: 1 }
		).sort({ creationDate: 0 });
		let formsWithNames = [];
		for (let key in forms) {
			if (forms.hasOwnProperty(key)) {
				form = forms[key];
				let schemeName = await Scheme.findOne(
					{ _id: form.schemeId },
					{ _id: 0, name: 1 }
				);
				if (schemeName == null) {
					res.status(400).json({ message: 'Specified scheme not found' });
					return;
				}
				let progress = [];
				for (let key2 in form.routes) {
					if (form.routes.hasOwnProperty(key2)) {
						appRoute = form.routes[key2];
						let appRouteLimits = await ApprovalRoute.findOne(
							{ _id: appRoute.approvalRouteId },
							{ _id: 0, requiredApprovals: 1, requiredRejections: 1 }
						);
						if (appRouteLimits == null) {
							res.status(400).json({ message: 'Specified route not found' });
							return;
						}
						progress.push({
							currentApprovals: appRoute.currentApprovals,
							currentRejections: appRoute.currentRejections,
							requiredApprovals: appRouteLimits.requiredApprovals,
							requiredRejections: appRouteLimits.requiredRejections
						});
					}
				}
				formsWithNames.push({
					schemeName: schemeName.name,
					creationDate: form.creationDate,
					status: form.status,
					progress: progress
				});
			}
		}
		formsWithNames.sort(function (a, b) {
			return a.schemeName < b.schemeName
				? -1
				: a.schemeName > b.schemeName
				? 1
				: 0;
		});
		res.json(formsWithNames);
	} catch (error) {
		res.status(408).json({ message: error });
	}
});

// GET ALL HISTORY FORMS BY USERNAME FOR USER
// I: /userUsername
// O: all approved and rejected forms scheme names, dates, status and progress sorted
// E: 408, 401, 400
router.get('/history/:userUsername', verifyToken, async (req, res) => {
	try {
		const userId = await User.findOne(
			{ username: req.params.userUsername },
			{ _id: 1 }
		);
		if (userId == null) {
			res.status(400).json({ message: 'Specified user not found' });
			return;
		}
		const forms = await Form.find(
			{ userId: userId._id, $or: [{ status: 1 }, { status: 2 }] },
			{ _id: 0, schemeId: 1, creationDate: 1, status: 1, routes: 1 }
		).sort({ creationDate: 0 });
		let formsWithNames = [];
		for (let key in forms) {
			if (forms.hasOwnProperty(key)) {
				form = forms[key];
				let schemeName = await Scheme.findOne(
					{ _id: form.schemeId },
					{ _id: 0, name: 1 }
				);
				if (schemeName == null) {
					res.status(400).json({ message: 'Specified scheme not found' });
					return;
				}
				let progress = [];
				for (let key2 in form.routes) {
					if (form.routes.hasOwnProperty(key2)) {
						appRoute = form.routes[key2];
						let appRouteLimits = await ApprovalRoute.findOne(
							{ _id: appRoute.approvalRouteId },
							{ _id: 0, requiredApprovals: 1, requiredRejections: 1 }
						);
						if (appRouteLimits == null) {
							res.status(400).json({ message: 'Specified route not found' });
							return;
						}
						progress.push({
							currentApprovals: appRoute.currentApprovals,
							currentRejections: appRoute.currentRejections,
							requiredApprovals: appRouteLimits.requiredApprovals,
							requiredRejections: appRouteLimits.requiredRejections
						});
					}
				}
				formsWithNames.push({
					schemeName: schemeName.name,
					creationDate: form.creationDate,
					status: form.status,
					progress: progress
				});
			}
		}
		formsWithNames.sort(function (a, b) {
			return a.schemeName < b.schemeName
				? -1
				: a.schemeName > b.schemeName
				? 1
				: 0;
		});
		res.json(formsWithNames);
	} catch (error) {
		res.status(408).json({ message: error });
	}
});

// GET ALL PENDNG FORMS BY USERNAME FOR ADMIN
// I: /userUsername
// O: all pending forms scheme names, dates, status, user author, decision and progress sorted
// E: 408, 401, 400
router.get('/pending/admin/:userUsername', verifyToken, async (req, res) => {
	try {
		const userId = await User.findOne(
			{ username: req.params.userUsername },
			{ _id: 1 }
		);
		if (userId == null) {
			res.status(400).json({ message: 'Specified user not found' });
			return;
		}
		const forms = await Form.find(
			{
				status: 0,
				routes: {
					$elemMatch: {
						approvers: { $elemMatch: { userId: userId._id, decision: 0 } }
					}
				}
			},
			{ _id: 0, schemeId: 1, creationDate: 1, status: 1, routes: 1, userId: 1 }
		).sort({ creationDate: 0 });
		let formsWithNames = [];
		for (let key1 in forms) {
			if (forms.hasOwnProperty(key1)) {
				form = forms[key1];
				let schemeName = await Scheme.findOne(
					{ _id: form.schemeId },
					{ _id: 0, name: 1 }
				);
				if (schemeName == null) {
					res.status(400).json({ message: 'Specified scheme not found' });
					return;
				}
				let userAuthor = await User.findOne(
					{ _id: form.userId },
					{ _id: 0, username: 1, name: 1 }
				);
				if (userAuthor == null) {
					res.status(400).json({ message: 'Specified author not found' });
					return;
				}
				let progress = [];
				for (let key2 in form.routes) {
					if (form.routes.hasOwnProperty(key2)) {
						appRoute = form.routes[key2];
						let appRouteLimits = await ApprovalRoute.findOne(
							{ _id: appRoute.approvalRouteId },
							{ _id: 0, requiredApprovals: 1, requiredRejections: 1 }
						);
						if (appRouteLimits == null) {
							res.status(400).json({ message: 'Specified route not found' });
							return;
						}
						progress.push({
							currentApprovals: appRoute.currentApprovals,
							currentRejections: appRoute.currentRejections,
							requiredApprovals: appRouteLimits.requiredApprovals,
							requiredRejections: appRouteLimits.requiredRejections
						});
					}
				}
				formsWithNames.push({
					schemeName: schemeName.name,
					creationDate: form.creationDate,
					status: form.status,
					progress: progress,
					authorUsername: userAuthor.username,
					authorName: userAuthor.name,
					decision: 0
				});
			}
		}
		formsWithNames.sort(function (a, b) {
			return a.schemeName < b.schemeName
				? -1
				: a.schemeName > b.schemeName
				? 1
				: 0;
		});
		res.json(formsWithNames);
	} catch (error) {
		res.status(408).json({ message: error });
	}
});

// GET ALL HISTORY FORMS BY USERNAME FOR ADMIN
// I: /userUsername
// O: all approved and rejected forms scheme names, dates, status, user author, decision and progress sorted
// E: 408, 401, 400
router.get('/history/admin/:userUsername', verifyToken, async (req, res) => {
	try {
		const userId = await User.findOne(
			{ username: req.params.userUsername },
			{ _id: 1 }
		);
		if (userId == null) {
			res.status(400).json({ message: 'Specified user not found' });
			return;
		}
		const forms = await Form.find(
			{
				$or: [
					{
						$and: [
							{ status: 0 },
							{
								routes: {
									$elemMatch: {
										approvers: {
											$elemMatch: {
												userId: userId._id,
												$or: [{ decision: 1 }, { decision: 2 }]
											}
										}
									}
								}
							}
						]
					},
					{
						$and: [
							{ $or: [{ status: 1 }, { status: 2 }] },
							{
								routes: {
									$elemMatch: {
										approvers: { $elemMatch: { userId: userId._id } }
									}
								}
							}
						]
					}
				]
			},
			{ _id: 0, schemeId: 1, creationDate: 1, status: 1, routes: 1, userId: 1 }
		).sort({ creationDate: 0 });
		let formsWithNames = [];
		for (let key1 in forms) {
			if (forms.hasOwnProperty(key1)) {
				form = forms[key1];
				let schemeName = await Scheme.findOne(
					{ _id: form.schemeId },
					{ _id: 0, name: 1 }
				);
				if (schemeName == null) {
					res.status(400).json({ message: 'Specified scheme not found' });
					return;
				}
				let userAuthor = await User.findOne(
					{ _id: form.userId },
					{ _id: 0, username: 1, name: 1 }
				);
				if (userAuthor == null) {
					res.status(400).json({ message: 'Specified author not found' });
					return;
				}
				let progress = [];
				let decision;
				for (let key2 in form.routes) {
					if (form.routes.hasOwnProperty(key2)) {
						appRoute = form.routes[key2];
						let appRouteLimits = await ApprovalRoute.findOne(
							{ _id: appRoute.approvalRouteId },
							{ _id: 0, requiredApprovals: 1, requiredRejections: 1 }
						);
						if (appRouteLimits == null) {
							res.status(400).json({ message: 'Specified route not found' });
							return;
						}
						progress.push({
							currentApprovals: appRoute.currentApprovals,
							currentRejections: appRoute.currentRejections,
							requiredApprovals: appRouteLimits.requiredApprovals,
							requiredRejections: appRouteLimits.requiredRejections
						});
						for (let key3 in appRoute.approvers) {
							if (appRoute.approvers.hasOwnProperty(key3)) {
								approver = appRoute.approvers[key3];
								if (approver.userId.equals(userId._id)) {
									decision = approver.decision;
								}
							}
						}
					}
				}
				formsWithNames.push({
					schemeName: schemeName.name,
					creationDate: form.creationDate,
					status: form.status,
					progress: progress,
					authorUsername: userAuthor.username,
					authorName: userAuthor.name,
					decision: decision
				});
			}
		}
		formsWithNames.sort(function (a, b) {
			return a.schemeName < b.schemeName
				? -1
				: a.schemeName > b.schemeName
				? 1
				: 0;
		});
		res.json(formsWithNames);
	} catch (error) {
		res.status(408).json({ message: error });
	}
});

// GET FORM BY SCHEME NAME, DATE AND USER AUTHOR
// I: /userUsername/schemeName/date
// O: all form with respective scheme and user information except routes
// E: 408, 401, 400
router.get(
	'/:userUsername/:schemeName/:date',
	verifyToken,
	async (req, res) => {
		try {
			const user = await User.findOne({ username: req.params.userUsername });
			if (user == null) {
				res.status(400).json({ message: 'Specified user not found' });
				return;
			}
			const scheme = await Scheme.findOne({ name: req.params.schemeName });
			if (scheme == null) {
				res.status(400).json({ message: 'Specified scheme not found' });
				return;
			}
			const form = await Form.findOne({
				userId: user._id,
				schemeId: scheme._id,
				creationDate: req.params.date
			});
			if (form == null) {
				res.status(400).json({ message: 'Specified form not found' });
				return;
			}
			let fieldsWithValue = [];
			for (let key in form.responses) {
				if (
					form.responses.hasOwnProperty(key) &&
					scheme.fields.hasOwnProperty(key)
				) {
					value = form.responses[key];
					field = scheme.fields[key];
					fieldsWithValue.push({
						name: field.name,
						label: field.label,
						component: field.component,
						value: value.value
					});
				}
			}
			res.json({
				schemeName: scheme.name,
				userName: user.name,
				userUsername: user.username,
				creationDate: form.creationDate,
				status: form.status,
				responses: fieldsWithValue
			});
		} catch (error) {
			res.status(408).json({ message: error });
		}
	}
);

/*POSTS*/

// CREATE NEW FORM
// I:
/*
	schemeName: String,
	userUsername: String,
	responses: [
		name: String,
        value: String
	]
*/
// O: Saved form creation date
// E: 408, 401, 400, 500
router.post('/', verifyToken, validateForm, async (req, res) => {
	try {
		const schemeId = await Scheme.findOne(
			{ name: req.body.schemeName, isActive: true },
			{ _id: 1 }
		);
		if (schemeId == null) {
			res.status(400).json({ message: 'Specified scheme not found' });
			return;
		}
		const userId = await User.findOne(
			{ username: req.body.userUsername },
			{ _id: 1 }
		);
		if (userId == null) {
			res.status(400).json({ message: 'Specified user not found' });
			return;
		}
		const form = new Form({
			schemeId: schemeId._id,
			userId: userId._id,
			responses: req.body.responses
		});
		const savedForm = await form.save();
		res.json({ date: savedForm.creationDate });
	} catch (error) {
		res.status(408).json({ message: error });
	}
});

/*PATCHES*/

// INPUT A DECISION INTO A FORM
// I:
/*
	approverUsername: String,
	authorUsername: String,
	schemeName: String,
	date: ISODate,
	decision: number
*/
// O: Modified form creation date
// E: 408, 401, 400
router.patch('/', verifyToken, async (req, res) => {
	try {
		const schemeId = await Scheme.findOne(
			{ name: req.body.schemeName, isActive: true },
			{ _id: 1 }
		);
		if (schemeId == null) {
			res.status(400).json({ message: 'Specified scheme not found' });
			return;
		}
		const approverId = await User.findOne(
			{ username: req.body.approverUsername },
			{ _id: 1 }
		);
		if (approverId == null) {
			res.status(400).json({ message: 'Specified approver user not found' });
			return;
		}
		const authorId = await User.findOne(
			{ username: req.body.authorUsername },
			{ _id: 1 }
		);
		if (authorId == null) {
			res.status(400).json({ message: 'Specified author user not found' });
			return;
		}
		const form = await Form.findOne({
			userId: authorId._id,
			schemeId: schemeId._id,
			creationDate: req.body.date
		});
		if (form == null) {
			res.status(400).json({ message: 'Specified form not found' });
			return;
		}
		let approverFound = false;
		for (let i = 0; i < form.routes.length; i++) {
			let route = form.routes[i];
			for (let j = 0; j < route.approvers.length; j++) {
				let approver = route.approvers[j];
				if (approver.userId.equals(approverId._id)) {
					approver.decision = req.body.decision;
					approver.approvalDate = Date();
					approverFound = true;
				}
			}
		}
		if (!approverFound) {
			res.status(400).json({
				message: 'You do not have permission to approve or reject this form'
			});
			return;
		}
		const savedForm = await form.save();
		res.json({ date: savedForm.creationDate });
	} catch (error) {
		res.status(408).json({ message: error });
	}
});

/*DELETES*/

// DELETE FORM BY SCHEME NAME, DATE AND USER AUTHOR
// I: /userUsername/schemeName/date
// O: Deleted form creation date
// E: 408, 401, 400
router.delete(
	'/:userUsername/:schemeName/:date',
	verifyToken,
	async (req, res) => {
		try {
			const user = await User.findOne({ username: req.params.userUsername });
			if (user == null) {
				res.status(400).json({ message: 'Specified user not found' });
				return;
			}
			const scheme = await Scheme.findOne({ name: req.params.schemeName });
			if (scheme == null) {
				res.status(400).json({ message: 'Specified scheme not found' });
				return;
			}
			const form = await Form.findOne({
				userId: user._id,
				schemeId: scheme._id,
				creationDate: req.params.date
			});
			if (form == null) {
				res.status(400).json({ message: 'Specified form not found' });
				return;
			}
			await Form.deleteOne({ _id: form._id });
			res.json({ date: form.creationDate });
		} catch (error) {
			res.status(408).json({ message: error });
		}
	}
);

module.exports = router;
