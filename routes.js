/*****************************************
 * company routes for BigCo, Inc.
 * 2019-01 mamund
 *****************************************/

var component = require('./simple-component');
var properties = require('./properties');

/*****************************************
 * event handlers for company
 *****************************************/

 module.exports.processHome = function(req,res) {
  return new Promise(function(resolve,reject) {
    var body = [{
      name:"company",
      rel:"collection",
      href:"/list/"
    }];
    if(body) {
      resolve(body);
    }
    else {
      reject({error:"invalid body"});
    }
  });
}

module.exports.processCreate = function(req,res) {
  return new Promise(function(resolve,reject) {
    if(req.body) {
     var body = req.body;
     resolve(
      component(
        { 
          name:'company',
          action:'add',
          item:body,
          props:properties.props,
          reqd:properties.reqd, 
          enums:properties.enums
        }
       )
     );
    }
    else {
      reject({error:"invalid body"});
    }
  });
};

module.exports.processList = function(req,res) {
  return new Promise(function(resolve,reject) {
    resolve(component({name:'company',action:'list'}));
  });
}

module.exports.processFilter = function(req,res) {
  return new Promise(function(resolve,reject){
    if(req.query && req.query.length!==0) {
      resolve(component({name:'company',action:'filter',filter:req.query}));
    }
    else {
      reject({error:"invalid query string"});
    }
  })
}

module.exports.processItem = function(req,res) {
  return new Promise(function(resolve,reject){
    if(req.params.companyId && req.params.companyId!==null) {
      var id = req.params.companyId;
      resolve(component({name:'company',action:'item',id:id}));
    } 
    else {
      reject({error:"missing id"});
    }
  });
}

module.exports.processUpdate = function(req,res) {
  var id,body;
  return new Promise(function(resolve,reject){
    id = req.params.companyId||null;
    body = req.body||null;
    if(id!==null && body!==null) {
       resolve(component(
         {name:'company',
          action:'update',
          id:id,
          item:body,
          props:properties.props,
          reqd:properties.reqd,
          enums:properties.enums}));
     }
     else {
       reject({error:"missing id and/or body"});
     }
  });
}

module.exports.processStatus = function(req,res) {
  var id,body;
  return new Promise(function(resolve,reject){
    id = req.params.companyId||null;
    body = req.body||null;
    if(id!==null && body!==null) {
       resolve(component(
         {name:'company',
          action:'update',
          id:id,
          item:body,
          props:properties.props,
          reqd:properties.reqd,
          enums:properties.enums}));
     }
     else {
       reject({error:"missing id and/or body"});
     }
  });
}

module.exports.processDelete = function(req,res) {
  return new Promise(function(resolve,reject){
    if(req.params.companyId && req.params.companyId!==null) {
      var id = req.params.companyId;
      resolve(component({name:'company',action:'delete', id:id}));
    }
    else {
      reject({error:"invalid id"});
    }
  });
}

