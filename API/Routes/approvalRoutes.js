const express = require('express');
const ApprovalRoute = require('../models/ApprovalRoute');
const router = express.Router();

/*
ROUTES: http://localhost:3000/
    get = SELECT, 
    post = INSERT, 
    delete = DELETE, 
    patch = UPDATE 
*/


/*GETS*/
// Gets all approval routes
router.get ('/', async (req, res) => {
    try{
        const approvalRoute = await ApprovalRoute.find();
        res.json(approvalRoute);
    } catch (error){
        res.status(408).json({message: error});
    } 
});

// Gets approval route by Id
router.get ('/:approvalRouteId', async (req, res) => {
    try{
        const approvalRoute = await ApprovalRoute.findById(req.params.approvalRouteId);
        res.json(approvalRoute);
    } catch (error){
        res.status(408).json({message: error});
    } 
});

/*POSTS*/
//Creates a new approval route
router.post('/', async (req, res) => {
    const approvalRoute = new ApprovalRoute({
        schemeId : req.body.schemeId,
        authors: req.body.authors,
        approvers: req.body.approvers,
        requiredApprovals: req.body.requiredApprovals,
        requiredRejections: req.body.requiredRejections,
    });
    try{
        const savedApprovalRoute = await scheme.save();
        res.json(savedApprovalRoute);
    } catch (error){
        res.status(408).json({message: error});
    } 
});

module.exports = router;