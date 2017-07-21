import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyRouterMiddleware, Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { useScroll } from 'react-router-scroll';
import configureStore from './redux/create';
import { configure } from 'redux-auth';

// Create redux store with history
// this uses the singleton browserHistory provided by react-router
// Optionally, this could be changed to leverage a created history
// e.g. `const browserHistory = useRouterHistory(createBrowserHistory)();`
const initialState = {};
const store = configureStore(initialState, browserHistory);

// Sync history and store, as the react-router-redux reducer
// is under the non-default key ("routing"), selectLocationState
// must be provided for resolving how to retrieve the "route" in the state
import { selectLocationState } from './containers/App/selectors.js';
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: selectLocationState()
});

// Set up the router, wrapping all Routes in the App component
import App from './containers/App';
import createRoutes from './routes';
const rootRoute = {
  component: App,
  childRoutes: createRoutes(store)
};

// TCT: redux-auth
function renderApp({cookies, isServer, currentLocation} = {}) {
  // configure redux-auth BEFORE rendering the page
  return configure(
    // use the FULL PATH to your API
    [{
      default: {
        apiUrl: ''
      }
    }, {
      entityUser: {
        apiUrl: '',
        tokenValidationPath: 'public_user/auth/validate_token',
        signOutPath: 'public_user/auth/sign_out'
      }
    }, {
      publicUser: {
        apiUrl: '/',
        signOutPath: 'public_user/auth/sign_out',
        emailSignInPath: 'public_user/auth/sign_in',
        emailRegistrationPath: 'public_user/auth',
        tokenValidationPath: 'public_user/auth/validate_token'
      }
    }],
    {isServer: false, cookies, currentLocation, clientOnly: true}
  )(store.dispatch)
  .then(({redirectPath, blank} = {}) => {
    let toRender = (
      <Provider store={store}>
        <Router
          history={history}
          routes={rootRoute}
          render={
            // Scroll to top when going to a new page, imitating default browser
            // behaviour
            applyRouterMiddleware(useScroll(
              (prevProps, props) => {
                let toReturn = false;
                const inSameExpedient = prevProps && props && prevProps.location.pathname.split('expedient')[0] === props.location.pathname.split('expedient')[0];
                if (prevProps && props && prevProps.location.pathname !== props.location.pathname && !inSameExpedient) {
                  toReturn = [0, 0];
                }
                return toReturn;
              }
            ))
          }
        />
      </Provider>
    );
    if (blank) {
      // if `blank` is true, this is an OAuth redirect and should not
      // be rendered
      toRender = <noscript />;
    }
    return toRender;
  });
}

renderApp().then(appComponent => {
  ReactDOM.render(appComponent, document.getElementById('content'));
});

