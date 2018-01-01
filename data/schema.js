import resolvers from './resolvers';
import { makeExecutableSchema } from 'graphql-tools';

const typeDefs = `
  scalar JSON

  input FlavorInput {
    name: String
    manufacturerId: Int
  }

  type Manufacturer {
    id: Int
    shortName: String
    longName: String
    flavors: [Flavor]
  }

  type Flavor {
    id: Int
    name: String
    manufacturer: Manufacturer
  }

  type Recipe {
    id: Int
    name: String
    resultAmount: Int
    resultStrength: Float
    resultVG: Int
    resultPG: Int
    nicStrength: Int
    nicVG: Int
    nicPG: Int
    flavors: JSON
  }

  type Query {
    allFlavors: [Flavor]
    allManufacturers: [Manufacturer]
    allRecipes: [Recipe]
    singleRecipe(id: ID!): Recipe
  }

  type Mutation {
    # A mutation to add a new flavor to the list of flavors
    addFlavor(input: FlavorInput): Flavor
  }
`;

export default makeExecutableSchema({
  typeDefs,
  resolvers,
});
