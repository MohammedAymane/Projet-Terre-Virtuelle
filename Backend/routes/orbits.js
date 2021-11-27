const express = require("express");
const router = express.Router();
// const axios = require("axios");
// var fs = require("fs").promises;
// const { v4: uuidv4 } = require("uuid");
// const { spawn } = require("child_process");
const Satelittes = require("../models/satelittes");
// const { json } = require("express");

router.get("/:name", async (req, res) => {
  const name = req.params.name;
  var satelittes;
  try {
    satelittes = await Satelittes.findOne({ name: name }, { czml: 1, _id: 0 });
    if (satelittes) return res.json(satelittes.czml);
    else {
      satelittes = await Satelittes.findOne(
        { name: { $regex: name } },
        { czml: 1, _id: 0 }
      );
      return res.json(satelittes.czml);
    }
  } catch (error) {
    res.status(404).json({ message: "Satelittes not found" });
  }
});

router.get("/", async (req, res) => {
  const satelittes = await Satelittes.find({}, { name: 1, _id: 0 });
  dataToSend = [];
  for (let i = 0; i < satelittes.length; i++) {
    dataToSend.push(satelittes[i].name);
  }
  res.json(dataToSend);
});

// router.get("/", async (req, res) => {
//   const name = uuidv4();
//   try {
//     //const tle = await axios.get(req.body.satelliteLink);
//     const tle = await axios.get(req.query.satelliteLink);
//     //const tle = await axios.get(
//     //  "https://celestrak.com/satcat/tle.php?CATNR=00900"
//     //);
//     await fs.writeFile("./tleFiles/" + name + ".txt", tle.data);

//     const python = spawn("python", [
//       "./pythonScript/script.py",
//       "./tleFiles/" + name + ".txt",
//       "./czmlFiles/" + name + ".czml",
//     ]);

//     // spawn new child process to call the python script
//     python.stdout.on("data", async (data) => {
//       console.log("Pipe data from python script ...");
//       res.send(JSON.parse(data));
//       await fs.unlink("./tleFiles/" + name + ".txt");
//       await fs.unlink("./czmlFiles/" + name + ".czml");
//     });

//     // in close event we are sure that stream from child process is closed
//     python.on("close", (code) => {
//       console.log(`child process close all stdio with code ${code}`);
//     });
//   } catch (error) {
//     console.error(error);
//   }
// });

// router.post("/", async (req, res) => {
//   const glo = await axios.get(
//     "https://celestrak.com/NORAD/elements/gp.php?GROUP=glo-ops&FORMAT=JSON-PRETTY"
//   );
//   const array = glo.data;
//   for (let index = 0; index < array.length; index++) {
//     const element = array[index];
//     var url =
//       "http://localhost:1000/orbite?satelliteLink=https://celestrak.com/satcat/tle.php?CATNR=" +
//       element.NORAD_CAT_ID;
//     console.log(url);
//     var czml = await axios.get(url);
//     sat = new Satelittes({
//       name: element.OBJECT_NAME,
//       CATNR: element.NORAD_CAT_ID,
//       czml: czml.data[0],
//       tle: czml.data[1],
//     });
//     const saved = await sat.save();
//   }
//   res.send("News added successfully");
// });

module.exports = router;
