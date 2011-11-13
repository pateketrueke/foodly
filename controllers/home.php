<?php

class home_controller extends base_controller
{

  public static function index() {
    import('form');
    import('html');
  }

  public static function verify()
  {
    $data = request::post();

    $row = establishments::create(array(
      'title' => $data['title'],
      'short_desc' => $data['desc'],
      'lat_coord' => $data['lat'],
      'lng_coord' => $data['lng'],
      'min_range' => $data['from'],
      'max_range' => $data['up'],
      'tel_number' => $data['tel'],
    ));

    return static::to_json(array(
      $row->id ? 'success' : 'error' => TRUE,
      'data' => $row->fields(),
    ));
  }

  public static function register()
  {
    $data = request::post();

    $row = costumers::find_or_create_by_email($data['addr']);
    $row->joined_at = date('Y-m-d H:i:s');

    return static::to_json(array(
      $row->id ? 'success' : 'error' => TRUE,
      'data' => $row->fields(),
    ));
  }

}
