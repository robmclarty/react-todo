/** @jsx React.DOM */

var TodoApp = React.createClass({
  getInitialState: function() {
    return {
      newTodoText: '',
      todos: []
    };
  },
  updateNewTodoText: function(text) {
    this.setState({ newTodoText: text });
  },
  addNewTodo: function(text) {
    this.state.todos.push({ description: text });
    this.forceUpdate();
  },
  removeTodo: function(index) {
    this.state.todos.splice(index, 1);
    this.forceUpdate();
  },
  render: function() {
    return (
      <div className="app-container">
        <h3>React Todo</h3>
        <NewTodo 
          newTodoText={ this.state.newTodoText }
          updateNewTodoText={ this.updateNewTodoText }
          addNewTodo={ this.addNewTodo }
        />
        <TodoList 
          todos={ this.state.todos } 
          removeTodo={ this.removeTodo }
        />
      </div>
    );
  }
});

var NewTodo = React.createClass({
  handleChange: function(e) {
    this.props.updateNewTodoText(e.target.value);
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var newTodoDescription = this.refs.newTodoTextInput.getDOMNode().value;
    this.props.addNewTodo(newTodoDescription); // add new todo to the list
    this.props.updateNewTodoText(''); // reset input field
  },
  render: function() {
    return (
      <form onSubmit={ this.handleSubmit }>
        <input 
          type="text" 
          placeholder="New Todo..." 
          ref="newTodoTextInput" 
          value={ this.props.newTodoText }
          onChange={ this.handleChange }
        />
        <input 
          type="submit" 
          value="Add" 
          onClick={ this.handleSubmit } 
        />
      </form>
    );
  }
});

var TodoList = React.createClass({
  render: function() {
    var list = [];

    for (var index in this.props.todos) {
      list.push(
        <TodoItem 
          description={ this.props.todos[index].description } 
          index={ index }
          removeTodo={ this.props.removeTodo }
        />
      );
    }

    return (
      <ul>
        { list }
      </ul>
    );
  }
});

var TodoItem = React.createClass({
  removeTodo: function(e) {
    e.preventDefault();
    this.props.removeTodo(this.props.index);
  },
  render: function() {
    return (
      <li>
        <span>**</span>
        <span>{this.props.description}</span>
        <button onClick={ this.removeTodo }>x</button>
      </li>
    );
  }
});

var TODOS = [
  { description: 'First Todo Item' },
  { description: 'Second Todo Item' },
  { description: 'Third Todo Item' },
  { description: 'Fourth Todo Item' },
  { description: 'Fifth Todo Item' }
];

React.render(<TodoApp todos={ TODOS } />, document.body);
