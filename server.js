import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import schema from './data/schema';

const PORT = 4000;
const app = express();
app.use('*', cors());

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
app.listen(PORT, () => console.log(
  `GraphiQL is now running on http://localhost:${PORT}/graphiql`
));
