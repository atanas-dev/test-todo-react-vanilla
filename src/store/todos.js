/**
 * The external dependencies.
 */
import { EventEmitter } from 'events';
import { mergeDeepRight } from 'ramda';

/**
 * The internal dependencies.
 */
import dispatcher from './index';
import {createActionHandler} from "../utils/actions";
import {setCurrentFilter} from "./actions/todos";

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
  [setCurrentFilter]: currentFilter => {
    data.currentFilter = currentFilter;
    store.emitChange();
  },
});

/**
 * Register with dispatcher.
 */
dispatcher.register(handler);
