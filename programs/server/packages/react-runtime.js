(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;

/* Package-scope variables */
var React;

(function(){

///////////////////////////////////////////////////////////////////////////////////////
//                                                                                   //
// packages/react-runtime/react-runtime.js                                           //
//                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////
                                                                                     //
if (Package["react-runtime-dev"]) {
  React = Package["react-runtime-dev"].ReactDev;
} else if (Package["react-runtime-prod"]) {
  React = Package["react-runtime-prod"].ReactProd;
} else {
  // not sure how this can happen
  throw new Error("Couldn't find react-runtime-dev or react-runtime-prod packages");
}

///////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['react-runtime'] = {}, {
  React: React
});

})();
