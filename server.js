const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDb = require("./config/db");

// DOTENV Config
dotenv.config();

// import router
const userRoutes = require("./routes/userRoutes");

// Mongodb Connection
connectDb();

// rest object
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/v1/user", userRoutes);

// routes
app.get("/", (req, res) => {
  res.status(200).send({
    message: "Node Server Setup Succesfully",
  });
});

// Port
const PORT = process.env.PORT || 3000;
const DEV_MODE = process.env.DEV_MODE;

// Listen
app.listen(PORT, () => {
  console.log(`Server Running on ${DEV_MODE} port on ${PORT}`.bgCyan.bold);
});
