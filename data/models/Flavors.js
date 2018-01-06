import ModelBase from './ModelBase';

export default class Flavors extends ModelBase {
  constructor(connector) {
    super(connector);

    return this.define({
      modelName: 'flavors',
      attributes: {
        id: {
          type: this.sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: this.sequelize.STRING(256),
          allowNull: false,
        },
        manufacturerId: {
          type: this.sequelize.MEDIUMINT,
          allowNull: true,
        },
      },
    });
  }
}
