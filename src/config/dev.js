'use strict';

import baseConfig from './base';


let config = {
  appEnv: 'dev',
  apiUrl: 'http://localhost:8888/api',
  keycloak: {
    url: 'http://localhost:8080/auth',
    realm: 'sisdn-realm',
    clientId: 'sisdn',
    redirect_uri: 'http://localhost:8000',
    flow: 'standard'
  }
};

module.exports = Object.freeze(Object.assign({}, baseConfig, config));
