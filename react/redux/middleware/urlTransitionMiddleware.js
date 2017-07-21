import { push, replace } from 'react-router-redux';
export default function urlTransitionMiddleware() {
  return ({dispatch, getState}) => {
    return next => action => {
      const { pushUrl, replaceUrl, pushCause, result, ...rest } = action;
      next({result, ...rest});
      if (pushUrl) {
        dispatch(push(pushUrl));
      } else if (replaceUrl) {
        dispatch(replace(replaceUrl));
      } else if (pushCause && result) {
        const documents = result.objects.documents;

        // FR: this is executed even when the server replies 400
        dispatch(push(pushCause.expedientUrl(documents[Object.keys(documents)].id)));
      }
    };
  };
}
