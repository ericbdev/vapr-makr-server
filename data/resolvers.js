import GraphQLJSON from 'graphql-type-json';
import { Flavor, Manufacturer, Recipe } from './connectors';
import Connector from './Connector.js';

new Connector();

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
      return Recipe.findAll({
        attributes: [
          'id',
          'name',
        ],
      });
    },
    singleRecipe: (root, { id }) => {
      const recipeId = parseInt(id, 10);
      return Recipe
        .findOne({
          where: {
            id: recipeId,
          },
        })
        .then(recipe => recipe);
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
