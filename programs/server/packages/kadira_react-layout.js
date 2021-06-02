(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var React = Package['react-runtime'].React;
var ReactMeteorData = Package['react-meteor-data'].ReactMeteorData;
var ECMAScript = Package.ecmascript.ECMAScript;
var meteorInstall = Package.modules.meteorInstall;
var Buffer = Package.modules.Buffer;
var process = Package.modules.process;
var Symbol = Package['ecmascript-runtime'].Symbol;
var Map = Package['ecmascript-runtime'].Map;
var Set = Package['ecmascript-runtime'].Set;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;

/* Package-scope variables */
var ReactLayout;

var require = meteorInstall({"node_modules":{"meteor":{"kadira:react-layout":{"lib":{"react_layout.js":function(){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/kadira_react-layout/lib/react_layout.js                  //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
ReactLayout = {};                                                    // 1
ReactLayout._domLoaded = false;                                      // 2
ReactLayout._rootProps = {};                                         // 3
ReactLayout._readyCallbacks = [];                                    // 4
                                                                     //
ReactLayout.setRootProps = function (rootProps) {                    // 6
  this._rootProps = rootProps;                                       // 7
};                                                                   // 8
                                                                     //
ReactLayout._buildRootNode = function () {                           // 10
  var props = this._rootProps || {};                                 // 11
  props.id = "react-root";                                           // 12
  var el = React.createElement('div', props);                        // 13
  var html = React.renderToStaticMarkup(el);                         // 14
  return html;                                                       // 15
};                                                                   // 16
                                                                     //
ReactLayout._getRootNode = function () {                             // 18
  var rootNode = document.getElementById('react-root');              // 19
                                                                     //
  if (rootNode) {                                                    // 21
    return rootNode;                                                 // 22
  } else {                                                           // 23
    var rootNodeHtml = this._buildRootNode();                        // 24
                                                                     //
    var body = document.getElementsByTagName('body')[0];             // 25
    body.insertAdjacentHTML('beforeend', rootNodeHtml);              // 26
    rootNode = document.getElementById('react-root');                // 27
    return rootNode;                                                 // 28
  }                                                                  // 29
};                                                                   // 30
                                                                     //
ReactLayout.render = function (layoutClass, regions) {               // 32
  if (Meteor.isClient) {                                             // 33
    return this._renderClient(layoutClass, regions);                 // 34
  } else {                                                           // 35
    return this._renderServer(layoutClass, regions);                 // 36
  }                                                                  // 37
};                                                                   // 38
                                                                     //
ReactLayout._renderServer = function (layoutClass, regions) {        // 40
  var el = React.createElement(layoutClass, regions);                // 41
  var elHtml = React.renderToString(el);                             // 42
                                                                     //
  var rootNodeHtml = this._buildRootNode();                          // 44
                                                                     //
  var html = rootNodeHtml.replace('</div>', elHtml + '</div>');      // 45
                                                                     //
  if (Package['kadira:flow-router-ssr']) {                           // 47
    var FlowRouter = Package['kadira:flow-router-ssr'].FlowRouter;   // 48
    var ssrContext = FlowRouter.ssrContext.get();                    // 49
    ssrContext.setHtml(html);                                        // 50
  }                                                                  // 51
};                                                                   // 52
                                                                     //
ReactLayout._renderClient = function (layoutClass, regions) {        // 54
  var self = this;                                                   // 55
                                                                     //
  this._ready(function () {                                          // 56
    var rootNode = self._getRootNode();                              // 57
                                                                     //
    var el = React.createElement(layoutClass, regions);              // 58
    React.render(el, rootNode);                                      // 59
  });                                                                // 60
};                                                                   // 61
                                                                     //
ReactLayout._ready = function (cb) {                                 // 63
  var self = this;                                                   // 64
                                                                     //
  if (self._domLoaded) {                                             // 65
    cb();                                                            // 66
  } else {                                                           // 67
    self._readyCallbacks.push(cb);                                   // 68
  }                                                                  // 69
}; // wait for DOM is loading                                        // 70
                                                                     //
                                                                     //
Meteor.startup(function () {                                         // 73
  setTimeout(function () {                                           // 74
    ReactLayout._domLoaded = true;                                   // 75
                                                                     //
    ReactLayout._readyCallbacks.forEach(function (fn) {              // 76
      fn();                                                          // 77
    });                                                              // 78
  }, 10);                                                            // 79
});                                                                  // 80
///////////////////////////////////////////////////////////////////////

}}}}}},{"extensions":[".js",".json"]});
require("./node_modules/meteor/kadira:react-layout/lib/react_layout.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['kadira:react-layout'] = {}, {
  ReactLayout: ReactLayout
});

})();

//# sourceMappingURL=kadira_react-layout.js.map
