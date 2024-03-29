<!DOCTYPE html>

<!--[if lt IE 7 ]> <html class="ie ie6 no-js" lang="en"> <![endif]-->
<!--[if IE 7 ]>    <html class="ie ie7 no-js" lang="en"> <![endif]-->
<!--[if IE 8 ]>    <html class="ie ie8 no-js" lang="en"> <![endif]-->
<!--[if IE 9 ]>    <html class="ie ie9 no-js" lang="en"> <![endif]-->
<!--[if gt IE 9]><!--><html class="no-js" lang="en"><!--<![endif]-->

  <head>
    <meta charset="UTF-8">

    <title><?php echo $title; ?></title>

<?php echo $head; ?>
<?php echo before_body(); ?>
<?php echo tag_for('lib/modernizr-2.0.6.min.js'); ?>

  </head>
  <body>
  <div id="wrapper">
    <header>
      <?php echo image_tag('logo.png', $title, array('id' => 'logo')); ?>
      <div id="globo">
		  <div id="join_us">
		  	<h2>¿Sin tiempo para salir o prefieres ordenar?</h2>
		    <h3>Averigua una nueva forma de pedir comida a domicilio</h3>
		  </div>
      <?php echo image_tag('triangulo.png', $title, array('id' => 'triangulo')); ?>
    </div>
    <form action="#locate" id="locate">
      <div><input type="text" id="query" placeholder="Acopilco Cuajimalpa, Ciudad de México, Tlalpan">
      <input type="submit" value="Buscar" id="go"></div>
  </form>
  </header>
<?php echo $body; ?>
<!-- <?php echo ticks(BEGIN); ?>s -->
  </div>

<footer>
  <a id="twitter" href="http://twitter.com/FoodlyMX">@FoodlyMX</a>
  <a id="facebook" href="http://facebook.com/FoodlyMX">FoodlyMX</a>
<footer>

<div id="fb-root"></div>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js"></script>
    <script>window.jQuery || document.write("<script src='<?php echo asset_url('lib/jquery-1.5.1.min.js', 'js'); ?>'>\x3C/script>")</script>
    <link href="http://fonts.googleapis.com/css?family=Paytone+One|Rancho" rel="stylesheet" type="text/css">
    <script src="//maps.google.com/maps/api/js?sensor=false"></script>
<?php echo after_body(); ?>

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
