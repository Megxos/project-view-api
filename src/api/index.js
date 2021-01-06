require("dotenv").config();
const router = require("express").Router();
require("../../config/database");

const signup = require("./routes/signup");
const signin = require("./routes/signin");
const account = require("./routes/account");
const item = require("./routes/item");
const project = require("./routes/projects");
const user = require("./routes/user");

router.use("/signup", signup);
router.use("/signin", signin);
router.use("/account", account);
router.use("/item", item);
router.use("/project", project);
router.use("/user", user);

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API root route",
    data: {
      statusCode: 200,
    },
  });
});

module.exports = router;
