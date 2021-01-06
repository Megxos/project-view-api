const api = require("./src/api");
const web = require("./src/web");
const express = require("express");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/v1", api);
app.use("/", web);

const { LOCAL_PORT, PORT } = process.env;

const port = PORT || LOCAL_PORT;
app.listen(port, () => {
  console.log(`server listening on PORT *:${port}`);
});
