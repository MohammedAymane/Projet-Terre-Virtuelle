const express = require("express");
const cors = require("cors");
const axios = require("axios");
var fs = require("fs");

const app = express();
app.use(express.json());
app.use(cors());
const port = 9000;

app.get("/", (req, res) => {
  res.send("JSON.parse(data)");
});

app.use("/orbite", require("./routes/orbits"));
app.listen(port, () => {
  console.error(`app listening at http://localhost:${port}`);
});
