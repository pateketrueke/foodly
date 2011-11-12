<?php
/* 2011-11-12 18:12:16 */
create_table('establishments', array(
  'title' => array(
    'string',
  ),
  'short_desc' => array(
    'text',
  ),
  'lat_coord' => array(
    'string',
  ),
  'lng_coord' => array(
    'string',
  ),
  'min_range' => array(
    'integer',
  ),
  'max_range' => array(
    'integer',
  ),
  'tel_number' => array(
    'string',
  ),
  'id' => array(
    'primary_key',
  ),
), array(
  'force' => true,
));
