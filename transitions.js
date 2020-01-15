/*****************************************
// bigco, inc company
// transitions
// 2020-02-01 : mamund
 *****************************************/
 
 exports.forms = {
   pageForms: [
     {
       id:"home",
       name:"home",
       href:"/",
       rel: "colllection",
       tags: "collection, item, company, home, list",
       title: "Home",
       method: "GET",
       properties:[]
     },
     {
       id: "createCompany",
       name: "create",
       href: "/",
       rel: "create-form",
       tags: "collection, company, list",
       title: "Create Company",
       method: "POST",
       properties: [
        {name:"id",value:"{makeid}"},
        {name:"companyName",value:""}
       ]
     }
   ],
   itemForms: [
    {
      id:"update",
      name:"update",
      href:"/{id}",
      rel: "edit-form",
      tags: "item, company, list",
      title: "Edit",
      method: "PUT",
      properties: [
        {name:"id",value:"{id}"},
        {name:"companyName",value:"{companyName}"},
        {name:"email",value:"{email}"},
        {name:"status",value:"{status}"}
      ]
    }
   ]
 }
