var Cesium = require("cesium/Cesium");
require("./css/main.css");
require("cesium/Widgets/widgets.css");
const { getSatByName, getAllSat, loadData, cleanView } = require("./functions");

var viewer = new Cesium.Viewer("cesiumContainer", {
  shouldAnimate: true,
});

/**
 * @description: This function is used to load the satellite data from the server
 */

document
  .getElementById("loadSatellites")
  .addEventListener("click", async (e) => {
    loadData(await getAllSat("http://localhost:9000/orbite/"));
  });

document.getElementById("cleanView").addEventListener("click", async (e) => {
  cleanView(viewer);
});

/**
 * @description: This function is used to visualize the selected satellite
 */
document.getElementById("arr").addEventListener("change", (e) => {
  viewer.dataSources.add(
    Cesium.CzmlDataSource.load(getSatByName(e.target.value))
  );
});
