// import { getAsyncInjectors } from './utils/asyncInjectors';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  // create reusable async injectors using getAsyncInjectors factory
  // const { injectReducer, injectSagas } = getAsyncInjectors(store);

  return [
    {
      path: '/',
      name: 'Causes',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          // System.import('reudx/modules/causes'),
          // System.import('containers/HomePage/sagas'),
          System.import('./containers/Index')
        ]);

        const renderRoute = loadModule(cb);

        // importModules.then(([reducer, sagas, component]) => {
        importModules.then(([component]) => {
          // injectReducer('causes', reducer.default);
          // injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      }
    }
  ];
}
