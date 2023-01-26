const express = require("express");
const app = express();
const db = require("./db");

db();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");

app.use("/users", userRoutes);
app.use("/auth", authRoutes);

app.listen(3000, () => {
  console.log("Express server listening on port 3000");
});
