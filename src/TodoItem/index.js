import React, { useState } from 'react';
import {
    Card, CardText, CardBody, CardFooter,
    CardTitle, Button
} from 'reactstrap';

import Swal from 'sweetalert2'

import "./TodoItem.css"

const TodoItem = ({ todo, getDataFromServer }) => {
    const [isDone, setIsDone] = useState(todo.isCompleted);
    const getButtonText = () => todo.isCompleted ? 'Mark as NOT done' : "Mark as done";

    const markAsDone = async (event, id) => {
        const response = await fetch(`http://localhost:3001/todo/setStatus/${id}`, {
            method: 'PUT',
        });
        if (response.ok) {
            // update the list
            todo.isCompleted = !todo.isCompleted;
            setIsDone(!isDone);
        }
        else {
            alert("Something went wrong !")
        }
    }


    const deleteTodo = async (id) => {
        try {
            const response = await fetch(`http://localhost:3001/todo/delete/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                // update the list
                await getDataFromServer();
            }
            else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Something went wrong while deleting this todo.',
                    icon: 'error',
                    confirmButtonText: 'Cool'
                })
            }
        } catch (error) {
            console.log("TodoItem -> error", error)
        }
    }

    return (
        <div className={todo.isCompleted ? 'done' : ''}>
            <Card className={`todo ${todo.priority} `}>
                <CardBody>
                    <CardTitle className="bold">{todo.title}</CardTitle>
                    <CardText>Category: <span className="bold">{todo.category}</span></CardText>
                    <CardText >Priority: <span className={todo.priority}>{todo.priority}</span></CardText>
                    <Button color="success custom-btn" onClick={(event) => markAsDone(event, todo.id)}>{getButtonText()}</Button>
                    <Button color="danger custom-btn" onClick={() => deleteTodo(todo.id)}>Delete</Button>

                </CardBody>
                <CardFooter>{todo.deadline}</CardFooter>
            </Card>
        </div>
    );
};

export default TodoItem;