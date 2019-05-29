$(document).ready(function() {
  var codeWindow = CodeMirror(document.getElementsByClassName('text-holder')[0], {
    mode: "xml",
    htmlMode: true,
    theme: "dracula"
  });
  $("#generate-button").click(function() {
    codeWindow.setValue('');
    var countryChoice = $("#countryselect :selected").val();
    $.ajax({
      url: "cities.json",
      type: 'GET',
      dataType: 'JSON',
      success: function(res) {
        var cityArray = [];
        var cityString = '';
        for (i in res) {
          if (res[i].country === countryChoice) {
            var currentCity = res[i].name;
            var currentLat = res[i].lat;
            var currentLng = res[i].lng;
            var value = '  <option aria-lat="' + currentLat + '" aria-lng="' + currentLng + '" value="' + currentCity + '">' + currentCity + '</option>';
            cityArray.push(value)
          }
        }
        cityArray.sort();
        for (var i = 0; i < cityArray.length; i++) {
          cityString += cityArray[i] + '\r\n';
        }
        codeWindow.setValue("<select>\r\n" + cityString + "</select>")
      }
    });
  });
  console.log("downloaded");
  $(".main").css("filter", "none");
  $(".loader").fadeOut(300);
});
