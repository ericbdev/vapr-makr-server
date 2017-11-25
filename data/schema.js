import resolvers from './resolvers';
import { makeExecutableSchema } from 'graphql-tools';

const typeDefs = `
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
`;

export default makeExecutableSchema({
  typeDefs,
  resolvers,
});
