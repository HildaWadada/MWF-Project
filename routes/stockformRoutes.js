const express = require("express");
const router = express.Router();
const passport = require("passport");

// GET: Stock page
router.get("/stockform", (req, res) => {
  res.render("stockform");
});


module.exports = router;
