'use strict';

import baseConfig from './base';


let config = {
  appEnv: 'dist',
  apiUrl: 'http://localhost:8888/api',
  keycloak: {
    url: 'http://localhost:8080/auth',
    realm: 'sisdn-realm',
    clientId: 'sisdn',
    redirect_uri: 'http://localhost:8000',
    flow: 'standard',
    scope: 'offline_access'
  }
};

module.exports = Object.freeze(Object.assign({}, baseConfig, config));
