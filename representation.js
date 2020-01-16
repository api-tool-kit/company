/*****************************************
// bigco, inc company
// response representations
// 2020-02-01 : mamund
 *****************************************/

var appJson = require('./darrt/representors/app-json');
var formsJson = require('./darrt/representors/forms-json');
var linksJson = require('./darrt/representors/links-json');
var pragJson = require('./darrt/representors/prag-json');
var textCsv = require('./darrt/representors/text-csv');

// config response/request types
exports.responseTypes = [
  "application/forms+json",
  "application/json",
  "text/csv"
];

exports.urlencoded = true;

exports.forms = {
  pageForms: [],
  itemForms: []
}

exports.getResponseTypes = function() {
  var rtn  = [];
  var viewList = this.getTemplates();

  viewList.forEach(function(item) {
    rtn.push(item.format);
  });
  
  return rtn;
}

exports.getTemplates = function() {
  var list = [];
  
  list.push(appJson.template);
  list.push(formsJson.template);
  list.push(textCsv.template);

  return list;  
}

// actual response templates
exports.templates = [
  { 
    format : "application/json", 
    view : 
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
            <%if(y!==0){%>,<%}%>"<%=p%>" : "<%=item[p]%>"
            <%y=1;%>
          <%}%>
        }
        <%x=1;%>
      <%});%>
    ]
 }
    `
  },
  { 
    format : "application/forms+json", 
    view : 
    `
{ 
  "hi" : "<%=helpers.sayHi('mike')%>",
  "checksum" : "<%=helpers.iif(true,"yes")%>",
  "makeid" : "<%=helpers.stateValue('{makeid}',{})%>",
  "default" : "<%=helpers.stateValue('{xxx}',{},'2')%>",
  "<%=type%>" : 
  { 
    "metadata" : 
    [
      <%var z=0;%>
      <%metadata.forEach(function(md){%>
        <%if(z!==0){%>,<%}%>
        {
          <%var w=0;%>
          <%for(var p in md){%>
            <%if(w!==0){%>,<%}%>"<%=p%>" : <%if(Array.isArray(md[p])){%>
        [
        <%var a=0;%>
  <%md[p].forEach(function(prop){%>
          <%if(a!==0){%>,<%}%>
{
<%var b=0;%>
<%for(var pr in prop){%>
  <%if(b!==0){%>,<%}%>"<%=pr%>" : "<%=prop[pr]%>"
  <%b=1;%>
<%}%>
}
  <%});%>
  ]	      
      <%}else{%>"<%=md[p]%>"<%}%>
            <%w=1;%>
          <%}%>  
        }
        <%z=1;%>
      <%});%>
    ],
    "links" : 
    [
      <%var z=0;%>
      <%pForms.forEach(function(form){%>
        <%if(z!==0){%>,<%}%>
        {
          <%var w=0;%>
          <%for(var p in form){%>
            <%if(w!==0){%>,<%}%>"<%=p%>" : <%if(Array.isArray(form[p])){%>
        [
        <%var a=0;%>
  <%form[p].forEach(function(prop){%>
          <%if(a!==0){%>,<%}%>
          <%a=1%>
{
<%var b=0;%>
<%for(var pr in prop){%>
  <%if(b!==0){%>,<%}%>"<%=pr%>" : "<%=prop[pr]%>"
  <%b=1;%>
<%}%>
}
  <%});%>
  ]	      
      <%}else{%>"<%=form[p]%>"<%}%>
            <%w=1;%>
          <%}%>  
        }
        <%z=1;%>
      <%});%>
    ],
    "items" : 
    [
      <%var x=0;%>
      <%rtn.forEach(function(item){%>
        <%if(x!==0){%>,<%}%>
        {
          <%var y=0;%>
          <%for(var p in item){%>
            <%if(p==="id"){%>
          "links" : 
          [
            <%var q=0;%>
            <%iForms.forEach(function(form){%>
              <%if(q!==0){%>,<%}%>
              {
                <%var r=0;%>
                <%for(var p in form){%>
                  <%if(r!==0){%>,<%}%>"<%=p%>" : <%if(Array.isArray(form[p])){%>
              [
              <%var s=0;%>
        <%form[p].forEach(function(prop){%>
                <%if(s!==0){%>,<%}%>
                <%s=1%>
    {
      <%var t=0;%>
      <%for(var pr in prop){%>
        <%if(t!==0){%>,<%}%>"<%=pr%>" : "<%=helpers.stateValue(prop[pr],item,prop[pr])%>"
        <%t=1;%>
      <%}%>
    }
        <%});%>
        
        ]	      
            <%}else{%>"<%=helpers.stateValue(form[p],item,form[p])%>"<%}%>
                  <%r=1;%>
                <%}%>  
              }
              <%q=1;%>
            <%});%>
          ]
          <%y=1;%><%}%>
          <%if(y!==0){%>,<%}%>"<%=p%>" : "<%=item[p]%>"
          <%y=1;%>
        <%}%>
      }
      <%x=1;%>
    <%});%>
    ]
  }
}
    `
  },
  {
    format: "text/csv",
    view: 
    `<%var y=0;%><%for(var p in rtn[0]){%><%if(y!==0){%>,<%}%>"<%=p%>"<%y=1;%><%}%>
<%rtn.forEach(function(item){%><%var y=0;%><%for(var p in item){%><%if(y!==0){%>,<%}%>"<%=item[p]%>"<%y=1;%><%}%>
<%});%>`
  }
]
