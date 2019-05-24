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
];

exports.reqd = ['companyName','email','status'];
exports.enums = [
  {status:['pending','active','suspended','closed']}
];

// config response/request types
exports.responseTypes = [
  "application/json"
];
exports.urlencoded = true;

exports.template = 
  `
  { 
      "<%=type%>" : 
      [
        <%var x=0;%>
        <%rtn.forEach(function(item){%>
          <%if(x!==0){%>,<%}%>
          {
            <%var y=0;%>
            <%for(var p in item){%>
              <%if(y!==0){%>,<%}%>
              "<%=p%>" : "<%=item[p]%>"
              <%y=1;%>
            <%}%>
          }
          <%x=1;%>
        <%});%>
      ]
   }
  `

