<?php

$config['environment'] = strpos(value($_SERVER, 'HTTP_HOST'), 'herokuapp') ? 'production' : 'development';
