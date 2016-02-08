import { required, minLength } from '~/utils/validate';


var loginValidator = {
  username: [required, minLength(4)],
  password: [required, minLength(6)]
};

export default loginValidator
