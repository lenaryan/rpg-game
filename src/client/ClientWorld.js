import worldCfg from '../configs/world.json';

class ClientWorld {
  constructor(game, engine, levelCfg) {
    Object.assign(this, {
      game,
      engine,
      levelCfg,
      height: levelCfg.map.length,
      width: levelCfg.map[0].length,
    });
  }

  init() {
    const { map } = worldCfg;
    const width = 30;
    const height = 30;

    map.forEach((cfgRow, y) => {
      cfgRow.forEach((cfgCell, x) => {
        this.engine.renderSpriteFrame({
          sprite: ['terrain', cfgCell[0]],
          frame: 0,
          x: x * width,
          y: y * height,
          w: width,
          h: height,
        });
      });
    });
  }
}

export default ClientWorld;
