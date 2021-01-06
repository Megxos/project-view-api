const router = require("express").Router();
const itemControllers = require("../controllers/itemControllers");

const auth = require("../auth/auth").verify;

router.use("/", auth);

router.get("/:code", itemControllers.getAll);

router.post("/", itemControllers.add);

router.get("/pending/:project", itemControllers.getPending);

router.get("/completed/:project", itemControllers.getCompleted);

router.post("/complete/:item", itemControllers.markComplete);

router.put("/update/:item", itemControllers.update);

router.post("/delete", itemControllers.deleteItem);

module.exports = router;
