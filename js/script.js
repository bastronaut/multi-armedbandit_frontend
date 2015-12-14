var apiURL = "http://localhost:3000/";
var getStatisticsURL = apiURL + "getStatistics";
var updateClickCountURL = apiURL + "updateClickCount/";
var reinitializeURL = apiURL +  "reinitialize";

window.onload = function () {
  document.cookie="username=bas; expires=Thu, 24 Dec 2017 12:00:00 UTC";
  document.cookie="yolo=dinges";
  document.cookie="testor=wot"
  console.log('cookie is written');

  $.ajax({
    type: "GET",
    url: getStatisticsURL,
  }).done(function (res){
    console.log(res)
    if (res.status === 'success') {

      var table = document.getElementById("colorStatistics");

      res.allColorStats.forEach(function (colorStats) {
        var tablerow = table.insertRow(-1);

        var colorCell = tablerow.insertCell(0).innerHTML = colorStats.color;
        var clicksCell = tablerow.insertCell(1).innerHTML = colorStats.clicks;
        var viewsCell = tablerow.insertCell(2).innerHTML = colorStats.views;
        var avgConversionCell = tablerow.insertCell(3).innerHTML = colorStats.avgConversion;
      })
    }


  }).fail(function(err){
    console.log('error: ' + err.status);
  });
}


function getCookieValues() {
  var x = document.cookie;
  console.log(x);
  document.getElementById('texty').innerHTML = x;
}
