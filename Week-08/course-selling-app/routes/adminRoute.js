const express = require("express");
const router = express.Router();
const {adminModel} = require("../model/model")

router.post("/signin", (req, res) => {
  res.json({
    message: "signin endpoint",
  });
});

router.post("/signup", (req, res) => {
  res.json({
    message: "signup endpoint",
  });
});


router.get("/course", (req, res) => {
  res.json({
    message: "course signup endpoint",
  });
});

router.get("/course/bulk", (req, res) => {
    res.json({
      message: "bulk signup endpoint",
    });
  });

  
module.exports = router;
