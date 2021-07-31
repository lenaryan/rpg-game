import './index.scss';
import ClientGame from './client/ClientGame';

window.addEventListener('load', () => {
  const form = document.querySelector('#nameForm');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const playerName = form.querySelector('#name').value;
    if (playerName) {
      ClientGame.init({ tagId: 'game', playerName });
      document.querySelector('.start-game').remove();
    }
  });
});
