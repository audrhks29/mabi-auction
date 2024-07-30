import { MongoClient } from "mongodb";

const uri = process.env.DB_URL;
const options = {};

let client;
let dbConnect: Promise<MongoClient>;

if (!uri) {
  throw new Error("Please add your Mongo URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  dbConnect = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  dbConnect = client.connect();
}

export default dbConnect;
