const router  = require("express").Router();
const accountController = require("../controllers/account.controller");
const { route } = require("./signup");

router.post("/", accountController.add);

router.post("/update", accountController.update);

module.exports = router;