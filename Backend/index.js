const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// Connect to the Database
connectDB();

const app = express();

// Init Midleware
app.use(express.json());
app.use(cors());

// Define Routes
app.get("/", (req, res) => {
  res.send("route non configurée");
});
app.use("/orbite", require("./routes/orbits"));

const port = 9000;
app.listen(port, () => {
  console.error(`app listening at http://localhost:${port}`);
});
