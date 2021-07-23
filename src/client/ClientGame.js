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
    return new ClientEngine(document.getElementById(this.cfg.tagId));
  }

  createWorld() {
    return new ClientWorld(this, this.engine, levelCfg);
  }

  initEngine() {
    this.engine.loadSprites(sprites).then(() => {
      this.map.init();
      this.engine.on('render', (_, time) => {
        this.map.render(time);
      });
      this.engine.start();
      this.initKeys();
    });
  }

  moveSkin(event, coordX, coordY, cellType) {
    if (event) {
      this.player.moveByCellCoord(
        coordX,
        coordY,
        (cell) => cell.findObjectsByType(cellType).length
      );
    }
  }

  initKeys() {
    this.engine.input.onKey({
      ArrowLeft: (keydown) => this.moveSkin(keydown, -1, 0, 'grass'),
      ArrowRight: (keydown) => this.moveSkin(keydown, 1, 0, 'grass'),
      ArrowUp: (keydown) => this.moveSkin(keydown, 0, -1, 'grass'),
      ArrowDown: (keydown) => this.moveSkin(keydown, 0, 1, 'grass'),
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
