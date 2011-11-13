<?php

root('home#index', array('path' => 'home'));

put('/users/save', 'home#register', array('path' => 'sign_up'));
put('/venues/save', 'home#verify', array('path' => 'save_venue'));
