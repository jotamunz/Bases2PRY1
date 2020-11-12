const express = require('express');
const mongoose = require('mongoose');
const Form = require('../models/Form');

const router = express.Router();

/*GETS*/
// Gets all forms
router.get('/', async (req, res) => {
	try {
		const form = await Form.find();
		res.json(form);
	} catch (error) {
		res.status(408).json({ message: error });
	}
});

// Gets form by Id
router.get('/:formId',async (req, res) => {
	try {
		const form = await Form.findById(
			req.params.formId
		);
		res.json(form);
	} catch (error) {
		res.status(408).json({ message: error });
	}
});

/*POSTS*/
//Creates a new form
router.post('/', async (req, res) => {
    if ("routes" in req.body) {
        for (var i = 0; i < req.body.routes.length; i++) {
            req.body.routes[i].approvalRouteId = new mongoose.Types.ObjectId(
                req.body.routes[i].approvalRouteId
            );
            for (var j = 0; j < req.body.routes[i].approvers.length; i++) {
                req.body.routes[i].approvers[j].userId = new mongoose.Types.ObjectId(
                    req.body.routes[i].approvers[j].userId
                );
            }
        }
    }
	const form = new Form({
		schemeId: new mongoose.Types.ObjectId(req.body.schemeId),
		responses: req.body.responses,
		userId: new mongoose.Types.ObjectId(req.body.userId),
	});
	try {
		const savedForm = await form.save();
		res.json(savedForm);
	} catch (error) {
		res.status(408).json({ message: error});
	}
});

module.exports = router;