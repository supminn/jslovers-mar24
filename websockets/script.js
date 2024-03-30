const socket = window.io();
const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');
const userName = prompt('Enter your name');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input.value) {
    const messageData = { username: userName, text: input.value };
    console.log(input.value);
    socket.emit('chat message', messageData);
    input.value = '';
  }
});

socket.on('chat message', (messageData) => {
  const item = document.createElement('li');
  item.classList.add('chat-message');

  const usernameSpan = document.createElement('span');
  usernameSpan.classList.add('user-name');
  usernameSpan.textContent = messageData.username + ': ';

  const messageText = document.createTextNode(messageData.text);

  item.appendChild(usernameSpan);
  item.appendChild(messageText);
  messages.appendChild(item);

  messages.scrollTop = messages.scrollHeight;
});
