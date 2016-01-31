'use strict';

const facultySchema = {name: 'faculties', schema: 'id, title, titleTr, isActive, status, ts'}
const departmentSchema = {name: 'departments', schema: 'id, title, titleTr, isActive, status, ts'}
const courseSchema = {name: 'courses', schema: 'id, title, titleTr, facultyId, departmentId, remarks, isActive, status, ts'}
const programsSchema = {name: 'programs', schema: 'id, title, titleTr, facultyId, terms, creditHours, isActive, status, ts'}

export default {
  onlineCheckInterval: 10000,
  url: 'http://localhost:8888',
  cors: 'cors',
  db: {
    name: 'sisdndb',
    version_1: [
      facultySchema,
      Object.assign({}, facultySchema, {name: 'facultiesOrig'}),
      departmentSchema,
      Object.assign({}, departmentSchema, {name: 'departmentsOrig'}),
      courseSchema,
      Object.assign({}, courseSchema, {name: 'coursesOrig'}),
      programsSchema,
      Object.assign({}, programsSchema, {name: 'programsOrig'})
    ]
  },
  org: {
    path: {
      get: '/admin'
    }
  },
  faculties: {
    path: {
      post: '/admin/faculties',
      put: '/admin/faculties',
      get: '/admin/faculties'
    }
  },
  departments: {
    path: {
      post: '/admin/departments',
      put: '/admin/departments',
      get: '/admin/departments'
    }
  },
  courses: {
    path: {
      post: '/admin/courses',
      put: '/admin/courses',
      get: '/admin/courses'
    }
  },
  programs: {
    path: {
      post: '/admin/programs',
      put: '/admin/programs',
      get: '/admin/programs'
    }
  }
}
