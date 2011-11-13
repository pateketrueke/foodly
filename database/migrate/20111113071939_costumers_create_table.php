<?php
/* 2011-11-13 07:19:39 */
create_table('costumers', array(
  'email' => array(
    'string',
  ),
  'joined_at' => array(
    'timestamp',
  ),
  'id' => array(
    'primary_key',
  ),
), array(
  'force' => true,
));
