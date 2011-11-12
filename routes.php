<?php

root('home#index', array('path' => 'home'));

put('/venues/save', 'venues#verify', array('path' => 'save_venue'));
