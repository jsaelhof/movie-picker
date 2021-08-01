import { MongoClient } from "mongodb";

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

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongo;

if (!cached) {
  cached = global.mongo = { conn: null, promise: null };
}

export const connectToDatabase = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    console.log("Attempt to connect to DB", MONGODB_URI);
    cached.promise = MongoClient.connect(MONGODB_URI, opts).then((client) => {
      console.log("Mongo Client", client);
      return {
        client,
        db: client.db(MONGODB_DB),
      };
    });
  }
  cached.conn = await cached.promise;

  console.log("Return Conn", cached.conn);

  return cached.conn;
};
