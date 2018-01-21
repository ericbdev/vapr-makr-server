import ModelBase from './ModelBase';

export default class RecipeItems extends ModelBase {
  constructor(connector) {
    super(connector);

    return this.define({
      modelName: 'recipeItems',
      attributes: {
        id: {
          type: this.sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        recipeId: {
          type: this.sequelize.INTEGER,
          allowNull: false,
        },
        flavorId: {
          type: this.sequelize.INTEGER,
          allowNull: false,
        },
        percent: {
          type: this.sequelize.INTEGER,
          allowNull: false,
        },
      },
    });
  }
}
