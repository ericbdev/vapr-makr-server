import { Sequelize } from 'sequelize';

import { Flavors, Manufacturers, Recipes, RecipeItems } from './models';
import { FlavorsSeeder, ManufacturersSeeder, RecipesSeeder } from './seeders';

class Connector {
  constructor() {
    this.sequelize = Sequelize;
    this.op = this.sequelize.Op;
    this.db = null;
    this.models = {};

    this._init();
  }

  _init() {
    this.db = new Sequelize('database', null, null, {
      dialect: 'sqlite',
      storage: './vapr-makr.sqlite',
      operatorsAliases: this.op,
    });

    this.models.flavors = new Flavors(this);
    this.models.manufacturers = new Manufacturers(this);
    this.models.recipes = new Recipes(this);
    this.models.recipeItems = new RecipeItems(this);

    this.models.manufacturers.hasMany(this.models.flavors, {
      foreignKey: 'id',
      sourceKey: 'manufacturerId',
    });
    this.models.recipes.hasMany(this.models.recipeItems, {
      foreignKey: 'recipeId',
      as: 'recipeItems',
    });
    this.models.recipeItems.hasMany(this.models.flavors, {
      foreignKey: 'id',
      as: 'flavor',
    });
    this.models.recipeItems.belongsTo(this.models.recipes, {
      foreignKey: 'id',
    });

    this._sync();
  }

  _sync() {
    this.db.sync({ force: true }).then(() => {
      new ManufacturersSeeder(this);
      new FlavorsSeeder(this);
      new RecipesSeeder(this);
    });
  }
}

export default Connector;
