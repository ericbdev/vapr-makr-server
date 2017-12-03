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
  Mutation: {
    addFlavor: (root, { input }) => {
      return Flavor
        .create({
          name: input.name,
          manufacturerId: input.manufacturerId,
        })
        .then(flavor => flavor);
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
            manufacturerId: args.manufacturerId,
          },
        })
        .then(flavor => flavor);
    },
  },
};

export default resolvers;
