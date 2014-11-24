/** @jsx React.DOM */

var TodoApp = React.createClass({
  getInitialState: function() {
    return {
      newTodoText: '',
      todos: []
    };
  },
  render: function() {
    return (
      <div className="app-container">
        <h3>React Todo</h3>
        <NewTodo 
          newTodoText={ this.state.newTodoText } 
        />
        <TodoList 
          todos={ this.state.todos } 
        />
      </div>
    );
  }
});

var NewTodo = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    console.log("made it!");
  },
  render: function() {
    return (
      <form onSubmit={ this.handleSubmit }>
        <input type="text" placeholder="New Todo..." value={ this.props.newTodoText } />
        <input type="submit" value="Add" onClick={ this.handleSubmit } />
      </form>
    );
  }
});

var TodoList = React.createClass({
  render: function() {
    var list = [];

    this.props.todos.forEach(function(todoItem) {
      list.push(<TodoItem description={ todoItem.description } />);
    });

    return (
      <ul>
        { list }
      </ul>
    );
  }
});

var TodoItem = React.createClass({
  remove: function(e) {

  },
  render: function() {
    return (
      <li>
        <span>**</span>
        <span>{this.props.description}</span>
        <button onClick={this.remove}>x</button>
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
