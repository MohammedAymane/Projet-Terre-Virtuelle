const express = require("express");
const router = express.Router();
const axios = require("axios");
var fs = require("fs").promises;
const { v4: uuidv4 } = require("uuid");
const { spawn } = require("child_process");

//https://celestrak.com/satcat/tle.php?CATNR=00900

router.get("/", async (req, res) => {
  const name = uuidv4();
  var dataToSend;
  try {
    //const tle = await axios.get(req.body.satelliteLink);
    const tle = await axios.get(
      "https://celestrak.com/satcat/tle.php?CATNR=00900"
    );
    await fs.writeFile("./tleFiles/" + name + ".txt", tle.data);

    const python = spawn("python", [
      "./pythonScript/script.py",
      "./tleFiles/" + name + ".txt",
      "./czmlFiles/" + name + ".czml",
    ]);

    // spawn new child process to call the python script
    python.stdout.on("data", async (data) => {
      console.log("Pipe data from python script ...");
      dataToSend = data.toString();
      //dataToSend = dataToSend.substring(2, dataToSend.length - 2);
      res.send(dataToSend.split("'").join(""));

      try {
        await fs.unlink("./tleFiles/" + name + ".txt");
        await fs.unlink("./czmlFiles/" + name + ".czml");
      } catch (error) {
        throw error;
      }
    });

    // in close event we are sure that stream from child process is closed
    python.on("close", (code) => {
      console.log(`child process close all stdio with code ${code}`);
    });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
