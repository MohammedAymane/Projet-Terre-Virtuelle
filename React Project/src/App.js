import React from "react";
import { Viewer, CzmlDataSource, GeoJsonDataSource, Sun, Camera } from "resium";
var satellite = require("./Satellite.json");
var satellite2 = require("./Satellite2.json");

const data = {
  type: "Feature",
  properties: {
    name: "Coors Field",
    amenity: "Baseball Stadium",
    popupContent: "This is where the Rockies play!",
  },
  geometry: {
    type: "Point",
    coordinates: [-104.99404, 39.75621],
  },
};

function App() {
  return (
    <Viewer full>
      <Camera />
      <CzmlDataSource data={satellite} />
      <GeoJsonDataSource data={data} />
      <Sun show={true} glowFactor={3} />
    </Viewer>
  );
}

export default App;
