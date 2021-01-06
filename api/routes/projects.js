const router = require("express").Router();
const projectControllers = require("../controllers/projectControllers");
const auth = require("../auth/auth").verify;

router.use("/", auth);

router.get("/:user_id", projectControllers.getAll);

router.post("/", projectControllers.create);

router.post("/join", projectControllers.join);

module.exports = router;
