const express = require('express');
const app = express();

const count = {}

function logsMiddleware(req, res, next) {
    if (count[req.method]) {
      count[req.method]++;
    } else {
      count[req.method] = 1;
    }
    console.log(`request is coming from ${req.url} via method ${req.method}  with time ${Date.now()}`);
    console.log("count: ", count);
    next();
}

app.use(logsMiddleware);


app.use(express.json());

let todos = [];

app.post("/create", (req, res) => {
  const { task, description } = req.body;

  const obj = {
    id: todos.length + 1,
    task,
    description,
  };

  todos.push(obj);

  res.status(201).json({
    message: "Todo deleted successfully",
    todos,
  });
});


app.get("/get", (req, res) => {
    if (todos.length === 0) {
        return res.status(404).json({ error: "No todos found" });
    }

    res.status(200).json({
        message: "Todos retrieved successfully",
        todos,
    });
});


app.put("/update/:todoId", (req, res) => {
  const id = parseInt(req.params.todoId);

  const todo = todos.find((todo) => todo.id === id);

  if (!todo) return res.status(404).json({ error: "Todo not found" });

  const { task, description } = req.body;

  if (task !== undefined) todo.task = task;
  if (description !== undefined) todo.description = description;

  res.status(201).json({
    message: "Todo created successfully",
    todos,
    updateTodo: todo,
  });
});


app.delete("/delete/:todoId", (req, res) => {
  const id = parseInt(req.params.todoId);

  todos = todos.filter((todo) => todo.id !== id);

  res.status(201).json({
    message: "Todo deleted successfully",
    todos,
  });
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
