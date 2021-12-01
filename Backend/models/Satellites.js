const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SatellitesSchema = new Schema({
  name: {
    type: String,
  },
  CATNR: {
    type: String,
  },
  czml: {
    type: [],
  },
  tle: {
    type: String,
  },
});

module.exports = mongoose.model("satellites", SatellitesSchema);