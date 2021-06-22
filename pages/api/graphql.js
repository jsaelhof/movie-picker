import { ApolloServer } from "apollo-server-micro";
import { typeDefs } from "./schemas";
import { resolvers } from "./resolvers";
import { db } from "../../db/db";

const apolloServer = new ApolloServer({ typeDefs, resolvers, context: db });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: "/api/graphql" });
