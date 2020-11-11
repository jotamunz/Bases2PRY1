const express = require('express');
const router = express.Router();
const Form = require('../models/Form')

/*
ROUTES: http://localhost:3000/
  get = SELECT, 
    post = INSERT, 
    delete = DELETE, 
    patch = UPDATE 
*/


/*GETS*/
// Gets all Forms
router.get ('/', async (req, res) => {
    try{
        const form = await Form.find();
        res.json(form);
    } catch (error){
        res.status(408).json({message: error});
    } 
});

// Gets forms by Id
router.get ('/:formId', async (req, res) => {
    try{
        const form = await Form.findById(req.params.formId);
        res.json(form);
    } catch (error){
        res.status(408).json({message: error});
    } 
});

/*POSTS*/




module.exports = router;