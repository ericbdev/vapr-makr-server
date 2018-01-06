import { Sequelize } from 'sequelize';
import { _ } from 'lodash';

import { seedFlavors, seedManufacturers, seedRecipes } from './seeders-old';

// See https://github.com/sequelize/sequelize/issues/8417 for more information about the `operatorsAliases` configuration
const Op = Sequelize.Op;

const db = new Sequelize('database', null, null, {
  dialect: 'sqlite',
  storage: './vapr-makr.sqlite',
  operatorsAliases: Op,
});

const FlavorModel = db.define('flavor', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING(256),
    allowNull: false,
  },
  manufacturerId: {
    type: Sequelize.MEDIUMINT,
    allowNull: true,
  },
});

const ManufacturerModel = db.define('manufacturer', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  manufacturerId: {
    type: Sequelize.MEDIUMINT,
    allowNull: false,
  },
  shortName: {
    type: Sequelize.STRING(10),
    allowNull: false,
  },
  longName: {
    type: Sequelize.STRING(256),
    allowNull: false,
  },
});

const RecipeModel = db.define('recipe', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  resultAmount: {
    type: Sequelize.MEDIUMINT,
    allowNull: false,
  },
  resultStrength: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  resultVG: {
    type: Sequelize.MEDIUMINT,
    allowNull: false,
  },
  resultPG: {
    type: Sequelize.MEDIUMINT,
    allowNull: false,
  },
  nicStrength: {
    type: Sequelize.MEDIUMINT,
    allowNull: false,
  },
  nicVG: {
    type: Sequelize.MEDIUMINT,
    allowNull: false,
  },
  nicPG: {
    type: Sequelize.MEDIUMINT,
    allowNull: false,
  },
  flavors: {
    type: Sequelize.JSON,
    allowNull: false,
  },
});

FlavorModel.hasOne(ManufacturerModel, { foreignKey: 'id' });

const Manufacturer = db.models.manufacturer;
const Flavor = db.models.flavor;
const Recipe = db.models.recipe;

db.sync({ force: true }).then(() => {
  seedFlavors(Flavor);
  seedManufacturers(Manufacturer);
  seedRecipes(Recipe);
});

export { Flavor, Manufacturer, Recipe };
