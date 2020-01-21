/*****************************************
// bigco, inc company
// transitions
// 2020-02-01 : mamund
 *****************************************/
 
 // page- and item-level forms
 exports.forms = {
   pageForms: [
     {
       id:"self",
       name:"self",
       href:"{fullurl}",
       rel: "self colllection company",
       tags: "collection company self home list item",
       title: "Self",
       method: "GET",
       properties:[]
     },
     {
       id:"home",
       name:"home",
       href:"{fullhost}/",
       rel: "collection company",
       tags: "collection company home list item",
       title: "Home",
       method: "GET",
       properties:[]
     },
     {
       id:"list",
       name:"list",
       href:"{fullhost}/list/",
       rel:"collection company",
       tags:"collection company home list item",
       title:"List",
       method:"GET",
       properties:[]
     },
     {
       id:"filter",
       name:"filter",
       href:"{fullhost}/filter/",
       rel:"collection company filter",
       tags:"collection company filter list item",
       title:"Search",
       method:"GET",
       properties:[
         {name:"status",value:""},
         {name:"companyName",value:""},
         {name:"stateProvince",value:""},
         {name:"country",value:""}
       ]
     },
     {
       id: "createCompany",
       name: "create",
       href: "{fullhost}/",
       rel: "create-form company",
       tags: "collection company list",
       title: "Create Company",
       method: "POST",
       properties: [
        {name:"id",value:"{makeid}"},
        {name:"companyName",value:""},
        {name:"streetAddress",value:""},
        {name:"city",value:""},
        {name:"stateProvince",value:""},
        {name:"postalCode",value:""},
        {name:"country",value:""},
        {name:"telephone",value:""},
        {name:"email",value:""},
        {name:"status",value:"pending"}
       ]
     }
   ],
   itemForms: [
     {
       id:"read_{id}",
       name: "read",
       href: "{fullhost}/{id}",
       rel: "item company read",
       title: "Read",
       method: "GET",
       properties: []
     },
     {
       id:"update_{id}",
       name:"update",
       href:"{fullhost}/{id}",
       rel: "item edit-form company",
       tags: "company list item",
       title: "Edit",
       method: "PUT",
       properties: [
         {name:"id",value:"{id}"},
         {name:"companyName",value:"{companyName}"},
         {name:"email",value:"{email}"},
         {name:"status",value:"{status}"},
         {name:"streetAddress",value:"{streetAddress}"},
         {name:"city",value:"{city}"},
         {name:"stateProvince",value:"{stateProvince}"},
         {name:"postalCode",value:"{postalCode}"},
         {name:"country",value:"{country}"},
         {name:"telephone",value:"{telephone}"},
         {name:"email",value:"{email}"}
       ]
     },
     {
       id:"status_{id}",
       name:"status",
       href:"{fullhost}/status/{id}",
       rel: "item company status",
       tags: "company item list status",
       title: "Status",
       method: "PATCH",
       properties: [
         {name:"status",value:"{status}"}
       ]
     },
     {
       id:"remove_{id}",
       name: "remove",
       href: "{fullhost}/{id}",
       rel: "item company remove",
       title: "Remove",
       method: "DELETE",
       properties: []
     }
   ]
 }
