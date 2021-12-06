var Cesium = require("cesium/Cesium");
require("./css/main.css");
require("cesium/Widgets/widgets.css");
const {
  getSatByName,
  getAllSat,
  loadData,
  getSatByNameIncludes,
} = require("./functions");

var SatellitesToShow = [];
var select = document.getElementById("arr");
var viewer = new Cesium.Viewer("cesiumContainer", {
  shouldAnimate: true,
});

/**
 * @description: This function is used to load the satellite data from the server
 */

document
  .getElementById("loadSatellites")
  .addEventListener("click", async (e) => {
    loadData(await getAllSat("http://localhost:9000/orbite"), select);
  });

document.getElementById("cleanView").addEventListener("click", async (e) => {
  SatellitesToShow = [];
  viewer.dataSources.removeAll(); // remove all data sources
});

/**
 * @description: This function is used to visualize the selected satellite
 */
document.getElementById("arr").addEventListener("change", (e) => {
  SatellitesToShow = [...select.options]
    .filter((option) => option.selected)
    .map((option) => ({
      name: option.value,
      czml: getSatByName(option.value),
    }));
});

document.getElementById("save").addEventListener("click", (e) => {
  for (let index = 0; index < SatellitesToShow.length; index++) {
    const element = SatellitesToShow[index];
    element.czml.then((data) => {
      viewer.dataSources.add(Cesium.CzmlDataSource.load(data.czml));
    });
  }
});

document.getElementById("search").addEventListener("click", async (e) => {
  select.innerHTML = "";
  loadData(
    await getSatByNameIncludes(document.getElementById("form1").value),
    select
  );
});
