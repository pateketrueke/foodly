<?php

root('home#index', array('path' => 'home'));

#put('/users/save', 'home#register', array('path' => 'sign_up'));
#put('/venues/save', 'home#verify', array('path' => 'save_venue'));
get('/venues/near', 'home#venues', array('path' => 'fetch_venues'));
