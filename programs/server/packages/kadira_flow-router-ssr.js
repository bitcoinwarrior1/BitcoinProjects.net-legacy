(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var _ = Package.underscore._;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var ReactiveDict = Package['reactive-dict'].ReactiveDict;
var ReactiveVar = Package['reactive-var'].ReactiveVar;
var DDP = Package['ddp-client'].DDP;
var DDPServer = Package['ddp-server'].DDPServer;
var EJSON = Package.ejson.EJSON;
var FastRender = Package['meteorhacks:fast-render'].FastRender;
var Picker = Package['meteorhacks:picker'].Picker;
var InjectData = Package['meteorhacks:inject-data'].InjectData;

/* Package-scope variables */
var Router, Group, Route, SsrContext, FlowRouter;

(function(){

//////////////////////////////////////////////////////////////////////////////////////
//                                                                                  //
// packages/kadira_flow-router-ssr/server/router.js                                 //
//                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////
                                                                                    //
var Qs = Npm.require('qs');

Router = function () {
  this._routes = [];
  this._routesMap = {};
  this.subscriptions = Function.prototype;
  this.ssrContext = new Meteor.EnvironmentVariable();
  this.inSubscription = new Meteor.EnvironmentVariable();
  this.currentRoute = new Meteor.EnvironmentVariable();
  this.pageCacheTimeout = 1000 * 30;

  // holds onRoute callbacks
  this._onRouteCallbacks = [];
};

Router.prototype.route = function(pathDef, options) {
  if (!/^\/.*/.test(pathDef)) {
    var message = "route's path must start with '/'";
    throw new Error(message);
  }
  
  options = options || {};
  var route = new Route(this, pathDef, options);
  this._routes.push(route);

  if (options.name) {
    this._routesMap[options.name] = route;
  }

  this._triggerRouteRegister(route);
  return route;
};

Router.prototype.group = function(options) {
  return new Group(this, options);
};

Router.prototype.path = function(pathDef, fields, queryParams) {
  if(this._routesMap[pathDef]) {
    pathDef = this._routesMap[pathDef].path;
  }

  var path = FlowRouter.basePath;

  fields = fields || {};
  var regExp = /(:[\w\(\)\\\+\*\.\?]+)+/g;
  path += pathDef.replace(regExp, function(key) {
    var firstRegexpChar = key.indexOf("(");
    // get the content behind : and (\\d+/)
    key = key.substring(1, (firstRegexpChar > 0)? firstRegexpChar: undefined);
    // remove +?*
    key = key.replace(/[\+\*\?]+/g, "");

    return fields[key] || "";
  });

  path = path.replace(/\/\/+/g, "/"); // Replace multiple slashes with single slash

  // remove trailing slash
  // but keep the root slash if it's the only one
  path = path.match(/^\/{1}$/) ? path: path.replace(/\/$/, "");

  var strQueryParams = Qs.stringify(queryParams || {});
  if(strQueryParams) {
    path += "?" + strQueryParams;
  }

  return path;
};

Router.prototype.onRouteRegister = function(cb) {
  this._onRouteCallbacks.push(cb);
};

Router.prototype._triggerRouteRegister = function(currentRoute) {
  // We should only need to send a safe set of fields on the route
  // object.
  // This is not to hide what's inside the route object, but to show 
  // these are the public APIs
  var routePublicApi = _.pick(currentRoute, 'name', 'pathDef', 'path');
  var omittingOptionFields = [
    'triggersEnter', 'triggersExit', 'action', 'subscriptions', 'name'
  ];
  routePublicApi.options = _.omit(currentRoute.options, omittingOptionFields);

  _.each(this._onRouteCallbacks, function(cb) {
    cb(routePublicApi);
  });
};

Router.prototype.url = function() {
  var path = this.path.apply(this, arguments);
  return Meteor.absoluteUrl(path.replace(/^\//, ''));
};

Router.prototype.go = function() {
  // client only
};

Router.prototype.current = function() {
  // We can't trust outside, that's why we clone this
  // Anyway, we can't clone the whole object since it has non-jsonable values
  // That's why we clone what's really needed.
  var current = _.clone(this.currentRoute.get());
  current.queryParams = EJSON.clone(current.queryParams);
  current.params = EJSON.clone(current.params);
  return current;
};

Router.prototype.getParam = function(key) {
  var current = this.current();
  if(current) {
    return current.params[key];
  }
};

Router.prototype.getQueryParam = function(key) {
  var current = this.current();
  if(current) {
    return current.queryParams[key];
  }
};

Router.prototype.getRouteName = function() {
  var current = this.current();
  if(current) {
    return current.route.name;
  }
};

Router.prototype.triggers = {
  enter: function() {
    // client only
  },
  exit: function() {
    // client only
  }
};

Router.prototype.ready = function() {
  // client only
};

Router.prototype.initialize = function() {
  // client only
};

Router.prototype.wait = function() {
  // client only
};

Router.prototype.watchPathChange = function () {

};

Router.prototype.setDeferScriptLoading = function(defer) {
  this.deferScriptLoading = defer;
};

Router.prototype.setPageCacheTimeout = function(timeout) {
  this._pageCacheTimeout = timeout;
};
//////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////
//                                                                                  //
// packages/kadira_flow-router-ssr/server/group.js                                  //
//                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////
                                                                                    //
Group = function(router, options) {
  options = options || {};
  this.prefix = options.prefix || '';
  this.options = options;
  this._router = router;
};

Group.prototype.route = function(pathDef, options) {
  pathDef = this.prefix + pathDef;
  return this._router.route(pathDef, options);
};

Group.prototype.group = function(options) {
  var group = new Group(this._router, options);
  group.parent = this;

  return group;
};

//////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////
//                                                                                  //
// packages/kadira_flow-router-ssr/server/route.js                                  //
//                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////
                                                                                    //
var Url = Npm.require('url');
var Cheerio = Npm.require('cheerio');

Route = function(router, pathDef, options) {
  var self = this;
  options = options || {};
  this.options = options;
  this.name = options.name;
  this.pathDef = pathDef;


  // Route.path is deprecated and will be removed in 3.0
  this.path = this.pathDef;

  this.action = options.action || Function.prototype;
  this._router = router;
  this.subscriptions = options.subscriptions || Function.prototype;
  this._subsMap = {};
  this._cache = {};

  Picker.middleware(Npm.require('connect').cookieParser());
  // process null subscriptions with FR support
  Picker.middleware(FastRender.handleOnAllRoutes);
  
  var route = FlowRouter.basePath + this.pathDef;
  Picker.route(route, function(params, req, res, next) {

    if(!self.isHtmlPage(req.url)) {
      return next();
    }

    var cachedPage = self._lookupCachedPage(req.url);
    if(cachedPage) {
      return self._processFromCache(cachedPage, res, next);
    }

    var processFromSsr = self._processFromSsr.bind(self, params, req, res);
    FastRender.handleRoute(processFromSsr, params, req, res, function(data) {
      next();
    }); 
  });
};

Route.prototype._processFromSsr = function (params, req, res) {
  var self = this;
  var ssrContext = new SsrContext();
  self._router.ssrContext.withValue(ssrContext, function() {
    var queryParams = params.query;
    // We need to remove `.query` since it's not part of our params API
    // But we only need to remove it in our copy. 
    // We should not trigger any side effects
    params = _.clone(params);
    delete params.query;
    var context = self._buildContext(req.url, params, queryParams);

    self._router.currentRoute.withValue(context, function () {
      try {
        // get the data for null subscriptions and add them to the
        // ssrContext
        var frData = res.getData("fast-render-data");
        if(frData) {
          ssrContext.addData(frData.collectionData);
        }

        if(self.options.subscriptions) {
          self.options.subscriptions.call(self, params, queryParams);
        }

        if(self.options.action) {
          self.options.action.call(self, params, queryParams);
        }
      } catch(ex) {
        console.error("Error when doing SSR. path:", req.url, " ", ex.message);
        console.error(ex.stack);
      }
    });

    var originalWrite = res.write;
    res.write = function(data) {
      if(typeof data === 'string') {
        var head = ssrContext.getHead();
        if(head && head.trim() !== "") {
          data = data.replace('</head>', head + '\n</head>');
        }

        var reactRoot = ssrContext.getHtml();
        if (self._router.deferScriptLoading) {
          data = moveScripts(data);
        }
        data = data.replace('<body>', '<body>' + reactRoot);

        var pageInfo = {
          frData: res.getData("fast-render-data"),
          html: data
        };

        // cache the page if mentioned a timeout
        if(self._router.pageCacheTimeout) {
          self._cachePage(req.url, pageInfo, self._router.pageCacheTimeout);
        }
      }
      
      originalWrite.call(this, data);
    };
  });

  function moveScripts(data) {
    var $ = Cheerio.load(data, {
      decodeEntities: false
    });
    var heads = $('head script');
    $('body').append(heads);

    // Remove empty lines caused by removing scripts
    $('head').html($('head').html().replace(/(^[ \t]*\n)/gm, ''));

    return $.html();
  }
};

Route.prototype._processFromCache = function(pageInfo, res, next) {
  var originalWrite = res.write;
  res.write = function(data) {
    originalWrite.call(this, pageInfo.html);
  }

  res.pushData('fast-render-data', pageInfo.frData);
  next();
};

Route.prototype._buildContext = function(url, params, queryParams) {
  var context = {
    route: this,
    path: url,
    params: params,
    queryParams: queryParams
  };

  return context;
};

Route.prototype.isHtmlPage = function(url) {
  var pathname = Url.parse(url).pathname;
  var ext = pathname.split('.').slice(1).join('.');

  // if there is no extention, yes that's a html page
  if(!ext) {
    return true;
  }

  // if this is htm or html, yes that's a html page
  if(/^htm/.test(ext)) {
    return true;
  }

  // if not we assume this is not as a html page
  // this doesn't do any harm. But no SSR
  return false;
};

Route.prototype._lookupCachedPage= function(url) {
  var info = this._cache[url];
  if(info) {
    return info.data;
  }
};

Route.prototype._cachePage = function(url, data, timeout) {
  var self = this;
  var existingInfo = this._cache[url];
  if(existingInfo) {
    clearTimeout(existingInfo.timeoutHandle);
  }

  var info = {
    data: data,
    timeoutHandle: setTimeout(function() {
      delete self._cache[url];
    }, timeout)
  };

  this._cache[url] = info;
};

Route.prototype.register = function(name, sub, options) {
  this._subsMap[name] = sub;
};

Route.prototype.subscription = function(name) {
  return this._subsMap[name];
};

Route.prototype.middleware = function(middleware) {

};

//////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////
//                                                                                  //
// packages/kadira_flow-router-ssr/server/ssr_context.js                            //
//                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////
                                                                                    //
var deepMerge = Npm.require('deepmerge');

SsrContext = function() {
  this._html = "";
  this._head = "";
  this._collections = {};
};

SsrContext.prototype.getCollection = function(collName) {
  var collection = this._collections[collName];
  if(!collection) {
    var minimongo = Package['minimongo'];
    collection = this._collections[collName] = new minimongo.LocalCollection();
  }

  return collection;
};

SsrContext.prototype.setHtml = function(html) {
  this._html = html;
};

SsrContext.prototype.getHtml = function() {
  return this._html;
};

SsrContext.prototype.addToHead = function(headHtml) {
  this._head += '\n' + headHtml;
};

SsrContext.prototype.getHead = function() {
  return this._head;
};

SsrContext.prototype.addSubscription = function(name, params) {
  var pub = Meteor.default_server.publish_handlers[name];
  var fastRenderContext = FastRender.frContext.get();
  var args = [name].concat(params);
  var data = fastRenderContext.subscribe.apply(fastRenderContext, args);
  this.addData(data);  
};

SsrContext.prototype.addData = function(data) {
  var self = this;
  _.each(data, function(collDataCollection, collectionName) {
    var collection = self.getCollection(collectionName);
    collDataCollection.forEach(function(collData) {
      collData.forEach(function(item) {
        var existingDoc = collection.findOne(item._id);
        if(existingDoc) {
          var newDoc = deepMerge(existingDoc, item);
          delete newDoc._id;
          collection.update(item._id, newDoc);
        } else {
          collection.insert(item);
        }
      });
    });
  });
};
//////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////
//                                                                                  //
// packages/kadira_flow-router-ssr/server/_init.js                                  //
//                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////
                                                                                    //
// Export Router Instance
FlowRouter = new Router();
FlowRouter.Router = Router;
FlowRouter.Route = Route;

// This is a magic configuration in Meteor which allows some apps to be 
// run with a prefix.
// This is very important when especially app running in something like
// sandstrom.io
// Now it's supported by SSR using this
FlowRouter.basePath = __meteor_runtime_config__.ROOT_URL_PATH_PREFIX || "";
//////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////
//                                                                                  //
// packages/kadira_flow-router-ssr/server/plugins/ssr_data.js                       //
//                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////
                                                                                    //
var originalSubscribe = Meteor.subscribe;
Meteor.subscribe = function(pubName) {
  var params = Array.prototype.slice.call(arguments, 1);

  var ssrContext = FlowRouter.ssrContext.get();
  if(ssrContext) {
    FlowRouter.inSubscription.withValue(true, function() {
      ssrContext.addSubscription(pubName, params);
    });
  }

  if(originalSubscribe) {
    originalSubscribe.apply(this, arguments);
  }
  return {ready: function () {return true}};
};

var Mongo = Package['mongo'].Mongo;
var originalFind = Mongo.Collection.prototype.find;
Mongo.Collection.prototype.find = function(selector, options) {
  selector = selector || {};
  var collName = this._name;
  var ssrContext = FlowRouter.ssrContext.get();
  if(ssrContext && !FlowRouter.inSubscription.get()) {
    var collection = ssrContext.getCollection(collName);
    var cursor = collection.find(selector, options);
    return cursor;
  }

  return originalFind.call(this, selector, options);
};

Mongo.Collection.prototype.findOne = function(selector, options) {
  options = options || {};
  options.limit = 1;
  return this.find(selector, options).fetch()[0];
};

var originalAutorun = Tracker.autorun;
Tracker.autorun = function (fn) {
  // if autorun is in the ssrContext, we need fake and run the callback 
  // in the same eventloop
  if(FlowRouter.ssrContext.get()) {
    var c = {firstRun: true, stop: function () {}};
    fn(c);
    return c;
  } else {
    return originalAutorun.call(Tracker, fn);
  }
};

// By default, Meteor[call,apply] also inherit SsrContext
// So, they can't access the full MongoDB dataset because of that
// Then, we need to remove the SsrContext within Method calls
['call', 'apply'].forEach(function(methodName) {
  var original = Meteor[methodName];
  Meteor[methodName] = function() {
    var self = this;
    var args = arguments;
    var response = FlowRouter.ssrContext.withValue(null, function() {
      return original.apply(self, args);
    });

    return response;
  };
});

// This is not available in the server. But to make it work with SSR
// We need to have it.
Meteor.loggingIn = function() {
  return false;
};
//////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////
//                                                                                  //
// packages/kadira_flow-router-ssr/lib/router.js                                    //
//                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////
                                                                                    //
Router.prototype.url = function() {
  var path = this.path.apply(this, arguments);
  return Meteor.absoluteUrl(path.replace(/^\//, ''));
};

//////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['kadira:flow-router-ssr'] = {}, {
  FlowRouter: FlowRouter
});

})();
