/*******************************************************
 * module: ejs helpers for DARRT
 * Mike Amundsen (@mamund)
 *******************************************************/


exports.stateValue = function(val, state, def) {
  var v = val||"";
  var st = state||{};
  var d = def||"";
  
  if(v === "{makeid}") {
    v = makeId();
  }
  else {
    v = d;
    for(s in st) {
      if(v.indexOf('{'+s+'}')!==-1) {
        v = v.replace('{'+s+'}',st[s]);;
        break;
      }
    }
  }
  return v;
}

exports.iif = function(cond,value){
  if(cond) return value;
  return '';
}  

exports.sayHi = function(name) {
  return "Hello " + name;
} 


function makeId() {
  var rtn;

  rtn = String(Math.random());
  rtn = rtn.substring(2);
  rtn = parseInt(rtn).toString(36);

  return rtn;
}
