import { makeExecutableSchema } from 'graphql-tools';

import { resolvers } from './resolvers';

const sampleTypeDefs = `
type Channel {
  id: ID!                # "!" denotes a required field
  name: String
}
# This type specifies the entry points into our API. In this case
# there is only one - "channels" - which returns a list of channels.
type Query {
  channels: [Channel]    # "[]" means this is a list of channels
}
`;

const typeDefs = `
  type Manufacturers {
    id: ID! # the ! means that every author object _must_ have an id
    shortName: String
    longName: String
  }
  
  type Flavors {
    id: ID!
    name: String!
    manufacturer: Manufacturers
  }
  
  type Query {
    flavors: [Flavors]
  }
`;

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
export { schema };
