/*****************************************
 * company properties for BigCo, Inc.
 * 2019-01 mamund
 *****************************************/

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
]
exports.reqd = ['companyName','email','status'];
exports.enums = [
  {status:['pending','active','suspended','closed']}
];

// config response/request types
exports.responseTypes = [
  "application/json"
];
exports.urlencoded = true;


