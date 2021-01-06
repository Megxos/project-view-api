const router = require("express").Router();
const accountControllers = require("../controllers/accountControllers");
const bodyValidator = require("../utils/bodyValidator");

const auth = require("../auth/auth").verify;

router.use("/", auth);

router.get("/:user_id/:project", accountControllers.getAccount);

router.get("/:user_id", accountControllers.getAll);

router.post(
  "/",
  accountControllers.addValidate,
  bodyValidator,
  accountControllers.add
);

router.put(
  "/update/:project",
  accountControllers.validateUpdate,
  bodyValidator,
  accountControllers.update
);

module.exports = router;
