// ****************************************
// bigco company
// response templates
// ****************************************

// config response/request types
exports.responseTypes = [
  "application/forms+json",
  "application/json",
  "text/csv"
];

exports.urlencoded = true;

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
          "<%=type%>" : 
          { 
            "metadata" : [],
            "forms" : 
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
                    "forms" : [
                      {"name" : "item", "href" : "/<%=item[p]%>", "method":"get","properties":[]},
                      {"name" : "edit", "href" : "/<%=item[p]%>", "method":"put","properties":[]},
                      {"name" : "status", "href" : "/<%=item[p]%>", "method":"patch","properties":[]},
                      {"name" : "close", "href" : "/<%=item[p]%>", "method":"post","properties":[]}
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
