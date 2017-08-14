/* globals Mongo */
this.App = {}

App.cols = {
  Projects: new Mongo.Collection('projects'),
  Queue: new Mongo.Collection('queue')
};

if (Meteor.isServer) {
  Meteor.publish('projects', function () {
    // TODO limit this to infinite scroll data
    return App.cols.Projects.find({})
  }, {
    url: "/api/projects"
  });

  Meteor.publish('projects-by-tag', function (tag) {
    return App.cols.Projects.find({twitter: tag})
  }, {
    url: "/api/projects-by-tag/:0"
  })
}
