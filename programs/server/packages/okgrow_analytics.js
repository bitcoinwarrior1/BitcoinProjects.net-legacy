(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var MongoInternals = Package.mongo.MongoInternals;
var Mongo = Package.mongo.Mongo;

(function(){

//////////////////////////////////////////////////////////////////////////
//                                                                      //
// packages/okgrow_analytics/server/browser-policy.js                   //
//                                                                      //
//////////////////////////////////////////////////////////////////////////
                                                                        //
if (Package["browser-policy-common"]) {
  var content = Package['browser-policy-common'].BrowserPolicy.content;
  if (content) {
    content.allowOriginForAll("https://www.google.com/analytics/");
    content.allowOriginForAll("https://cdn.mxpnl.com");
  }
}

//////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////
//                                                                      //
// packages/okgrow_analytics/server/publications.js                     //
//                                                                      //
//////////////////////////////////////////////////////////////////////////
                                                                        //
Meteor.publish(null, function() {
  if(this.userId) {
    var self = this;
    var query = Meteor.users.find(
      {_id: this.userId},
      {fields: {
                  emails: 1,
                  'services.facebook.email': 1,
                  'services.google.email': 1,
                  'services.github.email': 1 }});

    Mongo.Collection._publishCursor(query, self, 'analyticsusers');
    return self.ready();

  } else {
    this.ready();
  }
});

//////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['okgrow:analytics'] = {};

})();
