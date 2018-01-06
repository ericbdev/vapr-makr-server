import ModelBase from './ModelBase';

export default class Recipes extends ModelBase {
  constructor(connector) {
    super(connector);

    return this.define({
      modelName: 'recipes',
      attributes: {
        id: {
          type: this.sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: this.sequelize.STRING(50),
          allowNull: false,
        },
        resultAmount: {
          type: this.sequelize.MEDIUMINT,
          allowNull: false,
        },
        resultStrength: {
          type: this.sequelize.DOUBLE,
          allowNull: false,
        },
        resultVG: {
          type: this.sequelize.MEDIUMINT,
          allowNull: false,
        },
        resultPG: {
          type: this.sequelize.MEDIUMINT,
          allowNull: false,
        },
        nicStrength: {
          type: this.sequelize.MEDIUMINT,
          allowNull: false,
        },
        nicVG: {
          type: this.sequelize.MEDIUMINT,
          allowNull: false,
        },
        nicPG: {
          type: this.sequelize.MEDIUMINT,
          allowNull: false,
        },
        flavors: {
          type: this.sequelize.JSON,
          allowNull: false,
        },
      },
    });
  }
}
