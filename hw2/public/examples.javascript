function unhide() {
  var hid = document.getElementsByClassName("exp");
  // Emulates jQuery $(element).is(':hidden');
  if(hid[0].offsetWidth > 0 && hid[0].offsetHeight > 0) {
      hid[0].style.visibility = "visible";
  }
}