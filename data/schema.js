import resolvers from './resolvers';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import mocks from './mocks';

const typeDefs = `
type Query {
  author(firstName: String, lastName: String): Author
  getFortuneCookie: String
  allAuthors: [Author]
  allFlavors: [Flavors]
  getManufacturer(id: Int): Manufacturers
}

type Author {
  id: Int
  firstName: String
  lastName:String
  posts: [Post]
}

type Post {
  id: Int
  title: String
  text: String
  views: Int
  author: Author
}

type Manufacturers {
  id: Int
  shortName: String
  longName: String
}

type Flavors {
  id: Int
  name: String
  manufacturerId: Int
}
`;

const schema = makeExecutableSchema({ typeDefs });

addMockFunctionsToSchema({ schema, mocks });

export default makeExecutableSchema({ typeDefs, resolvers });
