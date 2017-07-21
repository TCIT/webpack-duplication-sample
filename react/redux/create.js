import reduxCreateStore from 'redux/lib/createStore';
import {applyMiddleware} from 'redux';
// import {compose} from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createMiddleware from './middleware/clientMiddleware';
import urlTransitionMiddleware from './middleware/urlTransitionMiddleware';
import thunk from 'redux-thunk';
// import transitionMiddleware from './middleware/transitionMiddleware';
import createReducer from './modules/reducer';

export default function createStore(initialState = {}, history) {
  const middleware = [createMiddleware(null), thunk, urlTransitionMiddleware(null), routerMiddleware(history)];
  const store = reduxCreateStore(
    createReducer(),
    initialState,
    applyMiddleware(...middleware)
  );
  if (module.hot) {
    module.hot.accept('./modules/reducer', () => {
      System.import('./modules/reducer').then((reducerModule) => {
        store.replaceReducer(reducerModule);
      });
    });
  }
  return store;
}
