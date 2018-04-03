/**
 * The external dependencies.
 */
import React, { Component } from 'react';
import PropTypes from "prop-types";

/**
 * The internal dependencies.
 */
import TodoList from "./TodoList";

class TodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
    };
  }

  handleOnChange = e => {
    this.setState({
      title: e.target.value,
    });
  };

  handleOnSubmit = e => {
    e.preventDefault();

    if (this.state.title.trim().length === 0) {
      return;
    }

    this.props.onCreate(this.state.title.trim());

    this.setState({
      title: '',
    });
  };

  render() {
    return (
      <form onSubmit={this.handleOnSubmit}>
        <div className="form-group">
          <input type="text" className="form-control" value={this.state.title} onChange={this.handleOnChange} placeholder="What's next?" autoFocus />
        </div>
      </form>
    );
  }
}

TodoList.propTypes = {
  onCreate: PropTypes.func,
};

export default TodoForm;
