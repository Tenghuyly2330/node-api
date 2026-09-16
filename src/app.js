const express = require("express");
const taskRoutes = require("./routes/taskRoutes.js");

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "UP",
    message: "Node.js API is running",
  });
});

app.use("/api/tasks", taskRoutes);

module.exports = app;