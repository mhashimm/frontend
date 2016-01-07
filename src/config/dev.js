'use strict';

import baseConfig from './base';


let config = {
  appEnv: 'dev',  // feel free to remove the appEnv property here
  apiUrl: 'http://local.host:8888/api',
  keycloak: {
    url: 'http://localhost:8080/auth',
    realm: 'sisdn-realm',
    clientId: 'sisdn',
    redirect_uri: 'http://localhost:8000',
    flow: 'standard',
    'enable-cors': true
  }
};

module.exports = Object.freeze(Object.assign({}, baseConfig, config));
