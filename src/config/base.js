'use strict';

const facultySchema = {name: 'faculties', schema: 'id, title, titleTr, isActive, status'}

// Settings configured here will be merged into the final config object.
export default {
  db: {
    name: 'sisdndb',
    version_1: [
      facultySchema,
      Object.assign({}, facultySchema, {name: 'facultiesOrig'})
    ]
  },
  faculties: {
    path: {
      post: '/admin/faculties',
      put: '/admin/faculties',
      get: '/admin/faculties'
    }
  }
}
