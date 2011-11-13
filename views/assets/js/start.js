$(function() {

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

  function start_canvas(lat, lng) {
    // position.coords.latitude, position.coords.longitude
    var latlng = new google.maps.LatLng(lat, lng);
    var myOptions = {
      zoom: 15,
      center: latlng,
      mapTypeControl: true,
      navigationControlOptions: {},
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById('canvas'), myOptions);
    marker = new google.maps.Marker({
        position: latlng,
        map: map,
        title: "Tu est\u00e1s aqu\u00ed!"
    });
  }

  /*if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(start_canvas, function() {
      console.log(arguments);
    });
  } else {
    //$('#list').fadeIn();
  }*/

  start_canvas(19.3586982, -99.2596767);

});
