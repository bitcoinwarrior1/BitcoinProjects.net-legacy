import {useDeps, composeAll, composeWithTracker, compose} from "mantra-core";
import DappList from "../components/dapp_list.jsx";

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();
  const subscriptionReady = [Meteor.subscribe('dapps.list').ready()]
  const dataReady = () => {
    const dapps = Collections.Dapps.find().fetch();
    onData(null, {dapps});
  };

  (subscriptionReady) ? dataReady() : onData();
};

export const depsMapper = (context, actions) => ({
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(DappList);
