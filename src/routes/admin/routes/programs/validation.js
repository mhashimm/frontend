import { required, minLength, maxLength, englishOnly, number, integer,
  noSpace } from '../../../../utils/validate';


var programValidator = {
  title: [required, minLength(3)],
  titleTr: [englishOnly, minLength(3)],
  id: [required, noSpace, englishOnly, minLength(3), maxLength(5)],
  facultyId: [required],
  terms: [required, integer],
  creditHours: [number]
};

export default programValidator
