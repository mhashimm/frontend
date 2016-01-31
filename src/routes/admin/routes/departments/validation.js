import { required, minLength, maxLength, englishOnly,
  noSpace } from '../../../../utils/validate';


var departmentValidator = {
  title: [required, minLength(3)],
  titleTr: [englishOnly, minLength(3)],
  id: [required, noSpace, englishOnly, minLength(3), maxLength(5)],
  facultyId: [required]
};

export default departmentValidator
