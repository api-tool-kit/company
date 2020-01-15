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
       rel: "colllection company",
       tags: "collection company home list item",
       title: "Home",
       method: "GET",
       properties:[]
     },
     {
       id:"list",
       name:"list",
       href:"/list",
       rel:"collection company",
       tags:"collection company home list item",
       title:"List",
       method:"GET",
       properties:[]
     },
     {
       id: "createCompany",
       name: "create",
       href: "/",
       rel: "create-form company",
       tags: "collection company list",
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
      rel: "edit-form company",
      tags: "company list item",
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
