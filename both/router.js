/* globals FlowRouter, ReactLayout */

FlowRouter.route('/', {
  action () {
    ReactLayout.render(App.projectsList, {})
  }
});
FlowRouter.route('/dapp/:id', {
  action (params) {
    ReactLayout.render(App.projectsView, {_id: params.id})
  }
});

if (Meteor.isServer) {
  FlowRouter.setDeferScriptLoading(true)
}
