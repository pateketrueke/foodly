<?php

$config['rewrite'] = 1;

#$config['temporary_files'] = dirname(__DIR__).DS.'tmp';

$config['environment'] = strpos(value($_SERVER, 'HTTP_HOST'), 'herokuapp') ? 'production' : 'development';
