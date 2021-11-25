


var Cesium = require("cesium/Cesium");
require("./css/main.css");
require("cesium/Widgets/widgets.css");
const axios = require("axios");

const getData = async (url) => {
  var res = await axios.get(url);
  console.log(res.data);
  return res.data;
};

var viewer = new Cesium.Viewer("cesiumContainer");
viewer.dataSources.add(
  Cesium.CzmlDataSource.load(
    getData(
      "http://localhost:9000/orbite?satelliteLink=https://celestrak.com/satcat/tle.php?CATNR=00900"
    )
  )
);




