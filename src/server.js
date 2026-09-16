import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

mongoose
      .connect(process.env.MONGO_URI)
      .then(() => {
            console.log("Mongo DB Connected");

            // middleware
            app.use(express.json());
            // routes
            app.get("/health", (req, res) => {
                  res.status(200).json({status: "UP", message: "Node js is running", timestamp: new Date().toISOString()});
            });
            app.use("/api/tasks", taskRoutes);

            app.listen(PORT, () => {
                  console.log(`Server is running on port ${PORT}`);
            });
      })
      .catch((error) => {
            console.error("Mongo DB fail to connect", error);
            process.exit(1);
      });