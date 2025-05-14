


const fs = require("fs");
const filePath = "todo.json";

if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath,JSON.stringify([]));
}


function readTodo(){
    const result = fs.readFileSync(filePath,'utf-8')
    return JSON.parse(result);
}


function createTodo(task){
    const todos = readTodo();
    const obj  = {
        id : Date.now(),
        task: task,
        completed:false
    }

    todos.push(obj);
    fs.writeFileSync(filePath,JSON.stringify(todos,null,2));
}


function updateTodo(id, updatedTask) {
  const todos = readTodo();
  const index = todos.findIndex((todo) => todo.id === id);

  if (index === -1) return console.log("task not found ");

  todos[index].task = updatedTask;

  fs.writeFileSync(filePath, JSON.stringify(todos, null, 2));
}

function deleteTodo(id) {
  const todos = readTodo();
  const index = todos.findIndex((todo) => todo.id === id);

  if (index === -1) return "task not found ";

  const filteredTodo = todos.splice(index, 1);

  fs.writeFileSync(filePath, JSON.stringify(todos, null, 2)); // 🔥 Save changes to file

}

// 📄 Display TODOs
function displayTodos() {
    const todos = readTodo();
    console.log('\n📋 Your Tasks:');
    todos.forEach(todo => {
      console.log(`🔹 [${todo.completed ? '✔' : '❌'}] (${todo.id}) ${todo.task}`);
    });
}



const [, , cmd, ...args] = process.argv;

switch (cmd) {
  case "add":
    createTodo(args.join(" "));
    break;
  case "display":
    displayTodos();
    break;
  case "update":
    updateTodo(Number(args[0]), args.slice(1).join(" "));
    break;
  case "delete":
    deleteTodo(Number(args[0]));
    break;
  default:
    console.log(`
        Commands:
        node index.js add "Buy milk"
        node index.js list
        node index.js update <id> "Updated task"
        node index.js delete <id>
    `);
}

