import { MongoClient } from "mongodb";

if (!process.env.DB_URL) {
  throw new Error('Invalid/Missing environment variable: "DB_URL"');
}

const uri = process.env.DB_URL;
const options = {};

let clientPromise: Promise<MongoClient> = new MongoClient(uri, options).connect();

export default clientPromise;
