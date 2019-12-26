// ****************************************
// bigco, inc company
// data elements
// properties, requireds, and enums
// 2020-02-01 : mamund
// ****************************************

// config message properties
exports.props = [
  'id',
  'companyName',
  'streetAddress',
  'city',
  'stateProvince',
  'postalCode',
  'country',
  'telephone',
  'email',
  'status',
  'dateCreated',
  'dateUpdated'
];

exports.reqd = ['companyName','email','status'];
exports.enums = [
  {status:['pending','active','suspended','closed']}
];

