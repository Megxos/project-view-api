const router  = require("express").Router();
const accountController = require("../controllers/account.controller");
const { route } = require("./signup");

const auth = require("../auth/auth").verify;

router.use("/", auth);

router.get("/:user_id", accountController.getAccount);

router.post("/", accountController.add);

router.put("/update", accountController.update);

module.exports = router;