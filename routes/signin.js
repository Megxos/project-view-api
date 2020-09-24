const router = require("express").Router();
const signinController = require("../controllers/signin.controller"  );

router.post("/", signinController.signin);

module.exports = router;