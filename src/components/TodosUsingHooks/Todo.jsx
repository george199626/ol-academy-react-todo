import React, {useState} from "react";
import "./Todo.css";

function Todo(){

const [currentInput,setCurrentInput] = useState("")

const [todos,setTodos] = useState([{
  id: 1,
  text: 'Learn React.js',
  isDone: false, 
  checked: false,
}])

const [editor,SetEditor] = useState({
  isEditing: false,
  id: undefined,
  inputValue: "",
})

const [error,setError] = useState("")
      
//Functions:

let handleOnInputChange = (e) => {
  setCurrentInput(e.target.value)
 };


//Clear input
let emptyInput = () => {
  setCurrentInput("")
 }

//Add Tasks
let handleAddTodo = () => {
  let newTodo = { id: Date.now(), text: currentInput, error: "" }
  let updatedTodos = todos.concat(newTodo);

//will not add existed Tasks
let itemExists = todos.some((todo) => todo.text === currentInput);
 if(!itemExists && currentInput !== ""){
  setTodos(updatedTodos)
  setError("")

 }else if(itemExists){
  setError("Task already entered")

 }else if(currentInput == ""){
  setError("Task is empty")
 }
}

//Delete Tasks
let handleDelete = function(id,inputValue) {
  let updatedTodos = todos.filter((todo) => todo.id !== id);
  setTodos(updatedTodos);
  SetEditor({
    id: id,
    isEditing: false,
    inputValue: inputValue
})
  }

//Make Task input Empty
emptyInput = () => {
  setCurrentInput("")
 }

//Delete All Tasks
let deleteAll = (id,inputValue) =>{
  setTodos([])
  SetEditor({
    id: id,
    isEditing: false,
    inputValue: inputValue
})
}


//Delete DONE Todos
let handleDone = (todoId) => {
  let updatedTodos = todos.map(todo => {
  if (todo.id === todoId) {
      todo.isDone = true;
    }
    return todo;
  });
  setTodos(updatedTodos);
}

let handleDeleteDoneTodos = () => {
  let updatedTodos = todos.filter(todo => !todo.isDone);
  setTodos(updatedTodos);
};

//chek if task checked
let todoChecked = todoToChecked => {
  let updatedTodos = todos.map(todo => {
    if (todo === todoToChecked) {
      return { ...todo, checked: !todo.checked };
    }
    return todo;
  });
  setTodos(updatedTodos);
};

//Delte Only CHECKED Tasks
let handleDeleteCheckedTodos = () => {
  let updatedTodos = todos.filter(todo => !todo.checked);
  setTodos(updatedTodos);
};

//edit
let handleEdit = (id,inputValue)=>{
  SetEditor({
       id: id,
       isEditing: true,
       inputValue: inputValue
  })
 }

let handleEditorChange = (e)=>{
  SetEditor({
      ...editor,
      inputValue: e.target.value
  })
  }

  let handleSaveEdited = ()=>{
    let updatedTodos = [...todos]
    updatedTodos.map((todo)=>{
      if(todo.id === editor.id){
        todo.text =  editor.inputValue
      }
    })
    setTodos(updatedTodos)
    SetEditor({isEditing: false
  })
    }
  
  return (
    <div id="main">
            <h1>My Tasks</h1>
            <div>
            <input
              id="taskInput"
              placeholder="Input Task"
              onChange={handleOnInputChange}
              value={currentInput}
            />
            <button
            id="emptybtn" 
            onClick ={emptyInput}>
            Clear
            </button>
            </div>
  
            <button
             id="addButton" 
             onClick={handleAddTodo}>
              Add
            </button>
            <p id="error">
            {error}
            </p>
          <div>
            <ul>
             {todos.map((todo,id) => (
          
        <div id="checkDiv">
        <input
         id="check"
         checked={todo.checked}
         onChange={() => todoChecked(todo)} type="checkbox"/>
        <li 
        style={{ textDecoration: todo.isDone ? 'line-through' : 'none' }} 
        key={todo.id}>
        {todo.text}
        </li>
         <div>
                <button onClick={()=> handleEdit(todo.id, todo.text)}  
                className="buttons">
                Edit
                </button>
                </div>
                 
                  <button onClick={() => handleDone(todo.id)} className="buttons" >Done</button>
                  <button onClick={() => handleDelete(todo.id)} className="buttons">
                  Delete
                  </button>
                </div>
                 ))}
            </ul>
            </div>
            {
                editor.isEditing && (
                <div>
                <input value={editor.inputValue} onChange={handleEditorChange}
                id="taskInp" 
                />
                <button onClick={handleSaveEdited} className="buttons">Save Edited</button>
                </div>
                )}   
            <button onClick={deleteAll} id="doneBtn">Delete All</button>
            <button onClick={handleDeleteDoneTodos} id="doneBtn">Delete Done Todos</button>
            <button onClick={handleDeleteCheckedTodos} id="doneBtn">Delete Checked</button>
            </div>
  )
};



    

export default Todo;