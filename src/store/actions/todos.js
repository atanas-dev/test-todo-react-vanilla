import { createAction } from 'utils/actions';
import dispatcher from 'store/dispatcher';

const createBoundAction = createAction.bind(null, dispatcher);

/**
 * Set the current filter.
 *
 * @param {string} currentFilter
 * @returns {void}
 */
export const setCurrentFilter = createBoundAction('SET_CURRENT_FILTER');

/**
 * Add a new todo.
 *
 * @param {string} title
 * @returns {void}
 */
export const addTodo = createBoundAction('ADD_TODO');

/**
 * Set todo status.
 *
 * @param {number} id
 * @param {bool} completed
 * @returns {void}
 */
export const setTodoStatus = createBoundAction('SET_TODO_STATUS');

/**
 * Set todo title.
 *
 * @param {number} id
 * @param {string} title
 * @returns {void}
 */
export const setTodoTitle = createBoundAction('SET_TODO_TITLE');

/**
 * Delete todo.
 *
 * @param {number} id
 * @returns {void}
 */
export const deleteTodo = createBoundAction('DELETE_TODO');
