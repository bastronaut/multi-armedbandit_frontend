var apiURL = "http://localhost:3000/";
var getStatisticsURL = apiURL + "getStatistics";
var updateClickCountURL = apiURL + "updateClickCount/";
var reinitializeURL = apiURL +  "reinitialize";

window.onload = function () {
  addStatisticsTable();
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
  var button = document.getElementById("conversionButton");
  var classname = "btn btn-";
  if (color === "green"){ classname = classname + "success";}
  else if ( color === "red") { classname = classname + "danger";}
  else if (color === "blue") { classname = classname + "primary";}
  else { classname = "btn"}
  button.setAttribute("class", classname)
}


function updateClickCount() {
  var button = document.getElementById("conversionButton");
  colorClass = button.className;
  if (colorClass == "btn btn-success") {
    var updateClickCountPromise = sendUpdateClickCountCall('green')
  } else if ( colorClass == "btn btn-danger") {
    var updateClickCountPromise = sendUpdateClickCountCall('red');
  } else if ( colorClass == "btn btn-primary") {
    var updateClickCountPromise = sendUpdateClickCountCall('blue');
  } else {
    console.log('error finding button class: ', colorClass);
  }

}

function sendUpdateClickCountCall(color){
  console.log('updating for color:', color);
  var updateClickCountPromise = $.getJSON(updateClickCountURL + color);
  return updateClickCountPromise;
}
