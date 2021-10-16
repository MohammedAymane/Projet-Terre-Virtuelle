var Cesium = require("cesium/Cesium");
require("./css/main.css");
require("cesium/Widgets/widgets.css");

var viewer = new Cesium.Viewer("cesiumContainer");
viewer.dataSources.add(
  Cesium.CzmlDataSource.load("http://localhost:9000/orbiteSatellite")
);
