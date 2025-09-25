const express = require("express");
const router = express.Router();
const passport = require('passport');

// Dashboard page
router.get('/dashboard', (req,res)=>{
    res.render('dashboard');
});

module.exports = router;