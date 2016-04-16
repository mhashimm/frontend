import Dexie from 'dexie'
import config from 'config'
import { required, minLength } from '~/utils/validate'


var loginValidator = {
  username: [required, minLength(4)],
  password: [required, minLength(6)]
};

export function validatePassword(values) {
  return Dexie.exists(values.username + '@sisdn-' + config.db.version)
    .then(exists => {
      if(values.isNew && exists)
        return {username: 'الإسم غير متاح'}
    })
}

export default loginValidator
