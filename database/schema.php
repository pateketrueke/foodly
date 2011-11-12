<?php
/* 2011-11-12 18:12:16 */
create_table('establishments', array(
                                 'title' => array('string', 255),
                                 'short_desc' => array('text'),
                                 'lat_coord' => array('string', 255),
                                 'lng_coord' => array('string', 255),
                                 'min_range' => array('integer'),
                                 'max_range' => array('integer'),
                                 'tel_number' => array('string', 255),
                                 'id' => array('primary_key'),
                               ), array('force' => TRUE));


