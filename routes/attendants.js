const express = require("express");
const router = express.Router();
const passport = require('passport');

// Attendants page
router.get('/attendants', (req,res)=>{
    res.render('attendants');
});

module.exports = router;