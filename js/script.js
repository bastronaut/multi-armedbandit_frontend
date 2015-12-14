var apiURL = "http://localhost:3000/";
var getStatisticsURL = apiURL + "getStatistics";
var updateClickCountURL = apiURL + "updateClickCount/";
var reinitializeURL = apiURL +  "reinitialize";

window.onload = function () {
  document.cookie="username=bas; expires=Thu, 24 Dec 2017 12:00:00 UTC";
  document.cookie="yolo=dinges";
  document.cookie="testor=wot"
  console.log('cookie is written');

  addStatisticsTable();
}


function getCookieValues() {
  var x = document.cookie;
  console.log(x);
  document.getElementById('texty').innerHTML = x;
}




function addStatisticsTable () {
  var statisticsPromise = $.getJSON(getStatisticsURL);

  statisticsPromise.done(function (res){
    if (res.status === 'success') {

      setButtonColor(res.selectedColor)
      clearStatisticsTable();
      generateTable(res);
    };
  }).fail(function(err){
    console.log('error: ' + err.status);
  });
}


function generateTable(colorStats) {
  var table = document.getElementById("colorStatisticsBody");

  colorStats.allColorStats.forEach(function (colorStats) {
    var tablerow = table.insertRow(-1);

    var colorCell = tablerow.insertCell(0).innerHTML = colorStats.color;
    var clicksCell = tablerow.insertCell(1).innerHTML = colorStats.clicks;
    var viewsCell = tablerow.insertCell(2).innerHTML = colorStats.views;
    var avgConversionCell = tablerow.insertCell(3).innerHTML = colorStats.avgConversion;
  })
}


function clearStatisticsTable() {
  var tableBody = document.getElementById("colorStatisticsBody");
  var newTablebody = document.createElement('tbody');
  newTablebody.setAttribute("id", "colorStatisticsBody");
  tableBody.parentNode.replaceChild(newTablebody, tableBody)
}


function reinitialize() {
  reinitializeCallPromise = sendReinitializeCall();
  reinitializeCallPromise.done(function (res){
      if (res.status === 'success') {
        clearStatisticsTable();
        addStatisticsTable();
      };
    }).fail(function(err){
      console.log('error: ' + err.status);
    });
}


function sendReinitializeCall() {
  var reinitializeCallPromise = $.getJSON(reinitializeURL);
  return reinitializeCallPromise;
}


function setButtonColor(color) {
  var button = document.getElementById("conversionButton")
  var classname = "btn btn-"
  if (color === "green"){ classname = classname + "success"}
  else if ( color === "red") { classname = classname + "danger"}
  else if (color === "blue") { classname = classname + "primary"}
  else { classname = "btn"}
  button.setAttribute("class", classname)
}
