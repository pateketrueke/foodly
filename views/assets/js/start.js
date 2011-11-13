$(function() {

  $('#show').click(function(e) {
    $('#register').lightbox_me({
      centered: true,
      onLoad: function() {
          initialize(40.396764, -3.713379);
          mark(19.431900, -99.132851);
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

  $('#find').click(function() {
    check();
  });

  function start_canvas(position) {
    var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    var myOptions = {
      zoom: 15,
      center: latlng,
      mapTypeControl: true,
      navigationControlOptions: {},
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById('canvas'), myOptions);
    var marker = new google.maps.Marker({
        position: latlng,
        map: map,
        title: "Tu est\u00e1s aqu\u00ed!"
    });
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(start_canvas, function() {
      console.log(arguments);
    });
  } else {
    //$('#list').fadeIn();
  }

});
