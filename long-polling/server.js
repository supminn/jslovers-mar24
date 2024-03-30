const app = require('express')();
const bodyParser = require('body-parser');
const port = 3000;
const posts = [];
let waitingClients = [];

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/styles.css', (req, res) => {
  res.sendFile(__dirname + '/styles.css');
});

app.get('/script.js', (req, res) => {
  res.sendFile(__dirname + '/script.js');
});

app.get('/api/posts', (req, res) => {
  const { longPolling } = req.query;
  if (longPolling) {
    waitingClients.push(res);
  } else {
    res.json({ posts });
  }
});

app.post('/api/post', (req, res) => {
  const { user, text } = req.body;
  const newPost = { user, text, timeStamp: new Date() };
  posts.push(newPost);
  waitingClients.forEach((client) => {
    client.json({ posts });
  });
  waitingClients = [];
  res.json({
    message: 'Post created successfully',
    data: newPost,
    status: 'success',
  });
});

app.listen(port, () => {
  console.log(`Express app listening at http://localhost:${port}`);
});
