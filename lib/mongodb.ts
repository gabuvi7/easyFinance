import { Db, MongoClient } from 'mongodb';

const { MONGODB_URI } = process.env;
const { MONGODB_DB } = process.env;

let cachedClient: MongoClient;
let cachedDb: Db;

export async function connectToDatabase() {
  // check the cached.
  if (cachedClient && cachedDb) {
    // load from cache
    return {
      client: cachedClient,
      db: cachedDb,
    };
  }

  console.log('mongodb.ts: MONGODB_URI: ', MONGODB_URI);

  // check the MongoDB URI
  if (!MONGODB_URI) {
    throw new Error('Define the MONGODB_URI environmental variable');
  }
  // check the MongoDB DB
  if (!MONGODB_DB) {
    throw new Error('Define the MONGODB_DB environmental variable');
  }

  // Connect to cluster
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  const db = client.db(MONGODB_DB);

  // set cache
  cachedClient = client;
  cachedDb = db;

  return {
    client: cachedClient,
    db: cachedDb,
  };
}
