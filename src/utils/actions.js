/**
 * Create an action function.
 *
 * @param {object} dispatcher
 * @param {string} actionType
 * @returns {func}
 */
export const createAction = (dispatcher, actionType) => {
  const creator = payload => {
    dispatcher.dispatch({
      actionType,
      payload,
    });
  };

  creator.toString = () => actionType;

  return creator;
};

/**
 * Create an action handler suitable for a flux store callback.
 *
 * @param {object} actionMap
 * @returns {func}
 */
export const createActionHandler = actionMap => {
  return action => {
    if (typeof actionMap[action] === undefined) {
      return;
    }

    actionMap[action.actionType](action.payload);
  };
};
