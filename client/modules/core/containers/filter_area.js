import {useDeps, composeAll, composeWithTracker, compose} from "mantra-core";
import FilterArea from "../components/filter_area.jsx";

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();
  const subscriptionReady = [Meteor.subscribe('dapps.list').ready()]
  const dataReady = () => {
    const dappCount = Collections.Dapps.find().count();
    onData(null, {dappCount});
  };

  (subscriptionReady) ? dataReady() : onData();
};

export const depsMapper = (context, actions) => ({
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(FilterArea);
