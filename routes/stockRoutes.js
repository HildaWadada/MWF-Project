const express = require("express");
const router = express.Router();
const passport = require("passport");
const stockModel = require("../models/stockModel");

// GET: Stock page
router.get("/stock", (req, res) => {
  res.render("stock");
});

// POST: Add / Update Stock
router.post("/stock", async (req, res) => {
  try {
    const { name, type, supplier, quantity, cost, price, quality, lastUpdate } = req.body;

    // Create a new stock item
    const newStock = new stockModel({
      name,
      type,
      supplier,
      quantity,
      cost,
      price,
      quality,
      lastUpdate,
    });

    await newStock.save();

    // Redirect back to stock page (you could also render JSON if API style)
    res.redirect("/stock");
  } catch (err) {
    console.error("Error saving stock:", err);
    res.status(500).send("Server Error: Unable to save stock.");
  }
});

module.exports = router;
