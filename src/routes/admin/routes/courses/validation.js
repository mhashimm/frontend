import { required, minLength, maxLength, englishOnly,
  noSpace } from '../../../../utils/validate';


var courseValidator = {
  title: [required, minLength(3)],
  titleTr: [englishOnly, minLength(3)],
  id: [required, noSpace, englishOnly, minLength(3), maxLength(5)],
  facultyId: [required],
  departmentId: [required]
};

export default courseValidator
