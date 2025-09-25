const express = require("express");
const router = express.Router();
const passport = require('passport');

// sales records page
router.get('/salesrecords', (req,res)=>{
    res.render('salesrecords');
});

module.exports = router;