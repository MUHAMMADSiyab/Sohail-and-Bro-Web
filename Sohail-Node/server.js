const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

const projectRoutes = require("./routes/projects");
const userRoutes = require("./routes/users");

app.use("/projects", projectRoutes);
app.use("/users", userRoutes);

app.listen(3000, () => {
  console.log("Express server listening on port 3000");
});
