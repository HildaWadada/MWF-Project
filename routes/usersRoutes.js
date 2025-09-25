const express = require("express");
const router = express.Router();
const passport = require('passport');

// sign-up page
router.get('/users', (req,res)=>{
    res.render('users');
});

module.exports = router;