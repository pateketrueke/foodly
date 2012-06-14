<?php

chdir(__DIR__);

call_user_func(function () {
  require 'tetlphp/framework/initialize.php';

  import(array('application', 'db', 'a_record', 'tamal'));
  import(array('development' => array('chess', 'coffee')));

  run(function () {
  });
});
