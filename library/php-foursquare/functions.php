<?php

function api_4sq($from, $to, array $params = array()) {
  static $obj = NULL;


  if (is_null($obj)) {
    $client_key = config('4sq.key');
	  $client_secret = config('4sq.secret');

	  $foursquare = new FoursquareAPI($client_key, $client_secret);
  }


	@list($lat, $lng) = is_array($from) ? $from : $foursquare->GeoLocate($from);

	$params = array_merge(array(
		'll' => "$lat,$lng",
	), $params);

	$response = $foursquare->GetPublic($to, $params);
  return $response;
}
