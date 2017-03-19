(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var ECMAScript = Package.ecmascript.ECMAScript;
var _ = Package.underscore._;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var ReactiveDict = Package['reactive-dict'].ReactiveDict;
var ReactiveVar = Package['reactive-var'].ReactiveVar;
var DDP = Package['ddp-client'].DDP;
var DDPServer = Package['ddp-server'].DDPServer;
var EJSON = Package.ejson.EJSON;
var meteorInstall = Package.modules.meteorInstall;
var Buffer = Package.modules.Buffer;
var process = Package.modules.process;
var FastRender = Package['meteorhacks:fast-render'].FastRender;
var Picker = Package['meteorhacks:picker'].Picker;
var InjectData = Package['meteorhacks:inject-data'].InjectData;
var Symbol = Package['ecmascript-runtime'].Symbol;
var Map = Package['ecmascript-runtime'].Map;
var Set = Package['ecmascript-runtime'].Set;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;

/* Package-scope variables */
var SharedRouter, SharedGroup, SharedRoute, Router, Group, Route, SsrContext, FlowRouter, exports;

var require = meteorInstall({"node_modules":{"meteor":{"kadira:flow-router-ssr":{"lib":{"router.js":["babel-runtime/helpers/classCallCheck","qs","path-to-regexp",function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// packages/kadira_flow-router-ssr/lib/router.js                                                               //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");                                        //
                                                                                                               //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                               //
                                                                                                               //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }              //
                                                                                                               //
var Qs = void 0;                                                                                               // 1
module.import('qs', {                                                                                          // 1
  "default": function (v) {                                                                                    // 1
    Qs = v;                                                                                                    // 1
  }                                                                                                            // 1
}, 0);                                                                                                         // 1
var PathToRegexp = void 0;                                                                                     // 1
module.import('path-to-regexp', {                                                                              // 1
  "default": function (v) {                                                                                    // 1
    PathToRegexp = v;                                                                                          // 1
  }                                                                                                            // 1
}, 1);                                                                                                         // 1
                                                                                                               //
SharedRouter = function () {                                                                                   // 4
  function SharedRouter() {                                                                                    // 5
    (0, _classCallCheck3.default)(this, SharedRouter);                                                         // 5
    this._routes = [];                                                                                         // 6
    this._routesMap = {}; // holds onRoute callbacks                                                           // 7
                                                                                                               //
    this._onRouteCallbacks = [];                                                                               // 10
    this.env = {};                                                                                             // 12
    this.env.trailingSlash = new Meteor.EnvironmentVariable();                                                 // 13
  }                                                                                                            // 14
                                                                                                               //
  SharedRouter.prototype.route = function () {                                                                 // 4
    function route(pathDef, options, group) {                                                                  // 4
      if (!/^\/.*/.test(pathDef)) {                                                                            // 17
        var message = "route's path must start with '/'";                                                      // 18
        throw new Error(message);                                                                              // 19
      }                                                                                                        // 20
                                                                                                               //
      options = options || {};                                                                                 // 22
      var currentRoute = new Route(this, pathDef, options, group);                                             // 24
                                                                                                               //
      currentRoute._init();                                                                                    // 25
                                                                                                               //
      this._routes.push(currentRoute);                                                                         // 27
                                                                                                               //
      if (options.name) {                                                                                      // 30
        this._routesMap[options.name] = currentRoute;                                                          // 31
      }                                                                                                        // 32
                                                                                                               //
      this._triggerRouteRegister(currentRoute);                                                                // 34
                                                                                                               //
      return currentRoute;                                                                                     // 36
    }                                                                                                          // 37
                                                                                                               //
    return route;                                                                                              // 4
  }(); // XXX this function needs to be cleaned up if possible by removing `if (this.isServer)`                // 4
  // and `if (this.isClient)` if possible                                                                      // 40
                                                                                                               //
                                                                                                               //
  SharedRouter.prototype.path = function () {                                                                  // 4
    function path(pathDef) {                                                                                   // 4
      var fields = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};                     // 41
      var queryParams = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};                // 41
                                                                                                               //
      if (this._routesMap[pathDef]) {                                                                          // 42
        pathDef = this._routesMap[pathDef].path;                                                               // 43
      }                                                                                                        // 44
                                                                                                               //
      var newPath = ''; // Prefix the path with the router global prefix                                       // 46
                                                                                                               //
      if (this._basePath) {                                                                                    // 49
        newPath += "/" + this._basePath + "/";                                                                 // 50
      } // Encode query params                                                                                 // 51
                                                                                                               //
                                                                                                               //
      queryParams = this._encodeValues(queryParams);                                                           // 54
      var toPath = PathToRegexp.compile(pathDef);                                                              // 56
      newPath += toPath(fields); // If we have one optional parameter in path definition e.g.                  // 57
      // /:category?                                                                                           // 60
      // and the parameter isn't present, path will be an empty string.                                        // 61
      // We have this check as a value for path is required by e.g. FlowRouter.go()                            // 62
                                                                                                               //
      if (!newPath) {                                                                                          // 63
        newPath = '/';                                                                                         // 64
      } // Replace multiple slashes with single slash                                                          // 65
                                                                                                               //
                                                                                                               //
      newPath = newPath.replace(/\/\/+/g, '/'); // remove trailing slash                                       // 68
      // but keep the root slash if it's the only one                                                          // 71
                                                                                                               //
      newPath = newPath.match(/^\/{1}$/) ? newPath : newPath.replace(/\/$/, ''); // explictly asked to add a trailing slash
                                                                                                               //
      if (this.env.trailingSlash.get() && _.last(newPath) !== '/') {                                           // 75
        newPath += '/';                                                                                        // 76
      }                                                                                                        // 77
                                                                                                               //
      var strQueryParams = Qs.stringify(queryParams || {});                                                    // 79
                                                                                                               //
      if (strQueryParams) {                                                                                    // 81
        newPath += "?" + strQueryParams;                                                                       // 82
      }                                                                                                        // 83
                                                                                                               //
      return newPath;                                                                                          // 85
    }                                                                                                          // 86
                                                                                                               //
    return path;                                                                                               // 4
  }();                                                                                                         // 4
                                                                                                               //
  SharedRouter.prototype.go = function () {                                                                    // 4
    function go() {// client only                                                                              // 4
    }                                                                                                          // 90
                                                                                                               //
    return go;                                                                                                 // 4
  }();                                                                                                         // 4
                                                                                                               //
  SharedRouter.prototype.watchPathChange = function () {                                                       // 4
    function watchPathChange() {// client only                                                                 // 4
    }                                                                                                          // 94
                                                                                                               //
    return watchPathChange;                                                                                    // 4
  }();                                                                                                         // 4
                                                                                                               //
  SharedRouter.prototype.group = function () {                                                                 // 4
    function group(options) {                                                                                  // 4
      return new Group(this, options);                                                                         // 97
    }                                                                                                          // 98
                                                                                                               //
    return group;                                                                                              // 4
  }();                                                                                                         // 4
                                                                                                               //
  SharedRouter.prototype.url = function () {                                                                   // 4
    function url() {                                                                                           // 4
      // We need to remove the leading base path, or "/", as it will be inserted                               // 101
      // automatically by `Meteor.absoluteUrl` as documented in:                                               // 102
      // http://docs.meteor.com/#/full/meteor_absoluteurl                                                      // 103
      var completePath = this.path.apply(this, arguments);                                                     // 104
      var basePath = this._basePath || '/';                                                                    // 105
      var pathWithoutBase = completePath.replace(RegExp("^" + basePath), '');                                  // 106
      return Meteor.absoluteUrl(pathWithoutBase);                                                              // 107
    }                                                                                                          // 108
                                                                                                               //
    return url;                                                                                                // 4
  }(); // For client:                                                                                          // 4
  // .current is not reactive on the client                                                                    // 111
  // This is by design. use .getParam() instead                                                                // 112
  // If you really need to watch the path change, use .watchPathChange()                                       // 113
                                                                                                               //
                                                                                                               //
  SharedRouter.prototype.current = function () {                                                               // 4
    function current() {                                                                                       // 4
      // We can't trust outside, that's why we clone this                                                      // 115
      // Anyway, we can't clone the whole object since it has non-jsonable values                              // 116
      // That's why we clone what's really needed.                                                             // 117
      var context = _.clone(this._getCurrentRouteContext());                                                   // 118
                                                                                                               //
      context.queryParams = EJSON.clone(context.queryParams);                                                  // 120
      context.params = EJSON.clone(context.params);                                                            // 121
      return context;                                                                                          // 123
    }                                                                                                          // 124
                                                                                                               //
    return current;                                                                                            // 4
  }();                                                                                                         // 4
                                                                                                               //
  SharedRouter.prototype.onRouteRegister = function () {                                                       // 4
    function onRouteRegister(cb) {                                                                             // 4
      this._onRouteCallbacks.push(cb);                                                                         // 127
    }                                                                                                          // 128
                                                                                                               //
    return onRouteRegister;                                                                                    // 4
  }();                                                                                                         // 4
                                                                                                               //
  SharedRouter.prototype._encodeValues = function () {                                                         // 4
    function _encodeValues(obj) {                                                                              // 4
      var newObj = {};                                                                                         // 131
      Object.keys(obj).forEach(function (key) {                                                                // 132
        var value = obj[key];                                                                                  // 133
        newObj[key] = typeof value !== 'undefined' ? encodeURIComponent(value) : value;                        // 134
      });                                                                                                      // 135
      return newObj;                                                                                           // 137
    }                                                                                                          // 138
                                                                                                               //
    return _encodeValues;                                                                                      // 4
  }();                                                                                                         // 4
                                                                                                               //
  SharedRouter.prototype._triggerRouteRegister = function () {                                                 // 4
    function _triggerRouteRegister(currentRoute) {                                                             // 4
      // We should only need to send a safe set of fields on the route                                         // 141
      // object.                                                                                               // 142
      // This is not to hide what's inside the route object, but to show                                       // 143
      // these are the public APIs                                                                             // 144
      var routePublicApi = _.pick(currentRoute, 'name', 'pathDef', 'path');                                    // 145
                                                                                                               //
      var omittingOptionFields = ['triggersEnter', 'triggersExit', 'name', 'action'];                          // 146
      routePublicApi.options = _.omit(currentRoute.options, omittingOptionFields);                             // 149
                                                                                                               //
      this._onRouteCallbacks.forEach(function (cb) {                                                           // 151
        cb(routePublicApi);                                                                                    // 152
      });                                                                                                      // 153
    }                                                                                                          // 154
                                                                                                               //
    return _triggerRouteRegister;                                                                              // 4
  }();                                                                                                         // 4
                                                                                                               //
  SharedRouter.prototype._getCurrentRouteContext = function () {                                               // 4
    function _getCurrentRouteContext() {                                                                       // 4
      throw new Error('Not implemented');                                                                      // 157
    }                                                                                                          // 158
                                                                                                               //
    return _getCurrentRouteContext;                                                                            // 4
  }();                                                                                                         // 4
                                                                                                               //
  SharedRouter.prototype._init = function () {                                                                 // 4
    function _init() {                                                                                         // 4
      throw new Error('Not implemented');                                                                      // 161
    }                                                                                                          // 162
                                                                                                               //
    return _init;                                                                                              // 4
  }();                                                                                                         // 4
                                                                                                               //
  SharedRouter.prototype.withTrailingSlash = function () {                                                     // 4
    function withTrailingSlash(fn) {                                                                           // 4
      return this.env.trailingSlash.withValue(true, fn);                                                       // 165
    }                                                                                                          // 166
                                                                                                               //
    return withTrailingSlash;                                                                                  // 4
  }();                                                                                                         // 4
                                                                                                               //
  return SharedRouter;                                                                                         // 4
}();                                                                                                           // 4
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"group.js":["babel-runtime/helpers/classCallCheck",function(require){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// packages/kadira_flow-router-ssr/lib/group.js                                                                //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");                                        //
                                                                                                               //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                               //
                                                                                                               //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }              //
                                                                                                               //
SharedGroup = function () {                                                                                    // 1
  function SharedGroup(router, options, parent) {                                                              // 2
    (0, _classCallCheck3.default)(this, SharedGroup);                                                          // 2
    options = options || {};                                                                                   // 3
                                                                                                               //
    if (options.prefix && !/^\/.*/.test(options.prefix)) {                                                     // 5
      var message = "group's prefix must start with '/'";                                                      // 6
      throw new Error(message);                                                                                // 7
    }                                                                                                          // 8
                                                                                                               //
    this.prefix = options.prefix || '';                                                                        // 10
    this.options = options;                                                                                    // 11
    this._router = router;                                                                                     // 12
    this.parent = parent;                                                                                      // 13
  }                                                                                                            // 14
                                                                                                               //
  SharedGroup.prototype.route = function () {                                                                  // 1
    function route(pathDef, options, group) {                                                                  // 1
      options = options || {};                                                                                 // 17
                                                                                                               //
      if (!/^\/.*/.test(pathDef)) {                                                                            // 19
        var message = "route's path must start with '/'";                                                      // 20
        throw new Error(message);                                                                              // 21
      }                                                                                                        // 22
                                                                                                               //
      pathDef = this.prefix + pathDef;                                                                         // 24
      group = group || this;                                                                                   // 26
      return this._router.route(pathDef, options, group);                                                      // 28
    }                                                                                                          // 29
                                                                                                               //
    return route;                                                                                              // 1
  }();                                                                                                         // 1
                                                                                                               //
  SharedGroup.prototype.group = function () {                                                                  // 1
    function group(options) {                                                                                  // 1
      return new Group(this._router, options, this);                                                           // 32
    }                                                                                                          // 33
                                                                                                               //
    return group;                                                                                              // 1
  }();                                                                                                         // 1
                                                                                                               //
  return SharedGroup;                                                                                          // 1
}();                                                                                                           // 1
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"route.js":["babel-runtime/helpers/classCallCheck",function(require){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// packages/kadira_flow-router-ssr/lib/route.js                                                                //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");                                        //
                                                                                                               //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                               //
                                                                                                               //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }              //
                                                                                                               //
SharedRoute = function () {                                                                                    // 1
  function SharedRoute(router, pathDef, options, group) {                                                      // 2
    (0, _classCallCheck3.default)(this, SharedRoute);                                                          // 2
    options = options || {};                                                                                   // 3
    this.options = options;                                                                                    // 5
    this.name = options.name;                                                                                  // 7
    this.pathDef = pathDef; // Route.path is deprecated and will be removed in 3.0                             // 9
                                                                                                               //
    this.path = this.pathDef;                                                                                  // 12
    this._router = router;                                                                                     // 14
    this._action = options.action || Function.prototype;                                                       // 16
    this.group = group;                                                                                        // 18
  }                                                                                                            // 19
                                                                                                               //
  return SharedRoute;                                                                                          // 1
}();                                                                                                           // 1
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"_init.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// packages/kadira_flow-router-ssr/lib/_init.js                                                                //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
// Export Router Instance                                                                                      // 1
FlowRouter = new Router();                                                                                     // 2
FlowRouter.Router = Router;                                                                                    // 3
FlowRouter.Route = Route;                                                                                      // 4
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"server":{"router.js":["babel-runtime/helpers/classCallCheck","babel-runtime/helpers/possibleConstructorReturn","babel-runtime/helpers/inherits",function(require){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// packages/kadira_flow-router-ssr/server/router.js                                                            //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");                                        //
                                                                                                               //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                               //
                                                                                                               //
var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");                  //
                                                                                                               //
var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);                         //
                                                                                                               //
var _inherits2 = require("babel-runtime/helpers/inherits");                                                    //
                                                                                                               //
var _inherits3 = _interopRequireDefault(_inherits2);                                                           //
                                                                                                               //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }              //
                                                                                                               //
Router = function (_SharedRouter) {                                                                            // 1
  (0, _inherits3.default)(Router, _SharedRouter);                                                              // 1
                                                                                                               //
  function Router() {                                                                                          // 2
    (0, _classCallCheck3.default)(this, Router);                                                               // 2
                                                                                                               //
    var _this = (0, _possibleConstructorReturn3.default)(this, _SharedRouter.call(this));                      // 2
                                                                                                               //
    _this.subscriptions = Function.prototype;                                                                  // 5
    _this.ssrContext = new Meteor.EnvironmentVariable();                                                       // 6
    _this.inSubscription = new Meteor.EnvironmentVariable();                                                   // 7
    _this.routeContext = new Meteor.EnvironmentVariable(); // FlowRouter can defer the script loading after rendered the body
    // It's turned off by default                                                                              // 11
                                                                                                               //
    _this.deferScriptLoading = false; // FlowRouter can cache it's pages to improve SSR performance.           // 12
    // It's turned off by default                                                                              // 15
                                                                                                               //
    _this.pageCacheTimeout = 0; // holds onRoute callbacks                                                     // 16
                                                                                                               //
    _this._onRouteCallbacks = [];                                                                              // 19
    _this.triggers = {                                                                                         // 21
      enter: function () {// client only                                                                       // 22
      },                                                                                                       // 24
      exit: function () {// client only                                                                        // 25
      }                                                                                                        // 27
    };                                                                                                         // 21
    return _this;                                                                                              // 2
  }                                                                                                            // 29
                                                                                                               //
  Router.prototype.getParam = function () {                                                                    // 1
    function getParam(key) {                                                                                   // 1
      var current = this.current();                                                                            // 32
                                                                                                               //
      if (current) {                                                                                           // 33
        return current.params[key];                                                                            // 34
      }                                                                                                        // 35
    }                                                                                                          // 36
                                                                                                               //
    return getParam;                                                                                           // 1
  }();                                                                                                         // 1
                                                                                                               //
  Router.prototype.getQueryParam = function () {                                                               // 1
    function getQueryParam(key) {                                                                              // 1
      var current = this.current();                                                                            // 39
                                                                                                               //
      if (current) {                                                                                           // 40
        return current.queryParams[key];                                                                       // 41
      }                                                                                                        // 42
    }                                                                                                          // 43
                                                                                                               //
    return getQueryParam;                                                                                      // 1
  }();                                                                                                         // 1
                                                                                                               //
  Router.prototype.getRouteName = function () {                                                                // 1
    function getRouteName() {                                                                                  // 1
      var current = this.current();                                                                            // 46
                                                                                                               //
      if (current) {                                                                                           // 47
        return current.route.name;                                                                             // 48
      }                                                                                                        // 49
    }                                                                                                          // 50
                                                                                                               //
    return getRouteName;                                                                                       // 1
  }();                                                                                                         // 1
                                                                                                               //
  Router.prototype.setDeferScriptLoading = function () {                                                       // 1
    function setDeferScriptLoading(defer) {                                                                    // 1
      this.deferScriptLoading = defer;                                                                         // 53
    }                                                                                                          // 54
                                                                                                               //
    return setDeferScriptLoading;                                                                              // 1
  }();                                                                                                         // 1
                                                                                                               //
  Router.prototype.setPageCacheTimeout = function () {                                                         // 1
    function setPageCacheTimeout(timeout) {                                                                    // 1
      this.pageCacheTimeout = timeout;                                                                         // 57
    }                                                                                                          // 58
                                                                                                               //
    return setPageCacheTimeout;                                                                                // 1
  }();                                                                                                         // 1
                                                                                                               //
  Router.prototype._getCurrentRouteContext = function () {                                                     // 1
    function _getCurrentRouteContext() {                                                                       // 1
      return this.routeContext.get();                                                                          // 61
    }                                                                                                          // 62
                                                                                                               //
    return _getCurrentRouteContext;                                                                            // 1
  }();                                                                                                         // 1
                                                                                                               //
  return Router;                                                                                               // 1
}(SharedRouter);                                                                                               // 1
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"group.js":["babel-runtime/helpers/classCallCheck","babel-runtime/helpers/possibleConstructorReturn","babel-runtime/helpers/inherits",function(require){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// packages/kadira_flow-router-ssr/server/group.js                                                             //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");                                        //
                                                                                                               //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                               //
                                                                                                               //
var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");                  //
                                                                                                               //
var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);                         //
                                                                                                               //
var _inherits2 = require("babel-runtime/helpers/inherits");                                                    //
                                                                                                               //
var _inherits3 = _interopRequireDefault(_inherits2);                                                           //
                                                                                                               //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }              //
                                                                                                               //
Group = function (_SharedGroup) {                                                                              // 1
  (0, _inherits3.default)(Group, _SharedGroup);                                                                // 1
                                                                                                               //
  function Group() {                                                                                           // 1
    (0, _classCallCheck3.default)(this, Group);                                                                // 1
    return (0, _possibleConstructorReturn3.default)(this, _SharedGroup.apply(this, arguments));                // 1
  }                                                                                                            // 1
                                                                                                               //
  return Group;                                                                                                // 1
}(SharedGroup);                                                                                                // 1
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"route.js":["babel-runtime/helpers/classCallCheck","babel-runtime/helpers/possibleConstructorReturn","babel-runtime/helpers/inherits","url","cheerio","cookie-parser",function(require){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// packages/kadira_flow-router-ssr/server/route.js                                                             //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");                                        //
                                                                                                               //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                               //
                                                                                                               //
var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");                  //
                                                                                                               //
var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);                         //
                                                                                                               //
var _inherits2 = require("babel-runtime/helpers/inherits");                                                    //
                                                                                                               //
var _inherits3 = _interopRequireDefault(_inherits2);                                                           //
                                                                                                               //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }              //
                                                                                                               //
var Url = require('url');                                                                                      // 1
                                                                                                               //
var Cheerio = require('cheerio');                                                                              // 2
                                                                                                               //
var logger = console;                                                                                          // 3
                                                                                                               //
Route = function (_SharedRoute) {                                                                              // 5
  (0, _inherits3.default)(Route, _SharedRoute);                                                                // 5
                                                                                                               //
  function Route(router, pathDef, options, group) {                                                            // 6
    (0, _classCallCheck3.default)(this, Route);                                                                // 6
                                                                                                               //
    var _this = (0, _possibleConstructorReturn3.default)(this, _SharedRoute.call(this, router, pathDef, options, group));
                                                                                                               //
    _this._cache = {};                                                                                         // 9
    return _this;                                                                                              // 6
  }                                                                                                            // 10
                                                                                                               //
  Route.prototype._init = function () {                                                                        // 5
    function _init() {                                                                                         // 5
      var cookieParser = require('cookie-parser');                                                             // 13
                                                                                                               //
      Picker.middleware(cookieParser()); // process null subscriptions with FR support                         // 14
                                                                                                               //
      Picker.middleware(FastRender.handleOnAllRoutes);                                                         // 16
      var route = FlowRouter.basePath + this.pathDef;                                                          // 18
      Picker.route(route, this._handleRoute.bind(this));                                                       // 19
    }                                                                                                          // 20
                                                                                                               //
    return _init;                                                                                              // 5
  }();                                                                                                         // 5
                                                                                                               //
  Route.prototype._handleRoute = function () {                                                                 // 5
    function _handleRoute(params, req, res, next) {                                                            // 5
      if (!this._isHtmlPage(req.url)) {                                                                        // 23
        return next();                                                                                         // 24
      } // This userId will be useful in the at the later on when                                              // 25
      // it's time to cache the page.                                                                          // 28
      // Normally, we can't access `Meteor.userId()` outside of a method                                       // 29
      // But here, we could do it because we call `FastRender.handleOnAllRoutes`.                              // 30
      // It creates a FastRender context and assign it for the current fiber.                                  // 31
                                                                                                               //
                                                                                                               //
      req.__userId = Meteor.userId();                                                                          // 32
                                                                                                               //
      var cachedPage = this._getCachedPage(req.url, req.__userId);                                             // 33
                                                                                                               //
      if (cachedPage) {                                                                                        // 34
        return this._processFromCache(cachedPage, res, next);                                                  // 35
      } // Here we need to processFromSsr,                                                                     // 36
      // but also we need to process with FastRender as well.                                                  // 39
      // That's why we bind processFromSsr and pass args as below.                                             // 40
      // It does not get any arguments from FastRender.                                                        // 41
      // FastRender just trigger the following handler and do it's job                                         // 42
                                                                                                               //
                                                                                                               //
      var processFromSsr = this._processFromSsr.bind(this, params, req, res);                                  // 43
                                                                                                               //
      FastRender.handleRoute(processFromSsr, params, req, res, next);                                          // 44
    }                                                                                                          // 45
                                                                                                               //
    return _handleRoute;                                                                                       // 5
  }();                                                                                                         // 5
                                                                                                               //
  Route.prototype._processFromCache = function () {                                                            // 5
    function _processFromCache(pageInfo, res, next) {                                                          // 5
      // Here we can't simply call res.write.                                                                  // 48
      // That's because, the HTML we've cached does not have the                                               // 49
      // injected fast-render data.                                                                            // 50
      // That's why we hijack the res.write and let FastRender to push                                         // 51
      // the frData we've cached.                                                                              // 52
      var originalWrite = res.write;                                                                           // 53
                                                                                                               //
      res.write = function () {                                                                                // 54
        originalWrite.call(this, pageInfo.html);                                                               // 55
      };                                                                                                       // 56
                                                                                                               //
      InjectData.pushData(res, 'fast-render-data', pageInfo.frData);                                           // 57
      next();                                                                                                  // 58
    }                                                                                                          // 59
                                                                                                               //
    return _processFromCache;                                                                                  // 5
  }();                                                                                                         // 5
                                                                                                               //
  Route.prototype._processFromSsr = function () {                                                              // 5
    function _processFromSsr(params, req, res) {                                                               // 5
      var self = this;                                                                                         // 62
      var ssrContext = new SsrContext();                                                                       // 63
                                                                                                               //
      var routeContext = self._buildContext(req, params);                                                      // 64
                                                                                                               //
      self._router.ssrContext.withValue(ssrContext, function () {                                              // 66
        self._router.routeContext.withValue(routeContext, function () {                                        // 67
          try {                                                                                                // 68
            // get the data for null subscriptions and add them to the                                         // 69
            // ssrContext                                                                                      // 70
            var frData = InjectData.getData(res, 'fast-render-data');                                          // 71
                                                                                                               //
            if (frData) {                                                                                      // 72
              ssrContext.addData(frData.collectionData);                                                       // 73
            }                                                                                                  // 74
                                                                                                               //
            if (self.options.action) {                                                                         // 76
              self.options.action(routeContext.params, routeContext.queryParams);                              // 77
            }                                                                                                  // 78
          } catch (ex) {                                                                                       // 79
            logger.error("Error when doing SSR. path:" + req.url + ": " + ex.message);                         // 80
            logger.error(ex.stack);                                                                            // 81
          }                                                                                                    // 82
        });                                                                                                    // 83
                                                                                                               //
        self._injectHtml(req, res, ssrContext);                                                                // 85
      });                                                                                                      // 86
    }                                                                                                          // 87
                                                                                                               //
    return _processFromSsr;                                                                                    // 5
  }();                                                                                                         // 5
                                                                                                               //
  Route.prototype._injectHtml = function () {                                                                  // 5
    function _injectHtml(req, res, ssrContext) {                                                               // 5
      var self = this;                                                                                         // 90
      var originalWrite = res.write;                                                                           // 91
                                                                                                               //
      res.write = function (data) {                                                                            // 92
        if (typeof data === 'string') {                                                                        // 93
          var head = ssrContext.getHead();                                                                     // 94
                                                                                                               //
          if (head && head.trim() !== '') {                                                                    // 95
            data = data.replace('</head>', head + "\n</head>");                                                // 96
          }                                                                                                    // 97
                                                                                                               //
          var body = ssrContext.getHtml();                                                                     // 99
          data = data.replace('<body>', "<body>\n" + body);                                                    // 100
                                                                                                               //
          if (self._router.deferScriptLoading) {                                                               // 102
            data = self._moveScriptsToBottom(data);                                                            // 103
          } // cache the page if mentioned a timeout                                                           // 104
                                                                                                               //
                                                                                                               //
          if (self._router.pageCacheTimeout) {                                                                 // 107
            var pageInfo = {                                                                                   // 108
              frData: InjectData.getData(res, 'fast-render-data'),                                             // 109
              html: data                                                                                       // 110
            };                                                                                                 // 108
                                                                                                               //
            self._cachePage(req.url, req.__userId, pageInfo, self._router.pageCacheTimeout);                   // 112
          }                                                                                                    // 113
        }                                                                                                      // 114
                                                                                                               //
        originalWrite.call(this, data);                                                                        // 116
      };                                                                                                       // 117
    }                                                                                                          // 118
                                                                                                               //
    return _injectHtml;                                                                                        // 5
  }();                                                                                                         // 5
                                                                                                               //
  Route.prototype._moveScriptsToBottom = function () {                                                         // 5
    function _moveScriptsToBottom(html) {                                                                      // 5
      var $ = Cheerio.load(html, {                                                                             // 121
        decodeEntities: false                                                                                  // 122
      });                                                                                                      // 121
      var heads = $('head script');                                                                            // 124
      $('body').append(heads); // Remove empty lines caused by removing scripts                                // 125
                                                                                                               //
      $('head').html($('head').html().replace(/(^[ \t]*\n)/gm, ''));                                           // 128
      return $.html();                                                                                         // 130
    }                                                                                                          // 131
                                                                                                               //
    return _moveScriptsToBottom;                                                                               // 5
  }();                                                                                                         // 5
                                                                                                               //
  Route.prototype._buildContext = function () {                                                                // 5
    function _buildContext(req, _params) {                                                                     // 5
      var queryParams = _params.query; // We need to remove `.query` since it's not part of our params API     // 134
      // But we only need to remove it in our copy.                                                            // 136
      // We should not trigger any side effects                                                                // 137
                                                                                                               //
      var params = _.clone(_params);                                                                           // 138
                                                                                                               //
      delete params.query;                                                                                     // 139
      var context = {                                                                                          // 141
        route: this,                                                                                           // 142
        path: req.url,                                                                                         // 143
        params: params,                                                                                        // 144
        queryParams: queryParams,                                                                              // 145
        // We might change this later on. That's why it's starting with _                                      // 146
        _serverRequest: req                                                                                    // 147
      };                                                                                                       // 141
      return context;                                                                                          // 150
    }                                                                                                          // 151
                                                                                                               //
    return _buildContext;                                                                                      // 5
  }();                                                                                                         // 5
                                                                                                               //
  Route.prototype._isHtmlPage = function () {                                                                  // 5
    function _isHtmlPage(url) {                                                                                // 5
      var pathname = Url.parse(url).pathname;                                                                  // 154
      var ext = pathname.split('.').slice(1).join('.'); // if there is no extention, yes that's a html page    // 155
                                                                                                               //
      if (!ext) {                                                                                              // 158
        return true;                                                                                           // 159
      } // if this is htm or html, yes that's a html page                                                      // 160
                                                                                                               //
                                                                                                               //
      if (/^htm/.test(ext)) {                                                                                  // 163
        return true;                                                                                           // 164
      } // if not we assume this is not as a html page                                                         // 165
      // this doesn't do any harm. But no SSR                                                                  // 168
                                                                                                               //
                                                                                                               //
      return false;                                                                                            // 169
    }                                                                                                          // 170
                                                                                                               //
    return _isHtmlPage;                                                                                        // 5
  }();                                                                                                         // 5
                                                                                                               //
  Route.prototype._getCachedPage = function () {                                                               // 5
    function _getCachedPage(url, userId) {                                                                     // 5
      var cacheInfo = {                                                                                        // 173
        url: url,                                                                                              // 173
        userId: userId                                                                                         // 173
      };                                                                                                       // 173
                                                                                                               //
      var cacheKey = this._getCacheKey(cacheInfo);                                                             // 174
                                                                                                               //
      var info = this._cache[cacheKey];                                                                        // 175
                                                                                                               //
      if (info) {                                                                                              // 176
        return info.data;                                                                                      // 177
      }                                                                                                        // 178
    }                                                                                                          // 179
                                                                                                               //
    return _getCachedPage;                                                                                     // 5
  }();                                                                                                         // 5
                                                                                                               //
  Route.prototype._cachePage = function () {                                                                   // 5
    function _cachePage(url, userId, data, timeout) {                                                          // 5
      var _this2 = this;                                                                                       // 181
                                                                                                               //
      var cacheInfo = {                                                                                        // 182
        url: url,                                                                                              // 182
        userId: userId                                                                                         // 182
      };                                                                                                       // 182
                                                                                                               //
      var cacheKey = this._getCacheKey(cacheInfo);                                                             // 183
                                                                                                               //
      var existingInfo = this._cache[cacheKey];                                                                // 184
                                                                                                               //
      if (existingInfo) {                                                                                      // 185
        // Sometimes, it's possible get this called multiple times                                             // 186
        // due to race conditions. So, in that case, simply discard                                            // 187
        // caching this page.                                                                                  // 188
        return;                                                                                                // 189
      }                                                                                                        // 190
                                                                                                               //
      var info = {                                                                                             // 192
        data: data,                                                                                            // 193
        timeoutHandle: setTimeout(function () {                                                                // 194
          delete _this2._cache[cacheKey];                                                                      // 195
        }, timeout)                                                                                            // 196
      };                                                                                                       // 192
      this._cache[cacheKey] = info;                                                                            // 199
    }                                                                                                          // 200
                                                                                                               //
    return _cachePage;                                                                                         // 5
  }();                                                                                                         // 5
                                                                                                               //
  Route.prototype._getCacheKey = function () {                                                                 // 5
    function _getCacheKey(_ref) {                                                                              // 5
      var _ref$userId = _ref.userId,                                                                           // 202
          userId = _ref$userId === undefined ? '' : _ref$userId,                                               // 202
          url = _ref.url;                                                                                      // 202
      return userId + "::" + url;                                                                              // 203
    }                                                                                                          // 204
                                                                                                               //
    return _getCacheKey;                                                                                       // 5
  }();                                                                                                         // 5
                                                                                                               //
  return Route;                                                                                                // 5
}(SharedRoute);                                                                                                // 5
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"ssr_context.js":["babel-runtime/helpers/toConsumableArray","babel-runtime/helpers/classCallCheck","deepmerge",function(require){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// packages/kadira_flow-router-ssr/server/ssr_context.js                                                       //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");                                  //
                                                                                                               //
var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);                                         //
                                                                                                               //
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");                                        //
                                                                                                               //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                               //
                                                                                                               //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }              //
                                                                                                               //
var deepMerge = require('deepmerge');                                                                          // 1
                                                                                                               //
SsrContext = function () {                                                                                     // 3
  function SsrContext() {                                                                                      // 4
    (0, _classCallCheck3.default)(this, SsrContext);                                                           // 4
    this._html = '';                                                                                           // 5
    this._head = '';                                                                                           // 6
    this._collections = {};                                                                                    // 7
  }                                                                                                            // 8
                                                                                                               //
  SsrContext.prototype.getCollection = function () {                                                           // 3
    function getCollection(collName) {                                                                         // 3
      var collection = this._collections[collName];                                                            // 11
                                                                                                               //
      if (!collection) {                                                                                       // 12
        var minimongo = Package.minimongo;                                                                     // 13
        collection = this._collections[collName] = new minimongo.LocalCollection();                            // 14
      }                                                                                                        // 15
                                                                                                               //
      return collection;                                                                                       // 17
    }                                                                                                          // 18
                                                                                                               //
    return getCollection;                                                                                      // 3
  }();                                                                                                         // 3
                                                                                                               //
  SsrContext.prototype.setHtml = function () {                                                                 // 3
    function setHtml(html) {                                                                                   // 3
      this._html = html;                                                                                       // 21
    }                                                                                                          // 22
                                                                                                               //
    return setHtml;                                                                                            // 3
  }();                                                                                                         // 3
                                                                                                               //
  SsrContext.prototype.getHtml = function () {                                                                 // 3
    function getHtml() {                                                                                       // 3
      return this._html;                                                                                       // 25
    }                                                                                                          // 26
                                                                                                               //
    return getHtml;                                                                                            // 3
  }();                                                                                                         // 3
                                                                                                               //
  SsrContext.prototype.addToHead = function () {                                                               // 3
    function addToHead(headHtml) {                                                                             // 3
      this._head += "\n" + headHtml;                                                                           // 29
    }                                                                                                          // 30
                                                                                                               //
    return addToHead;                                                                                          // 3
  }();                                                                                                         // 3
                                                                                                               //
  SsrContext.prototype.getHead = function () {                                                                 // 3
    function getHead() {                                                                                       // 3
      return this._head;                                                                                       // 33
    }                                                                                                          // 34
                                                                                                               //
    return getHead;                                                                                            // 3
  }();                                                                                                         // 3
                                                                                                               //
  SsrContext.prototype.addSubscription = function () {                                                         // 3
    function addSubscription(name, params) {                                                                   // 3
      var fastRenderContext = FastRender.frContext.get();                                                      // 37
                                                                                                               //
      if (!fastRenderContext) {                                                                                // 38
        throw new Error("Cannot add a subscription: " + name + " without FastRender Context");                 // 39
      }                                                                                                        // 42
                                                                                                               //
      var args = [name].concat(params);                                                                        // 44
      var data = fastRenderContext.subscribe.apply(fastRenderContext, (0, _toConsumableArray3.default)(args));
      this.addData(data);                                                                                      // 46
    }                                                                                                          // 47
                                                                                                               //
    return addSubscription;                                                                                    // 3
  }();                                                                                                         // 3
                                                                                                               //
  SsrContext.prototype.addData = function () {                                                                 // 3
    function addData(data) {                                                                                   // 3
      var _this = this;                                                                                        // 49
                                                                                                               //
      _.each(data, function (collDataCollection, collectionName) {                                             // 50
        var collection = _this.getCollection(collectionName);                                                  // 51
                                                                                                               //
        collDataCollection.forEach(function (collData) {                                                       // 52
          collData.forEach(function (item) {                                                                   // 53
            var existingDoc = collection.findOne(item._id);                                                    // 54
                                                                                                               //
            if (existingDoc) {                                                                                 // 55
              var newDoc = deepMerge(existingDoc, item);                                                       // 56
              delete newDoc._id;                                                                               // 57
              collection.update(item._id, newDoc);                                                             // 58
            } else {                                                                                           // 59
              collection.insert(item);                                                                         // 60
            }                                                                                                  // 61
          });                                                                                                  // 62
        });                                                                                                    // 63
      });                                                                                                      // 64
    }                                                                                                          // 65
                                                                                                               //
    return addData;                                                                                            // 3
  }();                                                                                                         // 3
                                                                                                               //
  return SsrContext;                                                                                           // 3
}();                                                                                                           // 3
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"_init.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// packages/kadira_flow-router-ssr/server/_init.js                                                             //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
// This is a magic configuration in Meteor which allows some apps to be                                        // 1
// run with a prefix.                                                                                          // 2
// This is very important when especially app running in something like                                        // 3
// sandstrom.io                                                                                                // 4
// Now it's supported by SSR using this                                                                        // 5
FlowRouter.basePath = __meteor_runtime_config__.ROOT_URL_PATH_PREFIX || '';                                    // 6
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"plugins":{"ssr_data.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// packages/kadira_flow-router-ssr/server/plugins/ssr_data.js                                                  //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
var _this = this;                                                                                              //
                                                                                                               //
var originalSubscribe = Meteor.subscribe;                                                                      // 1
                                                                                                               //
Meteor.subscribe = function (pubName) {                                                                        // 3
  var params = Array.prototype.slice.call(arguments, 1);                                                       // 4
  var ssrContext = FlowRouter.ssrContext.get();                                                                // 6
                                                                                                               //
  if (ssrContext) {                                                                                            // 7
    FlowRouter.inSubscription.withValue(true, function () {                                                    // 8
      ssrContext.addSubscription(pubName, params);                                                             // 9
    });                                                                                                        // 10
  }                                                                                                            // 11
                                                                                                               //
  if (originalSubscribe) {                                                                                     // 13
    originalSubscribe.apply(this, arguments);                                                                  // 14
  }                                                                                                            // 15
                                                                                                               //
  return {                                                                                                     // 17
    ready: function () {                                                                                       // 18
      return true;                                                                                             // 18
    }                                                                                                          // 18
  };                                                                                                           // 17
};                                                                                                             // 20
                                                                                                               //
var Mongo = Package.mongo.Mongo;                                                                               // 22
var originalFind = Mongo.Collection.prototype.find;                                                            // 23
                                                                                                               //
Mongo.Collection.prototype.find = function (selector, options) {                                               // 25
  selector = selector || {};                                                                                   // 26
  var ssrContext = FlowRouter.ssrContext.get();                                                                // 27
                                                                                                               //
  if (ssrContext && !FlowRouter.inSubscription.get()) {                                                        // 28
    var collName = this._name;                                                                                 // 29
    var collection = ssrContext.getCollection(collName);                                                       // 30
    var cursor = collection.find(selector, options);                                                           // 31
    return cursor;                                                                                             // 32
  }                                                                                                            // 33
                                                                                                               //
  return originalFind.call(this, selector, options);                                                           // 35
}; // We must implement this. Otherwise, it'll call the origin prototype's                                     // 36
// find method                                                                                                 // 39
                                                                                                               //
                                                                                                               //
Mongo.Collection.prototype.findOne = function (selector, options) {                                            // 40
  options = options || {};                                                                                     // 41
  options.limit = 1;                                                                                           // 42
  return this.find(selector, options).fetch()[0];                                                              // 43
};                                                                                                             // 44
                                                                                                               //
var originalAutorun = Tracker.autorun;                                                                         // 46
                                                                                                               //
Tracker.autorun = function (fn) {                                                                              // 48
  // if autorun is in the ssrContext, we need fake and run the callback                                        // 49
  // in the same eventloop                                                                                     // 50
  if (FlowRouter.ssrContext.get()) {                                                                           // 51
    var c = {                                                                                                  // 52
      firstRun: true,                                                                                          // 52
      stop: function () {}                                                                                     // 52
    };                                                                                                         // 52
    fn(c);                                                                                                     // 53
    return c;                                                                                                  // 54
  }                                                                                                            // 55
                                                                                                               //
  return originalAutorun.call(Tracker, fn);                                                                    // 57
}; // By default, Meteor[call,apply] also inherit SsrContext                                                   // 58
// So, they can't access the full MongoDB dataset because of that                                              // 61
// Then, we need to remove the SsrContext within Method calls                                                  // 62
                                                                                                               //
                                                                                                               //
['call', 'apply'].forEach(function (methodName) {                                                              // 63
  var original = Meteor[methodName];                                                                           // 64
                                                                                                               //
  Meteor[methodName] = function () {                                                                           // 65
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {                     // 65
      args[_key] = arguments[_key];                                                                            // 65
    }                                                                                                          // 65
                                                                                                               //
    var response = FlowRouter.ssrContext.withValue(null, function () {                                         // 66
      return original.apply(_this, args);                                                                      // 67
    });                                                                                                        // 68
    return response;                                                                                           // 70
  };                                                                                                           // 71
}); // This is not available in the server. But to make it work with SSR                                       // 72
// We need to have it.                                                                                         // 75
                                                                                                               //
Meteor.loggingIn = function () {                                                                               // 76
  return false;                                                                                                // 77
};                                                                                                             // 78
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"node_modules":{"qs":{"package.json":function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// ../../.3.13.0.vxewli++os+web.browser+web.cordova/npm/node_modules/qs/package.json                           //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
exports.name = "qs";
exports.version = "5.2.0";
exports.main = "lib/index.js";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"lib":{"index.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// node_modules/meteor/kadira_flow-router-ssr/node_modules/qs/lib/index.js                                     //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
// Load modules

var Stringify = require('./stringify');
var Parse = require('./parse');


// Declare internals

var internals = {};


module.exports = {
    stringify: Stringify,
    parse: Parse
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"path-to-regexp":{"index.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// node_modules/meteor/kadira_flow-router-ssr/node_modules/path-to-regexp/index.js                             //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
var isarray = require('isarray')

/**
 * Expose `pathToRegexp`.
 */
module.exports = pathToRegexp
module.exports.parse = parse
module.exports.compile = compile
module.exports.tokensToFunction = tokensToFunction
module.exports.tokensToRegExp = tokensToRegExp

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^()])+)\\))?|\\(((?:\\\\.|[^()])+)\\))([+*?])?|(\\*))'
].join('|'), 'g')

/**
 * Parse a string for the raw tokens.
 *
 * @param  {String} str
 * @return {Array}
 */
function parse (str) {
  var tokens = []
  var key = 0
  var index = 0
  var path = ''
  var res

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0]
    var escaped = res[1]
    var offset = res.index
    path += str.slice(index, offset)
    index = offset + m.length

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1]
      continue
    }

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path)
      path = ''
    }

    var prefix = res[2]
    var name = res[3]
    var capture = res[4]
    var group = res[5]
    var suffix = res[6]
    var asterisk = res[7]

    var repeat = suffix === '+' || suffix === '*'
    var optional = suffix === '?' || suffix === '*'
    var delimiter = prefix || '/'
    var pattern = capture || group || (asterisk ? '.*' : '[^' + delimiter + ']+?')

    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      pattern: escapeGroup(pattern)
    })
  }

  // Match any characters still remaining.
  if (index < str.length) {
    path += str.substr(index)
  }

  // If the path exists, push it onto the end.
  if (path) {
    tokens.push(path)
  }

  return tokens
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {String}   str
 * @return {Function}
 */
function compile (str) {
  return tokensToFunction(parse(str))
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction (tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length)

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^' + tokens[i].pattern + '$')
    }
  }

  return function (obj) {
    var path = ''
    var data = obj || {}

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i]

      if (typeof token === 'string') {
        path += token

        continue
      }

      var value = data[token.name]
      var segment

      if (value == null) {
        if (token.optional) {
          continue
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined')
        }
      }

      if (isarray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received "' + value + '"')
        }

        if (value.length === 0) {
          if (token.optional) {
            continue
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty')
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encodeURIComponent(value[j])

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment
        }

        continue
      }

      segment = encodeURIComponent(value)

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
      }

      path += token.prefix + segment
    }

    return path
  }
}

/**
 * Escape a regular expression string.
 *
 * @param  {String} str
 * @return {String}
 */
function escapeString (str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/])/g, '\\$1')
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {String} group
 * @return {String}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$\/()])/g, '\\$1')
}

/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {RegExp} re
 * @param  {Array}  keys
 * @return {RegExp}
 */
function attachKeys (re, keys) {
  re.keys = keys
  return re
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {String}
 */
function flags (options) {
  return options.sensitive ? '' : 'i'
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {RegExp} path
 * @param  {Array}  keys
 * @return {RegExp}
 */
function regexpToRegexp (path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g)

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        pattern: null
      })
    }
  }

  return attachKeys(path, keys)
}

/**
 * Transform an array into a regexp.
 *
 * @param  {Array}  path
 * @param  {Array}  keys
 * @param  {Object} options
 * @return {RegExp}
 */
function arrayToRegexp (path, keys, options) {
  var parts = []

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source)
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options))

  return attachKeys(regexp, keys)
}

/**
 * Create a path regexp from string input.
 *
 * @param  {String} path
 * @param  {Array}  keys
 * @param  {Object} options
 * @return {RegExp}
 */
function stringToRegexp (path, keys, options) {
  var tokens = parse(path)
  var re = tokensToRegExp(tokens, options)

  // Attach keys back to the regexp.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] !== 'string') {
      keys.push(tokens[i])
    }
  }

  return attachKeys(re, keys)
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {Array}  tokens
 * @param  {Array}  keys
 * @param  {Object} options
 * @return {RegExp}
 */
function tokensToRegExp (tokens, options) {
  options = options || {}

  var strict = options.strict
  var end = options.end !== false
  var route = ''
  var lastToken = tokens[tokens.length - 1]
  var endsWithSlash = typeof lastToken === 'string' && /\/$/.test(lastToken)

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i]

    if (typeof token === 'string') {
      route += escapeString(token)
    } else {
      var prefix = escapeString(token.prefix)
      var capture = token.pattern

      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*'
      }

      if (token.optional) {
        if (prefix) {
          capture = '(?:' + prefix + '(' + capture + '))?'
        } else {
          capture = '(' + capture + ')?'
        }
      } else {
        capture = prefix + '(' + capture + ')'
      }

      route += capture
    }
  }

  // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".
  if (!strict) {
    route = (endsWithSlash ? route.slice(0, -2) : route) + '(?:\\/(?=$))?'
  }

  if (end) {
    route += '$'
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithSlash ? '' : '(?=\\/|$)'
  }

  return new RegExp('^' + route, flags(options))
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(String|RegExp|Array)} path
 * @param  {Array}                 [keys]
 * @param  {Object}                [options]
 * @return {RegExp}
 */
function pathToRegexp (path, keys, options) {
  keys = keys || []

  if (!isarray(keys)) {
    options = keys
    keys = []
  } else if (!options) {
    options = {}
  }

  if (path instanceof RegExp) {
    return regexpToRegexp(path, keys, options)
  }

  if (isarray(path)) {
    return arrayToRegexp(path, keys, options)
  }

  return stringToRegexp(path, keys, options)
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"babel-runtime":{"helpers":{"inherits.js":function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// node_modules/meteor/kadira_flow-router-ssr/node_modules/babel-runtime/helpers/inherits.js                   //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
"use strict";

var _Object$create = require("babel-runtime/core-js/object/create")["default"];

var _Object$setPrototypeOf = require("babel-runtime/core-js/object/set-prototype-of")["default"];

exports["default"] = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = _Object$create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

exports.__esModule = true;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"cheerio":{"package.json":function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// ../../.3.13.0.vxewli++os+web.browser+web.cordova/npm/node_modules/cheerio/package.json                      //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
exports.name = "cheerio";
exports.version = "0.19.0";
exports.main = "./index.js";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"index.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// node_modules/meteor/kadira_flow-router-ssr/node_modules/cheerio/index.js                                    //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
/**
 * Export cheerio (with )
 */

exports = module.exports = require('./lib/cheerio');

/*
  Export the version
*/

exports.version = require('./package').version;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"cookie-parser":{"index.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// node_modules/meteor/kadira_flow-router-ssr/node_modules/cookie-parser/index.js                              //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
/*!
 * cookie-parser
 * Copyright(c) 2014 TJ Holowaychuk
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies.
 * @private
 */

var cookie = require('cookie');
var signature = require('cookie-signature');

/**
 * Module exports.
 * @public
 */

module.exports = cookieParser;
module.exports.JSONCookie = JSONCookie;
module.exports.JSONCookies = JSONCookies;
module.exports.signedCookie = signedCookie;
module.exports.signedCookies = signedCookies;

/**
 * Parse Cookie header and populate `req.cookies`
 * with an object keyed by the cookie names.
 *
 * @param {string|array} [secret] A string (or array of strings) representing cookie signing secret(s).
 * @param {Object} [options]
 * @return {Function}
 * @public
 */

function cookieParser(secret, options) {
  return function cookieParser(req, res, next) {
    if (req.cookies) {
      return next();
    }

    var cookies = req.headers.cookie;
    var secrets = !secret || Array.isArray(secret)
      ? (secret || [])
      : [secret];

    req.secret = secrets[0];
    req.cookies = Object.create(null);
    req.signedCookies = Object.create(null);

    // no cookies
    if (!cookies) {
      return next();
    }

    req.cookies = cookie.parse(cookies, options);

    // parse signed cookies
    if (secrets.length !== 0) {
      req.signedCookies = signedCookies(req.cookies, secrets);
      req.signedCookies = JSONCookies(req.signedCookies);
    }

    // parse JSON cookies
    req.cookies = JSONCookies(req.cookies);

    next();
  };
}

/**
 * Parse JSON cookie string.
 *
 * @param {String} str
 * @return {Object} Parsed object or undefined if not json cookie
 * @public
 */

function JSONCookie(str) {
  if (typeof str !== 'string' || str.substr(0, 2) !== 'j:') {
    return undefined;
  }

  try {
    return JSON.parse(str.slice(2));
  } catch (err) {
    return undefined;
  }
}

/**
 * Parse JSON cookies.
 *
 * @param {Object} obj
 * @return {Object}
 * @public
 */

function JSONCookies(obj) {
  var cookies = Object.keys(obj);
  var key;
  var val;

  for (var i = 0; i < cookies.length; i++) {
    key = cookies[i];
    val = JSONCookie(obj[key]);

    if (val) {
      obj[key] = val;
    }
  }

  return obj;
}

/**
 * Parse a signed cookie string, return the decoded value.
 *
 * @param {String} str signed cookie string
 * @param {string|array} secret
 * @return {String} decoded value
 * @public
 */

function signedCookie(str, secret) {
  if (typeof str !== 'string') {
    return undefined;
  }

  if (str.substr(0, 2) !== 's:') {
    return str;
  }

  var secrets = !secret || Array.isArray(secret)
    ? (secret || [])
    : [secret];

  for (var i = 0; i < secrets.length; i++) {
    var val = signature.unsign(str.slice(2), secrets[i]);

    if (val !== false) {
      return val;
    }
  }

  return false;
}

/**
 * Parse signed cookies, returning an object containing the decoded key/value
 * pairs, while removing the signed key from obj.
 *
 * @param {Object} obj
 * @param {string|array} secret
 * @return {Object}
 * @public
 */

function signedCookies(obj, secret) {
  var cookies = Object.keys(obj);
  var dec;
  var key;
  var ret = Object.create(null);
  var val;

  for (var i = 0; i < cookies.length; i++) {
    key = cookies[i];
    val = obj[key];
    dec = signedCookie(val, secret);

    if (val !== dec) {
      ret[key] = dec;
      delete obj[key];
    }
  }

  return ret;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"deepmerge":{"package.json":function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// ../../.3.13.0.vxewli++os+web.browser+web.cordova/npm/node_modules/deepmerge/package.json                    //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
exports.name = "deepmerge";
exports.version = "0.2.10";
exports.main = "index";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"index.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// node_modules/meteor/kadira_flow-router-ssr/node_modules/deepmerge/index.js                                  //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.deepmerge = factory();
    }
}(this, function () {

return function deepmerge(target, src) {
    var array = Array.isArray(src);
    var dst = array && [] || {};

    if (array) {
        target = target || [];
        dst = dst.concat(target);
        src.forEach(function(e, i) {
            if (typeof dst[i] === 'undefined') {
                dst[i] = e;
            } else if (typeof e === 'object') {
                dst[i] = deepmerge(target[i], e);
            } else {
                if (target.indexOf(e) === -1) {
                    dst.push(e);
                }
            }
        });
    } else {
        if (target && typeof target === 'object') {
            Object.keys(target).forEach(function (key) {
                dst[key] = target[key];
            })
        }
        Object.keys(src).forEach(function (key) {
            if (typeof src[key] !== 'object' || !src[key]) {
                dst[key] = src[key];
            }
            else {
                if (!target[key]) {
                    dst[key] = src[key];
                } else {
                    dst[key] = deepmerge(target[key], src[key]);
                }
            }
        });
    }

    return dst;
}

}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}}}},{"extensions":[".js",".json"]});
require("./node_modules/meteor/kadira:flow-router-ssr/lib/router.js");
require("./node_modules/meteor/kadira:flow-router-ssr/lib/group.js");
require("./node_modules/meteor/kadira:flow-router-ssr/lib/route.js");
require("./node_modules/meteor/kadira:flow-router-ssr/server/router.js");
require("./node_modules/meteor/kadira:flow-router-ssr/server/group.js");
require("./node_modules/meteor/kadira:flow-router-ssr/server/route.js");
require("./node_modules/meteor/kadira:flow-router-ssr/server/ssr_context.js");
require("./node_modules/meteor/kadira:flow-router-ssr/lib/_init.js");
require("./node_modules/meteor/kadira:flow-router-ssr/server/_init.js");
require("./node_modules/meteor/kadira:flow-router-ssr/server/plugins/ssr_data.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['kadira:flow-router-ssr'] = {}, {
  FlowRouter: FlowRouter
});

})();

//# sourceMappingURL=kadira_flow-router-ssr.js.map
