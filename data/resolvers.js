import GraphQLJSON from 'graphql-type-json';
import Connector from './Connector.js';

const connector = new Connector();

const resolvers = {
  JSON: GraphQLJSON,
  Query: {
    allFlavors() {
      return connector.models.flavors.findAll();
    },
    allManufacturers() {
      return connector.models.manufacturers.findAll();
    },
    allRecipes() {
      return connector.models.recipes.findAll({
        attributes: [
          'id',
          'name',
        ],
      });
    },
    singleRecipe: (root, { id }) => {
      return connector.models.recipes.findOne({
        where: {
          id: parseInt(id, 10),
        },
      }).then(recipe => recipe);
    },
  },
  Mutation: {
    addFlavor: (root, { input }) => {
      return connector.models.flavors.create({
        name: input.name,
        manufacturerId: input.manufacturerId,
      }).then(flavor => flavor);
    },
  },
  Flavor: {
    manufacturer(args) {
      return connector.models.manufacturers.findOne({
        where: {
          id: args.manufacturerId,
        },
      }).then(manufacturer => manufacturer);
    },
  },
  Manufacturer: {
    flavors(args) {
      return connector.models.flavors.findAll({
        where: {
          manufacturerId: args.manufacturerId,
        },
      }).then(flavor => flavor);
    },
  },
};

export default resolvers;
