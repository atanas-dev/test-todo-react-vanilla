import dispatcher from 'store/dispatcher';

export const createAction = actionType => {
  const creator = (...payload) => {
    dispatcher.dispatch({
      actionType,
      payload,
    });
  };

  creator.toString = () => actionType;

  return creator;
};

export const createActionHandler = actionMap => {
  const handler = action => {
    if (typeof actionMap[action] === undefined) {
      return;
    }

    actionMap[action.actionType](...action.payload);
  };

  return handler;
};
