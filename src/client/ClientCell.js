import PositionedObject from '../common/PositionedObject';
import ClientGameObject from './ClientGameObject';

class ClientCell extends PositionedObject {
  constructor(cfg) {
    super();
    const { cellWidth, cellHeight } = cfg.world;

    Object.assign(
      this,
      {
        cfg,
        objects: [],
        x: cellWidth * cfg.cellCol,
        y: cellWidth * cfg.cellRow,
        width: cellWidth,
        height: cellHeight,
      },
      cfg
    );

    this.initGameObjects();
  }

  initGameObjects() {
    const { cellCfg } = this;

    this.objects = cellCfg.map((layer, layerId) =>
      layer.map(
        (objCfg) => new ClientGameObject({ cell: this, objCfg, layerId })
      )
    );
  }

  render(time, layerId) {
    const { objects } = this;

    if (objects[layerId]) {
      objects[layerId].forEach((obj) => obj.render(time));
    }
  }

  addGameObject(objToAdd) {
    const { objects } = this;

    if (objToAdd.layerId === undefined) {
      /* eslint-disable */
      objToAdd.layerId = objects.length;
      /* eslint-enable */
    }

    if (!objects[objToAdd.layerId]) {
      objects[objToAdd.layerId] = [];
    }

    this.objects.push(objToAdd);
  }

  removeGameObject(objToRemove) {
    const { objects } = this;

    objects.forEach(
      /* eslint-disable */
      (layer, layerId) =>
        (objects[layerId] = layer.filter((obj) => obj !== objToRemove))
      /* eslint-enable */
    );
  }

  findObjectsByType(type) {
    let foundObjects = [];

    this.objects
      /* eslint-disable */
      .forEach((layer) => (foundObjects = [...foundObjects, ...layer]))
      /* eslint-enable */
      .filter((obj) => obj.type === type);
    return foundObjects;
  }
}

export default ClientCell;
