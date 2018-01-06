import { Sequelize } from 'sequelize';

import { Flavors, Manufacturers, Recipes } from './models';
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
      storage: './vapr-makr-test.sqlite',
      operatorsAliases: this.op,
    });

    this.models.flavors = new Flavors(this);
    this.models.manufacturers = new Manufacturers(this);
    this.models.recipes = new Recipes(this);

    this.models.flavors.hasOne(this.models.manufacturers, { foreignKey: 'id' });

    this._sync();
  }

  _sync() {
    this.db.sync({ force: true }).then(() => {
      new FlavorsSeeder(this);
      new ManufacturersSeeder(this);
      new RecipesSeeder(this);
    });
  }
}

export default Connector;
