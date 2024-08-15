const express = require("express");
require("dotenv").config();

const route = require("./routes/client/index.route");

const app = express();

app.set("views", "./views");
app.set("view engine", "pug");
const port = process.env.PORT;
//Routes
route(app);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
