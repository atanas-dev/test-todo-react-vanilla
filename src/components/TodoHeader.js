/**
 * The external dependencies.
 */
import React, { Component } from 'react';
import PropTypes from "prop-types";
import { map } from "ramda";

/**
 * The internal dependencies.
 */

class TodoHeader extends Component {
  getCompletion() {
    if (this.props.todos.length === 0) {
      return '';
    }

    const completed = this.props.todos.filter(todo => todo.completed, this.props.todos).length;

    return completed.toString() + '/' + this.props.todos.length.toString();
  }

  render() {
    return (
      <header className="app-header mb-3">
        <h1 className="app-title">
          Todo
        </h1>
        <div className="btn-group">
          {map(filter =>
            <button key={filter.value} type="button" onClick={this.props.onFilterUpdate.bind(null, filter.value)} className={`btn btn-secondary ${this.props.filter === filter.value ? 'active' : ''}`}>{filter.label}</button>
          , this.props.filters)}
        </div>
        <div className="text-muted app-header__count">{this.getCompletion()}</div>
      </header>
    );
  }
}

TodoHeader.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    completed: PropTypes.bool,
  })).isRequired,
  filters: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
  })).isRequired,
  filter: PropTypes.string.isRequired,
  onFilterUpdate: PropTypes.func.isRequired,
};

export default TodoHeader;
