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
    manufacturerId: Int
    shortName: String
    longName: String
    flavors: [Flavor]
  }

  type Flavor {
    id: Int
    flavorId: Int
    name: String
    manufacturer: Manufacturer
  }
  
  type RecipeItem {
    id: Int
    recipeId: Int
    flavor: Flavor
    percent: Float
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
    recipeItems: [RecipeItem]
  }

  type Query {
    allFlavors: [Flavor]
    allManufacturers: [Manufacturer]
    allRecipes: [Recipe]
    singleRecipe(id: ID!): Recipe
    recipeItems(id: ID!): [RecipeItem]
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
