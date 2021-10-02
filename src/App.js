import React from "react";
import { Viewer, CzmlDataSource, GeoJsonDataSource } from "resium";
var satellite = require("./Satellite.json");

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
      <CzmlDataSource data={satellite} />
      <GeoJsonDataSource data={data} />
    </Viewer>
  );
}

export default App;
