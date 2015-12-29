'use strict';

const facultySchema = 'id, title, titleTr, isActive, status'
// Settings configured here will be merged into the final config object.
export default {
  db: {
    name: 'sisdndb',
    version: 1,
    facultyTable: facultySchema,
    facultyTableOrig: facultySchema
  }
}
