require("dotenv").config();
const express = require("express");
const database = require("./config/database");

const {LOCAL_PORT, PORT } = process.env;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const signup = require("./routes/signup");
const signin = require("./routes/signin");
const account = require("./routes/account");
const item = require("./routes/item");
const project = require("./routes/projects");
const user = require("./routes/user");

app.use("/signup", signup);
app.use("/signin", signin);
app.use("/account", account);
app.use("/item", item);
app.use("/project", project);
app.use("/user", user);

const port = PORT || LOCAL_PORT;
app.listen(port, ()=>{
    console.log(`server listening on PORT *:${port}`);
});