const router = require("express").Router();
const projectController = require("../controllers/project.controller");
const auth = require("../auth/auth").verify;

router.use("/", auth);

router.get("/:user_id", projectController.getAll);

router.post("/", projectController.new);

router.post("/join", projectController.join);

module.exports = router;