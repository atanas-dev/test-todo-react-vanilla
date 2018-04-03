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

  handleOnStatusChange = e => {
    e.stopPropagation();

    this.props.onStatusChange(e.target.checked);
  };

  handleOnEditBlur = e => {

  };

  handleOnEditKeyPress = e => {

  };

  render() {
    return (
      <li className={`p-3 todo-list__item ${this.props.todo.completed ? 'todo-list__item--completed' : ''}`}>
        <div className="form-check">
          <label className="form-check-label todo-list__item-label">
            <input type="checkbox" checked={this.props.todo.completed} onChange={this.handleOnStatusChange} className="form-check-input mr-3 todo-list__item-check" />
            {
              this.state.editing
              ? <input type="text" value={this.props.todo.title} onChange={this.handleOnTitleChange} onBlur={this.handleOnEditBlur} onKeyPress={this.handleOnEditKeyPress} />
              : this.props.todo.title
            }
          </label>
          <div className="float-right">
            <button onClick={this.handleOnEdit} className="btn btn-sm btn-info mr-1">
              <i className="fa fa-pencil"></i>
            </button>
            <button onClick={this.props.onDelete} className="btn btn-sm btn-danger">
              <i className="fa fa-times"></i>
            </button>
          </div>
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
  onStatusChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TodoListItem;
