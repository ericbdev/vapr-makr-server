import resolvers from './resolvers';
import { makeExecutableSchema } from 'graphql-tools';

const typeDefs = `
  input FlavorInput {
    name: String
    manufacturerId: Int
  }

  type Query {
    allFlavors: [Flavor]
    allManufacturers: [Manufacturer]
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
  
  type Mutation {
    # A mutation to add a new flavor to the list of flavors
    addFlavor(input: FlavorInput): Flavor
  }
`;

export default makeExecutableSchema({
  typeDefs,
  resolvers,
});
