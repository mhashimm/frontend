import { config } from 'config'

const keycloakConf = {
  url: 'http://localhost:8080/auth',
  realm: 'sisdn-realm',
  clientId: 'sisdn',
  redirect_uri: 'http://localhost:8001',
  flow: 'standard'
}


export default keycloakConf
