/*******************************************************
  POSTMAN UTILS
  2020-03 mamund
  from "Design and Build Great Web APIs" (2020)
  
  Shared collection of javascript functions to speed
  test-writing and promote consistency in testing

  Pass this into the "pre-test" block of your postman
  collection and then access the utils as follows:
  
  var body = pm.response.json();
  var utils = eval(globals.loadUtils);
  utils.checkStatus(200);
  
  NOTE: you need to declare/load the body var before
  using the utils functions.
*******************************************************/

pm.globals.set('loadUtils', 
  function loadUtils() {
    let utils = {};
    let obj = '';
    
    // check status
    utils.checkStatus = function(value) {
        pm.test('Status is ' + value, function() {
           pm.expect(pm.response.code).to.equal(value); 
        });
    };

    // check header
    utils.checkHeader = function(args) {
        pm.test('Header ' + args.name + ' contains ' + args.value, function() {
            var hdr = pm.response.headers.get(args.name);
            pm.expect(hdr).to.include(args.value);
        });
    };

    // set shared object
    utils.setObject = function(args) {
        obj = args.object||'';
    };

    // check item
    utils.checkObject = function(args) {
        pm.test('Valid ' + args.name + ' object', function() {
            var coll = body[args.name];
            coll.forEach(function(item) {
                var props = args.has||[];
                props.forEach(function(p) {
                   pm.expect(item).to.have.property(p); 
                });
            });
        });
    };

    utils.checkObjectProperty = function(args) {
        pm.test(args.name + ' has property ' + args.property + ' set to ' + args.value, function() {
            var coll = body[args.name];
            coll.forEach(function(item) {
                pm.expect(item).to.have.property(args.property);
                pm.expect(item[args.property]).contains(args.value);
            });
        });
    };
        
    // check metadata (forms+json)
    utils.checkMetaProperty = function(args) {
        pm.test('Meta property ' + args.name + ' contains ' + args.value, function() {
           var meta = body[obj].metadata.find( x => x.name === args.name);
           pm.expect(meta.value).to.include(args.value);
        });
    };

    // check page link (forms+json)
    utils.checkPageLink = function(args) {
        pm.test('Valid ' + args.name + ' page link', function() {
            var link = body[obj].links.find(x => x.name === args.name);
            var coll = args.has||[];
            coll.forEach(function(p) {
                pm.expect(link).to.have.property(p);
            });
        });
    };

    // check page link property (forms+json)
    utils.checkPageLinkProperty = function(args) {
        pm.test('Page link ' + args.name + ' has a property ' + args.property + ' set to ' + args.value, function() {
            var link = body[obj].links.find(x => x.name === args.name);
            pm.expect(link).to.have.property(args.property);
            pm.expect(link[args.property]).to.include(args.value);            
        });
    };
    
    // check item (forms+json)
    utils.checkItem = function(args) {
        pm.test('Valid items', function() {
            var coll = body[obj].items;
            coll.forEach(function(item) {
                var props = args.has||[];
                props.forEach(function(p) {
                   pm.expect(item).to.have.property(p); 
                });
            });
        });
    };

    // check item link (forms+json)
    utils.checkItemLink = function(args) {
        pm.test('Valid ' + args.name + ' item link', function() {
            coll = body[obj].items;
            coll.forEach(function(item) {
                var link = item.links.find(x => x.name === args.name);
                var props = args.has||[];
                props.forEach(function(p) {
                    pm.expect(link).to.have.property(p);
                });
            });
        });
    };

    // check item link property (forms+json)
    utils.checkItemLinkProperty = function(args) {
        pm.test('Link ' + args.name + ' for Item ' + args.id + ' has a property ' + 
	  args.property + ' set to ' + args.value, function() {
            var coll = body[obj].items;
            item = coll.find (x => x.id = args.id);
            link = item.links.find(x => x.name = args.name);
            pm.expect(link).to.have.property(args.property);
            pm.expect(link[args.property]).to.include(args.value);
        });    
    };
        
    // check item property (forms+json)
    utils.checkItemProperty = function(args) {
        pm.test('Item ' + args.id + ' has a property ' + args.property + ' set to ' + args.value, function() {
            coll - body[obj].items;
            item = coll.find (x => x.id = args.id);
            pm.expect(item).to.have.property(args.property);
            pm.expect(item[args.property]).to.include(args.value);
        });    
    };

    // check for problem+json error object
    utils.checkError = function() {
        pm.test('Body root is a valid error object', function() {
            pm.expect(body.error).to.be.an('array');
            pm.expect(body.error[0]).to.have.property('type');
            pm.expect(body.error[0]).to.have.property('title');
            pm.expect(body.error[0]).to.have.property('detail');
            pm.expect(body.error[0]).to.have.property('status');
            pm.expect(body.error[0]).to.have.property('instance');
        });    
    };
    
    // check problem+json error object property
    utils.checkErrorProperty = function(args) {
        pm.test('Error property ' + args.property + ' set to ' + args.value, function() {
            error = body.error[0];
            pm.expect(error).to.have.property(args.property);
            pm.expect(error[args.property]).contains(args.value);
        });
    };

    return utils;
    
  } + '; loadUtils();'
);
