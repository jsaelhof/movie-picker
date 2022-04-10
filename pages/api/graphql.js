import { ApolloServer } from "apollo-server-micro";
import { MongoClient } from "mongodb";
import { typeDefs } from "../../graphql/schemas";
import { resolvers } from "../../graphql/resolvers";
import { api } from "../../constants/api";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

if (!MONGODB_DB) {
  throw new Error(
    "Please define the MONGODB_DB environment variable inside .env.local"
  );
}

let db;

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, res }) => {
    if (!db) {
      try {
        const dbClient = new MongoClient(MONGODB_URI);
        await dbClient.connect();
        db = dbClient.db(MONGODB_DB); // database name
      } catch (e) {
        console.log("error while connecting with graphql context (db)", e);
      }
    }

    const {
      user: { sub: userId },
      idToken: token,
    } = getSession(req, res);

    return { db, token, userId };
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default withApiAuthRequired(
  apolloServer.createHandler({ path: api.GRAPHQL })
);
