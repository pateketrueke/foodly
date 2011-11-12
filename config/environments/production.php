<?php

$config['dsn'] = str_replace('postgres:', 'pgsql:', getenv('SHARED_DATABASE_URL'));
