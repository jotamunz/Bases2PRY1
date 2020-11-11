const express = require('express');
const Scheme = require('../models/Scheme');
const router = express.Router();
const Form = require('../models/Scheme')

/*
ROUTES: http://localhost:3000/
    get = SELECT, 
    post = INSERT, 
    delete = DELETE, 
    patch = UPDATE 
*/


/*GETS*/
// Gets all Schemes
router.get ('/', async (req, res) => {
    try{
        const scheme = await Scheme.find();
        res.json(scheme);
    } catch (error){
        res.status(408).json({message: error});
    } 
});

// Gets schemes by Id
router.get ('/:schemeId', async (req, res) => {
    try{
        const scheme = await Scheme.findById(req.params.schemeId);
        res.json(scheme);
    } catch (error){
        res.status(408).json({message: error});
    } 
});

/*POSTS*/
//Creates new scheme
router.post('/', async (req, res) => {
    const scheme = new Form({
        name : req.body.name,
        fields: req.body.fields,
    });
    try{
        const savedScheme = await scheme.save();
        res.json(savedScheme);
    } catch (error){
        res.status(408).json({message: error});
    } 
});







module.exports = router;