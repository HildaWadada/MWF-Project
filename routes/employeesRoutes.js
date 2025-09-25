const express = require("express");
const router = express.Router();
const passport = require('passport');

// Employees-db page
router.get('/employees', (req,res)=>{
    res.render('employees');
});

module.exports = router;