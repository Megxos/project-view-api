const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Welcome home");
});

module.exports = router;
