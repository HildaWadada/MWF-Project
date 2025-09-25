const express = require("express");
const router = express.Router();
const passport = require('passport');

// sales-summary page
router.get('/sales', (req,res)=>{
    res.render('sales');
});

module.exports = router;