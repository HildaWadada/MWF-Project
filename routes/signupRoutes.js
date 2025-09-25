const express = require("express");
const router = express.Router();
const passport = require('passport');

// sign-up page
router.get('/signup', (req,res)=>{
    res.render('signup');
});

module.exports = router;