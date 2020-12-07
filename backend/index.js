const express = require('express');
const fs = require('fs');
const bodyParser = require("body-parser");
const cors = require('cors')
const {v4: uuidv4} = require('uuid');

const app = express();
const port = 3001;

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

const readFromFile = async(todo) => {
    try {
        const data = await fs.promises.readFile(todo);
        return JSON.parse(data);
    } catch (error) {
        throw error;
    }
    
}

const writeFile = async(filePath, dataToWrite) => {
    try {
        const data = await fs.promises.writeFile(filePath, JSON.stringify(dataToWrite, null, 2));
        return data;
    } catch (error) {
        throw error;
    }
}


app.get("/todo/getAll", async (req, res)=> {
    const getAllTodos = await readFromFile("todos.json");
    return res.json(getAllTodos)
});


app.post("/todo/createTodo", async (req, res) => {
    const todosList = await readFromFile("todos.json");
    const id = uuidv4();

    const toDo = {
        id:id,
        title: req.body.title,
        deadline: req.body.deadline,
        priority: req.body.priority,
        category: req.body.category,
        isCompleted: false
    }

    console.log(toDo)

    todosList.push(toDo);

    writeFile('todos.json', todosList);

    res.status(201).send(todosList);

});

app.put("/todo/setstatus/:id", async (req, res) => {
    const todosList = await readFromFile('todos.json');


    const filterTodo = todosList.findIndex(todo => todo.id === req.params.id);


    if (filterTodo === -1) {
        res.status(404).send({
            error: "ToDo Not found!"
        });
    }
    if (todosList[filterTodo].isCompleted === false) {
        todosList[filterTodo].isCompleted = true;
    } else {
        todosList[filterTodo].isCompleted = false;
    }

    await writeFile('todos.json', todosList);

    res.status(200).send(todosList[filterTodo]);
})


app.listen(port, () => {
    console.log("We are live!")
});


app.delete("/todo/delete/:id", async (req, res) => {
    try {
    const todosList = await readFromFile('todos.json');
    
    let found = todosList.find((todo) => todo.id === req.params.id);
    
    if (!found) {
        res.status(404).send({
            error: "ToDo Not found!"
        });
    }
    
    const arrayWithoutDeletedTodo = todosList.filter(todo => todo.id !== req.params.id);
    await writeFile('todos.json', arrayWithoutDeletedTodo);
    
    res.status(200).send(found);
    } catch (error) {
    res.status(500).send({ error: error.message });
    }
});