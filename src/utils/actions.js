import { isNil } from 'ramda';

/**
 * Create an action function.
 *
 * @param {object} dispatcher
 * @param {string} actionType
 * @param {func} payloadCreator
 * @returns {func}
 */
export const createAction = (dispatcher, actionType, payloadCreator) => {
  const defaultPayloadCreator = payload => payload;
  const finalPayloadCreator = isNil(payloadCreator) ? defaultPayloadCreator : payloadCreator;

  const creator = (...payload) => {
    dispatcher.dispatch({
      actionType,
      payload: finalPayloadCreator(...payload),
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
