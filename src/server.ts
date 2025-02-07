import express, { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './schemas/typeDefs.js';
import { resolvers } from './schemas/resolvers.js';
import db from './config/connection.js';

const app: Application = express(); // ✅ Ensure correct Express typing
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const startApolloServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ user: req.user }),
  });

  await server.start();

  // ✅ Fix: Explicitly cast Express application type for Apollo Server
  server.applyMiddleware({ app: app as unknown as express.Application });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`🌍 Now listening on localhost:${PORT}`);
      console.log(`🚀 GraphQL API available at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
};

startApolloServer();