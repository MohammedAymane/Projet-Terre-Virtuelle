const axios = require("axios");

/**
 * @description: This function is used to get czml of satelitte by name
 */
const getSatByName = async (name) => {
  const querystring = "?name=" + name;
  var res = await axios.get("http://localhost:9000/orbite" + querystring);
  return res.data;
};

/**
 * @description: This function is used to get satelitte by name
 */
const getAllSat = async (url) => {
  var res = await axios.get(url);
  return res.data;
};

const loadData = (elmts, select) => {
  for (var i = 0; i < elmts.length; i++) {
    var optn = elmts[i];
    var el = document.createElement("option");
    el.textContent = optn;
    el.value = optn;
    select.appendChild(el);
  }
};

module.exports = { getSatByName, getAllSat, loadData };
