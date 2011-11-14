$(function() {

  $.list = [];


  $('#show').click(function(e) {
    $('#register').lightbox_me({
      centered: true,
      onLoad: function() {
          initialize(19.3586982, -99.2596767);
          //mark(19.431900, -99.132851);
        }
      });
    e.preventDefault();
  });

  $('#venue').bind('ajax:success', function(xhr, data) {
    if (data.success) {
      $('#register').trigger('close');
    } else {
      alert('Error?');
    }
  })

  $('#sign').bind('ajax:success', function(xhr, data) {
    if (data.success) {
      $('#display ul').empty().html('<li style="display:block"><h3>¡Gracias por registrate!</h3></li>');
    } else {
      alert('Error?');
    }
  })

  $('#find').click(function() {
    check();
  });

  $('#locate').submit(function() {
    var str = $('#query').val();

    if (str) {
      geocoder.geocode( { 'address': str}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          clear_marks();

          if (str != results[0].formatted_address) {
            $('#query').val(results[0].formatted_address);
          }

          map.setCenter(results[0].geometry.location);
          set_mark(results[0].geometry.location);
          setTimeout(load_all, 400);
        } else {
          alert("Geocode was not successful for the following reason: " + status);
        }
      });
    }
  });

  function start_canvas(lat, lng) {
    origin = new google.maps.LatLng(lat, lng);

    var myOptions = {
      zoom: 14,
      center: origin,
      mapTypeControl: true,
      navigationControlOptions: {},
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById('canvas'), myOptions);
    set_mark(origin);
  }

  function set_mark(position) {
    marker = new google.maps.Marker({
        position: position,
        map: map,
        title: "Tu est\u00e1s aqu\u00ed!"
    });
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(pos) {
        start_canvas(pos.coords.latitude, pos.coords.longitude);
    }, function() {
        start_canvas(19.3586982, -99.2596767);
    });
  }
});
