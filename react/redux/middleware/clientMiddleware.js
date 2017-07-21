export default function clientMiddleware() {
  return ({dispatch, getState}) => {
    return next => action => {
      if (typeof action === 'function') {
        return action(dispatch, getState);
      }

      const { promise, types, result, ...rest } = action;
      const { pushUrl, replaceUrl, pushCause } = action;
      if (!promise) {
        return next(action);
      }

      const [REQUEST, SUCCESS, FAILURE] = types;
      if (!pushUrl && !replaceUrl && !pushCause) {
        next({...rest, type: REQUEST});
      }
      return promise().then(
        (result) => {
          next({...rest, result, type: SUCCESS})
        }
      ).catch(
        (result) => {
          const { pushUrl, replaceUrl, pushCause, ...restWithoutUrls } = rest;
          next({...restWithoutUrls, result, type: FAILURE})
        }
      );
    };
  };
}
