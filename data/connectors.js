import { Sequelize } from 'sequelize';
import { _ } from 'lodash';

import {seedFlavors, seedManufacturers } from './seeders';

// See https://github.com/sequelize/sequelize/issues/8417 for more information about the `operatorsAliases` configuration
const Op = Sequelize.Op;

const db = new Sequelize('database', null, null, {
  dialect: 'sqlite',
  storage: './vapr-makr.sqlite',
  operatorsAliases: Op,
});

const FlavorModel = db.define('flavor', {
  id: { type: Sequelize.MEDIUMINT, primaryKey: true },
  name: { type: Sequelize.STRING },
  manufacturerId: { type: Sequelize.MEDIUMINT },
});

const ManufacturersModel = db.define('manufacturer', {
  id: { type: Sequelize.MEDIUMINT, primaryKey: true },
  shortName: { type: Sequelize.STRING },
  longName: { type: Sequelize.STRING },
});

FlavorModel.hasOne(ManufacturersModel, { foreignKey: 'id' });

const Manufacturer = db.models.manufacturer;
const Flavor = db.models.flavor;

db.sync({ force: true }).then(() => {
  seedFlavors(FlavorModel);
  seedManufacturers(ManufacturersModel);
});

export { Flavor, Manufacturer };
