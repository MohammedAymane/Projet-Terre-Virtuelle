const express = require("express");
const Satellites = require("../satellitesGNSS.json");
const router = express.Router();

router.get("", async (req, res) => {
  if (req.query.name) {
    const name = req.query.name;
    for (let index = 0; index < Satellites.length; index++) {
      if (Satellites[index].name == name) {
        return res.send(Satellites[index]);
      }
    }
    return res.send({ status: false, message: "Not found" }).status(404);
  } else if (req.query.search) {
    const search = req.query.search;
    dataToSend = [];
    for (let index = 0; index < Satellites.length; index++) {
      if (Satellites[index].name.includes(search)) {
        dataToSend.push(Satellites[index].name);
      }
    }
    return res.json(dataToSend);
  } else {
    dataToSend = [];
    for (let i = 0; i < Satellites.length; i++) {
      dataToSend.push(Satellites[i].name);
    }
    return res.json(dataToSend);
  }
});

// Cette route permet d'envoyer la liste des satellites de geopositionnement actifs (elle envoie des données au hasard pour l'instant)
router.get("/actifSatellite", async (req, res) => {
  dataToSend = [Satellites[0], Satellites[1], Satellites[2]];
  return res.json(dataToSend);
});

module.exports = router;
