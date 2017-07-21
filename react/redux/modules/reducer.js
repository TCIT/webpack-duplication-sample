import {combineReducers} from 'redux';
import {LOCATION_CHANGE} from 'react-router-redux';
import update from 'react/lib/update';
// import multireducer from 'multireducer';
// import { routerStateReducer } from 'redux-router';
import app from './app';
import {authStateReducer} from 'redux-auth';

const routeInitialState = {
  locationBeforeTransitions: null
};

function routeReducer(state = routeInitialState, action) {
  switch (action.type) {
    /* istanbul ignore next */
    case LOCATION_CHANGE:
      return update(state, {
        locationBeforeTransitions: { $set: action.payload }
      });
    default:
      return state;
  }
}

// import {reducer as form} from 'redux-form';
// import info from './info';
// import widgets from './widgets';

export default function createReducer() {
  return combineReducers({
    route: routeReducer,
    app
  });
}
