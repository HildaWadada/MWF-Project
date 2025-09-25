const express = require("express");
const router = express.Router();
const passport = require('passport');

const UserModel = require("../models/usersModel");

// MY ROUTES

// landing page
router.get('/', (req,res)=>{
    res.render('index');
});


module.exports = router;