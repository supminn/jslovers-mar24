const app = require('express')();

const codingTips = [
  'Always test your code, for bugs are like ninjas - they strike silently! 💥',
  'Code comments are like breadcrumbs in a forest - they guide you back home! 🏠',
  "Keep your code DRY (Don't Repeat Yourself) - it's like watering your plants regularly! 🌱",
  'Remember to take breaks while coding - even superheroes need to rest their capes! 🦸‍♂️',
  'Pair programming is like a duet - two minds creating beautiful melodies of code! 🎵',
  'Document your code as if the person maintaining it is a psychopath who knows where you live! 🔍👀',
  "Error messages are your friends - they may seem cryptic, but they're trying to help! 🤖",
  'Version control is like a time machine for your code - use it wisely! ⏳',
  "Refactoring is like tidying up your code's room - it feels great once it's done! 🧹",
  "Don't be afraid to ask for help - even the best coders consult the Oracle (Stack Overflow)! 🙏",
  'Practice code readability - write code as if the next person who will maintain it is a psychopath who knows where you live! 👀',
  "Learn keyboard shortcuts - they're like cheat codes for coding! 🎮",
  "Don't optimize prematurely - it's like putting on your shoes before your socks! 👟",
  "Use meaningful variable names - code is read more often than it's written! 📖",
  "Keep your functions short and focused - like a good conversation, it's better to be concise! 💬",
  'Stay curious and never stop learning - the world of coding is vast and ever-changing! 🌍',
  "Learn to embrace failure - it's not the end, but rather a stepping stone to success! 🚀",
  "Master the art of debugging - it's like being a detective solving a mystery! 🔍🕵️‍♂️",
  "Write code that you would be proud to show others - it's a reflection of your craftsmanship! 👨‍🎨",
];

app.get('/sse', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  // res.write("data: Welcome to the CodingTips.com 🚀\n\n");

  const intervalId = setInterval(() => {
    const randomIndex = Math.floor(Math.random() * codingTips.length);
    const randomTip = codingTips[randomIndex];
    // Send the random tip through Server-Sent Events
    res.write(`data: ${randomTip}\n\n`);
  }, 5000);

  req.on('close', () => {
    clearInterval(intervalId);
  });
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/style.css', (req, res) => {
  res.sendFile(__dirname + '/style.css');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
