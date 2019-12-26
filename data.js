// ****************************************
// bigco, inc company
// data/object elements
// properties, requireds, and enums
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

