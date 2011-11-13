$(function() {

  var current = 0;
  var steps = $('#display ul li');

  function addMarker() {
    current += 1;

    console.log(current, steps.size());

    if (current === (steps.size() - 1)) {
      $('#next').fadeOut(function() {
        $('#addr').focus();
      });
    }

    var li = steps.eq(current).fadeIn(),
        lat = li.data('lat') || null,
        lng = li.data('lng') || null,
        zoom = li.data('zoom') || null;

    zoom && map.setZoom(zoom);

    if ( ! lat || ! lng) {
      return;
    }

    var one = new google.maps.Marker({
      map: map,
      draggable: false,
      animation: google.maps.Animation.DROP,
      position: new google.maps.LatLng(lat,lng)
    });

    map.setCenter(one.getPosition());
    steps.not(':eq(' + current + ')').fadeOut();
  }

  $('#close').click(function() {
    $('#display').fadeOut();
  });

  $('#next').click(function() {
    if (current < steps.size()) {
      addMarker();
    }
  });

  setTimeout(function() {
    $('#display').fadeIn('slow');
    steps.eq(0).fadeIn();
  }, 2400);

})
