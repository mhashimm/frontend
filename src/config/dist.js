'use strict';

import baseConfig from './base';


let config = {
  appEnv: 'dist',
  apiUrl: 'http://localhost:8888/api',
  keycloak: {
    url: 'http://localhost:8080/auth',
    realm: 'sisdn-realm',
    clientId: 'sisdn',
    redirect_uri: 'http://localhost:8000/login',
    flow: 'standard',
    'enable-cors': true
  }
};

module.exports = Object.freeze(Object.assign({}, baseConfig, config));
