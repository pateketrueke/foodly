var geocoder;
var marker;
var map;

function mark(lat, lng) {
  marker.setPosition(new google.maps.LatLng(lat, lng));
}

function initialize(lat, lng, id) {
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(lat, lng);
  var myOptions = {
    zoom: 17,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  map = new google.maps.Map(document.getElementById(id), myOptions);
  marker = new google.maps.Marker({
    map: map,
    position: latlng,
    title: "De click en el mapa para ajustar la ubicacion aproximada del lugar"
  });

  google.maps.event.addListener(map, 'click', function(event) {
    marker.setPosition(event.latLng);
    update();
  });
}

function update() {
  var lat = marker.getPosition().lat(),
      lng = marker.getPosition().lng();

  document.getElementById('lat').value = lat;
  document.getElementById('lng').value = lng;
}

function check() {
  var el = document.getElementById("search");
  if (el && el.value != '') {
    geocoder.geocode( { 'address': el.value}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);
        marker.setPosition(results[0].geometry.location);
        if (el.value != results[0].formatted_address) {
          el.value = results[0].formatted_address;
          update();
        }
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  }
}
