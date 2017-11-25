import { Flavor, Manufacturer } from './connectors';

const resolvers = {
  Query: {
    allFlavors() {
      return Flavor.findAll();
    },
    allManufacturers() {
      return Manufacturer.findAll();
    },
  },
  Flavor: {
    manufacturer(args) {
      return Manufacturer
        .findOne({
          where: {
            id: args.manufacturerId,
          },
        })
        .then(manufacturer => manufacturer);
    },
  },
  Manufacturer: {
    flavors(args) {
      return Flavor
        .findAll({
          where: {
            manufacturerId: args.id,
          },
        })
        .then(flavor => flavor);
    },
  },
};

export default resolvers;
