const router = require("express").Router();
const itemController = require("../controllers/item.controller");

const auth = require("../auth/auth").verify;

router.use("/", auth);

router.post("/",itemController.add);

router.post("/complete/:item", itemController.markComplete);

router.put("/update/:item", itemController.update);

router.post("/delete", itemController.delete);

module.exports = router;