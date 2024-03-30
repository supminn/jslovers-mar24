const app = require('express')();
const bodyParser = require('body-parser');
const port = 3000;

app.use(bodyParser.json());

const todos = [
  {
    id: 1,
    title: 'Todo 1',
    completed: false,
  },
  {
    id: 2,
    title: 'Todo 2',
    completed: true,
  },
];

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/todos', (req, res) => {
  res.json(todos);
});

// id using path params
app.get('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  const todo = todos.find((todo) => todo.id === Number(id));
  if (!todo) {
    res.status(404).json({
      message: 'Todo not found',
      status: 'error',
    });
  } else {
    res.json(todo);
  }
});

app.post('/api/todos', (req, res) => {
  const todo = req.body;
  if (todos.find((prev) => todo.id === prev.id)) {
    res.status(400).json({
      message: 'Todo already exists',
      status: 'error',
    });
  } else {
    todos.push(todo);
    res.json({
      message: 'New todo added',
      status: 'success',
      data: todo,
    });
  }
});

app.patch('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  const todo = todos.find((todo) => todo.id === Number(id));
  if (!todo) {
    res.status(404).json({
      message: 'Todo not found',
      status: 'error',
    });
  } else {
    todo.completed = completed;
    res.json({
      message: 'Todo updated',
      status: 'success',
      data: todo,
    });
  }
});

app.delete('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  const todo = todos.find((todo) => todo.id === Number(id));
  if (!todo) {
    res.status(404).json({
      message: 'Todo not found',
      status: 'error',
    });
  } else {
    todos.splice(todos.indexOf(todo), 1); // remove todo with id 1 from array todos
    res.json({
      message: 'Todo deleted',
      status: 'success',
    });
  }
});
app.listen(port, () => {
  console.log(`Express app listening at http://localhost:${port}`);
});
