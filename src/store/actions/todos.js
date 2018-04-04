import { createAction } from 'utils/actions';

/**
 * Set the current filter.
 *
 * @param {string} currentFilter
 * @returns {void}
 */
export const setCurrentFilter = createAction('SET_CURRENT_FILTER');

/**
 * Add a new todo.
 *
 * @param {string} title
 * @returns {void}
 */
export const addTodo = createAction('ADD_TODO');

/**
 * Set todo status.
 *
 * @param {number} id
 * @param {bool} completed
 * @returns {void}
 */
export const setTodoStatus = createAction('SET_TODO_STATUS');

/**
 * Set todo title.
 *
 * @param {number} id
 * @param {string} title
 * @returns {void}
 */
export const setTodoTitle = createAction('SET_TODO_TITLE');

/**
 * Delete todo.
 *
 * @param {number} id
 * @returns {void}
 */
export const deleteTodo = createAction('DELETE_TODO');
