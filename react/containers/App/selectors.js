/**
 * The global state selectors
 */
// import {createSelector} from 'reselect';

// const selectGlobal = () => (state) => state.global;

// const selectCurrentUser = () => createSelector(
//   selectGlobal(),
//   (globalState) => globalState.currentUser
// );

// const selectLoading = () => createSelector(
//   selectGlobal(),
//   (globalState) => globalState.loading
// );

// const selectError = () => createSelector(
//   selectGlobal(),
//   (globalState) => globalState.error
// );

const selectLocationState = () => {
  let prevRoutingState;

  return (state) => {
    const routingState = state.route; // or state.route

    if (!prevRoutingState) {
      prevRoutingState = routingState;
    }

    if (routingState && routingState.locationBeforeTransitions !== prevRoutingState.locationBeforeTransitions) {
      prevRoutingState = routingState;
    }

    return prevRoutingState;
  };
};

export {
  // selectGlobal,
  // selectCurrentUser,
  // selectLoading,
  // selectError,
  selectLocationState
};
