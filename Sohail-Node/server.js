const express = require("express");
const app = express();

app.get("/", (req, res) => {
  return res.json({ name: "John", email: "john@gmail.com" });
  // return res.send("Welcome to Express");
});

app.post("/users", (req, res) => {
  return res.json({ name: "John", email: "john@gmail.com" });
});

app.post("/users/:user_id", (req, res) => {
  req.params.user_id;
  return res.json({ name: "John", email: "john@gmail.com" });
});

app.all("/test", (req, res, next) => {
  //

  next();
});

app.listen(3000);
