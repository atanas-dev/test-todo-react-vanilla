/**
 * The external dependencies.
 */
import { EventEmitter } from 'events';
import { append, assoc, map, mergeDeepRight, propEq, reject, when } from 'ramda';

/**
 * The internal dependencies.
 */
import dispatcher from 'store/dispatcher';
import { createActionHandler } from 'utils/actions';
import {
  setCurrentFilter,
  addTodo,
  setTodoStatus,
  setTodoTitle,
  deleteTodo
} from 'store/actions/todos';

/**
 * Event constants.
 */
export const CHANGE_EVENT = 'change';

/**
 * Data.
 */
const data = {
  SAI: 0, // simple auto increment
  todos: [],
  filters: [
    {
      value: 'all',
      label: 'All',
    },
    {
      value: 'pending',
      label: 'Pending',
    },
    {
      value: 'completed',
      label: 'Completed',
    },
  ],
  currentFilter: 'all',
};

/**
 * API.
 */
export const store = mergeDeepRight(EventEmitter.prototype, {
  /**
   * API.
   */
  getTodos() {
    return data.todos;
  },

  getFilters() {
    return data.filters;
  },

  getCurrentFilter() {
    return data.currentFilter;
  },

  /**
   * Events.
   */
  emitChange() {
    this.emit(CHANGE_EVENT);
  },
});

/**
 * Action handler.
 */
const handler = createActionHandler({
  [setCurrentFilter]: ({ currentFilter }) => {
    data.currentFilter = currentFilter;

    store.emitChange();
  },

  [addTodo]: ({ title }) => {
    data.todos = append({
      id: data.SAI,
      title,
      completed: false,
    }, data.todos);
    data.SAI = data.SAI + 1;

    store.emitChange();
  },

  [setTodoStatus]: ({ id, completed }) => {
    data.todos = map(
      when(
        propEq('id', id),
        assoc('completed', completed)
      ),
      data.todos
    );

    store.emitChange();
  },

  [setTodoTitle]: ({ id, title }) => {
    data.todos = map(
      when(
        propEq('id', id),
        assoc('title', title)
      ),
      data.todos
    );

    store.emitChange();
  },

  [deleteTodo]: ({ id }) => {
    data.todos = reject(
      propEq('id', id),
      data.todos
    );

    store.emitChange();
  },
});

/**
 * Register with dispatcher.
 */
dispatcher.register(handler);
