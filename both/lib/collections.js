/* globals Mongo */
this.App = {}

App.cols = {
  Dapps: new Mongo.Collection('dapps')
}

if (Meteor.isServer) {
  Meteor.publish('dapps', function () {
    // TODO limit this to infinite scroll data
    return App.cols.Dapps.find({})
  }, {
    url: "/api/dapps"
  })

  Meteor.publish('dapps-by-tag', function (tag) {
    return App.cols.Dapps.find({tags: tag})
  }, {
    url: "/api/dapps-by-tag/:0"
  })
}
