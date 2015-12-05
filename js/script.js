window.onload = function () {
  document.cookie="username=bas; lastname=aapie aapie aapie; yolo=dinges; expires=Thu, 24 Dec 2017 12:00:00 UTC";
  console.log('cookie is written');
}

function getCookieValues() {
  var x = document.cookie;
  console.log(x);
  document.getElementById('texty').innerHTML = x;
}
