/**
 *= lib/jquery-ujs
 *= lib/jquery-lightbox_me
 *= maps
 */

$(function() {

  $('#show').click(function(e) {
    $('#register').lightbox_me({
      centered: true,
      onLoad: function() {
          initialize(40.396764, -3.713379, 'map');
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

});
