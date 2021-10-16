const express = require("express");
const cors = require("cors");
const axios = require("axios");
var fs = require("fs");
const { spawn } = require("child_process");

const app = express();
app.use(cors());
const port = 9000;

app.get("/", (req, res) => {
  fs.readFile("./czmlFiles/Satellite.czml", "utf8", function (err, data) {
    if (err) throw err;
    res.send(JSON.parse(data));
  });
});

app.get("/orbiteSatellite", (req, res) => {
  axios
    .get("https://celestrak.com/satcat/tle.php?CATNR=00900", {
      responseType: "blob",
    })
    .then((response) => {
      fs.writeFile("./tleFiles/file.txt", response.data, (err) => {
        if (err) throw err;
        console.log("The file has been saved!");

        // spawn new child process to call the python script
        const python = spawn("python", [
          "./pythonScript/script.py",
          "./tleFiles/file.txt",
        ]);

        // in close event we are sure that stream from child process is closed
        python.on("close", (code) => {
          console.log(`child process close all stdio with code ${code}`);
          // send data to browser
        });
      });

      fs.readFile("./czmlFiles/orbit.czml", "utf8", (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        res.send(JSON.parse(data));
      });
    });
});

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
