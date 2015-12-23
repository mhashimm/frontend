import { required, minLength, maxLength, englishOnly, noSpace } from '../../../../utils/validate';


var facultyValidator = {
  title: [required, minLength(3)],
  titleTr: [required, englishOnly, minLength(3)],
  id: [required, noSpace, englishOnly, minLength(3), maxLength(5)]
};

export default facultyValidator
