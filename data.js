// ****************************************
// bigco, inc company
// data elements
// properties, requireds, and enums
// 2020-02-01 : mamund
// ****************************************

// message properties
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

// required properties
exports.reqd = ['companyName','email','status'];

// enumerated properties
exports.enums = [
  {status:['pending','active','suspended','closed']}
];

