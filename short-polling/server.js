const app = require('express')();
const bodyParser = require('body-parser');
const port = 3000;
const posts = [];

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
  res.json({ posts });
});

app.post('/api/post', (req, res) => {
  const { user, text } = req.body;
  const newPost = { user, text, timeStamp: new Date() };
  posts.push(newPost);
  res.json({
    message: 'Post created successfully',
    data: newPost,
    status: 'success',
  });
});

app.listen(port, () => {
  console.log(`Express app listening at http://localhost:${port}`);
});
