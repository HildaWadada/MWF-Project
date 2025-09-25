const express = require("express");
const router = express.Router();
const passport = require('passport');

// Products page
router.get('/products', (req,res)=>{
    res.render('products');
});

module.exports = router;