// TODO: problem with getting statistics: it will also select another color and
// update the stats. better to have it single responsibility and split into
// seperate call. then, after clicking button, we can do new call to getStatistics


var apiURL = "http://localhost:3000/";
var getSelectedColorURL = apiURL + "getColor";
var getStatisticsURL = apiURL + "getStatistics";
var updateClickCountURL = apiURL + "updateClickCount/";
var reinitializeURL = apiURL +  "reinitialize";

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
        getSelectedColor()
        .then(setButtonColor)
        .then(addStatisticsTable())
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
  console.log(color);
  var button = document.getElementById("conversionButton");
  var classname = "btn btn-lg btn-block btn-";
  if (color === "green"){ classname = classname + "success";}
  else if ( color === "red") { classname = classname + "danger";}
  else if (color === "blue") { classname = classname + "primary";}
  else { classname = "btn"}
  button.setAttribute("class", classname)
}


function colorClicked() {
  updateClickCount()
  .then(addStatisticsTable());
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
  console.log('resolving...')
  resolve('yo')
  })
  return updateClickPromise;
}

function sendUpdateClickCountCall(color){
  console.log('updating for color:', color);
  var updateClickCountPromise = $.getJSON(updateClickCountURL + color);
  return updateClickCountPromise;
}

















var promiseCount = 0;
function testPromise() {
  var thisPromiseCount = ++promiseCount;

  var log = document.getElementById('log');
  log.insertAdjacentHTML('beforeend', thisPromiseCount +
      ') Started (<small>Sync code started</small>)<br/>');

  // We make a new promise: we promise the string 'result' (after waiting 3s)
  var p1 = new Promise(
    function(resolve, reject) {
      log.insertAdjacentHTML('beforeend', thisPromiseCount);

      window.setTimeout(
        function() {
          // We fulfill the promise !
          resolve(thisPromiseCount)
        }, Math.random() * 2000 + 1000);
    });

  // We define what to do when the promise is fulfilled
  p1.then(
    // Just log the message and a value
    function(val) {
      log.insertAdjacentHTML('beforeend', val +
          ') Promise fulfilled (<small>Async code terminated</small>)<br/>');
    });

  log.insertAdjacentHTML('beforeend', thisPromiseCount +
      ') Promise made (<small>Sync code terminated</small>)<br/>');
}
