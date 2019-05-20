/*****************************************
 * company routes for BigCo, Inc.
 * 2019-01 mamund
 *****************************************/

module.exports.home = function (req, res) {
  var body = {home:{name:"company",rel:"collection",href:"/list/"}};
  res.send(JSON.stringify(body,null,2));
}
