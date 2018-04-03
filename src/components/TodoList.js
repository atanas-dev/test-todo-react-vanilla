/**
 * The external dependencies.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { map } from 'ramda';

/**
 * The internal dependencies.
 */
import TodoListItem from './TodoListItem';

class TodoList extends Component {
  render() {
    return (
      <ul className="todo-list">
        {map(todoItem =>
          <TodoListItem
            key={todoItem.id}
            todo={todoItem}
            onStatusChange={this.props.onStatusUpdate.bind(null, todoItem.id)}
            onDelete={this.props.onDelete.bind(null, todoItem.id)}
          />
        , this.props.todos)}
      </ul>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    completed: PropTypes.bool,
  })).isRequired,
  onStatusUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TodoList;
