import React from 'react';
import TodoItem from "../TodoItem"
import "./TodoList.css"


const TodoList = ({ todosList, setTodosList, getDataFromServer }) => {

    return (
        <div className="list-container">

            {
                todosList.length > 0 ? todosList.map(todo =>
                    <TodoItem key={todo.id} todo={todo}
                        setTodosList={setTodosList} getDataFromServer={getDataFromServer}
                    />)
                    : <div className="bold-white">Yeeey! Nothing left TO DO !</div>
            }
        </div >

    );
};

export default TodoList;