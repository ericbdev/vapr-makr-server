import ModelBase from './ModelBase';

export default class Manufacturers extends ModelBase {
  constructor(connector) {
    super(connector);

    return this.define({
      modelName: 'manufacturers',
      attributes: {
        id: {
          type: this.sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        manufacturerId: {
          type: this.sequelize.MEDIUMINT,
          allowNull: false,
        },
        shortName: {
          type: this.sequelize.STRING(10),
          allowNull: false,
        },
        longName: {
          type: this.sequelize.STRING(256),
          allowNull: false,
        },
      },
    });
  }
}
