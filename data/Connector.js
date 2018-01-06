import { Sequelize } from 'sequelize';

import { Flavors, Manufacturers, Recipes } from './models';

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
      /**
       *
       * seedFlavors(Flavor);
       * seedManufacturers(Manufacturer);
       * seedRecipes(Recipe);
       */

      console.log('new db made!');
    });
  }
}

export default Connector;
