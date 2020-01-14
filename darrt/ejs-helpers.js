/*******************************************************
 * module: ejs helpers for DARRT
 * Mike Amundsen (@mamund)
 *******************************************************/

/*
exports.iif = function(cond,value){
  if(cond) return value;
  return '';
}  

exports = module.exports = {};
*/

var func = {
    sayhi: function(name) {
        return "Hello " + name;
    }, 
    foo: function(date) {
        //do somethings
    }    
};
module.exports = func;

