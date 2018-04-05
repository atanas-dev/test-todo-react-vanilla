/**
 * The external dependencies.
 */
import React, { Component } from 'react';
import { filter } from 'ramda';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * The internal dependencies.
 */
import { store, CHANGE_EVENT } from 'store/todos';
import {
  setCurrentFilter,
  addTodo,
  setTodoStatus,
  setTodoTitle,
  deleteTodo
} from 'store/actions/todos';
import TodoHeader from 'components/TodoHeader';
import TodoForm from 'components/TodoForm';
import TodoList from 'components/TodoList';
import 'App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      filters: store.getFilters(),
      currentFilter: store.getCurrentFilter(),
    };
  }

  componentDidMount() {
    store.on(CHANGE_EVENT, this.onChange);
  }

  componentWillUnmount() {
    store.off(CHANGE_EVENT, this.onChage);
  }

  onChange = () => {
    this.setState({
      todos: store.getTodos(),
      currentFilter: store.getCurrentFilter(),
    });
  };

  getFilteredTodos() {
    if (this.state.currentFilter === 'pending') {
      return filter(todo => !todo.completed, this.state.todos);
    }

    if (this.state.currentFilter === 'completed') {
      return filter(todo => todo.completed, this.state.todos);
    }

    return this.state.todos;
  }

  handleOnFilterUpdate = currentFilter => setCurrentFilter({ currentFilter });

  handleOnCreate = title => addTodo({ title });

  handleOnStatusUpdate = (id, completed) => setTodoStatus({ id, completed });

  handleOnTitleUpdate = (id, title) => setTodoTitle({ id, title });

  handleOnDelete = id => deleteTodo({ id });

  render() {
    return (
      <div className="app container my-3">
        <TodoHeader
          todos={this.state.todos}
          filters={this.state.filters}
          currentFilter={this.state.currentFilter}
          onFilterUpdate={this.handleOnFilterUpdate}
        />
        <div className="app-content">
          <TodoForm onCreate={this.handleOnCreate}/>
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
