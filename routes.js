/*****************************************
 * company routes for BigCo, Inc.
 * 2019-01 mamund
 *****************************************/

var component = require('./simple-component');
var properties = require('./properties');

/*****************************************
 * event handlers for company
 *****************************************/

module.exports.home = function (req, res) {
  var body = {home:{name:"company",rel:"collection",href:"/list/"}};
  res.send(JSON.stringify(body,null,2));
}

module.exports.create = function(req,res) {
  processCreate(req,res).then(function(body) {
    if(body.type && body.type==='error') {
      body = {error:body};
    }  
    else  {
      body = {company:body};
    } 
    res.send(JSON.stringify(body,null,2));
  }).catch(function(err) {
    res.send('{"error" : ' + JSON.stringify(err,null,2) + '}\n');
  });
}

module.exports.list = function(req, res) {
  processList(req,res).then(function(body) {
    if(body[0].type && body[0].type==='error') {
      body = {error:body};
    }  
    else  {
      body = {company:body};
    } 
    res.send(JSON.stringify(body,null,2));
  }).catch(function(err) {
    res.send('{"error" : ' + JSON.stringify(err,null,2) + '}\n');
  });
}

module.exports.filter = function(req, res) {
  processFilter(req,res).then(function(body){
    if(body[0] && body[0].type && body[0].type==='error') {
      body = {error:body};
    }  
    else  {
      body = {company:body};
    } 
    res.send(JSON.stringify(body,null,2));
  }).catch(function(err) {
    res.send('{"error" : ' + JSON.stringify(err,null,2) + '}\n');
  });
}


module.exports.read = function(req, res) {
  processItem(req,res).then(function(body){
    if(body[0].type && body[0].type==='error') {
      body = {error:body};
    }  
    else  {
      body = {company:body};
    } 
    res.send(JSON.stringify(body,null,2));
  }).catch(function(err) {
    body = {error:err}
    console.log(body);
    res.send(JSON.stringify(body,null,2));
  });
}

module.exports.update = function(req, res) {
  processUpdate(req,res).then(function(body){
    if(body.type && body.type==='error') {
      body = {error:body};
    }  
    else  {
      body = {company:body};
    } 
    res.send(JSON.stringify(body,null,2));
  }).catch(function(err) {
    res.send('{"error" : ' + JSON.stringify(err,null,2) + '}\n');
  });
}

module.exports.status = function(req, res) {
  processStatus(req,res).then(function(body){
    if(body.type && body.type==='error') {
      body = {error:body};
    }  
    else  {
      body = {company:body};
    } 
    res.send(JSON.stringify(body,null,2));
  }).catch(function(err) {
    res.send('{"error" : ' + JSON.stringify(err,null,2) + '}\n');
  });
}

module.exports.remove = function(req, res) {
  processDelete(req,res).then(function(body){
    if(body.type && body.type==='error') {
      body = {error:body};
    }  
    else  {
      body = {company:body};
    } 
    res.send(JSON.stringify(body,null,2));
  }).catch(function(err) {
    res.send('{"error" : ' + JSON.stringify(err,null,2) + '}\n');
  });
}

/******************************************
 * private processing requests for company
 ******************************************/

function processCreate(req,res) {
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

function processFilter(req,res) {
  return new Promise(function(resolve,reject){
    if(req.query && req.query.length!==0) {
      resolve(component({name:'company',action:'filter',filter:req.query}));
    }
    else {
      reject({error:"invalid query string"});
    }
  })
}

function processItem(req,res) {
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

function processUpdate(req,res) {
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

function processStatus(req,res) {
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

function processDelete(req,res) {
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

