import React from "react";
import "./Todo.css";

class Todo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [
        { id: 1, text: 'Learn React.js', isDone: false, checked: false,},
      ],
      editor: {
isEditing: false,
id: undefined,
inputValue: "",
      },
      currentInput: "",
      error: "",
      newTodo: "",
    };
    this.handleDelete = this.handleDelete.bind(this);
   
  }

  handleOnInputChange = (e) => {
    this.setState({ currentInput: e.target.value });
  };

//Add Tasks:
 handleAddTodo = () => {
  let newTodo = { id: Date.now(), text: this.state.currentInput }
  const updatedTodos = this.state.todos.concat(newTodo);

  const { currentInput, todos } = this.state;

//will not add existed Tasks
const itemExists = todos.some((todo) => todo.text === currentInput);
 if(!itemExists && currentInput !== ""){
  this.setState({ todos: updatedTodos, text:"", error: ""})

 }else if(itemExists){
  this.setState({error: "Task already entered"})

 }else if(currentInput == ""){
  this.setState({error: "Task is empty"})
 }
}
  
//Delete Tasks
 handleDelete(id) {
  const updatedTodos = this.state.todos.filter((todo) => todo.id !== id);
  this.setState({ todos: updatedTodos });
  }

//Make Task input Empty
emptyInput = () => {
 this.setState({currentInput: ""})
}

//Make Tasks DONE
handleDone = (todoId) => {
  const updatedTodos = this.state.todos.map(todo => {
  if (todo.id === todoId) {
      todo.isDone = true;
    }
    return todo;
  });
  this.setState({ todos: updatedTodos });
}

//Delete All Tasks
deleteAll = () =>{
  this.setState({todos: []})
}
 
//Delete Only DONE Tasks
handleDeleteDoneTodos = () => {
  const todos = this.state.todos.filter(todo => !todo.isDone);
  this.setState({ todos });
};

//Delte Only CHECKED Tasks
handleDeleteCheckedTodos = () => {
  const todos = this.state.todos.filter(todo => !todo.checked);
  this.setState({ todos });
};

//chek if task checked
todoChecked = todoToChecked => {
  const todos = this.state.todos.map(todo => {
    if (todo === todoToChecked) {
      return { ...todo, checked: !todo.checked };
    }
    return todo;
  });
  this.setState({ todos });
};

//Edit Task
handleEdit = (id,inputValue)=>{
 this.setState({
    editor: {
      id: id,
      isEditing: true,
      inputValue: inputValue
    }
  })
}

handleEditorChange = (e)=>{
this.setState({
  editor: {
    ...this.state.editor,
    inputValue: e.target.value
  }
})
}

handleSaveEdited = ()=>{
  const todos = [...this.state.todos]
  todos.map((todo)=>{
    if(todo.id ===this.state.editor.id){
      todo.text = this.state.editor.inputValue
    }
  })
  this.setState({
    todos: todos,
    editor: {isEditing: false
    }
  })
}

render() {
    return (
      <div id="main">
          <h1>My Tasks</h1>
          <div>
          <input
            id="taskInput"
            placeholder="Input Task"
            onChange={this.handleOnInputChange}
            value={this.state.currentInput}
          />
          <button
          id="emptybtn" 
          onClick ={this.emptyInput}>
          Clear
          </button>
          </div>

          <button
           id="addButton" 
           onClick={this.handleAddTodo}>
            Add
          </button>
          <p id="error">
          {this.state.error}
          </p>
        <div>
          <ul>
           {this.state.todos.map((todo,id) => (
        
      <div id="checkDiv">
      <input
       id="check" 
       checked={todo.checked}
       onChange={() => this.todoChecked(todo)} type="checkbox"/>
      <li 
      style={{ textDecoration: todo.isDone ? 'line-through' : 'none' }} 
      key={todo.id}>
      {todo.text}
      </li>
       <div>
              <button onClick={()=>this.handleEdit(todo.id, todo.text)}  
              className="buttons">
              Edit
              </button>
              </div>
               
                <button onClick={() => this.handleDone(todo.id)} className="buttons" >Done</button>
                <button onClick={() => this.handleDelete(todo.id)} className="buttons">
                Delete
                </button>
              </div>
               ))}
          </ul>
          </div>
          {
              this.state.editor.isEditing && (
              <div>
              <input value={this.state.editor.inputValue} onChange={this.handleEditorChange}
              id="taskInp" 
              />
              <button onClick={this.handleSaveEdited} className="buttons">Save Edited</button>
              </div>
              )}   
          <button onClick={this.deleteAll} id="doneBtn">Delete All</button>
          <button onClick={this.handleDeleteDoneTodos} id="doneBtn">Delete Done Todos</button>
          <button onClick={this.handleDeleteCheckedTodos} id="doneBtn">Delete Checked</button>
          </div>
   );
}
}
  

export default Todo;