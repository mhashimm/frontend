'use strict';

import baseConfig from './base';


let config = {
  appEnv: 'test',  // don't remove the appEnv property here
  apiUrl: 'http://local.host:9000/api',
  keycloak: {
    url: 'http://localhost:8080/auth',
    realm: 'sisdn-realm',
    clientId: 'sisdn',
    redirect_uri: 'http://localhost:8000',
    flow: 'standard',
    'enable-cors': true
  }
};

export default Object.freeze(Object.assign(baseConfig, config));
