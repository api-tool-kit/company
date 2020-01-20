// ****************************************
// bigco, inc
// data elements for company
// properties, requireds, and enums
// 2020-02-01 : mamund
// ****************************************

// this service's message properties
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
exports.reqd = ['id','companyName','email','status'];

// enumerated properties
exports.enums = [
  {status:['pending','active','suspended','closed']}
];

