/* 2011-11-12 06:28:09 ./foodly/views/assets/js/lib/jquery-ujs.js */
(function($, undefined) {

  $ujs = {
    token: $('meta[name=csrf-token]').attr('content'),
    fire: function(obj, name, data) {
      var evt = $.Event(name);

      obj.trigger(evt, data);

      return evt.result !== false;
    },
    ajax: function(options) {
      return $.ajax(options);
    },
    handle: function(el) {
      var that = $(el),
          the_confirm = that.data('confirm'),
          is_remote = that.data('remote'),
          disable = that.data('disable-with');

      if (the_confirm && $ujs.fire(that, 'confirm')) {
        var answer = $ujs.confirm(the_confirm),
            callback = $ujs.fire(that, 'confirm:complete', [answer]);

        if ( ! (answer && callback)) return false;
      }

      if (that.is('form')) {
        if (is_remote) {
          var blank = $ujs.all_fields(that, true);

          if (blank && that.attr('novalidate') == undefined && $ujs.fire(that, 'ajax:aborted:required', [blank])) {
            return false;
          }

          setTimeout(function() {
            $ujs.remote_to(that);
          }, 20);
          return false;
        }
        $ujs.disable(that);
        return true;
      } else {
        if (disable) {
          var method = that.is('input') ? 'val' : 'html',
              old_text = that[method]();

          that[method](disable).data('enable-with', old_text);
          that.is('input') ? that.attr('disabled', 'disabled') : that.addClass('disabled');
        }

        if (is_remote) {
          $ujs.remote_to(that);
        } else {
          $ujs.link_to(that);
        }
      }
      return false;
    },
    remote_to: function(el) {
      var url,
          data,
          method,
          options;

      if ($ujs.fire(el, 'ajax:before')) {
        method = el.attr('method') || el.data('method');
        url = el.attr('action') || el.attr('href') || el.data('url');

        if (el.is('form')) {
          data = el.serializeArray();

          var button = el.data('submit-button');
          button ? data.push(button) && el.data('submit-button', null) : null;
        } else if (el.is('a')) {
          data = el.data('params') || null;
        } else {
          data = el.serialize();
          el.data('params') ? data = data + "&" + el.data('params') : null;
        }

        options = {
          type: method || 'GET', data: data, dataType: el.data('type') || null,
          beforeSend: function(xhr, settings) {
            xhr.setRequestHeader('X-CSRF-Token', $ujs.token);
            return $ujs.fire(el, 'ajax:before', [xhr, settings]);
          },
          success: function(data, status, xhr) {
            el.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            el.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            el.trigger('ajax:error', [xhr, status, error]);
          }
        };

        url ? options.url = url : null;

        $.ajax(options);
      }
    },
    link_to: function(el) {
      if (el.data('method')) {
        var the_html = $('<form method="post"/>').attr({
              action: el.attr('href') || document.location.href
            }).hide();

        the_html.append('<input type="hidden" name="_method" value="' + el.data('method') + '">');
        the_html.append('<input type="hidden" name="_token" value="' + $ujs.token + '">');
        the_html.appendTo(document.body);
        the_html.submit();

        return false;
      }
      return true;
    },
    confirm: function(message) {
      return confirm(message);
    },
    enable: function(el) {
      el.find('input[data-disable-with]').each(function() {
        var that = $(this),
            method = that.is('input') ? 'val' : 'html',
            old_text = that.data('enable-with');

        old_text && that[method](old_text);
        that.is('input') ? that.removeAttr('disabled') : that.removeClass('disabled');
      });
    },
    disable: function(el) {
      el.find('input[data-disable-with]').each(function() {
        var that = $(this),
            method = that.is('input') ? 'val' : 'html',
            new_text = that.data('disable-with');

        that.is('input') ? that.attr('disabled', 'disabled') : that.addClass('disabled');
        ! that.data('enable-with') && that.data('enable-with', that[method]());
        new_text && that[method](new_text);
      });
    },
    all_fields: function(el, blank) {
      var out = [];

      el.find('input:not([type=submit]),textarea').each(function() {
        var input = $(this);

        if (blank ? ! input.val() : input.val()) {
          out.push(input);
        }
      });

      return out.length ? out : false;
    }
  };

  $('form').live('ajax:before.ujs', function(evt) {
    this == evt.target && $ujs.disable($(this), evt);
  });

  $('form').live('ajax:complete.ujs', function(evt) {
    this == evt.target && $ujs.enable($(this), evt);
  });

  $('a[data-disable-with]').live('ajax:complete', function() {
      var el = $(this),
          method = el.is('input') ? 'val' : 'html',
          old_text = el.data('enable-with');
          old_text && el[method](old_text);
  });

  $('form input[type=submit],form input[type=image],form button[type=submit],form button:not([type])').live('click.ujs', function() {
    var button = $(this),
        name = button.attr('name'),
        data = name ? { name: name, value: button.val() } : null;

    button.closest('form').data('submit-button', data);
  });

  $('a[data-disable-with],a[data-confirm],a[data-remote],a[data-method]').live('click.ujs', function() {
    return $ujs.handle(this);
  });

  $('textarea[data-remote],select[data-remote],input[data-remote]').live('change.ujs', function() {
    return $ujs.handle(this);
  });

  $('form').live('submit.ujs', function() {
    return $ujs.handle(this);
  });

})(window.jQuery);

/* 2011-11-12 20:48:53 ./foodly/views/assets/js/lib/jquery-lightbox_me.js */
/*
* $ lightbox_me
* By: Buck Wilson
* Version : 2.3
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

(function(a){a.fn.lightbox_me=function(b){return this.each(function(){function m(){var b=e[0].style;e.css({left:"50%",marginLeft:e.outerWidth()/2*-1,zIndex:c.zIndex+3});if(e.height()+80>=a(window).height()&&(e.css("position")!="absolute"||g)){var d=a(document).scrollTop()+40;e.css({position:"absolute",top:d+"px",marginTop:0});if(g){b.removeExpression("top")}}else if(e.height()+80<a(window).height()){if(g){b.position="absolute";if(c.centered){b.setExpression("top",'(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (blah = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"');b.marginTop=0}else{var f=c.modalCSS&&c.modalCSS.top?parseInt(c.modalCSS.top):0;b.setExpression("top","((blah = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "+f+') + "px"')}}else{if(c.centered){e.css({position:"fixed",top:"50%",marginTop:e.outerHeight()/2*-1})}else{e.css({position:"fixed"}).css(c.modalCSS)}}}}function l(){if(a(window).height()<a(document).height()){d.css({height:a(document).height()+"px"});f.css({height:a(document).height()+"px"})}else{d.css({height:"100%"});if(g){a("html,body").css("height","100%");f.css("height","100%")}}}function k(a){if((a.keyCode==27||a.DOM_VK_ESCAPE==27&&a.which==0)&&c.closeEsc)j()}function j(){var b=e[0].style;if(c.destroyOnClose){e.add(d).remove()}else{e.add(d).hide()}if(c.parentLightbox){c.parentLightbox.fadeIn(200)}f.remove();e.undelegate(c.closeSelector,"click");a(window).unbind("reposition",l);a(window).unbind("reposition",m);a(window).unbind("scroll",m);a(document).unbind("keyup",k);if(g)b.removeExpression("top");c.onClose()}var c=a.extend({},a.fn.lightbox_me.defaults,b),d=a(),e=a(this),f=a('<iframe id="foo" style="z-index: '+(c.zIndex+1)+';border: none; margin: 0; padding: 0; position: absolute; width: 100%; height: 100%; top: 0; left: 0; filter: mask();"/>'),g=a.browser.msie&&a.browser.version<7;if(c.showOverlay){var h=a(".js_lb_overlay:visible");if(h.length>0){d=a('<div class="lb_overlay_clear js_lb_overlay"/>')}else{d=a('<div class="'+c.classPrefix+'_overlay js_lb_overlay"/>')}}if(g){var i=/^https/i.test(window.location.href||"")?"javascript:false":"about:blank";f.attr("src",i);a("body").append(f)}a("body").append(e.hide()).append(d);if(c.showOverlay){l();d.css({position:"absolute",width:"100%",top:0,left:0,right:0,bottom:0,zIndex:c.zIndex+2,display:"none"});if(!d.hasClass("lb_overlay_clear")){d.css(c.overlayCSS)}}if(c.showOverlay){d.fadeIn(c.overlaySpeed,function(){m();e[c.appearEffect](c.lightboxSpeed,function(){l();m();c.onLoad()})})}else{m();e[c.appearEffect](c.lightboxSpeed,function(){c.onLoad()})}if(c.parentLightbox){c.parentLightbox.fadeOut(200)}a(window).resize(l).resize(m).scroll(m).keyup(k);if(c.closeClick){d.click(function(a){j();a.preventDefault})}e.delegate(c.closeSelector,"click",function(a){j();a.preventDefault()});e.bind("close",j);e.bind("reposition",m)})};a.fn.lightbox_me.defaults={appearEffect:"fadeIn",appearEase:"",overlaySpeed:250,lightboxSpeed:300,closeSelector:".close",closeClick:true,closeEsc:true,destroyOnClose:false,showOverlay:true,parentLightbox:false,onLoad:function(){},onClose:function(){},classPrefix:"lb",zIndex:999,centered:false,modalCSS:{top:"40px"},overlayCSS:{background:"black",opacity:.3}}})(jQuery)

/* 2011-11-12 21:22:01 ./foodly/views/assets/js/maps.js */
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
    console.log(marker);
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

