// TODO: problem with getting statistics: it will also select another color and
// update the stats. better to have it single responsibility and split into
// seperate call. then, after clicking button, we can do new call to getStatistics


var apiURL = "http://localhost:3000/";
var getSelectedColorURL = apiURL + "getColor";
var getStatisticsURL = apiURL + "getStatistics";
var updateClickCountURL = apiURL + "updateClickCount/";
var reinitializeURL = apiURL +  "reinitialize";

var buyitnowclicked = false;

window.onload = function () {
  getSelectedColor()
  .then(setButtonColor)
  .then(addStatisticsTable());
}


function getSelectedColor () {
  var getSelectedColorPromise = $.getJSON(getSelectedColorURL);
  return getSelectedColorPromise;
}


// Fetches the view/click per color statistics from the database. Clears any
// existing data in the html table, then fills it with the response statistics
function addStatisticsTable () {
  console.log('adding stat table...')
  var statisticsPromise = $.getJSON(getStatisticsURL);

  statisticsPromise.done(function (res){
    if (res.status === 'success') {
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

    tablerow.insertCell(0).innerHTML = colorStats.color;
    tablerow.insertCell(1).innerHTML = colorStats.clicks;
    tablerow.insertCell(2).innerHTML = colorStats.views;
    tablerow.insertCell(3).innerHTML = colorStats.avgConversion;
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
        console.log('resetting is done!')
        getSelectedColor()
        .then(setButtonColor)
        .then(addStatisticsTable)
      };
    }).fail(function(err){
      console.log('error: ' + err.status);
    });
}


function sendReinitializeCall() {
  var reinitializeCallPromise = $.getJSON(reinitializeURL);
  return reinitializeCallPromise;
}


function setButtonColor(colorResult) {
  var color = colorResult.selectedColor;
  var button = document.getElementById("conversionButton");
  var classname = "btn btn-lg btn-block btn-";
  if (color === "green"){ classname = classname + "success";}
  else if ( color === "red") { classname = classname + "danger";}
  else if (color === "blue") { classname = classname + "primary";}
  else { classname = "btn"}
  button.setAttribute("class", classname)
}


function colorClicked() {
  if (!buyitnowclicked) {
    updateClickCount()
    .then(addStatisticsTable());
    buyitnowclicked = true;
  } else {
    console.log('button already clicked this page load')
  }
}

function updateClickCount() {
  var updateClickPromise = new Promise(function (resolve, reject){

  var button = document.getElementById("conversionButton");
  colorClass = button.className;
  if (colorClass == "btn btn-lg btn-block btn-success") {
    var updateClickCountPromise = sendUpdateClickCountCall('green')
  } else if ( colorClass == "btn btn-lg btn-block btn-danger") {
    var updateClickCountPromise = sendUpdateClickCountCall('red');
  } else if ( colorClass == "btn btn-lg btn-block btn-primary") {
    var updateClickCountPromise = sendUpdateClickCountCall('blue');
  } else {
    console.log('error finding button class: ', colorClass);
  };
  resolve()
  })
  return updateClickPromise;
}

function sendUpdateClickCountCall(color){
  console.log('updating for color:', color);
  var updateClickCountPromise = $.getJSON(updateClickCountURL + color);
  return updateClickCountPromise;
}



function reloadPage(){
  window.location.reload();
}
