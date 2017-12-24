import GraphQLJSON from 'graphql-type-json';
import { Flavor, Manufacturer, Recipe } from './connectors';

const resolvers = {
  JSON: GraphQLJSON,
  Query: {
    allFlavors() {
      return Flavor.findAll();
    },
    allManufacturers() {
      return Manufacturer.findAll();
    },
    allRecipes() {
      return Recipe.findAll();
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
