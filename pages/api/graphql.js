import { ApolloServer } from "apollo-server-micro";
import { typeDefs } from "../../graphql/schemas";
import { resolvers } from "../../graphql/resolvers";
import { api } from "../../constants/api";

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: global.mongo.conn,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: api.GRAPHQL });
