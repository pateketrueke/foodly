<?php
$config['rewrite'] = 1;
$config['dsn'] = str_replace('postgres:', 'pgsql:', getenv('SHARED_DATABASE_URL'));
