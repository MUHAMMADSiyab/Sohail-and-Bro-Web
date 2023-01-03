const express = require("express");
const app = express();
const db = require("./db");

app.use((req, res, next) => {
  db.connectToServer((err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Database connected");
    }

    next();
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("views", __dirname + "/views");
app.set("view engine", "pug");

// app.use((req, res, next) => {
//   req.body.name = req.body.name.toUpperCase();
//   console.log(Date.now());
//   next();
// });

const projectRoutes = require("./routes/projects");
const userRoutes = require("./routes/users");

app.use("/projects", projectRoutes);
app.use("/users", userRoutes);

app.listen(3000, () => {
  console.log("Express server listening on port 3000");
});
