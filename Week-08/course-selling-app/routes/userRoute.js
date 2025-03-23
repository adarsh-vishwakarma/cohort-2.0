const express = require("express");
const router = express.Router();

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

router.put("/update", (req, res) => {
  res.json({
    message: "update endpoint",
  });
});

router.put("/purchases", (req, res) => {
  res.json({
    message: "update endpoint",
  });
});

module.exports = router;
