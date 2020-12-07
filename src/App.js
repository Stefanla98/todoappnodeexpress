import './App.css';
import AddTodoForm from "./AddTodoForm"
import TodoList from './TodoList';
import React, { useEffect, useState } from "react";

function App() {
  const [todosList, setTodosList] = useState([])

  const getDataFromServer = async () => {
    const response = await fetch("http://localhost:3001/todo/getAll")

    const data = await response.json();
    setTodosList(data);
  }

  useEffect(() => getDataFromServer(), []);

  return (
    <div className="app-container">
      <AddTodoForm setTodosList={setTodosList} todosList={todosList} />
      <TodoList todosList={todosList} setTodosList={setTodosList} getDataFromServer={getDataFromServer} />
    </div>
  );
}

export default App;