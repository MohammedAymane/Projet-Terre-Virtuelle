var Cesium = require("cesium/Cesium");
require("./css/main.css");
require("cesium/Widgets/widgets.css");
const axios = require("axios");

const getSatByName = async (name) => {
  var res = await axios.get("http://localhost:9000/orbite/" + name);
  return res.data;
};

// const getAllSat = async (url) => {
//   var res = await axios.get(url);
//   console.log(res.data);
//   return res.data;
// };

var viewer = new Cesium.Viewer("cesiumContainer", {
  shouldAnimate: true,
});
viewer.dataSources.add(Cesium.CzmlDataSource.load(getSatByName("GSAT0102")));
// viewer.dataSources.add(
//   Cesium.CzmlDataSource.load(getAllSat("http://localhost:9000/orbite/"))
// );
