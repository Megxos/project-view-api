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

app.use("/signup", signup);
app.use("/signin", signin);
app.use("/account", account);
app.use("/item", item);

const port = PORT || LOCAL_PORT;
app.listen(port, ()=>{
    console.log(`server listening on PORT *:${port}`);
});