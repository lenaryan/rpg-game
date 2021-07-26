import sprites from '../configs/sprites';
import levelCfg from '../configs/world.json';
import ClientEngine from './ClientEngine';
import ClientWorld from './ClientWorld';
import gameObjects from '../configs/gameObjects.json';

class ClientGame {
  constructor(cfg) {
    Object.assign(this, {
      cfg,
      gameObjects,
      player: null,
    });

    this.engine = this.createEngine();
    this.map = this.createWorld();
    this.initEngine();
  }

  setPlayer(player) {
    this.player = player;
  }

  createEngine() {
    return new ClientEngine(document.getElementById(this.cfg.tagId), this);
  }

  createWorld() {
    return new ClientWorld(this, this.engine, levelCfg);
  }

  getWorld() {
    return this.map;
  }

  initEngine() {
    this.engine.loadSprites(sprites).then(() => {
      this.map.init();
      this.engine.on('render', (_, time) => {
        this.engine.camera.focusAtGameObject(this.player);
        this.map.render(time);
      });
      this.engine.start();
      this.initKeys();
    });
  }

  movePlayerToDir(coordX, coordY, cellType, state) {
    const { player } = this;

    if (player && player.motionProgress === 1) {
      const canMove = player.moveByCellCoord(
        coordX,
        coordY,
        (cell) => cell.findObjectsByType(cellType).length
      );

      if (canMove) {
        player.setState(state);
        player.once('motion-stopped', () => this.player.setState('main'));
      }
    }
  }

  // movePlayerToDir(dir) {
  //   const dirs = {
  //     left: [-1, 0],
  //     right: [1, 0],
  //     up: [0, -1],
  //     down: [0, 1]
  //   }

  //   const { player } = this;

  //   if (player && player.motionProgress === 1) {
  //     const canMove = player.moveByCellCoord(
  //       dirs[dir][0],
  //       dirs[dir][1],
  //       (cell) => cell.findObjectsByType('grass').length
  //     );

  //     if (canMove) {
  //       player.setState(dir);
  //       player.once('motion-stopped', () => this.player.setState('main'))
  //     }
  //   }
  // }

  initKeys() {
    this.engine.input.onKey({
      ArrowLeft: (keydown) =>
        keydown && this.movePlayerToDir(-1, 0, 'grass', 'left'),
      ArrowRight: (keydown) =>
        keydown && this.movePlayerToDir(1, 0, 'grass', 'right'),
      ArrowUp: (keydown) =>
        keydown && this.movePlayerToDir(0, -1, 'grass', 'up'),
      ArrowDown: (keydown) =>
        keydown && this.movePlayerToDir(0, 1, 'grass', 'down'),
    });
  }

  /* eslint-enable */

  static init(cfg) {
    if (!ClientGame.game) {
      ClientGame.game = new ClientGame(cfg);
    }
  }
}

export default ClientGame;
