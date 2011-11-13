
var loaded = false;

function load_all() {
  if (loaded) {
    return;
  }

  var here = marker.getPosition().lat() + ',' + marker.getPosition().lng();

  $.getJSON('/venues/near', { at: here }, function(data) {
    if (data.response.groups) {
      var items = data.response.groups[0].items,
          max = items.length,
          handler = null,
          i = 0;


      max && $('#query,#go').attr('disabled', 'disabled');

      var add_one = function() {
        if (i === max) {
          $('#query,#go').attr('disabled', '');
          clearInterval(handler);
          return;
        }

        var item = items[i];
        var one = new google.maps.Marker({
          map: map,
          draggable: false,
          animation: google.maps.Animation.DROP,
          position: new google.maps.LatLng(item.location.lat, item.location.lng)
        });

        $.list.push(one);
        i += 1;
      };

      setTimeout(function() {
        handler = setInterval(add_one, 260);
        map.setCenter(marker);
      }, 1320);
    }
  });
}


$(function() {
  var current = 0;
  var steps = $('#display ul li');

  function addMarker() {
    current += 1;

    console.log(current, steps.size());

    if (current === (steps.size() - 1)) {
      $('#next').fadeOut();
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

    $.list.push(one);
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
