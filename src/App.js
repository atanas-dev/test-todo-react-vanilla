/**
 * The external dependencies.
 */
import React, { Component } from 'react';
import { append, assoc, filter, reject, map, propEq, when } from 'ramda';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * The internal dependencies.
 */
import TodoHeader from './components/TodoHeader';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      filter: 'all',
    };
  }

  handleOnFilterUpdate = filter => {
    this.setState({
      filter,
    });
  };

  handleOnCreate = title => {
    this.setState({
      SAI: this.state.SAI + 1,
      todos: append({
        id: this.state.SAI,
        title,
        completed: false,
      }, this.state.todos),
    })
  };

  handleOnStatusUpdate = (todoId, isCompleted) => {
    this.setState({
      todos: map(
        when(
          propEq('id', todoId),
          assoc('completed', isCompleted)
        ),
        this.state.todos
      ),
    });
  };

  handleOnTitleUpdate = (todoId, title) => {
    this.setState({
      todos: map(
        when(
          propEq('id', todoId),
          assoc('title', title)
        ),
        this.state.todos
      ),
    });
  };

  handleOnDelete = todoId => {
    this.setState({
      todos: reject(
        propEq('id', todoId),
        this.state.todos
      ),
    });
  };

  getFilteredTodos() {
    if (this.state.filter === 'pending') {
      return filter(todo => !todo.completed, this.state.todos);
    }

    if (this.state.filter === 'completed') {
      return filter(todo => todo.completed, this.state.todos);
    }

    return this.state.todos;
  }

  render() {
    return (
      <div className="app container my-3">
        <TodoHeader
          todos={this.state.todos}
          filters={this.state.filters}
          filter={this.state.filter}
          onFilterUpdate={this.handleOnFilterUpdate}
        />
        <div className="app-content">
          <TodoForm onCreate={this.handleOnCreate} />
          <TodoList
            todos={this.getFilteredTodos()}
            onStatusUpdate={this.handleOnStatusUpdate}
            onTitleUpdate={this.handleOnTitleUpdate}
            onDelete={this.handleOnDelete}
          />
        </div>
      </div>
    );
  }
}

export default App;
