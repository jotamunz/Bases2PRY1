const express = require('express');
const router = express.Router();
const User = require('../models/User')

/*
ROUTES: http://localhost:3000/
  get = SELECT, 
    post = INSERT, 
    delete = DELETE, 
    patch = UPDATE 
*/


/*GETS*/

// Gets all users
router.get ('/', async (req, res) => {
    try{
        const user = await User.find();
        res.json(user);
    }catch (error){
        res.json({message: error});
    } 
});


//Finds user by ID
router.get ('/:userId', async (req, res) => {
    try{
        const user = await User.findById(req.params.userId);
        res.json(user);
    }catch (error){
        res.json({message: error});
    } 
});

/*POSTS*/
//Creates new user
router.post('/', async (req, res) => {
    const user = new User({
        username : req.body.username,
        name: req.body.name,
        password: req.body.password,
        isAdmin: req.body.isAdmin,
    });
    try{
        const savedUser = await user.save();
        res.json(savedUser);
    }catch (error){
        res.json({message: error});
    } 
});

module.exports = router;



