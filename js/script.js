window.onload = function () {
  document.cookie="username=bas; expires=Thu, 24 Dec 2017 12:00:00 UTC";
  document.cookie="yolo=dinges";
  document.cookie="testor=wot"
  console.log('cookie is written');
}

function getCookieValues() {
  var x = document.cookie;
  console.log(x);
  document.getElementById('texty').innerHTML = x;
}
