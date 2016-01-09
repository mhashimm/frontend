const isEmpty = value => value === undefined || value === null || value === '';
const join = (rules) => (value, data) => rules.map(rule => rule(value, data)).filter(error => !!error)[0 /* first error */ ];

export function email(value) {
  // Let's not start a debate on email regex. This is just for an example app!
  if (!isEmpty(value) && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return 'العنوان غير صحيح';
  }
}

export function required(value) {
  if (isEmpty(value)) {
    return 'مطلوب';
  }
}

export function minLength(min) {
  return value => {
    if (!isEmpty(value) && value.length < min) {
      return 'لا يقل عن ' + min + ' أحرف';
    }
  };
}

export function maxLength(max) {
  return value => {
    if (!isEmpty(value) && value.length > max) {
      return 'لا يزيد عن ' + max + ' أحرف';
    }
  };
}

export function integer(value) {
  if (!Number.isInteger(Number(value))) {
    return 'يجب أن يكون رقماً';
  }
}

export function oneOf(enumeration) {
  return value => {
    if (!~enumeration.indexOf(value)) {
      //return `Must be one of: ${enumeration.join(', ')}`;
      return 'يجب أن يكون واحداً من: ' + `${enumeration.join(', ')}`;
    }
  };
}

export function match(field) {
  return (value, data) => {
    if (data) {
      if (value !== data[field]) {
        //return 'Do not match';
        return 'غير متوافق'
      }
    }
  };
}

export function englishOnly(value){
  if((/[^A-Za-z0-9\s]/g.test(value))){
    return 'بالانجليزية فقط';
  }
}

export function noSpace(value){
  if((/\s/g.test(value))){
    return 'بدون فراغ';
  }
}

export function createValidator(rules) {
  return (data = {}) => {
    const errors = {};
    Object.keys(rules).forEach((key) => {
      const rule = join([].concat(rules[key])); // concat enables both functions and arrays of functions
      const error = rule(data[key], data);
      if (error) {
        errors[key] = error;
      }
    });
    return errors;
  };
}

export function validateId(values, dispatch, props) {
  return new Promise((resolve, reject) => {
    if(props.ids.indexOf(values.id) >= 0) reject({id: 'الإختصار غير متاح'})
    else resolve()
  })
}
