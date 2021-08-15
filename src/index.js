import { io } from 'socket.io-client';
import './index.scss';
import ClientGame from './client/ClientGame';
import { getTime } from './common/util';

window.addEventListener('load', () => {
  const socket = io('https://jsprochat.herokuapp.com');
  const form = document.querySelector('#nameForm');
  const chatWrap = document.querySelector('.chat-wrap');
  const chatForm = document.querySelector('#form');
  const chatInput = document.querySelector('#input');
  const chatMessage = document.querySelector('.message');
  const onlineCount = document.querySelector('#online');
  const users = {};

  const submitName = (e) => {
    e.preventDefault();
    const playerName = form.querySelector('#name').value;
    if (playerName) {
      ClientGame.init({ tagId: 'game', playerName });

      socket.emit('start', playerName);

      chatWrap.style.display = 'block';

      form.removeEventListener('submit', submitName);
      document.querySelector('.start-game').remove();
    }
  };

  form.addEventListener('submit', submitName);

  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (chatInput.value) {
      socket.emit('chat message', chatInput.value);

      chatInput.value = '';
    }
  });

  socket.on('chat connection', (data) => {
    chatMessage.insertAdjacentHTML(
      'beforeend',
      `<p><strong>${getTime(data.time)}</strong> - ${data.msg}</p>`
    );
    const nickname = data.msg.substring(0, data.msg.indexOf(' '));
    users[data.id] = {
      nickname: nickname,
      color: '#' + (((1 << 24) * Math.random()) | 0).toString(16),
    };
  });

  socket.on('chat disconnect', (data) => {
    chatMessage.insertAdjacentHTML(
      'beforeend',
      `<p style="color: ${users[data.id]['color']}"><strong>${getTime(
        data.time
      )}</strong> - ${data.msg}</p>`
    );
  });

  socket.on('chat message', (data) => {
    chatMessage.insertAdjacentHTML(
      'beforeend',
      `<p style="color: ${users[data.id]['color']}"><strong>${getTime(
        data.time
      )}</strong> <strong>[${users[data.id]['nickname']}]</strong>: ${
        data.msg
      }</p>`
    );
  });

  socket.on('chat online', (data) => {
    onlineCount.innerHTML = `${data.online}`;
  });
});
