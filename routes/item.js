const router = require("express").Router();
const itemController = require("../controllers/item.controller");

router.post("/", itemController.add);

router.post("/complete", itemController.markComplete);

router.put("/update/:item", itemController.update);

router.post("/delete", itemController.delete);

module.exports = router;