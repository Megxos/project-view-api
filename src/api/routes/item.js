const router = require("express").Router();
const itemController = require("../controllers/item.controller");

const auth = require("../auth/auth").verify;

router.use("/", auth);

router.get("/:code", itemController.getAll);

router.post("/",itemController.add);

router.get("/pending/:project", itemController.getPending);

router.get("/completed/:project", itemController.getCompleted);

router.post("/complete/:item", itemController.markComplete);

router.put("/update/:item", itemController.update);

router.post("/delete", itemController.delete);

module.exports = router;