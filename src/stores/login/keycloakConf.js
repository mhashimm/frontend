const keycloakConf = {
  url: 'http://localhost:8080/auth',
  realm: 'sisdn-realm',
  clientId: 'sisdn',
  redirect_uri: 'http://localhost:8000/webpack-dev-server/',
  flow: 'standard'
}


export default keycloakConf
