import {useDeps, composeAll, composeWithTracker, compose} from "mantra-core";
import SubmitModal from "../components/submit_modal.jsx";

export const composer = ({context, clearErrors}, onData) => {
  const {LocalState} = context();
  const error = LocalState.get('CREATE_COMMENT_ERROR');
  onData(null, {});
  return clearErrors;
};

export const depsMapper = (context, actions) => ({
  create: actions.queuesActions.create,
  clearErrors: actions.queuesActions.clearErrors,
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(SubmitModal);
