const express = require("express");
const router = express.Router();

router.get("/purchase", (req, res) => {
    res.json({
      message: "bulk signup endpoint",
    });
  });

  router.get("/preview", (req, res) => {
    res.json({
      message: "bulk signup endpoint",
    });
  });


module.exports = router