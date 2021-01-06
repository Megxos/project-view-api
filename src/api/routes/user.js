const router = require("express").Router();
const userController = require("../controllers/user.controller");
const auth = require("../auth/auth").verify;

router.use("/", auth);

router.put("/update/:user_id", userController.update);


module.exports = router;