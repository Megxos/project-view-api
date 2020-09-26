const router = require("express").Router();
const projectController = require("../controllers/project.controller");
const auth = require("../auth/auth").verify;

router.use("/", auth);

router.post("/", projectController.new);

router.post("/join", projectController.join);

module.exports = router;