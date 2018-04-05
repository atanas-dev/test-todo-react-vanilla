/**
 * The external dependencies.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * The internal dependencies.
 */

class TodoListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
    };
  }

  handleOnStatusUpdate = e => {
    e.stopPropagation();

    this.props.onStatusUpdate(e.target.checked);
  };

  handleOnTitleUpdate = e => {
    e.stopPropagation();

    this.props.onTitleUpdate(e.target.value);
  };

  handleOnEdit = e => {
    this.setState({
      editing: true,
    });
  };

  handleOnEditBlur = e => {
    this.stopEditing();
  };

  handleOnEditKeyPress = e => {
    if (e.key === 'Enter') {
      this.stopEditing();
    }
  };

  stopEditing() {
    this.setState({
      editing: false,
    });
  }

  render() {
    return (
      <li
        className={`p-2 todo-list__item ${this.props.todo.completed ? 'todo-list__item--completed' : ''}`}>

        <div className="form-check todo-list__item-details">
          <label className="todo-list__item-label">
            <input
              type="checkbox"
              checked={this.props.todo.completed}
              onChange={this.handleOnStatusUpdate}
              className="form-check-input mr-3 todo-list__item-check"
            />

            {
              this.state.editing
                ? (
                  <input
                    type="text" value={this.props.todo.title}
                    onChange={this.handleOnTitleUpdate}
                    onBlur={this.handleOnEditBlur}
                    onKeyPress={this.handleOnEditKeyPress}
                    className="todo-list__title-input"
                    autoFocus
                  />
                )
                : this.props.todo.title
            }
          </label>
        </div>

        <div className="todo-list__item-actions">
          <button onClick={this.handleOnEdit} className="btn btn-sm btn-info mr-1">
            <i className="fa fa-pencil"></i>
          </button>
          <button onClick={this.props.onDelete} className="btn btn-sm btn-danger">
            <i className="fa fa-times"></i>
          </button>
        </div>

      </li>
    );
  }
}

TodoListItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    completed: PropTypes.bool,
  }).isRequired,
  onStatusUpdate: PropTypes.func.isRequired,
  onTitleUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TodoListItem;
