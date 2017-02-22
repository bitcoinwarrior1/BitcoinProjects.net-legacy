/* globals FlowRouter, ReactLayout */

FlowRouter.route('/', {
  action () {
    ReactLayout.render(App.DappsList, {})
  }
});
FlowRouter.route('dapp/:id', {
  action (params) {
    console.log(params.id);
  }
});

if (Meteor.isServer) {
  FlowRouter.setDeferScriptLoading(true)
}
