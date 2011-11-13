<!DOCTYPE html>

<!--[if lt IE 7 ]> <html class="ie ie6 no-js" lang="en"> <![endif]-->
<!--[if IE 7 ]>    <html class="ie ie7 no-js" lang="en"> <![endif]-->
<!--[if IE 8 ]>    <html class="ie ie8 no-js" lang="en"> <![endif]-->
<!--[if IE 9 ]>    <html class="ie ie9 no-js" lang="en"> <![endif]-->
<!--[if gt IE 9]><!--><html class="no-js" lang="en"><!--<![endif]-->

  <head>
    <meta charset="UTF-8">

    <title><?php echo $title; ?></title>

<?php echo assets::tag_for('http://fonts.googleapis.com/css?family=Bangers', 'css'); ?>
<?php echo assets::tag_for('modernizr-1.7.min.js'); ?>
<?php echo assets::favicon(); ?>
<?php echo assets::before(); ?>
<?php echo $head; ?>

  </head>
  <body>
  <div id="wrapper">
    <header>    	
    	<img id="logo" alt="<?php echo $title; ?>" src="<?php echo path_to('public/img/logo.png'); ?>">
      <div id="globo">
		  <div id="join_us">
		  	<h2>¿Mucha hambre y poco tiempo?</h2>
		    <h3>Averigua una nueva forma de pedir comida a domicilio</h3>        
		  </div>
      <img id="triangulo" alt="<?php echo $title; ?>" src="<?php echo path_to('public/img/triangulo.png'); ?>">
      </div>
  </header>
<?php echo $body; ?>
<!-- <?php echo ticks(BEGIN); ?>s -->
  </div>

<div id="social">
  <a href="http://twitter.com/FoodlyMX">@FoodlyMX</a>
  <div class="fb-like" data-href="http://foodly.mx/" data-send="false" data-width="450" data-show-faces="false"></div>
</div>

<div id="fb-root"></div>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js"></script>
    <script>window.jQuery || document.write("<script src='<?php echo assets::url_for('jquery-1.5.1.min.js'); ?>'>\x3C/script>")</script>
    <link href='http://fonts.googleapis.com/css?family=Paytone+One' rel='stylesheet' type='text/css'>
    <link href='http://fonts.googleapis.com/css?family=Rancho' rel='stylesheet' type='text/css'>
    <script src="//maps.google.com/maps/api/js?sensor=false"></script>
<?php echo assets::after(); ?>

<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/es_LA/all.js#xfbml=1&appId=314349231924230";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>

<?php if (option('environment') === 'production') { ?>
    <script>

      var _gaq = _gaq || [];
      _gaq.push(['_setAccount', 'UA-26967127-2']);
      _gaq.push(['_trackPageview']);

      (function () {
        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
      })();

    </script>
<?php } ?>

  </body>
</html>
