'use strict';

import baseConfig from './base';


let config = {
  url: 'http://sisdn.herokuapp.com',
  appEnv: 'dist',
  apiUrl: 'http://sisdn.herokuapp.com/api',
  keycloak: {
    url: 'https://keycloak-sisdn.rhcloud.com/auth',
    realm: 'sisdn-realm',
    clientId: 'sisdn',
    redirect_uri: 'http://sisdn.herokuapp.com/login',
    flow: 'standard'
  }
};

module.exports = Object.freeze(Object.assign({}, baseConfig, config));
