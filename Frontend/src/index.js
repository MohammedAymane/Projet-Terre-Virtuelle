var Cesium = require("cesium/Cesium");
require("./css/main.css");
require("cesium/Widgets/widgets.css");
const axios = require("axios");

data = {
  satelliteLink: "https://celestrak.com/satcat/tle.php?CATNR=00900",
};
const getData = async (url) => {
  var res = await axios.get(url, data);
  console.log(res.data);
  return res.data;
};
var resp = getData("http://localhost:9000/orbite");
var viewer = new Cesium.Viewer("cesiumContainer");
viewer.dataSources.add(Cesium.CzmlDataSource.load(resp));
